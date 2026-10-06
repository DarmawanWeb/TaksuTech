// PM2 apps for Taksu Tech on the Mac mini. deploy.sh loads the env file before PM2 reads this.
// Every server listens on 127.0.0.1, so only cloudflared (same machine) can reach it.
const os = require('node:os');
const path = require('node:path');

const home = process.env.TAKSU_HOME || path.join(os.homedir(), 'apps', 'taksu-tech');

const pick = (...names) =>
  Object.fromEntries(
    names.filter((name) => process.env[name]).map((name) => [name, process.env[name]]),
  );

const app = (name, port, env = {}) => ({
  name: `taksu-${name}`,
  // `current` is a symlink to the active release; reload picks up the new target.
  cwd: path.join(home, 'current', name, 'apps', name),
  script: 'server.js',
  exec_mode: 'fork',
  instances: 1,
  max_memory_restart: '400M',
  min_uptime: '10s',
  max_restarts: 10,
  time: true,
  out_file: path.join(home, 'logs', `${name}.out.log`),
  error_file: path.join(home, 'logs', `${name}.err.log`),
  env: {
    NODE_ENV: 'production',
    NEXT_TELEMETRY_DISABLED: '1',
    HOSTNAME: '127.0.0.1',
    PORT: String(port),
    ...env,
  },
});

module.exports = {
  apps: [
    app('web', process.env.WEB_PORT || 4300),
    app(
      'kiosk',
      process.env.KIOSK_PORT || 4301,
      pick(
        'AI_PROVIDER',
        'AI_MODEL',
        'AI_API_KEY',
        'AI_BASE_URL',
        'AI_TIMEOUT_MS',
        'AI_KEEP_ALIVE',
        'AI_MAX_CONCURRENCY',
        'ASSISTANT_RATE_LIMIT',
      ),
    ),
    app('playground', process.env.PLAYGROUND_PORT || 4302),
  ],
};
