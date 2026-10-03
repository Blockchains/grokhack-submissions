import { streamChat } from './grok.mjs'
const apiKey = process.env.XAI_API_KEY
if (!apiKey) { console.error('Needs key: set XAI_API_KEY (console.x.ai).'); process.exit(2) }
const model = process.env.XAI_MODEL ?? 'grok-4.6'
const prompt = process.argv.slice(2).join(' ') || 'Give me one sentence of advice for a Grok hackathon team.'
for await (const t of streamChat({ apiKey, model, messages: [{ role: 'user', content: prompt }] })) process.stdout.write(t)
process.stdout.write('\n')
