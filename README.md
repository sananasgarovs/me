# Sanan — Şəxsi səhifə

## Quraşdırma

```bash
# Asılılıqları yüklə
npm install

# .env faylı yarat (.env.example-dan kopyala)
cp .env.example .env
# Sonra .env faylını düzəlt: VITE_SANAN_KEY, VITE_TELEGRAM_BOT_TOKEN, VITE_TELEGRAM_CHAT_ID

# Development server
npm run dev

# Production build
npm run build
```

## GitHub Pages-ə yükləmə

1. `npm run build` — `dist/` qovluğu yaranır
2. GitHub repo-nuzda Settings → Pages → Source: `Deploy from a branch`
3. Branch: `main`, folder: `/` (əgər ayrı repo-dursa) və ya `docs/`
4. Və ya `npm run deploy` istifadə edin (əvvəlcə `npm install -g gh-pages`)

**Vite config:** `vite.config.js`-də `base` dəyərini GitHub Pages path-inizə uyğun dəyişin:
- Əgər `username.github.io` reposundadırsa → `base: '/'`
- Əgər `username.github.io/sanan` path-indədirsə → `base: '/sanan/'`

## Giriş

Səhifəyə daxil olmaq üçün URL-ə `?s=XXX` əlavə edin (VITE_SANAN_KEY dəyəri).
