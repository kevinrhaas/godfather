# 🎭 THE CORLEONE — A Pixel Saga

A single-page, pixel-art arcade that walks through the pivotal scenes of
**The Godfather (1972)**. Six original mini-games, an original chiptune
waltz, fully playable in the browser on **mobile and desktop**. Everything —
graphics, sound, save state — is generated in the browser. No images, no
audio files, no external libraries, no build step. One `index.html`.

> *An original pixel tribute. Not affiliated with Paramount Pictures.*

## 🎮 The six games

| #  | Game            | The scene it honors |
|----|-----------------|---------------------|
| I  | **The Wedding** | "Do me this favor." Catch the wedding cash in the bride's silk purse, dodge the wine. |
| II | **The Offer**   | Sneak through Jack Woltz's estate, past sweeping spotlights and guards, to leave Khartoum's head in his bed. *"An offer he can't refuse."* |
| III| **The Restaurant** | Retrieve the planted gun behind the toilet, then take the shot on Sollozzo & McCluskey while the elevated train roars. |
| IV | **The Oranges** | The attempt on Don Vito at the fruit stand. Dodge the gunmen's bullets; catch oranges for luck. |
| V  | **The Causeway**| Sonny at the toll booth. A bullet-hell of tommy-gun fire — survive as long as Santino can. |
| VI | **The Baptism** | "Settle all family business." Strike each of the Five Families on the beat as Michael recites the vows at the font. |

Finish all six to unlock the ending — the door closing on Kay.

## ▶️ Play locally

Just open `index.html` in any modern browser. Or serve it:

```bash
npm start            # serves on http://localhost:8080
# or:  npx serve .   /   python3 -m http.server 8080
```

Tap **anywhere** once to enable sound (browser autoplay policy).

### Controls
- **Mobile:** tap and drag on the canvas.
- **Desktop:** mouse, plus arrow keys and space.

## ✅ Tests

A headless-Chromium battery drives every game across desktop and two mobile
viewports, asserting no JS errors and that each scene renders and animates.

```bash
npm test             # node test/smoke.mjs
npm run shots        # writes screenshots to test/shots/
```

## 🚀 Deploy to GitHub Pages

A workflow at `.github/workflows/deploy-pages.yml` publishes the site
automatically. To enable it once:

1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. The next push to `main` (or this feature branch) deploys it. The live
   URL appears in the workflow run and under Settings → Pages, typically:
   `https://<user>.github.io/<repo>/`

No build is required — the workflow simply uploads the static files.

## 🛠️ How it's built
- **Rendering:** one `<canvas>` at a fixed `270×480` pixel buffer, scaled up
  with `image-rendering: pixelated` for crisp retro pixels. Custom 3×5 bitmap
  font, procedural sprites, blood/particle system, vignette + scanlines.
- **Audio:** Web Audio API. An original minor-key waltz (evoking the era,
  not the film's score) plus synthesized SFX — gunshots, screams, coins.
- **State:** a tiny scene machine (intro → hub → story → game → result),
  progress saved to `localStorage`.

## License
MIT — see [LICENSE](LICENSE). The Godfather and all related characters are
trademarks of their respective owners; this is an unaffiliated fan tribute.
