## 2026-09-07 — Kitchen rules become a fanned deck; note on a force-push

`FromTheKitchen` was a 220vh sticky, scroll-driven 3D playing-card flip. Replaced
with the client's reference: four overlapping tilted cards, one brand colour each,
that straighten and pop forward on hover. 474 lines of scroll machinery down to
plain markup plus one CSS rule, and the section is a normal block again.

`kitchenRules.ts` gains three fields: `points` (each `desc` set out as bullets,
same wording — not rewritten), `tone` and `sticker`. The orange card takes **ink**
text, not cream: cream on brand orange measures about 2.4:1, ink on it 6.5:1.

Implementation notes worth keeping:

- Tilt, drop and stacking order arrive as custom properties (`--fan-tilt`,
  `--fan-drop`, `--fan-z`), not inline styles. An inline `rotate` or `z-index`
  beats any class, so `:hover` could never override it.
- Stickers sit on each card's **left**. Each card overlaps the one to its left, so
  a sticker on the right disappears under the next card.
- Below 640px the fan unstacks into a plain column — four overlapping tilted cards
  are unreadable at phone width. Under `prefers-reduced-motion` only the stacking
  order changes; the geometry holds.
- Lightning CSS minifies `rotate: 0deg` to `rotate: none`. Same thing, but worth
  knowing when reading the compiled sheet.

**A force-push on main dropped two of my commits.** `28cb2ec` was rewritten as
`eae4282`, and the golden-ratio pair (`63cee93`, `b95978c`) that sat on top of it
went with it — the phi tokens were gone from `origin/main`'s `globals.css`. They
were still local, so a rebase onto the new tip restored them cleanly (their old
commit was skipped as already applied). Everything from both sides is now in:
their latest ChefDeck auto-slide fix is untouched, and my only edit to that file
is the one line of phi section padding.

Verified: 4 cards at -4.5/3/-2/4.5deg, hover straightens and lifts them to the
front (checked with a real pointer hover — the card visibly comes over its
neighbour), stickers break each card's top edge on all four at both widths,
mobile stacks with no overflow, build and tsc clean.

## 2026-09-07 — Golden ratio put through the content layer

One ratio now drives the type ramp, the vertical rhythm, the reading measures and
the content column splits. Tokens live in `globals.css` and are mirrored into
`@theme inline`, so they exist as ordinary utilities (`text-phi-*`, `p-phi-*`,
`max-w-measure`).

**Type** steps by phi with a sqrt(phi) = 1.272 half-step between, because a straight
phi ramp from 16px goes 16 -> 26 -> 42 and leaves nothing usable in between:

| Step | px | Used for |
| --- | --- | --- |
| `text-phi-0` | 10 | micro caps, labels |
| `text-phi-1` | 13 | card copy, small print |
| `text-phi-2` | 16 | body |
| `text-phi-3` | 20 | lead paragraph |
| `text-phi-4` | 26 | h3 |
| `text-phi-5` | 33 | h2, small |
| `text-phi-6` | 42 | h2 |
| `text-phi-7` | 53 | h1 |
| `text-phi-8` | 68 | display |

**Spacing and measures** use the Fibonacci integers, which converge on phi and land
on whole pixels: 8, 13, 21, 34, 55, 89, 144. Every section's vertical padding was
mapped to its nearest step, so the page rhythm now reads 34 / 55 / 89 / 144
throughout instead of the previous ad-hoc 48 / 56 / 64 / 96 / 112. Reading widths
are 34rem (`max-w-measure`), 55rem and 89rem.

**Column splits** that are genuinely content go to `1.618fr 1fr` — the blog's lead
story against its Most Popular rail (measured 800:495 = 1.618) and the footer's
first column against the three link columns.

**Deliberately not changed**, and worth stating because a later "why did this
move?" is otherwise likely:

- The `.poster` display sizes. Those were art-directed line by line — the 68px CTA,
  the equal-size fix, the `--po-gap` work — and a blanket re-typeset would undo it.
- `PageHero`'s `1.02fr` split and What's Cooking Tomorrow's `1.05fr` split. Both
  came from explicit feedback; the second exists so the two panels are the same
  height and fit one screen, which phi would break. Verified still equal (501/501).
- The 11px CTA labels. The ramp has no 11px step and 13px is too heavy for them.

Verified: hero still exactly one screen on three pages (900/900), no horizontal
overflow on any page at 1440 or 390, 20 day cards and 10 rail cards intact, blog
rail still sticky, build and tsc clean. `scratchpad/apply_phi.py` holds the
mapping that was run.

## 2026-09-07 — The red line above the Plans wave

Two things were drawing a red hairline near that boundary, and both are gone:

1. **`.graph-paper`'s own grid.** Its lines are `rgba(175, 20, 17, 0.07)` — red — and
   the first horizontal one lands on row 0 of whatever element carries the class.
   On the divider that put a red rule right along the band's top edge. Already
   removed by `textured={false}` in the previous commit; this is what "red line"
   was.
2. **The terms band's border.** `border-brand-red/12` on a 1329x103 box sitting
   80px above the wave. Cropped tight it reads as a full-width red rule rather
   than a card edge, so the border is dropped — the cream tint alone separates it.

Audited every element wider than 300px on the page for a top or bottom border:
what's left is the header bar, the plan cards, the hero's dashed route rule and
the footer's top rule. Nothing full-width near the wave.

Also closed the divider's clip shape at `y=-0.2` instead of `0`, as a precaution
so no clip edge sits on row 0 where partial coverage could bleed the colour
underneath. Not a diagnosed bug — a guard, and free.

Worth noting for future debugging: a faint 1px seam does show at that boundary in
the Browser pane's captures even with the section background forced to lime and
`.grain` stripped, so it comes from the screenshot pipeline rather than the page.

## 2026-09-07 — Grid removed from the Plans page wave

`WaveDivider` hard-coded `.graph-paper`, which is right on the two pages where the
section above the band is printed too. On `/plans` the section above is plain
`bg-paper`, so the grid started abruptly inside the band and its first horizontal
line landed on the band's top edge — reading as a rule across the page.

Added a `textured` prop (default `true`, so the other two are untouched) and set
`textured={false}` on `/plans`. Verified the plans divider is now
`background-image: none` on paper with no border anywhere, and that the regional
and tomorrow dividers still carry the print.

## 2026-09-07 — Plans page built

Section 3 of the content doc, "PLANS — A DABBA FOR EVERY ROUTINE", built out below
the existing hero. `src/data/plans.ts` carries the four plans verbatim: Trial
(3-Day Taster), Weekly (5-Day Work Week), Monthly (marked "Most Popular" in the
doc, so it inverts into brand red like the featured day card) and Corporate (Bulk
Workplace Delivery). Then the doc's closing terms line with its
"Check My Delivery Zone" CTA, and a closing red band pushing the 3-day taster.

**Prices are not filled in.** The doc still has `$XX.XX`, `$XX.XX` and `$XXX.XX`.
They render exactly as written, with "Price to be confirmed · GST inclusive"
underneath, and `priceIsPlaceholder` on the data marks each one. Inventing a
number for a food subscription is the one thing on this page that would actually
mislead a customer, so it stays visibly blank until the client supplies figures.
Corporate is genuinely "Custom pricing — request a quote", so that one is real.

**Two other gaps, both the client's to fill:**

- The terms line says "as previously specified", referring to terms held outside
  the content doc. The actual delivery zones and cut-off times are not in anything
  supplied, so the line is reproduced as-is rather than paraphrased into specifics.
- Every CTA points at `/contact`. There is no checkout, plan selection or quote
  form yet — "Start Trial" and "Choose Monthly" can't do what they say until one
  exists.

Card detail: the CTA sits in an `mt-auto` wrapper so all four line up however long
the feature lists run (measured: 4 cards, 1 distinct height, CTAs on one row).

Verified at 1440 (4 columns) and 390 (1 column, no overflow); build clean.

## 2026-09-07 — Dropped the duplicate Follow block from the post rail

Client: "ye 2 baar kyu hai?" — fair. Share and Follow do different jobs (send this
article to the reader's own network vs. link the brand's profiles) but they reuse
the same glyphs, so Facebook and LinkedIn appeared twice in one 220px column and
it read as a duplicate.

Removed the Follow block, its email and its phone from `PostSidebar`, leaving
Share + Subscribe — which is what the Litmus rail actually carries. The profiles,
email and phone are still in the footer on every page, so nothing was lost;
`src/data/contact.ts` now has one consumer instead of two, which is still worth
keeping as the single source.

Rail is now: 4 share links + the subscribe button, still sticky.

## 2026-09-07 — Sticky share/subscribe rail on post pages

Client asked for the Litmus post-page rail, and supplied the brand's email, phone
and five profile URLs.

`src/data/contact.ts` is now the single source for those — the footer had them
hard-coded and would have drifted from the new rail. The TikTok URL as supplied
carried `?_r=1&_t=…`, a share-session tracking pair rather than part of the
profile address, so it is stored clean.

`src/components/BrandIcon.tsx` draws the platform glyphs once (Instagram,
Facebook, YouTube, LinkedIn, TikTok, X, mail) for both the rail and the footer,
whose social row is now icons rather than text labels.

`src/components/blog/PostSidebar.tsx` is the rail: **Share** (Facebook sharer, X
intent, LinkedIn share-offsite, `mailto:`), the **Subscribe to our newsletter**
button, then **Follow** with the five profiles and the email and phone.

Two things worth recording:

- The share targets need an absolute URL, and no production domain is configured.
  Rather than guess one, the origin comes from `useSyncExternalStore` — server
  snapshot `""`, client snapshot `window.location.origin` — combined with
  `usePathname()`. That keeps SSR and the first client render identical, so there
  is no hydration mismatch, and the links are correct on whatever domain it ends
  up on.
- The page wrapper's `overflow-x-hidden` had to go. It makes that div the nearest
  scrollport, which silently kills `position: sticky` on the rail. Nothing on a
  post page overflows sideways, so it was only there by copy-paste.

Layout: `lg:grid-cols-[220px_1fr]`, rail `lg:sticky lg:top-28`. 220px because five
40px follow icons wrapped 4 + 1 in the first 196px attempt; they are 36px now and
sit on one line. On mobile the rail is static and ordered after the article, so the
read comes first.

The subscribe button links to `/contact` — same caveat as the index band, it needs
a real list provider before it can collect addresses.

Verified: rail sticks at 112px after scrolling (176 -> 112), all four share hrefs
build from the live URL, five profiles on one row, mobile has the rail below the
article with no overflow, build prerenders all ten posts.

## 2026-09-07 — Blog: smaller lead photo, images on the cards, one article seeded

Four changes from client feedback on `/blog`:

**Lead photo smaller.** `aspect-[16/10]` -> `aspect-[2/1]` and the column split
`1.55fr` -> `1.3fr`. Measured 830x519 before, 729x364 after.

**Most Popular sizes to its content.** It carried `h-full`, so the grid stretched
it to the lead story's height and left dead space under the third card. Dropped
`h-full` and put `self-start` on its grid item.

**Images on the archive cards.** Generated seven editorial still lifes with fal.ai
`flux/dev`, one per category, saved to `public/images/blog/` and mapped in
`CATEGORY_IMAGE`. One shared recipe — "editorial still life, no people, warm
natural side light from a window, shallow depth of field, muted warm palette, worn
wooden surface" — so the set reads as a single commission. Recompressed with
Pillow at 1440px/q78: 2.9MB -> 0.4MB.

Objects, deliberately not people: these sit on a real organisation's site as
editorial imagery, and fabricated documentary photographs of its staff would
misrepresent it. The lead story and the post pages now use the same map, so
`thali-tomorrow.jpg` is no longer borrowed for the blog.

**One article seeded** so the reading layout can be reviewed —
"The code on every lid, decoded" now has a `body` of typed blocks (`p`, `h2`,
`quote`, `list`), rendered on `/blog/[slug]`: 3 subheads, 9 paragraphs, a
pull-quote in the script face, a four-item list. The other nine still show the
"full article coming soon" note.

**This copy needs sign-off before launch.** It is marked `SEEDED SAMPLE COPY` in
`src/data/blog.ts`. It stays at the level of what is publicly documented about the
coding system — collection point, destination station, building, floor and carrier
group — and avoids specifics that vary between groups, but nobody at the client
has checked it.

Verified: 6 cards in 3 columns at 430x467, all with images, 0 broken; lead photo
and Most Popular measured as above; article renders all four block kinds; build
prerenders `/blog` and all ten posts.

## 2026-09-07 — Blog page, on the Litmus layout

Client asked for `/blog` to follow https://www.litmus.com/blog, with the posts
taken from the earlier UI at https://mumbai-dabbawala-ui.vercel.app/blog.

**Litmus's structure, as measured on the live page** (its grid columns sit at
x=118/430/742, so a three-up):

1. Lead story in a wide left column beside a "Most Popular" rail of three
   compact cards.
2. A "filter, sort and search posts" bar — search input, category select, sort
   select (newest/oldest).
3. Three-column card grid; its cards carry date, title and `CATEGORY · READ TIME`,
   with no image (only the lead story has one).
4. Numbered pagination, then a subscribe band.

Rebuilt in our own palette and poster type rather than copied: `/blog` is a
compact header + lead story + Most Popular, then `BlogIndex` (client) with the
filter bar, a three-up grid and pagination at 6 per page, then the subscribe band.
No 100svh `PageHero` here — Litmus leads with content, and a full-screen hero
would contradict the brief.

**On the extracted content — two things the client should know:**

- The source page's own intro says "Dummy posts written for this demo, not a live
  editorial feed". All ten are placeholder copy awaiting real editorial.
- Its post URLs 404, so there are no article bodies to extract. `src/data/blog.ts`
  carries category, month, headline and standfirst — the whole of what exists.
  Nothing was invented to fill the gaps, and where Litmus prints `READ TIME` ours
  prints the month, because a read time for a post with no body would be a made-up
  number.

`/blog/[slug]` was added so the cards don't link into a 404: it renders the
headline, standfirst and meta that do exist plus an explicit "Full article coming
soon" note, and prerenders all ten via `generateStaticParams` (`params` is a
Promise in this version — checked `node_modules/next/dist/docs`).

The lead story reuses `public/images/thali-tomorrow.jpg`; there is no editorial
photography in the project yet, only cut-out food stickers.

The subscribe button links to `/contact` rather than posting an email field
nowhere — it needs a real list provider before it can collect addresses.

Verified: filters, sort, search, the empty state and pagination all exercised in
the browser; 3 columns at 1440, single column at 390 with no overflow; build
prerenders `/blog` plus all ten post routes.

## 2026-09-07 — Space between the stacked poster lines

Matching the two lines' sizes stopped them colliding, but the upper line's shadow
still sat right against the lower line's caps. Added a `--po-gap` knob to
`.poster-stack`:

```css
.poster-stack > * + * { margin-top: var(--po-gap, 0px); }
```

It defaults to 0, so the large poster headings keep the reference's deliberate
overlap — the client asked for that effect explicitly earlier. The two smaller
`/menu` headings set `12px` / `18px` at `sm`, which clears the upper line's ink
overflow (`line-height: 0.96`) plus the 5px `--po` shadow.

Verified at 800px and 390px: each line's shadow now reads under its own line, no
overflow. Every other `.poster-stack` on the site is untouched.

## 2026-09-07 (end of day) — Poster lines were colliding; standalone HTML dropped

**Overlapping heading lines.** The two lines of the new sections' poster headings
ran into each other. The line boxes were not overlapping (measured: 4695-4741 and
4741-4778) — Anton's ink overflows a `line-height: 0.96` box by ~4px top and
bottom, and the `--po: 5px` shadow adds another 5px below, so the upper line's
shadow reaches ~9px past its own box. That is by design: `.poster-stack` exists so
a line's shadow slides *behind* the next line's letters.

What broke it was the second line being smaller than the first (50/40 and 48/38).
The upper line's shadow drops the same distance regardless, so against shorter
caps it landed mid-letter instead of behind their tops. Set both lines to one size
per heading — `46px` for "Food First. / Everything Else Follows." and `42px` for
"However You Eat, / We've Got a Dabba for It." Audited every `.poster` pair in the
codebase; these two were the only mismatched ones, every other stack already used
matching sizes.

Verified at 800px and 390px: no wrap, no overflow, shadow tucking behind as on the
other headings.

**`chefs-corner.html` and `page-shell.html` deleted** at the client's request — no
longer needed. They were regenerated artefacts (embedded WebP data URIs), not a
source of truth; the live pages are `/chefs-corner` and the shared `PageHero`.
Rebuilding one means re-running the embed + template scripts against the current
components.

## 2026-09-07 (later still) — Grid made continuous; paired veg marks removed

**Double line at every section seam.** Each `.graph-paper` element tiled from its
own top edge, so where two of them met the upper section's last horizontal line
and the lower one's first line landed a few pixels apart. Measured on
`/whats-cooking-tomorrow`: the cream section is 843px tall, 843 mod 28 = 3, so the
two lines sat **3px** apart — read as one doubled line. The red section
(467px, 467 mod 28 = 19) had the same fault against the footer.

Fixed with `background-attachment: fixed` on `.graph-paper` and
`.graph-paper-light`: the tiling is anchored to the viewport rather than to each
element, so every section shares one lattice and all seams are continuous — both
tones, every page, one line of CSS and no structural change. Checked that no
graph-papered element has a transformed or filtered ancestor, which would
re-anchor a fixed background to that ancestor's box instead of the viewport.

Trade-off accepted: the grid no longer scrolls with the content. At 0.07 alpha on
a uniform 28px lattice there is nothing to track it against, and where the
property is unsupported it falls back to today's behaviour rather than breaking.

Also applied to both standalone HTML files, which carry their own copy of the CSS.

**Paired veg marks removed.** Client: "all ke udar kuch icon mat rakh". The mark
is a claim about one dish, so showing green and red together says nothing — the
`All` filter chip and Tomorrow's "Veg or non-veg" badge are now text only. Single
marks stay where they mean something: the Veg and Non-Veg chips, the day-card
dish name, and the two diet rows of the thali breakdown.

Verified the cream seam and the red seam at 1:1 (780px viewport) — single
continuous grid at both. Full eslint and tsc clean.

## 2026-09-07 (later) — Hero wave had the same double-hump defect

Client: "aise double double acha nai lag raha". The CTA divider was fixed earlier,
but `PageHero`'s bottom wave had the identical fault: its control points hit y=150
and y=148 inside a 0-150 box, flattening against the bottom edge twice and giving
two crests. Reshaped to one crest and one trough with everything between y=44 and
y=118, control points mirrored at the join —
`M0,104 C300,52 620,44 900,80 C1180,116 1330,118 1440,106`.

Both waves now read as one shape. They run in opposite phase (hero crests
left-of-centre, the divider troughs there), which keeps a page carrying both from
looking like a repeat.

Patched in all four copies of the path: `PageHero.tsx`, `src/app/page.tsx` (the
home hero has its own), `chefs-corner.html` and `page-shell.html`.

Verified on `/`, `/menu` and the standalone file: single sweep, hero still exactly
one screen (900/900), 12 images 0 broken.

## 2026-09-07 — Two content sections on /menu; wave reshaped

**Wave was overshooting its own band** (client: "aise kyu hai?"). The path swung
to y=-10 and y=0 inside a 0-150 box, so the crest sat above the band's top edge:
the curve flattened against it and what was left read as two disconnected red
humps rather than one wave. Reshaped to a single trough and crest with every
control point between y=30 and y=104 —
`M0,44 C300,96 620,104 900,68 C1180,32 1330,30 1440,40` (normalised in
`WaveDivider.tsx`), with mirrored control points at the join so the two cubics
stay smooth.

**Two sections from the content doc added to `/menu`**, copy verbatim:

- `src/components/menu/FoodFirst.tsx` — "Food First. Everything Else Follows." and
  the five promises (Fresh, Authentic, Regional Variety, Home-Style, Everyday
  Affordable), closing on "Food isn't a feature of Mumbai Dabbawala. It's the
  entire reason we exist." + the "Explore Our Menu" CTA. Sits between the hero and
  the rotation grid on `bg-paper` — the tone the hero's bottom wave fills. Kept
  deliberately plain (numbered text on rules, no cards, no photography) so it
  hands the page to the card grid instead of competing with it. The CTA points at
  `#rotation`, since "our menu" is the grid right below it.
- `src/components/DabbaOfferings.tsx` — "However You Eat, We've Got a Dabba for
  It." with the five offerings (Daily Meals, Flexible Plans, Free Delivery,
  Corporate Meals, Festival Specials) as five linked cream cards. Closes the page
  above the red footer.

The source copy bullets the offerings with emoji (🍱 📅 🚚 🏢 🎉); those are
replaced with drawn inline SVG icons in the secondary palette (`brand-green-dark`,
going to `brand-yellow` on hover) — the site uses no emoji anywhere else and they
render differently per OS.

Verified at 1440x900 and 390x844: no horizontal overflow, heading holds two lines
at both widths, icons legible. tsc and eslint clean.

## 2026-09-07 — Real logo in, veg / non-veg marks in

**Logo.** Client supplied the wordmark as a JPEG on a flat `#F7F7F7` field
(`design-assets/brand/logo-dabbawala-source.jpeg`). Matted it to
`public/images/logo-dabbawala.png` (614x149, transparent) with
`scratchpad/matte_logo.py`: a straight colour key, with edge pixels given a soft
alpha and un-premultiplied against the old backdrop so the outline does not
fringe white on cream. A first pass used a border flood-fill to protect the
tiffin drawn inside the "D", but that also filled the letter counters with grey —
a plain key is correct here because every light region is either backdrop or
counter, and both should show whatever surface the mark sits on.

- Header: replaced the circular icon + "Dabbawala / SINCE 1890 · PERTH" text
  lockup with the image at `h-8 sm:h-9` (148x36 at desktop), `priority`. The mark
  already says "Since 1890", so only a small `PERTH` rule remains beside it.
- Footer: the mark is dark-on-light, so on the red it sits on a `bg-brand-cream`
  rounded chip rather than being recoloured.
- Both standalone HTML deliverables updated with the logo embedded as a 15KB WebP
  data URI (`chefs-corner.html` now 173KB, `page-shell.html` 38KB).

**Veg / non-veg marks.** The green/red dots are replaced by the Indian
packaged-food mark — a filled dot inside a rounded square — as
`src/components/VegMark.tsx`. Drawn as SVG, not shipped artwork, so it stays crisp
at 12px and takes brand green-dark / brand red instead of the stock pure hues;
`color="currentColor"` is used on the inverted red day card where both brand
colours would disappear. Placed at:

| Where | Before |
| --- | --- |
| `MenuRotation` All / Veg / Non-Veg chips | 10px square dots (All now shows both marks) |
| `MenuDayCard` dish headline | nothing |
| Tomorrow's "Veg or non-veg" photo badge | one single-colour outline dot |
| Tomorrow's thali breakdown | a red dot on every row, diet rows included |

The breakdown's other rows (bread, rice, dal, salad…) keep their plain dot — the
mark means something specific and should not become generic bullet decoration.

Verified in the browser: header and footer logos load with no fringing at 2.6x
zoom, marks land on the "Veg option" / "Non-veg option" rows only. tsc and eslint
clean.

## 2026-09-07 (later) — Graph print off the white story cards

`RegionStoryCards` carried `.graph-paper` on a white card that already sits on a
`.graph-paper` cream section, so two grids overlapped and the card's edge went
muddy against the page. Removed the class from the card rather than lowering its
opacity — a fainter grid only blurs the conflict, it does not resolve it, and the
print is a property of the paper behind the cards, not of the cards. Card shadow
also brought onto the house recipe (`0 8px 26px -20px / .28`).

Verified on `/menu#cuisines`: card `background-image: none`, section grid intact.

## 2026-09-07 — Wave divider keeps the graph print; card shadows softened

**Checkered print stopping at the curve.** The cream wave between a paper section
and the red one below was an `<svg><path fill="…">`, which paints flat colour — so
the graph-paper grid died at the section seam and the curve read as a blank band.
Replaced it with `src/components/poster/WaveDivider.tsx`: a `<div>` carrying
`.graph-paper` + a tone class, clipped by an SVG `clipPath` with
`clipPathUnits="objectBoundingBox"` (the 1440x150 path normalised to 0-1, which
stretches exactly like the old `preserveAspectRatio="none"`). The grid now runs
through the curve, and because both sections tile from x=0 the vertical lines stay
continuous across the seam. Used on `/regional-food-stories` (tone `bg-paper`) and
`/whats-cooking-tomorrow` (tone `bg-brand-cream`).

**Shadows reading as a hard line.** Several cards used a large y-offset with a big
negative spread (e.g. `0 26px 50px -24px / 0.45`), which detaches the shadow from
the card and renders it as a dark band. Halved the offsets and dropped the alpha:

| Element | Before | After |
| --- | --- | --- |
| `RegionCard` body | `0 26px 50px -24px / .45` | `0 10px 36px -22px / .26` |
| `RegionCard` seal | `0 10px 24px -8px / .45` | `0 6px 18px -8px / .28` |
| `MenuDayCard` featured | `0 24px 44px -22px / .75` | `0 12px 30px -20px / .5` |
| `MenuDayCard` ordinary | `0 16px 32px -24px / .55` | `0 8px 26px -20px / .28` |
| `MenuDayCard` hover | `0 20px 38px -22px / .5` | `0 12px 30px -20px / .34` |
| `AddonSlider` card | `0 18px 36px -24px` | `0 9px 28px -20px` |

**Starburst moved onto the word.** The `1890 -> 2026` seal on the
"Taste All Five / Regions" CTA was `mx-auto`, floating centred over the whole
heading block. It is now absolutely positioned 8px above the word "Taste"
(`left-[28%] sm:left-[34%]`, `-translate-x-1/2`) and sized down 118px -> 84/96px.
Measured: burst centre 600px vs word centre 598px at 1440 wide; both 118px at 390.

Verified in the browser at 1440x900 and 390x844; eslint clean.

# Build Log

## 2026-09-04 (later) — Two cards per row on mobile

Grid ramp is now `2 → md:3 → lg:4 → xl:5`, with a tighter `gap-3` on mobile to buy card
width.

Two-up at 375px means ~162px cards, so the card internals had to scale with it rather than
just squashing: the day label and cuisine chip stack instead of sitting side by side, the
chip truncates and drops a step in size, padding tightens (`px-3.5 pt-3` → `sm:px-5 sm:pt-4`),
the dish name goes 13px → 15px at `sm`, and the "Next dabba" roundel shrinks from 52px to
44px.

**Verified**: 2 columns at both 375px (162px cards) and 320px (134px cards); no dish name
overflows its box at either width; the longest cuisine label
("Maharashtrian (Malvani)") stays inside its card; no page overflow.

## 2026-09-04 (later) — Five cards per row

Rotation grid ramp is now `sm:2 → md:3 → lg:4 → xl:5` (gap tightened to 4 below xl). Five
across suits the data: 20 cards land in exactly 4 rows, and a week view (Mon–Fri) is a single
row.

**Caught in build**: the explanatory comment went into the ternary's expression slot
(`) : ( {/* … */} <div>`), which Turbopack rejected with "Expected '</', got 'ident'" — two
sibling expressions where one was expected. Moved it inside the `<div>`. Second time this
JSX-comment-placement trap has bitten in this project.

**Verified**: 5 columns at 1900px (309px cards) and at 1280px (218px cards), 20 cards in 4
rows, and no dish name or cuisine chip clips or overflows at the narrower width — checked
every card, including the longest name ("Kathiyawadi Ringan No Olo").

## 2026-09-04 (later) — Menu filter bar + green hover edge

**Green hover edge**: ordinary day cards now go `hover:border-brand-green` with a matching
green-tinted shadow. The featured Tomorrow card is excluded and keeps its red — it's the one
card that's a link, so it shouldn't borrow the hover language of the rest.

**Filter bar** (`src/components/menu/MenuRotation.tsx`), built to the reference: cuisine
dropdown, range toggle, download/print, and a veg/non-veg switch on the right.

- **Cuisine** filters the grid (20 cards → 4 for Punjabi).
- **Veg / Non-Veg / All** *switches which main each card leads with* rather than filtering
  cards out. Every day in the sheet carries both a veg and a non-veg option, so filtering by
  diet would remove nothing — swapping the headline is the useful behaviour, and the sheet's
  own "Grid - Veg Option / Grid - Non Veg Option" columns are exactly this pair.
- **Range** is "Full rotation" (default) / "This week" / "Next week". The reference only has
  two, but its menu is a single week while ours is a 16-day rotation — without a full-rotation
  option most of the data would be unreachable. Week views resolve real Mon–Fri dates through
  `menuForDate`, Friday included and badged.
- **Download / print menu** calls `window.print()`, with print rules added to `globals.css`
  that drop the header, footer, filter bar, hero and cuisine essays so what prints is the
  menu grid itself. No PDF backend involved — the browser's dialog handles "save as PDF".

The range default is deliberately the date-free "Full rotation" so server and client render
identically; today's date is only consulted after a click, which keeps it out of the cached
shell (same constraint as `TomorrowDate`).

**Verified**: eslint and build clean; cuisine filter 20→4 with every remaining card Punjabi;
diet switch flips the first card from "Fansi Bateta Nu Shaak" to "Egg Curry"; week views
render Mon–Fri and return to 20; green hover class present on ordinary cards and absent on
the featured one; filter bar wraps inside 375px with no page overflow.

## 2026-09-04 — Real menu data wired in from the client spreadsheet

`Menu.16 August 2026.xlsx` (via WhatsApp transfers) is now the source for both the menu page
and What's Cooking Tomorrow.

**Data**: `src/data/menu.ts` is *generated* from the sheet by a script
(`scratchpad/build_menu_ts.py`) rather than transcribed, so no dish name can be mistyped —
16 weekday menus and 4 Friday specials, 9 cuisines. The sheet's second row classifies each
column, and that's preserved: bread, rice, dal/side, veg, non-veg, salad, chutney and
mukhwas are grid items in the dabba; Veggie 2, Sides, Papad, Drink/Raita/Curd and Dessert are
marked Add-on. `menuForDate()` resolves which menu falls on a date, anchored to the sheet's
own date so the rotation is deterministic — Fridays draw from the Friday specials on a
four-week cycle.

**Menu page** rebuilt to the reference's day-card grid: day label and cuisine chip on top,
dish photo, dish name and the bread/rice line underneath. The first card is the featured one
— inverted into brand red with a yellow label, a "Next dabba" roundel and a "See tomorrow's
dabba" arrow — and the whole card is a link to `/whats-cooking-tomorrow`. Friday specials sit
in their own row below. Cuisine chips use both palettes (`CUISINE_TONE`): yellow for
Gujarati/Tamilian, red for Punjabi/Rajasthani, orange for Maharashtrian/Awadhi, greens for
Malvani/Andhra/Kerala.

**What's Cooking Tomorrow** now renders that same day: the breakdown lists every grid item
with its role label, the pickle sits under a rule, and the day's own sheet add-ons appear
under the slider as "Also available tomorrow". Allergens are *derived* from dish names via
keyword hints (`allergensFor`) — the sheet has no allergen column, so this is an inference,
clearly marked in the code.

**Images**: 20 new dish photos generated on the premium recipe, one per menu day, named
`day-01…16` / `friday-1…4` — prompts built from the sheet's own dish names, so they always
match the data.

**Two things needing the client's answer**:
- The sheet holds **16** weekday menus, but the content PDF calls the page "The 15-Day Menu".
  I've titled it "The Rotating Menu" and shown all 16 rather than silently dropping one.
- The sheet carries **no prices**, and the content PDF still has `$XX.XX`. The reference
  design shows a price per day; those cards show cuisine and dish instead.

**Verified**: eslint and build clean; 20 day cards render; the featured card is an
`<a href="/whats-cooking-tomorrow">` with a descriptive aria-label; no broken images among
the 20; Tomorrow's breakdown matches sheet row 1 exactly (Fulka Roti / Steamed Rice / Tuvar
Dal / Fansi Bateta Nu Shaak / Egg Curry / Kachumber / Green Chutney / Roasted Saunf);
columns still equal height and the section still fits one screen.

## 2026-09-04 (later still) — Thali columns matched, section fits one screen

The feature photo was in normal flow with `h-full min-h-[420px]` on a 1200×1500 source, so
the *image* set the grid row height and ran far taller than the breakdown column beside it,
pushing the section past one screen.

Fixed by making the photo fill its figure absolutely (`absolute inset-0 object-cover`) with
`h-full` on the `Reveal` wrapper and the figure, so the breakdown column now sets the row
height and the photo crops to match. The section is `min-h-[100svh]` with centred content,
and the right-hand cards were tightened (smaller thumbnails, less padding and row spacing) so
the pair lands inside a screen rather than merely being equal.

**Verified**: both columns measure 566px exactly at 1400×900 and 1280×800, section height
equals viewport height at both, no horizontal overflow; on mobile the columns stack and the
photo keeps its 360px minimum.

## 2026-09-04 (later) — Add-ons rebuilt as a slider

**Why the cards looked broken**: the card's image area was `bg-brand-cream` sitting on a
`bg-brand-cream` section, so the top half dissolved into the background and only the white
text strip read as a card — a two-tone fragment rather than one object. The whole card is now
`bg-paper` with the image area a soft cream gradient plus a warm radial glow behind the tin,
so it reads as a single card against the cream section. Price moved into a solid red pill.

**Slider** (`src/components/AddonSlider.tsx`): a real scroll container with x-mandatory snap
points, so it swipes on touch and scrolls with the wheel, plus arrow buttons for pointer
users (hidden under `sm`, disabled at each end, one card + gap per click). Track is
`role="region"`, labelled, and focusable so it's keyboard-scrollable; native scrollbar hidden
via a new `.no-scrollbar` utility.

**Grouping change**: availability moved onto each item (`Mon–Thu · Free Fri` / `Every day`)
as a chip on the card, so all six live in one slider. The previous two-group layout left the
"Every day" group as a single card stranded in a five-column grid.

**Two fixes found while verifying**:
- The `scroll-smooth` CSS class made a direct `scrollLeft` assignment silently snap back
  (assigning 292 landed on 6). Dropped the class and pass `behavior` per scroll in JS
  instead, which also let me honour `prefers-reduced-motion` (instant instead of smooth).
- Arrow state is updated from scroll/ResizeObserver callbacks, not during an effect, so
  eslint's `react-hooks/set-state-in-effect` stays clean.

**Verification note**: smooth-scroll animations don't progress in the headless preview, so
clicking an arrow appeared to do nothing. Confirmed the wiring by spying on `scrollBy` — next
fires `+288`, prev `-288` — and confirmed travel with an instant scroll landing exactly on
the 292 snap point with the prev arrow enabling. Not a bug in the page.

**Verified**: eslint and build clean; 6 cards; arrows disable at both ends; hidden on mobile
where the track still swipes; no page overflow at 1400px or 375px.

## 2026-09-04 — Tomorrow's Thali detail + Add-ons, both from the user's reference

Two new sections on `/whats-cooking-tomorrow`, replacing the earlier plain dish-card row.

**Tomorrow's Thali** — the reference's day-detail layout, pushed further: date + cuisine
line, feature photo card with the name and a Pure Veg badge on a floating overlay, then a
breakdown card and an allergen card beside it. Where the reference used plain bullets, each
dish here gets its container thumbnail, name and a one-line note, so the list carries the
same information the old cards did. Allergens are derived from the dish data
(`[...new Set(...flatMap)]`) rather than hand-listed, so the tags and the "this thali
contains" line can't drift apart.

**Add-ons** — built to the reference: "Make it yours" eyebrow, poster heading, grouped by
availability with a "Free on Friday" perk chip, and cards showing the item, a note and the
price. Generated six add-on containers on the premium recipe plus a full South Indian thali
photo (this one keeps its background, since it's a photo card rather than a cut-out).

**Prices**: `$4.00 / $1.50 / $2.00 / $1.00 / $3.00 / $1.50` come from the user's reference
screenshot, not from the content PDF (still `$XX.XX`). Noted in `src/data/addons.ts` — worth
confirming against the real price list before launch.

**Next.js specifics** (per AGENTS.md, checked `node_modules/next/dist/docs/` first): this
build is on the Cache Components model — there is no `revalidate`/`dynamic` route-segment
doc, and `use cache` + `cacheLife` replace the old model. So tomorrow's date is not rendered
on the server, where it would be frozen into the cached shell and go stale. `TomorrowDate` is
a client component using `useSyncExternalStore` — "Tomorrow" as the server snapshot, the real
Perth-formatted date as the client snapshot. First attempt used `useState` + `useEffect` and
tripped eslint's `react-hooks/set-state-in-effect`; `useSyncExternalStore` is the correct
primitive here and lints clean.

**Verified**: eslint and build clean; date resolves to the correct next day in
Australia/Perth; no broken images; hero still exactly one screen and no horizontal overflow
at 1400px and 375px.

## 2026-09-03 (twelfth pass) — Shared `PageHero`, What's Cooking Tomorrow page

**`PageHero` extracted** (`src/components/PageHero.tsx`) from the Regional hero and applied
to Plans, 15-Day Menu, Chef's Corner and What's Cooking Tomorrow, so every page opens the
same way: dabba group left, poster copy right, one screen, starburst seal, route line. Props
cover kicker, the two headline lines, the stat row, an optional quote card *or* lead
paragraph, both CTAs, the seal text, and the container ring. Regional Food Stories was
refactored onto it too, so there's one source of truth rather than a copy per page.

`HeroPlatter` now takes a `tins` prop with the five slot positions exported as `TIN_SLOTS`,
so a page can swap what's in the dabba's containers without touching the layout.

**New page: `/whats-cooking-tomorrow`**, added to the navbar (as "Tomorrow") and the footer's
Order column. Built to the card layout from the user's reference — section heading with a
pill button on the right, then a row of dish cards with a badge, photo, name, note and tags.
Content is the approved copy: tomorrow's menu is South Indian · Veg — Lemon Rice, Sambar,
Beetroot Poriyal, Coconut Chutney, Payasam — with the "order by 9:00 PM" cut-off and the
chef's sambar quote. Generated four new containers (`tin-lemonrice`, `tin-poriyal`,
`tin-chutney`, `tin-payasam`) on the premium recipe; `tin-sambar` already existed. Those same
five fill the hero's container ring via `TOMORROW_TINS`.

**Copy** for all four pages came from `V2 Mumbai Dabbawala - Website Content.pdf`, extracted
with pypdf (note: the raw text extracts one word per line, so normalise whitespace before
reading it).

**Deliberately not invented**: the reference cards show prices ("Add to cart $10.95"), but the
content doc still has `$XX.XX` placeholders for every plan, so the dish cards carry allergen
tags instead of a price and no Add-to-cart control. Needs real prices before that can ship.

**Gotcha hit twice**: writing `\\n` inside a bash heredoc-driven Python string produced literal
newlines in the generated TSX, breaking string literals. Caught by eslint's parser both times.

**Verified**: all 10 routes build; TypeScript and eslint clean; `/whats-cooking-tomorrow`
hero fits one screen with no broken images and no horizontal overflow; Plans, Menu,
Chef's Corner and Regional all serve the same hero markup (checked via fetch).

## 2026-09-03 (eleventh pass) — Region story cards moved to the 15-Day Menu page

The five graph-paper cards (tagline, story, dish tags) were pulled off Regional Food Stories
and reused on `/menu`, which had been a stub.

Checked before moving: nothing linked to their `#gujarati`-style anchors, and the rail cards
above them already render the same `REGIONS` copy (name, tagline, description), so the
Regional page loses no approved content — the grid was duplicating what the rail already
said. That page now runs hero → rail → closing CTA.

Extracted the grid as `src/components/regional/RegionStoryCards.tsx` so it can be dropped
into any page, then built `/menu` around it in the established language: cream head band with
script kicker + stacked poster headline ("The 15-Day / Menu") and the route line, an organic
wave into the paper section, the five cuisine cards, and a CTA back to Regional Food Stories.
The anchors travel with the component, so a future menu day can deep-link to its cuisine.

Removed the imports that went unused on the Regional page (`Image`, `REGIONS`) — caught with
eslint, since an unused import is only a warning and would not have failed the build.

**Verified**: build clean, eslint clean on both pages; all five cards render on `/menu` with
working anchors; no horizontal overflow; Regional page still renders its three sections.

## 2026-09-03 (tenth pass) — Navbar back to white, floating over a cream ground

Correction to the previous pass: the navbar bar itself should stay **white** — what needed
to be cream was the strip *behind* it, around the floating pill.

The real cause was structural, not colour: the header was `sticky`, so it consumed ~82px of
flow at the top of the page. That meant (a) the strip behind the pill was the body's paper
background rather than the hero's cream, and (b) a `min-h-[100svh]` hero started 82px down,
so its bottom sat 82px below the fold — which is exactly why the Mumbai→Perth route line kept
looking cropped, even though the hero's measured *height* equalled the viewport.

Changed the header to `fixed inset-x-0 top-0`, so it takes no space in flow. The hero now
starts at y=0 with its cream running behind the pill, and one screen really is one screen.
The bar is `bg-paper/95` again. Home's hero and the `ComingSoon` stubs were checked for
clearance under the floating header (home's top padding was raised; the stubs' existing
padding was already enough).

**Verified**: hero top = 0 and hero bottom = viewport bottom exactly (800/800); route line
fully visible; bar renders paper-white with the cream showing around it; the starburst clears
the navbar and every tin; home and stub pages' first content sits below the header.

## 2026-09-03 (ninth pass) — Dabba as the hero, cream navbar, slide-in motion

**The image group is now the dabba itself, opened out.** Generated a new set on the premium
recipe: `dabba-centre` (three-tier steel tiffin, clasped, handle up) plus five of its own
containers, each packed with one region's dish — `tin-dhokla`, `tin-butterchicken`,
`tin-fishcurry`, `tin-dal`, `tin-sambar`. The dabba sits at the centre at 54% of the group
width against 27-29% for the tins, so it clearly reads as the focus, with the containers
ringing and overlapping it.

**Navbar** now uses `bg-brand-cream/92` instead of white, so it blends into the hero band,
with a lighter shadow. Its max width was raised to match the widened hero container.

**Motion changed to directional**: the food group slides in from the left
(`.slide-in-left`), the copy column from the right (`.slide-in-right`), staggered top to
bottom (kicker → headline → stats → review card → CTAs → route line). Both animate the
standalone `translate` property so per-piece `rotate` survives. The old per-dish pop and
cycle animations are gone from the hero.

**Removed**: the "Gujarati Punjabi Marathi…" label row under the group, and the
Gateway-of-India / Bell-Tower stickers from the route line (which is what was getting
cropped at the bottom of the one-screen hero — it now sits comfortably inside).

**Free-delivery seal**: round circle → the poster's spiky `Starburst`, and relocated. It
took three attempts to find a spot that doesn't collide — top-right of the group covered a
tin, bottom-right clipped the route line — so it now sits top-left of the hero, balancing the
headline diagonally. Verified by measuring its rect against every tin, the dabba, the header
and the route line: zero overlaps.

**Verified**: one screen exactly at 1900x910, 1100x800 and 375x812; route line fully visible;
no horizontal overflow; build clean.

## 2026-09-03 (eighth pass) — Hero widened to fill the screen

The hero grid was still capped at `max-w-7xl` (1280px), which on a ~1900px display left
roughly 310px of dead cream on each side. Widened the hero container to `max-w-[1720px]`
with `lg:px-12 2xl:px-16`, which brings the side gaps down to ~82/98px at 1900px.

To fill the extra width rather than just stretching the gap, the food group grows with it —
`lg:w-[min(100%,80svh)] lg:max-w-[780px]`. The `min()` against `svh` is the important part:
the group can expand on wide screens but is still capped by viewport *height*, so it can
never push the hero past one screen. Headline, script kicker and stat numerals also step up
at the `2xl` breakpoint so the right column keeps pace.

Mobile was 36px over one screen after the change; trimmed the top/bottom padding and the
group's mobile width to bring it to exactly 812/812.

**Verified**: fits one screen exactly at 1900x860, 1440x820 and 375x812; no horizontal
overflow and no clipped headline at any of them; build clean.

## 2026-09-03 (seventh pass) — Premium dish set, tight group, one-screen hero

User feedback: the group was too spread out, the food was wrong (generic biryani rather than
their own menu), the feel wasn't premium, and the section should fit one screen.

**New premium image set, from the content doc's dishes.** Generated six pieces on one
consistent recipe — same three-quarter hero angle, same soft key light from upper left, same
glossy finish, steam, isolated on white — so they read as one photographed group rather than
a collage: `hero-dabba` (steel dabba of dal, steaming, as the centrepiece) plus
`p-dhokla` (Gujarati), `p-butterchicken` (Punjabi), `p-fishcurry` (Marathi Konkan),
`p-dalbaati` (Rajasthani), `p-dosa` (South Indian) — the five cuisines from
`V2 Mumbai Dabbawala - Website Content.pdf`. Matted with birefnet as usual. The old
biryani-tray hero and its lemon/chutney props are no longer used in the hero.

**Group tightened.** `HeroPlatter` rebuilt: the dabba anchors the centre and the five dishes
are tucked in around its base with deliberate overlaps and per-piece `zIndex`, so the cluster
reads as one arrangement instead of pieces floating apart. Spices sit small in the gaps. The
box aspect went from 1/0.95 to 1/0.82 to pull everything closer together. Dishes land one at
a time (0.16s apart) and stay — no clearing cycle.

**Hero now fits one screen.** The section is `min-h-[100svh]` with the grid vertically
centred, and the vertical rhythm was tightened throughout (stat row, CTAs, ticker spacing).
The review card is hidden below `sm` so small phones aren't overflowed. Measured: hero height
exactly equals viewport height at both 1440x820 and 1030x790.

**Note for later**: the auto-scrolling rail cards still use the earlier flat-lay single-dish
stickers (`DishCluster`). The hero is now premium three-quarter photography, so if the rail
should match, its cards need regenerating on the same recipe.

## 2026-09-03 (sixth pass) — Matched the actual video reference; hero rebuilt as `HeroPlatter`

The user sent a Google Drive screen recording of their real reference (a food-poster
template) and said the hero still wasn't matching it, after an intermediate attempt scattered
food/spice stickers across the whole hero section — explicitly rejected ("i dont want
scattered in the whole hero section").

**Watched the reference.** The in-app browser can't play a Drive video directly (Drive's
player has no `<video>` element in the DOM, so screenshots of it are blank). Downloaded the
actual file with `curl -sL "https://drive.google.com/uc?export=download&id=<id>"` and pulled
stills at chosen timestamps with Python `cv2.VideoCapture`. That showed the real anatomy: one
hero dish in a black tray, tilted; whole spices tucked tight against one corner of the tray;
a light bowl and a dark bowl hugging its edges; a lemon half nearby; a round colour-filled
price/promise badge pinned to the corner of the section, independent of the food group;
script kicker → big headline → stat row → review card → two pills, in that order.

**Rebuilt the hero as `HeroPlatter`** (`src/components/regional/HeroPlatter.tsx`), replacing
the thali: generated a `tray-biryani.png` (biryani in a black takeaway tray, matching the
reference's hero dish), `lemon-half.png`, and `chutney-bowl.png` via the established
one-subject-per-image + birefnet recipe; reused the existing `raita-bowl.png`. Every piece
carries its own inline `rotate`/`translate` so the group reads as one hand-placed
composition, tilted like the reference, not a grid.

**Motion**: the whole group pops in together on load (`.group-pop`, touches only `opacity`
and the standalone `scale` property so it can't compose against each piece's own `rotate` —
same Tailwind trap as the plane bug). One corner of the group is a slot that cycles through
the five regional dishes (`.dish-cycle`, 15s loop, ~3s each) with the region names beneath
tracking the active one (`.label-cycle`).

**Right column** rebuilt to the reference's rhythm: script-font kicker above the headline
(was a plain badge), a stat row with big poster-face numbers (135+ / 5 / 15) replacing the
pill chips, and the promise badge moved out of the food group into its own round orange
circle pinned to the section corner (was a spiky starburst sitting over the plate).

**Bug caught and fixed**: a backgrounded image-gen run reported success but had only written
1 of 3 files (`tray-biryani.png` saved, `lemon-half.png` and `chutney-bowl.png` did not — the
truncated log gave no visible error). Caught via `naturalWidth === 0` on the rendered `<img>`
elements. Re-ran the same two items in the foreground; both succeeded first try. Lesson
recorded in memory: verify generated files exist on disk before trusting a background task's
"completed" status.

**Memory updated**: [[project-design-reference]] and [[project-mumbai-dabbawala-site]] now
carry the settled `HeroPlatter` anatomy, the Drive-video-reading technique, the image-gen
reliability note, and where the user's own sticker assets (`public/images/stickers/`,
`public/images/plane.webp`) live for reuse on other pages.

**Verified**: `npm run build` clean; no broken images anywhere on the page
(`naturalWidth === 0` check); no horizontal overflow at 375px or 1280px.

## 2026-09-03 (fifth pass) — Thali showcase, plane orientation, layered shadows restored

**1. Hero thali that serves itself.** New `ThaliShowcase` component: an empty steel thali
(generated + matted like the other stickers) with a centre roti and one dish per region —
dhokla, butter chicken, Konkan fish curry, dal baati, dosa — placed on a circle inside the
plate's well. Each lands in turn (`dish-emerge`, 14s loop, `animationDelay` staggered 0.85s
apart), the full thali holds, then the plate clears and the round repeats. The region names
under the plate brighten as their dish arrives (`dish-label`, same timeline). Under
`prefers-reduced-motion` the whole thali is served at once with every name lit. Replaces the
tiffin `DishCluster` in the regional hero; the home hero keeps the cluster. The "Free
Delivery" seal moved to the plate's right edge so it no longer covers the region names.

**2. Plane orientation fixed (real bug).** The plane rendered vertical because Tailwind v4's
`rotate-90` utility sets the standalone `rotate` CSS property, which *composes with* rather
than replaces the keyframes' `transform: rotate(90deg)` — 90° + 90° = 180°, nose pointing
straight down. Removed the utility classes and kept the whole transform (centring + 90° turn)
in the `plane-fly` keyframes, with a comment so it does not regress.

**3. Stacked heading shadows restored, properly layered.** Last pass removed the offset copy
from the supporting line; the ask was to keep it on both and make the overlap read correctly.
Added `.poster-stack`, which gives each line `position: relative` and a descending z-index, so
an upper line's letters occlude the shadow of the line beneath instead of the two muddying
together (normal flow paints later lines on top, which was the original problem). Both lines
now carry a brand-yellow offset for poster-grade contrast, with line-height at 0.96.

**Verified**: `npm run build` clean; plane horizontal on the route; layered headings confirmed;
no horizontal overflow at 320px, and the region-name row fits inside the viewport there.

## 2026-09-03 (fourth pass) — Plane on the route, heading fix, plate-free stickers, merged red

Four items from user feedback:

**1. Plane sticker on the route ticker.** Used the supplied `plane.webp` (red line-art, top-down,
already has an alpha channel — verified the VP8X ALPH chunk). Copied to
`public/images/plane.webp`, rotated 90° to fly left-to-right, and animated along the dashed
rule (`plane-fly`, 9s, disabled under `prefers-reduced-motion`).

**2. Heading "highlight" fixed.** The offset copy was applied to *both* stacked lines, so
line two's shadow collided with line one's glyphs and read muddy. Checked the poster set
again: only the lead line carries the offset — the supporting line is always flat ("SOME" is
shadowed, "TRADITIONS TRAVEL WELL" is not). Added a `.poster-flat` class for those lines,
loosened line-height 0.88 → 0.94, and applied the pattern to all stacked headings.

**3. Plate-free "sticker" food images.** The user wanted every card like the Punjabi one —
loose bowls and bread, no plate or tray. Composed-scene prompts kept hallucinating a plate
even with explicit negatives (naming "plate"/"tray" primes the model to draw one), so the
approach changed to **one subject per generation**: 18 individual elements (bowls, breads,
baati, idli, dosa, tiffin dabba…) generated with fal.ai `flux/dev` and matted with
`fal-ai/birefnet`, in `public/images/items/`. A new `DishCluster` component composes 3–4 of
them per card into a hand-placed looking group with per-piece rotation and shadows;
`src/data/regions.ts` now carries a `cluster` per region instead of a single image.

**4. Red CTA merged with the footer.** The footer's `mt-24` left a cream stripe between the
red closing CTA and the red footer. Removed it (footer keeps its own padding), so the two
form one continuous red block — verified 0px gap and identical `rgb(175,20,17)` on both.
The footer also picked up the grain + grid texture to match the CTA panel.

**Cleanup**: the superseded plated dish photos and cut-outs moved from `public/` to
`design-assets/superseded/` — they were unreferenced and would otherwise ship as static
assets. Regenerable from the scripts described above.

**Verified**: `npm run build` clean. Hero cluster, cards, plane and merged red confirmed
visually. NOTE for future sessions: the preview screenshot tool will not capture subtrees
under a running CSS animation (`.rise`, `.drift`) — those areas come back blank even though
`getBoundingClientRect`/`complete`/computed styles all confirm the images are painted.
Strip the animation classes via JS before screenshotting to verify such areas.

## 2026-09-03 (third pass) — Poster headline system + sticker imagery

**Scope**: User asked for the heading treatment from the Mumbai Dabbawala poster set
("A LEGACY", "SOME TRADITIONS TRAVEL WELL", "135+ YEARS"), said the page wasn't yet
matching the food-poster reference closely enough, and asked for background-free sticker
imagery throughout.

**Poster heading system** (new, reusable):
- Added **Anton** (Google Fonts) as `--font-poster` — a stand-in for Acumin Pro Condensed
  Black from the posters, which has no webfont. Heavy condensed uppercase.
- `.poster` utility renders the posters' hard offset colour copy behind the text via
  `text-shadow: var(--po) var(--po) 0 var(--po-color)`; offset and colour are set per use
  (`[--po:6px]`, `--po-color`), so headings can be red-on-yellow, olive-on-green, or
  yellow-on-dark exactly like the poster set.
- Two-tone stacked headlines: line one in brand red / yellow offset, line two in
  brand green-dark / green offset. Lines use `whitespace-nowrap` with a responsive size
  ramp so phrases never break mid-thought (checked down to 320px — no overflow).
- Poster furniture: `.graph-paper` / `.graph-paper-light` grid backgrounds, `Starburst`
  (spiky sunburst seal, used for "Free Delivery" and the "1890 → 2026" mark) and
  `RouteTicker` (the dashed "MUMBAI ---- PERTH" rule).
- Closing CTA restyled after the "SOME / TRADITIONS TRAVEL WELL" poster: red ground, grid
  texture, sunburst, yellow + olive stacked headline, yellow pill CTA.

**Sticker imagery, regenerated**:
- The first cut-out pass lost the scattered spice props (the matting model keeps only the
  salient subject). Fixed by composing every dish **on a single dark slate tray** with the
  bowls and spices resting on it, so the whole arrangement is one connected subject, then
  matting with `fal-ai/birefnet` (cleaner multi-object edges than rembg; rembg kept as
  fallback). All 6 dish stickers regenerated — trays are tilted like the reference.
- Card stickers enlarged (80% of card width, lifted above the card edge) and the circular
  badge repositioned to straddle the card's top-right corner as in the reference; card
  padding retuned so the script kicker is never covered.
- Card region names now use the poster treatment (offset shadow tuned per card tone).
- Home page hero rebuilt in the same language (sticker thali, graph paper, poster headline,
  "Launching Soon" sunburst, route ticker), replacing the old background-photo hero — so no
  page still uses a with-background photo.

**Bugs found and fixed in this pass**:
- `Starburst` hardcoded `relative` in its own class list, which collided with the caller's
  `absolute` (Tailwind's `relative` wins on order), so the seal dropped out of position into
  document flow. Positioning is now fully caller-owned.
- The seal then overlapped the H1; moved to the hero sticker's lower-right and verified
  non-overlapping via measured rects.

**Verified**: `npm run build` passes (9 static routes, TypeScript clean); layouts checked at
320px, 375px, 1100px and 1280px; no horizontal overflow at any of them.

## 2026-09-03 (later) — Regional Food Stories redesigned to the poster reference

**Scope**: User supplied a static poster reference plus a 14-second screen recording
(Google Drive) and asked for the page to match that UI, curves, card treatment, and motion.
Frames were extracted from the recording with ffmpeg to read the layout and the motion.

**What the reference does**: grainy neutral hero band with a background-removed dish photo
floating on the left; script kicker over a very large heavy sans dish name; star rating; a
white reviewer card; orange + outline pill CTAs; a circular price roundel; an organic wave
divider into the section below; then a horizontally auto-scrolling rail of big
heavily-rounded cards (~50px radius) in alternating fills, each with a cut-out dish photo
breaking out above the card top, a white circular badge straddling the top-right corner,
script kicker, huge bold name, short description, and a pill CTA.

**Implemented**:
- New cut-out (transparent PNG) imagery: 6 dishes + 4 loose spice props, generated with
  fal.ai `flux/dev` on white backgrounds then passed through `fal-ai/imageutils/rembg` for
  alpha. Saved to `public/images/cutouts/`. (Script pattern: generate → rembg → download.)
- Hero rebuilt on a grainy cream band (SVG `feTurbulence` noise via the `.grain` utility),
  cut-out thali with a slow `float-drift` animation, drifting spice props, script kicker
  (Caveat), oversized DM Sans Black headline, fact chips, verified-customer card using the
  real testimonial from the content PDF, two pill CTAs, and a circular "Free Delivery" seal
  in place of the reference's price roundel.
- Organic SVG wave dividers between hero → rail and rail → closing CTA.
- `RegionCard` + `RegionRail`: the reference's card anatomy, alternating brand-orange and
  brand-cream fills, cut-out photo breaking out of the top, white circular "REGION 0X of
  five" badge, script kicker/tagline, huge bold region name, description, pill CTA.
- Motion: CSS marquee (`rail-scroll`, 22s linear infinite, duplicated card set for a
  seamless loop), pauses on hover/focus-within; card hover lifts the card and nudges the
  dish photo; `Reveal` component fades sections up on scroll via IntersectionObserver;
  everything disabled under `prefers-reduced-motion`.
- `Reveal` has a 2.5s failsafe so content can never remain hidden if the observer never
  fires (background tab etc.).
- Region copy moved to `src/data/regions.ts`; an anchored detail-card grid below the rail
  keeps every region linkable and readable (the rail alone isn't a good anchor target).
- Header nav breakpoint moved `lg` → `xl` (it was cramped around 1100px).
- `npx tsc --noEmit` clean.

**Deliberate deviations from the reference** (flagged for the user):
- No fabricated rating/price numbers: the reference's "4.5 (191 Review)" became fact chips
  (135+ Years · 5 Cuisines · 15-Day Rotation) and the price roundel became a
  "Free Delivery" seal, since plan pricing in the content PDF is still `$XX.XX` placeholder.
- Added Caveat (Google Fonts) for the script kickers, which the brand kit doesn't name — it
  is required for the reference's handwritten accent. Swap or drop on request.
- Card fills use brand orange/cream rather than the reference's amber/lavender.

**Verification note**: the in-app preview screenshots are unreliable on the desktop preset
(stale/blank frames, especially after scrolling or DOM changes). Verified via a tall
emulated viewport (1100x2200), mobile-preset screenshots, and JS checks (bounding rects,
computed styles, live `document.getAnimations()` state confirming the rail translates).

## 2026-09-03 — Project scaffold + Regional Food Stories page

**Scope**: Stood up the Next.js project (no code existed previously, only source PDFs) and
built the first full page — Regional Food Stories — per user priority.

**Stack**: Next.js 16 (App Router, TypeScript), Tailwind CSS v4, `next/font/google`.

**Done**:
- Scaffolded project via `create-next-app` (scaffolded in a temp dir and moved in, since
  `create-next-app` rejects the space in "mumbai dabbawala frontend" as an npm package name;
  `package.json` name set to `mumbai-dabbawala-frontend`).
- Brand tokens wired into `src/app/globals.css` as Tailwind v4 `@theme` colors: primary
  `#AF1411` / `#F36220` / `#FCF3CD`, secondary `#2C490F` / `#A2BB3B` / `#FFDA2D`.
- Fonts: Roboto Slab (display/headings) + DM Sans (body) via `next/font/google`. Acumin
  Variable Concept and Gilroy (the brief's other named fonts) aren't available free/on Google
  Fonts — flagged to user, can swap in via `@font-face` if licensed files are supplied.
- Shared `Header` (sticky rounded pill nav, mobile menu) and `Footer` (full sitemap + socials)
  components, styled after the live landing page's rounded-card aesthetic
  (mumbai-dabbawala-newwt.vercel.app) but re-skinned in the new brand palette.
- `src/app/regional-food-stories/page.tsx` — full build: hero banner, quick-jump pills to
  each region, 5 alternating region story sections (Gujarati, Punjabi, Marathi, Rajasthani,
  South Indian) with generated photography, dish tag chips, and a closing CTA to `/menu`.
  Copy taken verbatim/near-verbatim from the content PDF's Regional Food Stories section.
- Generated 6 editorial flat-lay food photos via fal.ai (`flux/dev`) using the API key
  supplied in chat, saved to `public/images/regional/`.
- Light home page hero + "start here" pointer to Regional Food Stories.
- On-brand "coming soon" stub pages for About, Plans, 15-Day Menu, Chef's Corner, Blog,
  Contact so the nav is fully functional and nothing 404s.
- `.claude/launch.json` added for `npm run dev` preview on port 3000.
- Verified in-browser at desktop and mobile viewport sizes (mobile screenshots confirmed
  hero, region cards, and footer all render correctly; desktop verification used
  `getBoundingClientRect`/computed-style checks after the preview tool intermittently failed
  to screenshot deep scroll positions on the 1280×720 viewport — confirmed a tool quirk, not
  a page bug).

**Not done yet** (next up, pending user direction): Home, About Us, Plans, 15-Day Menu,
Chef's Corner, Blog, and Contact Us full builds — currently on-brand stub pages only.
"What's Cooking Tomorrow" home-page nudge not yet added.

**Open item for the user**: confirm whether to proceed with Roboto Slab/DM Sans permanently,
or supply Acumin Variable Concept / Gilroy font files to match the brief exactly.
