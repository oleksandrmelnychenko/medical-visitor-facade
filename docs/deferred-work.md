# Свідомо відкладено (окрім ESLint 10)

## Відкладено

- На цей момент окремих відкладених пунктів із цього списку не залишилось.

## Закрито в цій сесії

- CLS fix для Hero `<video>`. У `src/features/home/sections/hero/Hero.tsx` додані intrinsic `width`/`height` на основі реальних розмірів hero video (`1280x720`), щоб браузер мав стабільнішу геометрію елемента без зміни поточного full-bleed layout.
- `ScrollRail` labels винесені в `messages`, а `aria-label` локалізований. Це прибрало hardcoded `SHORT_LABELS` із клієнтського компонента й закрило дрібне дублювання перекладів.
- Джерельний `Onest` переведений з TTF на WOFF2. Новий файл важить близько `55 KB` замість `121 KB`, тож відданий шрифт став помітно легшим ще до переходу на `next/font/local`.
- API rate limiting доданий для `contact`/`apply` submit routes через `@upstash/ratelimit` + `@upstash/redis`. Ліміт активується автоматично, якщо в середовищі є `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` або legacy `KV_REST_API_URL` / `KV_REST_API_TOKEN`; без них маршрути безпечно працюють у fail-open режимі.
- `Header` переведений із монолітного client-компонента на server shell + client islands. Сервер тепер збирає copy і структуру меню, а клієнтський шар залишив лише route-aware логіку, locale switcher, sticky-scroll, mobile menu state та click-outside/resize поведінку.
- CSP для `script-src` переведений з `'unsafe-inline'` на per-request nonce через `proxy.ts`. JSON-LD скрипти теж отримують той самий nonce; `style-src` свідомо лишається з `'unsafe-inline'`, бо в застосунку є inline style attributes і motion styles.
- У `HomePage.tsx` додані локальні `Suspense` boundaries навколо async-секцій (`Approach`, `Journey`, `Locations`, `ScrollReveal`, `Faq`). Це не змінює UX верхнього fold, але дає коректні streaming-границі на рівні секцій.
- `Onest` переведений на `next/font/local` із CSS variable `--font-sans` та `adjustFontFallback: "Arial"`. Це прибрало ручний `@font-face`, підготувало шрифтовий шар до подальших CLS-optimize змін і дозволило прибрати зайві Google font domains із CSP.
- Contact-форма переписана на `useActionState` + server action без зміни візуального UX. Валідація та forwarding тепер сидять у спільному серверному helper, який використовують і `/api/contact/submit`, і server action, тож submit flow не дублює бізнес-логіку.
