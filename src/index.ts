import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()

// Needed so req.body works for POST requests (Vapi sends JSON)
app.use(express.json())

// Home route - HTML
app.get('/', (req, res) => {
  res.type('html').send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>Express on Vercel</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/api-data">API Data</a>
          <a href="/healthz">Health</a>
        </nav>
        <h1>Welcome to Express on Vercel 🚀</h1>
        <p>This is a minimal example without a database or forms.</p>
        <img src="/logo.png" alt="Logo" width="120" />
      </body>
    </html>
  `)
})
app.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'components', 'about.htm'))
})
// Example API endpoint - JSON
app.get('/api-data', (req, res) => {
  res.json({
    message: 'Here is some sample API data',
    items: ['apple', 'banana', 'cherry'],
  })
})
// Health check
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Vapi webhook - handles tool calls from your collections voicebot
app.post('/api/vapi-webhook', (req, res) => {
  const { message } = req.body || {}

  if (message?.type === 'tool-calls') {
    const toolCall = message.toolCalls[0]
    const { name, arguments: args } = toolCall.function

    let result
    switch (name) {
      case 'verify_customer':
        result = { verified: true, customerName: args?.customerName || 'Customer' }
        break
      case 'log_promise_to_pay':
        result = { logged: true, promiseDate: args?.date, amount: args?.amount }
        break
      case 'send_payment_link':
        result = { sent: true, link: 'https://pay.example.com/mock-link' }
        break
      default:
        result = { error: `Unknown tool: ${name}` }
    }

    return res.json({
      results: [{ toolCallId: toolCall.id, result: JSON.stringify(result) }],
    })
  }

  res.json({ received: true })
})

export default app
