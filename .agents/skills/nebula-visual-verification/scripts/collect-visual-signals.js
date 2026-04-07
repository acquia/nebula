#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const proc = globalThis.process;
const args = proc.argv.slice(2);

function parseArgs(argv) {
  const options = {
    scope: 'body',
    sampleLimit: 60,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === '--scope') {
      options.scope = argv[i + 1] ?? options.scope;
      i += 1;
      continue;
    }

    if (arg === '--sample-limit') {
      const next = Number.parseInt(argv[i + 1] ?? '', 10);
      if (Number.isFinite(next) && next > 0) {
        options.sampleLimit = next;
      }
      i += 1;
      continue;
    }

    if (arg === '--help' || arg === '-h') {
      proc.stdout
        .write(`Usage: node collect-visual-signals.js [--scope <selector>] [--sample-limit <n>]

Print a browser-side JavaScript program to stdout. Pipe the output into:
  agent-browser eval --stdin
`);
      proc.exit(0);
    }
  }

  return options;
}

const options = parseArgs(args);

// Keep the browser logic in its own file so it can be edited and commented like
// normal front-end code. This wrapper only injects the runtime options needed by
// the skill before piping the script into `agent-browser eval --stdin`.
const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const browserScriptPath = path.join(
  currentDir,
  'collect-visual-signals.browser.js',
);

const browserScript = readFileSync(browserScriptPath, 'utf8')
  .replaceAll('"__SCOPE_SELECTOR__"', JSON.stringify(options.scope))
  .replaceAll('"__SAMPLE_LIMIT__"', JSON.stringify(options.sampleLimit));

proc.stdout.write(browserScript);
