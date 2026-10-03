// Minimal xAI client: OpenAI-compatible Chat Completions with streaming (SSE). No dependencies.
export const XAI_BASE_URL = process.env.XAI_BASE_URL ?? 'https://api.x.ai/v1'

export async function* streamChat({ apiKey, model, messages, signal }) {
  const res = await fetch(`${XAI_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, messages, stream: true }),
    signal,
  })
  if (!res.ok) {
    const body = await res.text()
    const err = new Error(`xAI API ${res.status}: ${body.slice(0, 300)}`)
    err.status = res.status
    throw err
  }
  const decoder = new TextDecoder()
  let buf = ''
  for await (const chunk of res.body) {
    buf += decoder.decode(chunk, { stream: true })
    let i
    while ((i = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1)
      const parsed = parseSseLine(line)
      if (parsed === 'done') return
      if (parsed) yield parsed
    }
  }
}

export function parseSseLine(line) {
  if (!line.startsWith('data:')) return null
  const data = line.slice(5).trim()
  if (data === '[DONE]') return 'done'
  const j = JSON.parse(data)
  return j.choices?.[0]?.delta?.content ?? null
}
