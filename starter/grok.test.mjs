import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseSseLine } from './grok.mjs'

test('parses SSE delta lines from the Chat Completions stream format', () => {
  assert.equal(parseSseLine('data: {"choices":[{"delta":{"content":"Hi"}}]}'), 'Hi')
  assert.equal(parseSseLine('data: [DONE]'), 'done')
  assert.equal(parseSseLine(': keep-alive'), null)
})
