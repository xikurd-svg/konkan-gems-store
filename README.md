# KonKan Gems Store

## Before running
1. Open `app/page.js`
2. Replace:
   `PASTE_YOUR_DISCORD_WEBHOOK_HERE`
   with your real Discord webhook URL
3. Replace FIB and FastPay numbers

## Run locally
```bash
npm install
npm run dev
```

## Deploy
Upload this project to Vercel or Netlify (Vercel recommended for Next.js).

## Important
This version sends orders directly from the frontend to your Discord webhook.
For a safer public production setup, move the webhook call to a backend/API route later.
