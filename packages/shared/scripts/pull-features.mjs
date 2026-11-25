// 팀웹 서버 DB에서 기능 목록을 읽어 features:update 로 넘깁니다.
// 서버 주소·키 경로는 레포에 남기지 않도록 환경 변수로 받습니다 (packages/shared/.env, gitignore됨).
// 사용: pnpm --filter @somesay/shared features:pull
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const { TEAMWEB_SSH_TARGET, TEAMWEB_SSH_KEY, TEAMWEB_DB_PATH } = process.env;

if (!TEAMWEB_SSH_TARGET || !TEAMWEB_DB_PATH) {
  console.error(
    '환경 변수가 없습니다: TEAMWEB_SSH_TARGET(예: ubuntu@1.2.3.4), TEAMWEB_DB_PATH 를 packages/shared/.env 에 적어 주세요.'
  );
  process.exit(1);
}

// 보관(archived)된 기능은 빼서, 지워진 기능의 표식이 타입 에러로 드러나게 합니다.
const QUERY =
  "SELECT printf('F-%04d', id) AS id, display_no, title FROM feature WHERE archived_at IS NULL ORDER BY id;";

const sshArgs = [
  ...(TEAMWEB_SSH_KEY
    ? ['-i', TEAMWEB_SSH_KEY.replace(/^~/, process.env.HOME ?? '~')]
    : []),
  TEAMWEB_SSH_TARGET,
  `sudo sqlite3 -json -readonly ${TEAMWEB_DB_PATH}`,
];

const ssh = spawn('ssh', sshArgs, { stdio: ['pipe', 'pipe', 'inherit'] });
const update = spawn(
  process.execPath,
  [fileURLToPath(new URL('./update-features.mjs', import.meta.url))],
  { stdio: ['pipe', 'inherit', 'inherit'] }
);

ssh.stdout.pipe(update.stdin);
ssh.stdin.end(QUERY);

ssh.on('close', (code) => {
  if (code !== 0) {
    console.error(
      `ssh 가 실패했습니다 (종료 코드 ${code}). 기능 목록을 바꾸지 않았습니다.`
    );
    update.kill();
    process.exit(code ?? 1);
  }
});
update.on('close', (code) => process.exit(code ?? 1));
