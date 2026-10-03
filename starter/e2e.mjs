// Real request to api.x.ai. With XAI_API_KEY: expects streamed text. Without: expects a 400/401/403 rejection (needs key).
import { streamChat } from './grok.mjs'
const key = process.env.XAI_API_KEY ?? ''
const model = process.env.XAI_MODEL ?? 'grok-4.6'
try {
  let text = ''
  for await (const t of streamChat({ apiKey: key || 'xai-invalid-key-for-e2e', model, messages: [{ role: 'user', content: 'Reply with exactly: pong' }] })) text += t
  if (!key) { console.error('FAIL: unauthenticated request succeeded'); process.exit(1) }
  if (!text) { console.error('FAIL: empty reply'); process.exit(1) }
  console.log(`PASS (live): ${JSON.stringify(text.slice(0, 60))}`)
} catch (e) {
  if (!key && [400, 401, 403].includes(e.status)) { console.log(`PASS (needs key): api.x.ai rejected the unauthenticated request -> ${e.message.slice(0, 120)}`); process.exit(0) }
  console.error('FAIL:', e.message); process.exit(1)
}
