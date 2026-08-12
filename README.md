# Kapture Finance Collections Voicebot — "Maya"

## What this is
A voice AI collections agent built with Vapi that calls a customer (Rahul Sharma) about an overdue personal loan (₹8,499, 12 days overdue). The bot verifies identity first, only then discloses the debt, negotiates a promise to pay, and logs the call outcome.

Full design (architecture, state machine, intents, guardrails, edge cases): see `Kapture_Finance_Collections_Voicebot_Design.pdf`.

## Architecture
- **Voice AI**: Vapi (STT: Soniox, LLM: GPT-4.1 Mini, TTS: Vapi Elliot)
- **Backend**: Express.js (TypeScript) on Vercel, one webhook route (`/api/vapi-webhook`) handling all tool calls

## Tools (mocked — no real database/payment gateway)
1. `verify_customer` — confirms identity before anything else is shared
2. `get_account_details` — returns balance and overdue days
3. `log_promise_to_pay` — records agreed amount/date
4. `send_payment_link` — simulates a payment link send
5. `mark_disposition` — logs final call outcome
6. `end_call` — built-in Vapi tool

## Compliance
Debt details are never disclosed until identity is verified — tested directly (see demo videos).

## Demo
- **Path 1**: Identity verified → debt disclosed → customer agrees to pay ₹2,000 partially → PTP confirmed
- **Path 2**: Wrong number → call ends immediately, zero debt disclosure

Video links: [add your Drive links here]

## What I'd improve with more time
- Real database and payment gateway instead of mocks
- Hindi language switching
- Human-agent escalation for hostile/dispute cases
- Observability dashboard (containment rate, PTP rate, AHT)

## AI usage
I used Claude to help design the conversation flow, write the backend webhook code, and debug the Vapi–Vercel integration. The system prompt, tool logic, and overall approach were reviewed and adjusted by me throughout.
