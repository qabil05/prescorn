# PRESCORN

Independent digital design and creative development studio portfolio.

## Run

Requires Node.js 22 or newer. No third-party npm dependencies.

```sh
npm install
npm run dev
npm run build
npm run preview
```

Development and preview serve `/prescorn/` on port 4173. `PORT` can override the port. `npm run preview` serves the production `dist` output.

## Architecture

- Native ES modules, semantic HTML and responsive CSS; no framework runtime.
- `src/data.js`: all eight projects, URLs, featured ordering, navigation, contact and draft pricing.
- `src/main.js`: home, work gallery, individual project presentations and accessible form.
- `src/inquiry.js`: isolated submission adapter.
- `src/style.css`: neutral editorial design system and responsive layouts.
- `scripts/build.mjs`: reproducible static production build.
- `scripts/serve.mjs`: local development / production preview server.
- `public/images`: optimized WebP assets from actual project material.

Hash routes (`#/work`, `#/project/sillage`) support direct links and refreshing on GitHub Pages without a server fallback. All assets are relative and work under `/prescorn/`.

## GitHub Pages

The included Actions workflow builds on pushes to `main` and publishes `dist` using the GitHub Pages environment.

In **Settings → Pages → Build and deployment**, select **GitHub Actions**. Private repository Pages availability depends on the account plan. Keep the repository private; upgrade/enable the required account feature if necessary. The intended address is `https://qabil05.github.io/prescorn/`.

## Connect project requests

The site intentionally does not claim delivery before an endpoint is configured.

Set `inquiryEndpoint` in `public/runtime-config.js` to an HTTPS endpoint, or pass `INQUIRY_ENDPOINT` during the build. The endpoint must accept JSON fields `name`, `email`, `company`, `service`, `budget`, `description`, and return JSON `{ "success": true }` only after successful delivery. Implement server validation, rate limiting, spam protection and appropriate CORS on the endpoint. Do not put secret API keys in the frontend. Set the studio email in `src/data.js` when confirmed.

Client validation, field errors, a submitting state, timeout handling and success/error states are implemented. No inquiry is sent during development checks.

## Project assets and status

- ORVEN, MIRBIR, SHEH and PRSMYN: captured from their actual rendered websites during this session.
- SILLAGE: original hero artwork extracted from the live project's embedded image assets.
- AUREL: original frame extracted from the user-provided AUREL project video. Its supplied live URL returned HTTP 404 during asset retrieval; verify the deployment before presenting it as live.
- VAREL: the live page opened, but its 3D render could not be captured successfully. The gallery uses a clearly typographic project cover, not a fabricated screenshot.
- RENOVOLTIS: access was denied in this session, so its live status is unverified and its cover is typographic.

No project repositories were modified. Concept projects are explicitly identified in their project pages. No launch years or client results have been invented.

Interactive iframe loading is implemented but defaults to external links because iframe compatibility was not verified. Change a project's `previewType` to `iframe` only after checking its CSP/X-Frame-Options and testing embedding. External links always remain available. No external sites are preloaded.

## Validation limits

The production build, JavaScript syntax and local asset checks are run before committing. Responsive CSS covers compact mobile, tablet and desktop layouts; live browser visual QA could not be completed because browser screenshot operations stalled. No performance score or complete browser pass is claimed.
