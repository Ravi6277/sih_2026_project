# SAHAAY — Preview Run Doc

## Artifacts to Reproduce

Dependencies are installed in `node_modules/`. No `.env.local` or other files need to be copied — this is a frontend-only project with no environment secrets.

If `node_modules/` is missing, run:
```
npm install
```

## How to Run the Server

```bash
cd D:\shaay
npm run dev
```

This starts the Vite dev server on port **5173** (default).

To serve the production build instead:
```bash
npm run build
npm run preview
```

## Preview Registration

- Server: `npm run dev` (Vite dev server)
- Port: 5173
- PID: starts with the `npm run dev` process
- Log: `.freebuff/preview-*.log`
