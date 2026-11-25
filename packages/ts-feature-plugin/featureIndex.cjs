'use strict';

// features.json 을 읽어 기능 ID ↔ 표시 번호를 찾는 순수 모듈입니다.
// tsserver 는 hover·자동완성마다 부르므로, 파일은 캐시하고 수정 시각이 바뀔 때만 다시 읽습니다.
const fs = require('node:fs');

const ID_PATTERN = /^F-\d{4}$/;
const DISPLAY_NO_PATTERN = /^\d+(\.\d+){0,2}$/;
// 매 호출마다 stat 을 부르지 않도록 확인 간격을 둡니다. features:update 후 늦어도 이만큼 뒤에 반영됩니다.
const RECHECK_INTERVAL_MS = 2000;

const LEVEL_LABELS = ['대분류', '중분류', '소분류'];

const toFeature = ({ id, display_no: displayNo, title }) => {
  const depth = displayNo.split('.').length;
  return {
    id,
    displayNo,
    title,
    isLeaf: depth === 3,
    levelLabel: LEVEL_LABELS[depth - 1] ?? '',
  };
};

/** 자동완성을 표시 번호 순서로 세우기 위한 정렬 키 (3.10.1 이 3.2.1 뒤에 오도록 자리수를 맞춘다) */
const sortKeyOf = (displayNo) =>
  displayNo
    .split('.')
    .map((part) => part.padStart(3, '0'))
    .join('.');

const formatFeature = (feature) => `${feature.displayNo} ${feature.title}`;

const createFeatureIndex = (
  filePath,
  { now = Date.now, log = () => {} } = {}
) => {
  let cache = null;
  let checkedAt = Number.NEGATIVE_INFINITY;

  const load = () => {
    const time = now();
    if (time - checkedAt < RECHECK_INTERVAL_MS) return cache;
    checkedAt = time;
    try {
      const { mtimeMs } = fs.statSync(filePath);
      if (cache && cache.mtimeMs === mtimeMs) return cache;
      const list = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const byId = new Map();
      const byDisplayNo = new Map();
      for (const item of list) {
        const feature = toFeature(item);
        byId.set(feature.id, feature);
        byDisplayNo.set(feature.displayNo, feature);
      }
      cache = { mtimeMs, byId, byDisplayNo };
      log(`기능 목록을 읽었습니다: ${byId.size}건 (${filePath})`);
    } catch (error) {
      // 읽지 못하면 기능을 끈 것처럼 동작하고, 다음 확인 때 다시 시도합니다.
      cache = null;
      log(`기능 목록을 읽지 못했습니다: ${error.message} (${filePath})`);
    }
    return cache;
  };

  return {
    findById: (id) => load()?.byId.get(id),
    findByDisplayNo: (displayNo) => load()?.byDisplayNo.get(displayNo),
  };
};

module.exports = {
  ID_PATTERN,
  DISPLAY_NO_PATTERN,
  RECHECK_INTERVAL_MS,
  createFeatureIndex,
  formatFeature,
  sortKeyOf,
};
