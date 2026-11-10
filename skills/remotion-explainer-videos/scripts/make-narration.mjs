#!/usr/bin/env node
// Writes one narration file per scene using the macOS `say` command.
// Input: JSON with a `scenes` (or `screens`) array whose items have `id` and `narration`.
// Usage: node make-narration.mjs <storyboard.json> <outDir> [--voice <name>] [--rate <wpm>]
// Output: <outDir>/<id>.wav (mono, 16-bit, 22.05 kHz). Needs no ffmpeg.
import {execFileSync} from 'node:child_process';
import {mkdirSync, readFileSync} from 'node:fs';
import {join, resolve} from 'node:path';

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args[i + 1];
};
const [storyboardPath, outDir] = args.filter((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--'));
if (!storyboardPath || !outDir) {
  console.error('Usage: node make-narration.mjs <storyboard.json> <outDir> [--voice <name>] [--rate <wpm>]');
  process.exit(1);
}
if (process.platform !== 'darwin') {
  console.error('`say` is macOS-only. Produce <outDir>/<scene.id>.wav with any local TTS or a recording instead.');
  process.exit(1);
}

const data = JSON.parse(readFileSync(resolve(storyboardPath), 'utf8'));
const scenes = data.scenes ?? data.screens;
if (!Array.isArray(scenes)) {
  console.error('Expected a "scenes" or "screens" array in the JSON file.');
  process.exit(1);
}
const voice = flag('--voice');
const rate = flag('--rate') ?? '175';
mkdirSync(resolve(outDir), {recursive: true});

for (const scene of scenes) {
  if (typeof scene.id !== 'string' || typeof scene.narration !== 'string') {
    console.error(`Every item needs a string "id" and "narration": ${JSON.stringify(scene)}`);
    process.exit(1);
  }
  const out = join(resolve(outDir), `${scene.id}.wav`);
  const sayArgs = ['-r', rate, '--file-format=WAVE', '--data-format=LEI16@22050', '-o', out, '-f', '-'];
  if (voice) sayArgs.unshift('-v', voice);
  // The text goes through stdin so narration starting with "-" is never parsed as an option.
  execFileSync('say', sayArgs, {input: scene.narration});
  console.log(`wrote ${out}`);
}
