# Product Requirements Document
## "BECHO" — Swipeable Multilingual News Feed (Demo / MVP)

**Version:** 1.0
**Status:** Draft — ready for build
**Owner:** [Your name]
**Audience:** AI coding agents (Antigravity, Cursor) and human engineers picking this up

---

## 1. One-line pitch

A daily-newspaper website where an admin publishes short news posts, and readers consume them one at a time in a **full-screen, swipeable/scrollable feed** (like a news "reel") — available in **English, Hindi, and Telugu** — built as a polished, animated, professional-looking React frontend.

This is a **frontend-only demo/MVP** — no backend, no database, no server. All data (news posts) is **dummy/mock data**, seeded locally and manipulated entirely in the browser (React state, optionally persisted to `localStorage` so it survives a refresh). Optimize for a working, good-looking, convincing prototype over completeness.

---

## 2. Goals

- Prove the core interaction: **one news story per screen, snap-scroll/swipe to the next**, with a distinctive, premium animated transition.
- Prove **multilingual support**: a user can switch between English / Hindi / Telugu and the entire UI + content updates.
- Prove an **admin can publish a post** and it shows up in the reader feed.
- Look and feel like a **professional, editorial product** (think: a mix of a quality newspaper and a modern content app) — **not** a cyberpunk/dark/hacker-styled UI.
- Be visually impressive: smooth, purposeful animation on scroll, on load, and on language switch.

### Non-goals (explicitly out of scope for this MVP)

- User accounts, login, comments, likes, sharing, notifications, search.
- Any real backend, database, server, or API — this build is **frontend-only**, using mock/dummy data.
- Real CMS, media pipeline, image uploads/CDN, SEO, analytics.
- Real authentication/authorization hardening for the admin panel (basic gate is enough — see §8).
- Native mobile apps (this is a responsive **website**, used in mobile browsers too).
- Payments, subscriptions, paywalls.
- Automated translation — translated content is entered manually per post (see §7).
- Backend scalability, caching, SSR/SEO optimization.

---

## 3. Target users

| Persona | Description | Core need |
|---|---|---|
| **Reader** | Casual visitor on desktop or phone | Quickly consume today's news, in their preferred language, with minimal friction |
| **Admin/Editor** | The one person (you) publishing news for the demo | A simple form to add a news post in 3 languages and have it appear instantly in the feed |

---

## 4. Core user flows

### 4.1 Reader flow
1. User lands on the site → sees the latest news post full-screen, with a short intro animation.
2. User selects a language (EN / HI / TE) from a persistent language switcher → feed content and UI chrome re-render in that language, with a transition animation.
3. User scrolls (desktop: mouse wheel/trackpad, or a "next" arrow) or swipes (mobile: touch drag) → the current post animates out and the next post animates in, snapped to full screen.
4. User can go back to the previous post the same way (scroll up / swipe down).
5. A subtle position indicator shows where they are in the feed (e.g., "3 / 12" or progress dots/bar).
6. Tapping/clicking a post can optionally expand it to a full-detail reading view (see §7.3) — nice-to-have, not blocking.

### 4.2 Admin flow
1. Admin goes to `/admin` (or `/admin/login`) → simple passcode/login gate.
2. Admin sees a form: title, short body/summary, category, cover image (URL is fine — no upload pipeline needed), and **three language tabs** (English / Hindi / Telugu) to fill in the same fields per language.
3. Admin clicks "Publish" → post is saved and immediately appears at the top of the reader feed.
4. Admin sees a simple list of already-published posts, with the ability to delete/unpublish (edit is nice-to-have).

---

## 5. Information architecture / pages

| Route | Purpose |
|---|---|
| `/` | Main swipeable news feed (default language: English, or browser-detected) |
| `/admin` | Passcode-gated admin panel: create post + list/delete posts |
| `/post/:id` (optional/nice-to-have) | Expanded single-post reading view, linkable/shareable |

Language is a **global state**, not a separate route (avoid `/en`, `/hi`, `/te` route duplication for MVP simplicity) — persist the choice in `localStorage`.

---

## 6. Functional requirements

### 6.1 News feed (reader-facing) — **the centerpiece**
- Renders posts as **full-viewport "cards"**, one visible at a time.
- Vertical snap-scrolling on desktop (mouse wheel and keyboard arrows should both work) and vertical swipe on mobile/touch.
- Each card shows: cover image/visual, category tag, headline, short summary/excerpt, published date/time (localized), and a subtle "read more" affordance.
- Newest post first.
- Feed must handle an empty state (no posts yet) and a loading state gracefully.
- Position indicator (progress dots or a thin progress bar) showing current post index out of total.

### 6.2 Multilingual support
- Language switcher always visible (e.g., top-right pill/segmented control: **EN / हिं / తె**).
- Switching language:
  - Updates all UI chrome (nav, buttons, labels, dates, "min read", etc.) via an i18n framework.
  - Updates the **content of every post** to that language's stored copy.
  - Animates the transition (not an abrupt content flash — see §9).
- If a post is missing a translation for the selected language, fall back to English and show a small "translated by admin not yet available" tag (don't crash or show blank).
- Persist selected language across reloads (`localStorage`).

### 6.3 Admin publishing
- Simple gated route (§8).
- Form fields per language (EN/HI/TE), each with: `title`, `summary` (short, ~280 chars), `body` (optional, for expanded view), `category`.
- Shared fields (not per-language): `coverImageUrl`, `publishedAt` (auto-set on publish), `id` (auto-generated).
- On submit: validate required fields (at least English must be filled; Hindi/Telugu optional but encouraged with a warning if empty).
- New post appears instantly in the reader feed without a manual refresh.
- Basic list view of posts with delete action.

### 6.4 Data persistence (frontend-only, no backend)

- No server, no database, no API calls. All posts live in the browser.
- App loads a set of **seeded mock/dummy posts** (hardcoded JSON/TS, see §7.1) into state on startup.
- Posts are held in **React state** (e.g., a Zustand store), so admin "publish"/"delete" actions update the feed instantly in the same session.
- Persist that state to **`localStorage`** on every change, and hydrate from it on load (falling back to the seed data if empty). This gives the demo a "real" feel — a refresh doesn't wipe out a newly published post — with zero backend.
- Isolate this behind a small `data/postsService.ts` module (e.g., `getPosts()`, `addPost()`, `deletePost()`) that internally reads/writes `localStorage` + seed data. This keeps components decoupled from storage details and makes it trivial to swap in a real backend later if the project grows past demo stage — but for this build, **no backend work is in scope**.

---

## 7. Data model

```ts
type LocalizedFields = {
  title: string;
  summary: string;   // short excerpt shown on the feed card
  body?: string;      // optional longer text for expanded view
};

type NewsPost = {
  id: string;
  category: string;              // e.g. "Politics", "Sports", "Tech" — shown as a tag
  coverImageUrl: string;
  publishedAt: string;           // ISO timestamp
  translations: {
    en: LocalizedFields;         // required
    hi?: LocalizedFields;        // optional, falls back to en if missing
    te?: LocalizedFields;        // optional, falls back to en if missing
  };
};
```

### 7.1 Seed data
Ship the app with **8–12 seed posts**, fully translated in all three languages, covering a mix of categories (e.g., National, World, Sports, Technology, Business) — this is essential so the demo looks alive immediately, without relying on the admin to populate it first.

### 7.2 Categories (suggested starter set)
National · World · Business · Technology · Sports · Entertainment

### 7.3 Expanded post view (nice-to-have, not blocking MVP)
If time allows, clicking a card opens a modal or route showing the full `body` text with a clean reading layout (headline, byline/date, larger image, formatted paragraphs) and a close/back gesture that returns to the exact scroll position in the feed.

---

## 8. Admin access (MVP-appropriate, not production security)

- A single shared passcode (hardcoded env var, e.g. `VITE_ADMIN_PASSCODE`) gating `/admin` via a simple form — store an "isAdmin" flag in `sessionStorage` once entered.
- This is explicitly **not** meant to be secure; it just prevents random visitors from stumbling into the posting form during a demo. Do not over-engineer auth here.

---

## 9. Design requirements

### 9.1 Visual tone
- **Professional, editorial, light** — think modern digital newspaper (e.g., a cleaner Times/Guardian/Ken-Burns-style photo journalism feel), **not** a tech/cyberpunk/dark-mode product.
- Light background (white / warm off-white / soft paper tones), strong editorial typography, generous whitespace, restrained accent color (e.g., a deep red, navy, or amber used sparingly for tags/CTAs — avoid neon).
- Serif or high-quality display font for headlines; clean sans-serif for body/UI text. Must support **Devanagari (Hindi)** and **Telugu script** cleanly — pick web fonts with full glyph coverage for all three languages (e.g., pairing a Latin serif for EN headlines with Noto Sans/Noto Serif Devanagari & Telugu, or a single Noto family across all three for consistency).
- Consistent spacing/grid system; every card should feel intentionally composed, not like a generic template.

### 9.2 Responsiveness
- Fully responsive: full-viewport card layout must work from small phones through large desktop monitors.
- Touch/swipe gestures on mobile; scroll/keyboard on desktop; both should feel native and smooth, not janky.
- No horizontal scrollbars, no layout shift/jank on language switch or resize.

### 9.3 Reactivity & polish
- Hover/focus states, button micro-interactions, skeleton/shimmer loading states — the site should feel alive, not static.
- Respect `prefers-reduced-motion` (fall back to simple fades/instant transitions for accessibility).

---

## 10. Animation & interaction spec (be creative — this is the centerpiece)

This is the most important experiential detail of the product. The build agent has creative latitude, but here is a concrete, buildable direction to use as the default if no better idea emerges:

### 10.1 The core scroll/swipe transition — "Editorial Reel"
- Feed is a series of full-viewport sections, scroll-snapped (CSS scroll-snap as the structural backbone; **GSAP ScrollTrigger** drives the actual animated choreography layered on top, or fully hijack scroll with GSAP + a smooth-scroll library like **Lenis** for frame-perfect control).
- On transition from post *N* to *N+1*:
  - Outgoing card: content (headline, summary, tag) exits with a staggered upward fade/slide (GSAP timeline, staggered per text element).
  - Incoming card: cover image does a subtle parallax/scale-in (Ken Burns effect — slow zoom drift on the image, continues subtly while the card is in view, not just on entry).
  - Headline text reveals with a **staggered character/word entrance** (split-text style reveal).
  - A thin **accent-colored progress bar/dot rail** on the side animates to reflect the new position.
- On mobile: use **use-gesture + react-spring** (or GSAP Draggable) to give the swipe real physical feel — rubber-band resistance at the ends of the feed, velocity-based snap to next/prev card, cancel-and-return if the swipe doesn't cross a threshold.

### 10.2 3D / ambient layer (this is where Three.js comes in)
Use **React Three Fiber** for a **subtle, tasteful, non-distracting** background/ambient layer — this should read as premium production value, not a gimmick:
- Suggested: a soft, slowly drifting abstract background (e.g., gently morphing gradient mesh, floating soft-focus particles resembling paper texture/light dust, or a very subtle 3D "stacked pages" motif behind the card stack) that reacts subtly to scroll position (e.g., depth/parallax shift) and to language switch (a soft ripple/morph moment).
- Keep it performant and non-intrusive: low particle counts, no visual noise competing with the text, must not hurt reading legibility, must degrade gracefully or disable on low-power/mobile devices if needed.
- This layer should reinforce the "premium newspaper" tone (paper/light/depth), not look like a tech demo.

### 10.3 Language switch transition
- Switching language should not be a jarring content swap. Animate: current text content fades/blurs out → UI relabels → new-language content fades/staggers in. Keep it under ~400–600ms so it feels responsive, not sluggish.

### 10.4 Micro-interactions
- Animated language switcher (sliding pill/underline indicating active language).
- Buttons/tags with subtle hover scale/color transitions (Framer Motion `whileHover`/`whileTap`).
- Page load: a brief, tasteful masthead/logo intro animation (e.g., headline mark animates in, then reveals the first post) — should feel like an opening title, not a long splash screen (keep under ~1.5s, skippable on scroll/tap).

---

## 11. Recommended tech stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | **React** (Vite) | Fast dev/build, no need for Next.js SSR for a demo |
| Styling | **Tailwind CSS** | Fast, consistent, easy to keep "professional/light" design system disciplined |
| Scroll/timeline animation | **GSAP** + **ScrollTrigger** | Primary animation engine for the feed transitions |
| Smooth scroll control | **Lenis** | Pairs with GSAP for frame-accurate, buttery scroll hijacking |
| Micro-interactions/UI motion | **Framer Motion** | Great for component-level enter/exit, hover, layout animations |
| Touch/swipe gestures | **@use-gesture/react** + **react-spring** | Physics-based drag/swipe with resistance and velocity snapping |
| 3D/ambient background | **React Three Fiber** + **drei** | For the ambient ~10.2 background layer |
| Internationalization | **react-i18next** (+ `i18next-browser-languagedetector`) | UI string translation + language persistence |
| State | **Zustand** (or React Context) | Lightweight global state: current language, current post index, posts (backed by `localStorage`, see §6.4) |
| Data | Local mock/dummy data (hardcoded seed + `localStorage`) | No backend, no API calls — see §6.4 |
| Fonts | **Google Fonts / Noto family** | Full EN + Devanagari + Telugu glyph coverage |
| Hosting (for demo) | Vercel / Netlify / GitHub Pages | Any static host works — it's a pure frontend build with no server |

> The build agent may substitute equivalent libraries if there's a strong reason, but should keep GSAP + Three.js (React Three Fiber) + an i18n library + a touch-gesture library as the core toolkit, per explicit product direction. **No backend/server code should be introduced anywhere in this build.**

---

## 12. Component breakdown (suggested)

```
src/
  components/
    feed/
      FeedContainer.tsx        // scroll-snap wrapper, GSAP/Lenis wiring, index tracking
      PostCard.tsx             // single full-viewport news card
      ProgressIndicator.tsx    // dots/progress bar
      AmbientBackground.tsx    // R3F canvas, background layer
    layout/
      Header.tsx               // masthead/logo, language switcher
      LanguageSwitcher.tsx
      IntroAnimation.tsx       // brief load-in sequence
    admin/
      AdminLogin.tsx
      AdminPostForm.tsx        // language-tabbed form
      AdminPostList.tsx
    shared/
      CategoryTag.tsx
      Skeleton.tsx
  data/
    postsService.ts            // getPosts/addPost/deletePost — local state + localStorage, no backend
    seedPosts.ts                // 8–12 fully-translated dummy seed posts
  i18n/
    en.json / hi.json / te.json // UI string translations
    i18n.ts                     // react-i18next config
  store/
    useAppStore.ts              // language, active post index
  App.tsx
  main.tsx
```

---

## 13. Acceptance criteria (definition of "MVP demo done")

- [ ] Visiting `/` shows a full-screen news feed pre-populated with seed content, no login required.
- [ ] Scrolling (desktop) and swiping (mobile) moves cleanly between posts, one full post per screen/gesture, with a clearly intentional animated transition (not a plain jump-cut).
- [ ] A position indicator reflects current post / total posts.
- [ ] Language switcher toggles EN / HI / TE and both UI chrome and post content update correctly, with an animated transition, for **all** seed posts.
- [ ] `/admin` is passcode-gated; once in, admin can fill the 3-language form and publish a new post; it appears in the live feed (`/`) instantly, no page reload needed.
- [ ] A newly published post survives a browser refresh (via `localStorage`), even though there's no backend.
- [ ] Admin can see a list of posts and delete one; it disappears from the feed.
- [ ] Site is usable and visually polished on a phone-sized viewport and a desktop viewport, with no broken layout.
- [ ] Visual theme is light/professional/editorial — no dark or cyber-themed UI anywhere.
- [ ] Ambient Three.js background layer is present, subtle, and doesn't hurt text legibility or performance.
- [ ] `prefers-reduced-motion` users get a reduced-animation fallback instead of the full motion set.

---

## 14. Open questions / assumptions to confirm with product owner before/while building

1. **Admin passcode** — confirm it's fine to ship as a build-time env var (not secure, demo-only) rather than building real auth.
2. **Content ownership for seed data** — who writes/approves the 8–12 seed posts in all 3 languages (placeholder/lorem-in-language vs. real sample news copy)?
3. **Expanded single-post view (§7.3)** — confirm if it's in scope for this pass or can be deferred.
4. **Branding** — is there a name/logo ("BECHO" is the app name) or should the build agent propose one?

---

## 15. Suggested build order (for the coding agent)

1. Scaffold Vite + React + Tailwind project; set up folder structure from §12.
2. Build static seed/dummy data (§7.1) and the local `postsService` (state + `localStorage`, no backend — §6.4).
3. Build the core `FeedContainer` + `PostCard` with **basic** scroll-snap (no animation yet) — get the one-post-per-screen mechanic working first, desktop + mobile.
4. Wire up `react-i18next`, language switcher, and translated UI strings; verify content + UI both switch correctly.
5. Layer in GSAP/ScrollTrigger + Lenis for the real transition choreography (§10.1); add swipe physics via use-gesture/react-spring on touch.
6. Add the React Three Fiber ambient background layer (§10.2) — keep it optional/toggle-able while tuning performance.
7. Build the admin flow: passcode gate → form → list/delete, wired to the same local `postsService`.
8. Polish pass: micro-interactions, intro animation, loading/empty states, reduced-motion fallback, responsive QA on real devices.
9. (Optional) Deploy to Vercel/Netlify/GitHub Pages for a shareable demo link — no server config needed since it's static.

---

*End of PRD.*
