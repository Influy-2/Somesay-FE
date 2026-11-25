'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { describe, it, beforeEach, afterEach } = require('node:test');

const {
  RECHECK_INTERVAL_MS,
  createFeatureIndex,
  formatFeature,
  sortKeyOf,
} = require('./featureIndex.cjs');

const FEATURES = [
  { id: 'F-0015', display_no: '3', title: '랭킹' },
  { id: 'F-0023', display_no: '3.3', title: '상단 탭 전환' },
  { id: 'F-0024', display_no: '3.3.1', title: '상단 탭 전환 (3.1 <-> 3.2)' },
];

describe('createFeatureIndex', () => {
  let dir;
  let filePath;
  let time;
  const now = () => time;

  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'feature-index-'));
    filePath = path.join(dir, 'features.json');
    fs.writeFileSync(filePath, JSON.stringify(FEATURES));
    time = 0;
  });

  afterEach(() => fs.rmSync(dir, { recursive: true, force: true }));

  it('기능 ID 로 표시 번호·제목·단계를 찾는다', () => {
    const index = createFeatureIndex(filePath, { now });
    assert.deepEqual(index.findById('F-0024'), {
      id: 'F-0024',
      displayNo: '3.3.1',
      title: '상단 탭 전환 (3.1 <-> 3.2)',
      isLeaf: true,
      levelLabel: '소분류',
    });
    assert.equal(index.findById('F-0023')?.levelLabel, '중분류');
    assert.equal(index.findById('F-9999'), undefined);
  });

  it('표시 번호로 기능을 찾는다', () => {
    const index = createFeatureIndex(filePath, { now });
    assert.equal(index.findByDisplayNo('3.3.1')?.id, 'F-0024');
    assert.equal(index.findByDisplayNo('3.3')?.isLeaf, false);
  });

  it('파일이 바뀌면 확인 간격이 지난 뒤 다시 읽는다', () => {
    const index = createFeatureIndex(filePath, { now });
    assert.equal(index.findById('F-0024')?.title, '상단 탭 전환 (3.1 <-> 3.2)');

    fs.writeFileSync(
      filePath,
      JSON.stringify([
        { id: 'F-0024', display_no: '3.4.1', title: '바뀐 제목' },
      ])
    );
    // 수정 시각 해상도가 낮은 파일 시스템에서도 바뀐 것으로 보이게 합니다.
    const future = new Date(Date.now() + 10_000);
    fs.utimesSync(filePath, future, future);

    time = RECHECK_INTERVAL_MS - 1;
    assert.equal(index.findById('F-0024')?.displayNo, '3.3.1');

    time = RECHECK_INTERVAL_MS;
    assert.equal(index.findById('F-0024')?.displayNo, '3.4.1');
  });

  it('파일을 읽지 못하면 아무것도 찾지 않고 이유를 남긴다', () => {
    const messages = [];
    const index = createFeatureIndex(path.join(dir, 'missing.json'), {
      now,
      log: (message) => messages.push(message),
    });
    assert.equal(index.findById('F-0024'), undefined);
    assert.match(messages[0] ?? '', /읽지 못했습니다/);
  });
});

describe('formatFeature', () => {
  it('표시 번호와 제목을 잇는다', () => {
    assert.equal(
      formatFeature({ displayNo: '11.1.5', title: '상단 바' }),
      '11.1.5 상단 바'
    );
  });
});

describe('sortKeyOf', () => {
  it('두 자리 번호가 한 자리 번호 뒤에 오게 한다', () => {
    assert.ok(sortKeyOf('3.2.1') < sortKeyOf('3.10.1'));
    assert.ok(sortKeyOf('9.1.1') < sortKeyOf('10.1.1'));
  });
});
