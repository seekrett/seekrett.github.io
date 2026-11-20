// Gift exchange generator. Run with:  npm run gift-draw
//
// 1. Reads the names in names.txt
// 2. Secretly assigns everyone a giftee (nobody gets themselves, every name is used once)
// 3. Locks each person's giftee with their own secret code and writes draw.json (safe to publish)
// 4. Writes the codes to codes.txt (NOT published: send each person their code privately)
//
// The pairings are never printed. Re-running makes a brand-new draw and invalidates the old
// codes, so it refuses to overwrite an existing draw unless you pass --force.

import { readFileSync, writeFileSync } from 'node:fs'
import { webcrypto as crypto } from 'node:crypto'

const dir = new URL('.', import.meta.url)
const force = process.argv.includes('--force')

const names = readFileSync(new URL('names.txt', dir), 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'))

const lower = names.map((n) => n.toLowerCase())
const dupes = lower.filter((n, i) => lower.indexOf(n) !== i)
if (dupes.length) fail(`These names appear more than once in names.txt: ${[...new Set(dupes)].join(', ')}`)
if (names.length < 2) fail('Add at least 2 names to names.txt first.')

const existing = JSON.parse(readFileSync(new URL('draw.json', dir), 'utf8'))
if (Object.keys(existing.entries ?? {}).length && !force) {
  fail('A draw already exists. Re-running gives everyone new giftees and new codes.\nIf that is what you want, run:  npm run gift-draw -- --force')
}

function randInt(n) {
  const a = new Uint32Array(1)
  crypto.getRandomValues(a)
  return a[0] % n
}

// Random derangement: shuffle until nobody has themselves.
let giftees
do {
  giftees = [...names]
  for (let i = giftees.length - 1; i > 0; i--) {
    const j = randInt(i + 1)
    ;[giftees[i], giftees[j]] = [giftees[j], giftees[i]]
  }
} while (giftees.some((g, i) => g === names[i]))

const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789' // no 0/O, 1/I/L
const makeCode = () => {
  let s = ''
  for (let i = 0; i < 8; i++) s += ALPHABET[randInt(ALPHABET.length)]
  return `${s.slice(0, 4)}-${s.slice(4)}`
}

const b64 = (buf) => Buffer.from(buf).toString('base64')
const enc = new TextEncoder()

// Must match unlock() in GiftDraw.tsx
async function lock(code, text) {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const base = await crypto.subtle.importKey('raw', enc.encode(code.replace(/[^A-Z0-9]/g, '')), 'PBKDF2', false, ['deriveKey'])
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 200_000, hash: 'SHA-256' },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt'],
  )
  const data = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(text))
  return { salt: b64(salt), iv: b64(iv), data: b64(data) }
}

const entries = {}
const codeLines = []
for (let i = 0; i < names.length; i++) {
  const code = makeCode()
  entries[names[i]] = await lock(code, giftees[i])
  codeLines.push(`${names[i]}: ${code}`)
}

writeFileSync(new URL('draw.json', dir), JSON.stringify({ names, entries }, null, 2) + '\n')
writeFileSync(
  new URL('codes.txt', dir),
  `Send each person ONLY their own code, privately.\nThey open https://seekrett.github.io/#/play/gift-draw, pick their name and enter it.\n\n${codeLines.join('\n')}\n`,
)

console.log(`✦ Draw created for ${names.length} people.`)
console.log('  draw.json  → commit and push this (it only holds locked results)')
console.log('  codes.txt  → send each person their own code; this file is never committed')

function fail(msg) {
  console.error(`✗ ${msg}`)
  process.exit(1)
}
