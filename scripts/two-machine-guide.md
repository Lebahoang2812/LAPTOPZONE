# Two-machine LAN checklist

1. PC A: find IPv4 with `ipconfig`, e.g. 192.168.1.10.
2. PC A: run API on port 5000.
3. PC B: customer/.env => VITE_API_URL=http://192.168.1.10:5000/api
4. PC B: npm run dev -- --host 0.0.0.0 --port 5173
5. PC B: open http://192.168.1.10:5173
6. Login, add a laptop, checkout.
7. PC A: open Admin -> Orders and update status.
8. PC B: open Customer -> Orders and verify status.
