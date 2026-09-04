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
