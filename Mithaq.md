# Mithaq

A Quran companion app for Muslim students.

Make a covenant with yourself about your daily practice — what you'll read, what you'll listen to, what you'll memorize — and keep it.

## Five modes of practice

- **Read** — Mushaf reader, picks up where you stopped
- **Listen** — multi-reciter audio with lock-screen support
- **Reflect** — share an ayah that touched you, see what touched others
- **Understand** — tafsir and translation when you want them
- **Memorize** — track the surahs you're learning by heart

## Tech

Next.js 15 · TypeScript · Supabase · Tailwind · shadcn/ui · @base-ui/react

## Local setup

```bash
git clone https://github.com/sanwaralkmali/Mithaq.git
cd Mithaq
npm install
cp .env.local.example .env.local   # fill in your Supabase credentials
npm run db:types                   # regenerate src/types/database.ts
npm run dev
```

## Common commands

```bash
npm run dev          # start the dev server on :3000
npm run build        # production build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint

# Supabase
npm run db:types                            # regenerate types
npx supabase migration new <name>           # new migration
npx supabase db push                        # apply to remote
```

## License

MIT (or your preferred license — set in `LICENSE`)

## Contact

[salah@mithaq.app](mailto:salah@mithaq.app)
