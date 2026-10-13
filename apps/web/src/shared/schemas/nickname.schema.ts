import { z } from 'zod';

// 닉네임 규칙은 서버 검증(3~12자, 한글 완성형·영문·숫자)과 맞춥니다.
// 회원가입과 마이페이지 수정이 같은 서버 규칙을 검증하므로 한 곳에서만 정의합니다.
export const NICKNAME_MIN_LENGTH = 3;
export const NICKNAME_MAX_LENGTH = 12;

// 한글 조합 중에는 자모(ㄱ, ㅏ)가 잠시 입력되므로 문자 종류 검사에서는 자모까지 허용합니다.
const NICKNAME_INPUT_PATTERN = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]+$/;
const NICKNAME_PATTERN = /^[가-힣a-zA-Z0-9]+$/;

const NICKNAME_LENGTH_MESSAGE = `닉네임은 최소 ${NICKNAME_MIN_LENGTH}자, 최대 ${NICKNAME_MAX_LENGTH}자까지 입력할 수 있습니다.`;

// 검사 순서가 곧 안내 순서입니다. 조합 중인 자모 안내는 길이를 채운 뒤에만 보이도록 마지막에 둡니다.
export const nicknameSchema = z
  .string()
  .trim()
  .regex(
    NICKNAME_INPUT_PATTERN,
    '닉네임은 한글, 영문, 숫자만 사용할 수 있습니다.'
  )
  .min(NICKNAME_MIN_LENGTH, NICKNAME_LENGTH_MESSAGE)
  .max(NICKNAME_MAX_LENGTH, NICKNAME_LENGTH_MESSAGE)
  .regex(NICKNAME_PATTERN, '한글은 자음·모음만으로 입력할 수 없습니다.');
