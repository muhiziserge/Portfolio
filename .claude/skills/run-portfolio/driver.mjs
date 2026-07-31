#!/usr/bin/env node
// Minimal chromium-cli-style REPL for driving the portfolio Next.js dev
// server headlessly, since chromium-cli isn't installed in this environment.
// Pipe commands on stdin, one per line:
//
//   nav <url>
//   wait-for text=<substring> | selector=<css>
//   click <css selector>
//   hover <css selector>
//   fill <css selector> <text...>
//   press <key>
//   screenshot [name]
//   screenshot-element <css selector> [name]
//   console --errors
//   quit
//
// Screenshots land in ./screenshots/<name|auto-index>.png (relative to cwd).

import { chromium } from 'playwright';
import { createInterface } from 'node:readline';
import { mkdir } from 'node:fs/promises';

const consoleErrors = [];
let shotIndex = 0;

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
page.on('pageerror', (err) => consoleErrors.push(String(err)));

await mkdir('screenshots', { recursive: true });

function parseWaitFor(arg) {
  if (arg.startsWith('text=')) return { type: 'text', value: arg.slice(5) };
  if (arg.startsWith('selector=')) return { type: 'selector', value: arg.slice(9) };
  throw new Error(`wait-for needs text=... or selector=..., got: ${arg}`);
}

const rl = createInterface({ input: process.stdin, terminal: false });

for await (const raw of rl) {
  const line = raw.trim();
  if (!line || line.startsWith('#')) continue;
  const [cmd, ...rest] = line.split(' ');
  try {
    switch (cmd) {
      case 'nav':
        await page.goto(rest.join(' '), { waitUntil: 'networkidle' });
        console.log(`OK nav ${rest.join(' ')}`);
        break;
      case 'wait-for': {
        const w = parseWaitFor(rest.join(' '));
        if (w.type === 'text') await page.getByText(w.value).first().waitFor({ timeout: 15000 });
        else await page.locator(w.value).first().waitFor({ timeout: 15000 });
        console.log(`OK wait-for ${rest.join(' ')}`);
        break;
      }
      case 'click':
        await page.locator(rest.join(' ')).first().click();
        console.log(`OK click ${rest.join(' ')}`);
        break;
      case 'hover':
        await page.locator(rest.join(' ')).first().hover();
        console.log(`OK hover ${rest.join(' ')}`);
        break;
      case 'fill': {
        const [selector, ...text] = rest;
        await page.locator(selector).first().fill(text.join(' '));
        console.log(`OK fill ${selector}`);
        break;
      }
      case 'press':
        await page.keyboard.press(rest.join(' '));
        console.log(`OK press ${rest.join(' ')}`);
        break;
      case 'screenshot': {
        const name = rest.join(' ') || String(shotIndex++);
        const path = `screenshots/${name}.png`;
        await page.screenshot({ path, fullPage: true });
        console.log(`OK screenshot ${path}`);
        break;
      }
      case 'screenshot-element': {
        const [selector, ...nameParts] = rest;
        const name = nameParts.join(' ') || String(shotIndex++);
        const path = `screenshots/${name}.png`;
        await page.locator(selector).first().screenshot({ path });
        console.log(`OK screenshot-element ${path}`);
        break;
      }
      case 'console':
        if (rest.includes('--errors')) console.log(`ERRORS ${JSON.stringify(consoleErrors)}`);
        break;
      case 'quit':
        await browser.close();
        process.exit(0);
        break;
      default:
        console.log(`ERR unknown command: ${cmd}`);
    }
  } catch (err) {
    console.log(`ERR ${cmd}: ${err.message}`);
  }
}

await browser.close();
