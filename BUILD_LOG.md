## 2026-09-08 - The seal's "2026" comes back out from under the letters

The tuck was too deep: the seal's label block sits centred in the seal, so its bottom
lands about `top + 0.75 × size`, and at `sm` that was 20 + 81 = **101** against a `pt` of
84 — the label's bottom sat **17px inside** the letters and "2026" vanished behind the T.

Seal raised 8px (`top-[10px] sm:top-[12px]`) and the `pt` taken to
`pt-[90px] sm:pt-[102px]`, which is that same arithmetic solved the other way rather than
nudged by eye: 12 + 0.75 × 108 = 93, and 102 leaves 9px under it. Only the seal's spiky
rim is behind the letters now; its label never is.

### Verified at both ends

| viewport | seal | first line top | "2026" bottom | clear under the label | rim behind the letters |
|---|---|---|---|---|---|
| 1440 | 324–452 | 424 | 415 | **8px** | 28px |
| 390 | 250–360 | 339 | 331 | **8px** | 21px |

`labelClearsLetters` true at both, and hit-testing the centre of each label returns the
label's own span, so "1890" and "2026" are both genuinely on top. No horizontal overflow
at 390.

(A flag in the first check read false because the test regex looked for `poster` and the
label's own class contains `font-poster` — the page was right, the check was not.)

eslint clean, production build passes.

## 2026-09-08 - The "1890 → 2026" seal tucks in behind "Taste All Five"

On Regional Food Stories the seal sat clear above the heading at `z-30`, in front of
everything. It now overlaps the first line at a **-12deg tilt**, with the letters crossing
over its lower edge.

Two things make that work:

- `z-0` on the seal against `relative z-10` on the `h2`. The `h2` needed its own stacking
  position: `poster-stack` gives its children z-indexes (4/3/2), but those order the lines
  against *each other*, not against anything outside the stack.
- A `pt` sized so only the seal's lower third is covered - 74px of it stays clear above the
  letters, so its own "1890 → 2026" is still readable.

### Verified

Seal `z-index: 0` against the `h2`'s `10`; overlap measures **54px vertically and 128px
horizontally**, with 74px of seal clear above the cap line.

Confirmed by hit-testing rather than by trusting the z-index: `elementFromPoint` at four
places across the crossing returns the heading's `SPAN.poster` every time, so the letters
really are painted over the seal.

One measuring note worth keeping: `getComputedStyle(el).transform` read **`none`** here and
the tilt looked like it had failed. Tailwind v4 emits `rotate` and `translate` as their own
CSS properties rather than composing a `transform`, so the values are on
`getComputedStyle(el).rotate` (`-12deg`) and `.translate` (`-50%`). Checking `transform` on
a v4 utility will mislead you.

eslint + `tsc --noEmit` clean, production build passes.

## 2026-09-08 - "PERTH" comes off the header

The rule-and-label beside the logo is gone, along with the flex `gap` that only existed to
separate the logo from it — the mark now stands on its own.

Nothing else changed: the logo's `alt` still reads "Mumbai Dabbawala — since 1890" and the
site title is still "Mumbai Dabbawala — Perth". Those are the document's own copy, not the
header badge that was asked about.

Verified: no `/perth/i` anywhere in the header's text, its text is now just the nav and
the CTA, and the logo link is down to one child.

eslint + `tsc --noEmit` clean, production build passes.

## 2026-09-08 - For Business comes off the red, and the headings go up a step

The client did not want the red ground. `/contact` now has no red section at all
(`anyRedSection: false`): For Business is back on paper, the wave is gone, its heading and
copy are back on the light-ground palette (red -> green-dark on a yellow shadow, ink/70
body), and its CTA is red again rather than the yellow variant that only exists for red
grounds. The cream panel stays - on paper that is what lifts the list off the page.

**The trade, stated:** the page runs cream -> paper -> paper -> cream again, so For Customers
and For Business share a ground. What keeps them from reading as one long list is their
SHAPE, which is the part of the revamp that stays: rows you scan down up there, a divided
panel of poster-type lines down here.

Headings up a step, as asked: the two section headings go **42px -> 50px** (30px from
26px on mobile), and the sign-up band's, which sits inside a card and should stay a touch
smaller, **40px -> 44px** (28px mobile).

Verified at 1440 - all four grounds as above, no red anywhere, no wave in the business
section, panel `rgb(252, 243, 205)`, CTA resting on `rgb(175, 20, 17)`, poster sizes
50/50/50/50/44/44. At 390 the larger type still fits: sizes 30 and 28, **no poster wider
than the viewport**, no horizontal overflow, all four customer rows intact.

eslint + `tsc --noEmit` clean, production build passes.

## 2026-09-08 - For Customers and For Business revamped

They were the same shape twice running - a numbered-card grid, then another numbered-card
grid - on two paper grounds back to back. That is what made the middle of the page read
flat. Both are now a different shape from each other, and the page has a loud band it was
missing.

### For Customers: four rows, not a 2x2

"Pick the closest match" is a one-of-four decision, and a row you read across in one line
resolves that faster than four boxes you scan around. Each row is a **lid tag** - the
index in poster type on a coloured square, because the dabbawalas' own routing marks are
painted codes and not icons - then the topic, "Email us", and an arrow that slides on
hover. Hairlines between, and the row tints on hover.

Tag grounds are primary palette only (red / orange / cream): the brand sheet keeps the
greens and the yellow for glyphs and accents, not for full grounds.

### For Business: on red

Two jobs at once. The page ran cream -> paper -> paper -> cream, so it had no full-strength
moment anywhere; and the customer routes and the business routes sat on the same ground,
which read as one long list rather than two audiences. On red with a wave in, it is now the
page's one loud band and an obvious break between the two.

The four lines sit in a cream panel as a **divided list** - number, name in poster type,
qualifier trailing - rather than as cards, so it is not the shape of the section above it
either. CTA goes yellow, which is the variant that exists for red grounds.

### Verified at 1440

4 sections, grounds now **cream -> paper -> red -> cream**. For Customers: 4 rows, all
98px, tags computing red / orange / cream / red, and each row's `mailto` still carrying
its own subject (`Orders & Plans`, `Meal & Menu Questions`, `Corporate Meals`,
`Partnerships & Franchise Enquiries`). For Business: on `rgb(175, 20, 17)`, wave present,
4 rows at ~97px in a `rgb(252, 243, 205)` panel, CTA reads "Corporate & Partnership
Enquiries". All four headings intact, no horizontal overflow.

eslint + `tsc --noEmit` clean, production build passes.

## 2026-09-08 - Contact gets its own hero

`/contact` no longer opens on the shared `PageHero`. It was the wrong hero for the page in
two ways: it leads with the dabba platter and three numbers - 135+ years, 5 regional
cuisines, $0 delivery - which are the right opening for the pages that sell the food and
decoration in front of what the reader came here for; and six pages already opened that
way, so by the time you reached this one the platter carried no information at all.

`ContactHero` puts **the routes** in the right-hand column instead of stats: the address
and the number at a size you can actually hit, and the five profiles as icon buttons.
Everything else is held in common with `PageHero` deliberately - cream printed ground,
script kicker, stacked Anton headline, starburst seal, the wave handing down to paper - so
it still reads as the same site rather than a page from somewhere else.

**The routes moved rather than being copied.** "For Customers" below used to carry the
same email, phone and socials block; it now carries only the four topics, with a line
saying what the topic cards do. Verified: the email and the phone each appear **once** in
the hero, and `forCustomersHasRoutes` is false.

Also shorter than `PageHero`: `min-h-[86svh]` rather than a full screen. A contact page's
job is to get you to a route, not to hold a screen.

### Verified at 1440

Hero 774px on a 900 viewport, cream printed ground, `h1` "Let's Talk / Dabba.", email
link, phone link, 5 socials, 7 buttons, wave into paper, 4 sections, no horizontal
overflow. No dabba platter, and none of the three old stats appear anywhere in the hero
(`135+`, "regional cuisines", "delivery fee" all absent) - "years of" survives only in the
footer, which is its own copy.

A note on counting: `textContent` reported the email 13 times, which is Next's RSC payload
`<script>` carrying every `mailto:` href on the page. Counting visible text nodes only -
walking the tree and rejecting `SCRIPT`/`STYLE` - gives the real answer, 2 in `main`: the
hero, and the note under the sign-up that names the address on purpose.

eslint + `tsc --noEmit` clean, production build passes.

## 2026-09-08 - Contact: the band takes the doc's copy, and matches the cards' height

Two corrections to the Contact page, both the client's.

### The copy is the word file's, not the live site's

The band was carrying the live site's "THE WAITLIST / Don't Just Watch History. Be Part of
It." The client wanted the **layout** from that band, not its words.

The doc's own equivalent block is section 9's **"Subscribe and Forget - Contact -
Registration"**, so that is what the band carries now: the "Subscribe and forget" kicker,
"The Best Lunch Decision Is / The One You Only Make Once.", the "no daily ordering, no
'what's for lunch' panic at 11:45" paragraph, the "Fresh Food - Fair Price - Free
Delivery / Every day, without you having to think about it twice." strip, and the doc's
CTA, "Set It and Forget It".

That copy was already the page's separate red closing section, so **the duplicate is
gone** - it now appears once, in the band, and the band closes the page. Four sections
instead of five: hero, For Customers, For Business, Subscribe and Forget.

`WaitlistForm` -> `SubscribeForm`, with the doc's CTA on the submit and a mail subject to
match.

Kept from the live-site band, and only these: the photo wall, and the "Launching Soon -
Perth's corridor opens 14 September 2026" card. The date is not marketing copy, it is the
same fact the hero seals already state.

### The wall matches the cards beside it

It was a fixed `clamp(320px, 58svh, 560px)` against a content-height column, so it sat
short and centred.

`h-full` will not do it: with an indefinite parent that resolves to `auto`, which is the
wall's own ~2000px of photographs, and the row blows up. So from `lg` the wall **fills its
grid item absolutely** - it takes whatever height the cards come to and contributes
nothing back.

It must NOT be absolute below `lg`. With an explicit `height` set, the `bottom: 0` of
`inset-0` is ignored, so on the stacked layout the wall overflowed its own item by ~170px
and rode over the cards underneath. Caught by measuring; `lg:absolute` only.

### Verified

Wall height equals the right-hand column exactly, with tops aligned, at **1920, 1440 and
1024** (547 / 547 / 627). At **1000 and 390**, where the layout stacks, the wall is back
in flow, overflows its item by **0**, and does not overlap the column below it. No
horizontal overflow at 390.

Every line of the doc's block is on the page (checked case-insensitively - `.poster` and
the button are `text-transform: uppercase`, and `innerText` applies that, which is why a
case-sensitive check reported three false negatives). All three live-site strings are
gone. "The Best Lunch Decision Is" appears exactly once in the visible DOM - a second
`textContent` hit is Next's RSC payload `<script>`, not rendered copy.

15 buttons, all at 15px.

eslint + `tsc --noEmit` clean, production build passes.

## 2026-09-08 - Contact Us built. All nine pages are now real.

Section 9 of the content doc, in its own order, plus the waitlist band the client asked
for from their live site.

1. **Hero** - "Let's Talk / Dabba." on the shared `PageHero`
2. **For Customers** - the doc's four routes, the email, the phone, the five socials
3. **The Waitlist** - the client's live-site band: photo wall left, waitlist and launch
   cards right
4. **For Business** - "Beyond the Dabba: Corporate & Global", the doc's four lines
5. **Subscribe and Forget** - "The Best Lunch Decision Is the One You Only Make Once."

Grounds run cream -> paper -> cream -> paper -> red, so no two adjacent sections share one.

### Every route arrives sorted

Each of the four customer topics opens a mail with **its own subject line** - "Orders &
Plans", "Meal & Menu Questions" and so on - rather than everything landing in one
unlabelled pile. Same for the corporate CTA.

### The photo wall

Two columns of the `about/net-*` documentary photographs sliding past each other behind
the waitlist card, cropped by the panel and faded top and bottom so the crop does not
read as a cut.

Each column renders its list **twice** because the keyframe travels -50%; that is what
makes the loop seamless, and the second pass is `aria-hidden` so the photographs are not
announced again. The two columns run in **opposite directions** (`--wall-dir`) at
different durations (58s and 46s) - matched directions read as one grid scrolling,
opposed directions read as a wall. `transform` only, paused on hover and on
`focus-within`, parked under `prefers-reduced-motion`.

### The waitlist form, and what it does NOT do

There is no list provider wired to this site, so the form does the one thing that works
without a backend: it hands the address to the brand's inbox as a pre-filled email.

**Nothing pretends to have subscribed anyone.** The note under the input says so before
you submit ("No list software here yet, so this opens an email to ...") and after
("We've opened an email ... send it and you're on the list"), in an `aria-live` region.
That copy is the one thing on the page that is not the client's - everything else is the
doc's or the live site's.

>>> Replace `WaitlistForm`'s submit handler with a real provider before launch. The
markup can stay as it is. <<<

The submit control is a hand-rolled `button[type=submit].btn` rather than the shared
`Button`: a submit inside a form has to stay a real submit, and `Button` would render it
as a link. Same classes, so it matches every other button.

### Verified at 1440

5 sections with the intended grounds, all five headings present. Wall 522px tall, masked
top and bottom, 2 columns animating `wall-scroll` at 58s/normal and 46s/reverse, 20
images (10 unique, doubled). Form has its email input, its submit is a real
`button[type=submit].btn`, and the live note reads correctly. 17 buttons, **all at 15px**.
No horizontal overflow.

`/contact` was the last "coming soon" stub. `ComingSoon` is now unused by any route -
left in place rather than deleted, in case a new route needs it.

eslint + `tsc --noEmit` clean, production build passes.

## 2026-09-08 - Checkered print off the Regional Food Stories wave

The grid was showing on the paper above the red closing band, with a hard horizontal edge
where it started. That edge is the tell: the print was confined to the wave band.

`<WaveDivider tone="bg-paper" />` was textured while the section above it is plain
`bg-paper` with **no print at all** (`backgroundImage: none`, confirmed on the live node).
Carrying the grid through the curve therefore put an isolated 150px patch of it inside the
band and ruled a line along the band's own top edge. `WaveDivider`'s own doc warns about
this case - textured is only correct when the section above is printed too. Now
`textured={false}`.

Verified: the band computes `background-image: none` on flat `bg-paper` with its clip path
intact, and the paper strip above the curve renders clean.

**Left alone on purpose:** the wave on `/whats-cooking-tomorrow`, which is still textured.
There the section above IS a printed `bg-brand-cream`, so the grid runs continuously
through the curve - which is the behaviour asked for earlier ("continuous rakho"), not a
patch. Say the word if that one should go flat too.

eslint clean, production build passes.

## 2026-09-08 - Exit dropped lower on the postcard

`EXIT_CARD_FRACTION` 0.38 -> **0.58**, on the client's note to take the line a bit lower.
The exit y moves 1819 -> **1874** at desktop, so it leaves the card's right edge just past
its middle rather than in the upper third.

Note on the two fractions: the component measures the card from `offsetTop`/`offsetHeight`,
which is its UNROTATED box, while a `getBoundingClientRect` check sees the rotated one -
the postcard is tilted. So a target of 0.58 lands at 0.45 of the visual card. Same
geometry, two different boxes; worth knowing before chasing the difference.

Verified at 1920 / 1440 / 390: still gets past the card's right edge (1032, 365 and 1035
respectively), still exits the drawable edge, boxes still agree, and it stays inside the
card vertically and clear of the "Aus Perth" mark at every width - 1874 against a mark at
2033 on desktop, 1791 against 1887 on mobile.

eslint clean, production build passes.

## 2026-09-08 - The flight leaves through the postcard's right-hand side

Third attempt at this, and the first that does what was asked. The client marked a
screenshot showing the line carrying on rightward across the card at about its upper
third and leaving through the right side.

I misread that mark as a rendering bug and spent a round telling them it was a stale
build instead of looking at it properly. It was an annotation.

### What was actually blocking it

The postcard's right edge sits **~9px from the corridor's own edge**. There was no canvas
to the right of it, so every attempt had to route around the card instead of past it:
diving to `perthBottom + 62` crossed it diagonally and surfaced over the caption, and
clearing it above `cardTop` never reached the right-hand side at all.

The fix is to make the canvas wider, not to move the line. **The SVG now borrows the
gutter** - the space between the 1040px corridor and the section's edge - by widening its
box and its viewBox together by the same amount. One SVG unit stays one corridor pixel, so
the path still meets the cards; `left: 0` is unchanged, so all the extra width lands on the
right, which is where the flight needs it. Capped at `MAX_GUTTER` 260.

The exit then crosses the card at `EXIT_CARD_FRACTION` (0.38) of its measured height, runs
out through its right edge into the gutter, and overshoots the drawable edge by 40 so the
SVG's `overflow: hidden` takes the plane away. It passes *behind* the postcard on the way,
which is already how the line relates to every other card here (line z-index 1, cards 3
and 5).

The card's full box is measured now, not just its top - its offset inside the node moves
with how the badge wraps, and its height moves with the image.

### Verified, five widths

| viewport | corridor | gutter borrowed | boxes agree | past the card's right edge | exits drawable edge | crosses at |
|---|---|---|---|---|---|---|
| 1920 | 1040 | 260 | yes | yes, at (1033, 1793) | yes | 0.25 |
| 1440 | 1040 | 193 | yes | yes, at (1049, 1801) | yes | 0.39 |
| 1000 | 961 | 12 | yes | yes, at (951, 1815) | yes | 0.25 |
| 830 | 791 | 12 | yes | yes, at (785, 1814) | yes | 0.25 |
| 390 | 366 | 12 | yes | yes, at (372, 1761) | yes | 0.39 |

Sampled 801 points along the path each time. Below ~1050px the gutter is only 12px, so the
run to the right of the card is short before it clips - there is no space there to borrow,
and at those widths the section edge *is* the viewport edge.

### Verification honesty

This is measured, not seen. The preview pane would not paint the isolated Perth area on
any of several attempts, and the plane's position is smoothed through a `requestAnimationFrame`
tick which the pane never runs. Geometry, boxes and the path/card intersection are all
confirmed numerically; the sweep itself still wants a real browser.

eslint + `tsc --noEmit` clean, production build passes.

## 2026-09-08 - The flight leaves above the Perth postcard, not through it

The exit was crossing the postcard. It swept from the touchdown pin down to the
right-hand edge, and the card spans **x 581..1031 of a 1040-wide corridor**, so a descent
on that side runs diagonally straight through it - the plane came out over the "Aus
Perth" mark and the caption, which is what the client saw.

Going down the card's right-hand side is not available: its right edge sits **~9px** from
the corridor's own edge. So the flight leaves **above** it instead - it reaches the
touchdown pin, sweeps right, and is off the frame before the card's top edge.

`EXIT_DROP` is now clamped against the card:
`y = min(arrival + 60, cardTop - 14)`, and the card's top is **measured** (its offset
inside the node moves with how the badge wraps), same as the node's bottom already was.
The corridor takes `max(exitY, perthBottom)` - with the exit above the card it is the node
that sets the height now, not the flight.

### Verified, five widths

Sampled **401 points along the whole path** and tested each against the postcard's box:

| width | corridor | postcard box | path end | exits right | points inside the card |
|---|---|---|---|---|---|
| 1920 | 2137 | 581..1031 x 1747..2032 | (1230, 1699) | yes | **0** |
| 1440 | 2137 | 581..1031 x 1747..2032 | (1230, 1699) | yes | **0** |
| 1024 | 2137 | 526..975 x 1747..2032 | (1175, 1699) | yes | **0** |
| 820 | 2137 | 322..771 x 1747..2032 | (971, 1699) | yes | **0** |
| 390 | 1982 | 202..365 x 1749..1885 | (556, 1698) | yes | **0** |

viewBox and both boxes agree at every width. The exit clears the card by 48px at desktop.

Plane travel at 1440: 220 -> 738 -> **1230**, past the 1040 edge by 75% of the track, and
gone for the rest of it - which is the Perth postcard's reading time.

The section is now **2260** at desktop, from 2463 before any of this.

Still measured rather than seen: the preview pane serves no rAF frames and the plane's
position is smoothed through a rAF tick, so the sweep itself wants a real browser.

eslint + `tsc --noEmit` clean, production build passes.

## 2026-09-08 - The flight path exits the frame, and the tail padding comes off

Two things asked for on the journey timeline: the line should carry on to the right after
the Perth image and let the plane fly out, and the empty run of page after it should go.

### The exit

The path used to stop at `x = W - cardWidth` - inside the frame - so the plane arrived at
the last pin and parked there. It now continues past the Perth node and off the
right-hand edge of the viewBox, and `.flight-svg` is `overflow: hidden` (it was
`visible`), so the plane flies out through that edge and is gone.

This is the same technique the live site uses, which the client pointed at as the
reference. Checked against it: `mumbaidabbawala.com.au` runs its `#run-path` to
`x = 1929` inside a `0 0 1728 2400` viewBox - **201 units past the edge** - with
`overflow: hidden` on the SVG. Ours goes 190 units past. Same idea, same magnitude.

The exit descends rather than running flat, and it has to: the plane's position is
`lengthAtY(progress x corridorHeight)`, a binary search over y. Every point on a
horizontal run shares one y, so the search would return the first of them and the plane
would stop dead at the start of the run and never travel it.

### The regression in the middle of this, and what caused it

The first attempt read the path's old end - `y = 1674` - as the end of the whole thing
and cut the corridor down to 1800. **1674 is where `.corridor-node--perth` starts.** That
node is the Perth arrival postcard, absolutely positioned at `top: 1674px` and ~423px
tall, and the 2230 corridor was not dead space at all - it was holding it. Cutting the
corridor left the Perth postcard hanging **349px outside it and across the section
below**, which is what the client saw.

The measurement that missed it only queried `.timeline-postcard`. The Perth arrival is a
`.corridor-node`, like Mumbai, so it was not in the set. The check now sweeps
`.timeline-postcard, .corridor-node` and compares against both the corridor's bottom and
the next section's top.

### The corridor's height is now derived, not written down

It used to be a hardcoded 2230 in **three** stylesheet places - the base
`.flight-corridor`, the `max-width: 768px` override, and `.flight-svg { height }` -
against one constant in the component. The mobile copy went stale the instant the desktop
value moved, which is exactly the drift the comment in `globals.css` warned about, and it
stranded the plane mid-exit on mobile because the corridor stopped short of the path.

Now the component computes it from the path's own exit and sets it inline on both boxes,
and the stylesheet holds no height at all. The Perth node is **measured** (`offsetTop +
offsetHeight`, with a `ResizeObserver` because its image lands after first paint) rather
than assumed - it is 423px at desktop and 268px on mobile, so a single constant could
never have served both.

### The padding

`.journey-flow`'s tail padding went from `--space-phi-6` to `--space-phi-3` (89 -> 21),
and from `--space-phi-7` to `--space-phi-4` (144 -> 34) from 640px up. Together with the
tighter corridor the section is **2463 -> 2322** at desktop and **2306 -> 2120** on
mobile.

### Verified, five widths

| width | corridor | viewBox agrees | Perth node bottom | spill out of corridor | clear of next section | exits right |
|---|---|---|---|---|---|---|
| 1920 | 2199 | yes | 2097 | none (76px inside) | 110px | yes |
| 1440 | 2199 | yes | 2097 | none | 110px | yes |
| 1024 | 2199 | yes | 2097 | none | 110px | yes |
| 820 | 2199 | yes | 2097 | none | 110px | yes |
| 390 | 2044 | yes | 1942 | none (75px inside) | 96px | yes |

**No overlap at any width.** The plane's own travel reads 220 -> 770 (the Perth arrival at
y 1674) -> **1230**, past the 1040 viewBox edge, by 95% of the track.

**Not seen, only measured:** the exit as motion. The preview pane serves no
`requestAnimationFrame` frames, and the plane's position is smoothed through a rAF tick,
so the in-between positions cannot be sampled here and the deep-page screenshots come
back blank. Endpoints and geometry are confirmed; the sweep itself wants a real browser.

eslint + `tsc --noEmit` clean, production build passes.

## 2026-09-08 - Buttons drop the gradients: flat colour on both sides

The client did not want the gradients at all, and named the two pairs: cream hovers to
red, red hovers to orange. Every variant is now one flat colour at rest and one flat
colour under the cursor.

| variant | rest | hover | label rest -> hover |
|---|---|---|---|
| `red` | brand-red | **brand-orange** | cream -> cream |
| `orange` | brand-orange | **brand-red** | cream -> cream |
| `cream` | brand-cream | **brand-red** | red -> cream |
| `paper` | paper | **brand-red** | red -> cream |
| `yellow` | brand-yellow | brand-cream | red -> red |
| `outline` | (sweeps in) brand-red | - | red -> cream |
| `outlineCream` | (sweeps in) brand-cream | - | cream -> red |

`yellow` keeps its pair for the reason recorded before: it exists for the brand-red
bands, where a red button disappears into the ground.

Nothing else about the button changed - the skewed panel, the wipe, the 15px radius, the
`:disabled` and reduced-motion guards all stand. The variants were only ever four custom
properties each, so this is a colour edit and no structural one.

### Verified

**Zero gradients left** on any of the 14 buttons on the home page - `background-image`
computes to `none` on every box and every `::before`. Rest and hover colours read as flat
values: primary `rgb(243, 98, 32)` -> `rgb(175, 20, 17)`, secondary `rgb(252, 243, 205)`
-> `rgb(175, 20, 17)` with the label going to `rgb(252, 243, 205)`, panel swept to
`+244px`. Confirmed on a real `:hover`, not just from the stylesheet.

Note: the "More than a meal" statement band's word chips still use gradients. Those are
not buttons and were left alone - say the word if they should go flat too.

eslint clean, production build passes.

## 2026-09-08 - Button hovers run to red, not yellow

The client pointed at the hero's secondary button mid-hover - cream running to yellow -
and asked for red there instead. Applied wherever yellow was the destination:

| variant | reveal was | reveal now | label |
|---|---|---|---|
| `cream` | cream -> yellow | **red -> orange** | red at rest, cream on hover |
| `orange` | orange -> yellow | **orange -> red** | cream throughout |
| `outlineCream` | cream -> yellow (sweep) | **cream -> paper** | unchanged |

The `cream` change turns that button into a clean inversion: cream with red type at rest,
red with cream type under the cursor. The `orange` change also drops a wart - its reveal
ran into yellow, which forced the label to flip to ink halfway to stay legible; running
to red keeps it cream the whole way.

`outlineCream` sits on the brand-red bands, so its sweep has to stay pale - red there
would vanish into the ground behind it. Its yellow half became paper.

**One yellow stays on purpose:** the `yellow` variant, which exists for those same red
bands. A red button on a red section is invisible. Its own reveal runs yellow -> cream, so
there was no yellow-against-red to swap. Noted in the stylesheet next to it.

Verified by hovering for real: the `cream` button's panel sweeps to `+244px`, the box
underneath reads `linear-gradient(to right, rgb(175,20,17), rgb(243,98,32))` and the label
computes to `rgb(252,243,205)`. No yellow anywhere in the frame.

eslint clean, production build passes.

## 2026-09-08 - One button for the whole site, at a 15px radius

The client picked a Uiverse button (uiverse.io, by adamgiebl) and asked for every button
on the site to be that button, with a 15px radius throughout.

### The mechanic

The button's box carries a gradient; a `::before` panel skewed 30deg covers it at rest;
on hover the panel slides out of the way and uncovers the gradient. The label lives in a
`> span` above it on `z-index` - which is also where the padding sits, because `::before`
fills the button box and padding on the button itself would push the panel around instead
of the text.

Two deliberate departures from the original:

- **Colour.** The original's purple (`#8e2de2 -> #4a00e0`) is not a brand colour. Each
  variant is now four custom properties - a rest colour, a reveal gradient and a label
  colour per state - all drawn from the palette. Seven variants: `red`, `orange`,
  `yellow`, `cream`, `paper`, `outline`, `outlineCream`.
- **The skew survives the slide.** The original sets `transform: translate3d(100%,0,0)`
  on hover with no `skew`, so the panel straightens as it leaves. Keeping the skew makes
  it a clean wipe.

**Outline variants cannot work by uncovering** - there is nothing under a transparent
button - so they invert: the panel waits off-canvas to the LEFT and sweeps IN on hover,
label flipping to suit. Same language, opposite direction.

### The plumbing

`globals.css` gets the `.btn` system (~150 lines, including a `:disabled` guard that
freezes the wipe in both directions, `:focus-visible`, and a reduced-motion block).
`src/components/Button.tsx` assembles the classes and the required `<span>`, and exports
`Button` (renders `next/link` with `href`, otherwise a real `<button>` with
`type="button"`) plus `IconButton` for the square controls.

Three sizes, which are the three the site was already using by hand: `sm` in the heroes,
`md` for most CTAs, `lg` for the closing ones on the red bands.

**28 hand-rolled pills across 21 files** are gone. `rounded-full bg-brand-red px-7 py-3.5
text-[11px] font-bold uppercase tracking-[0.18em] text-brand-cream transition-transform
duration-300 hover:-translate-y-0.5`, repeated with small variations everywhere, is now
`variant="red" size="md"`.

### A conversion bug worth recording

The first sweep classified variants with `'bg-brand-red' in className`. Outline buttons
carry `hover:bg-brand-red`, so **every outline CTA was silently converted to a filled
one** - six of them. The classifier now strips any class containing `:` before matching,
so only base classes decide the variant. Caught by reading the conversion report rather
than the diff, which is the only reason it did not ship.

(Recovering from it cost the CSS too: `git checkout -- src/app ...` to revert the
mis-converted pages also reverted `src/app/globals.css`, taking the new `.btn` block with
it. Re-added.)

### What did NOT get the wipe

Deliberately - a sweep under a page number or inside a segmented control is noise. These
came onto the 15px radius and nothing else:

- the header's hamburger, and the nav links (navigation, not buttons)
- blog pagination (its active state is a fill)
- the menu's two segmented controls - outer 15px, segments **11px**, so the inner corners
  sit concentric with the outer ones (15 minus the 4px of `p-1`)
- the blog and menu toolbar inputs, which sit directly beside the buttons

Badges, tags, status dots and the radial glows keep `rounded-full` - they are not buttons.
The review deck's progress dots stay round for the same reason.

### Verified in the browser

Every page: **every `.btn` computes to exactly `15px`**, and zero clickable elements over
90x28 are left pill-shaped.

| page | buttons |
|---|---|
| `/` | 14 |
| `/plans` | 15 |
| `/menu` | 12 |
| `/about` | 11 |
| `/regional-food-stories` | 20 |
| `/whats-cooking-tomorrow` | 12 |
| `/chefs-corner` | 8 |
| `/blog` | 7 |
| `/blog/[slug]` | 11 |

All 23 `.btn` rules confirmed present in the cascade, including the `@media (hover: hover)`
block and the `:disabled` guards. Structure checked on live elements: `position: relative`,
`overflow: hidden`, span at `z-index: 10` with `14px 28px` padding, `::before` skew matrix
`0.57735` (= tan 30deg).

**The wipe was hovered for real**, not just read: on `:hover` the filled button's
`::before` went from `translateX(0)` to **`translateX(368.316px)`** - 115% of its own
width - and the button went from flat red to the red->orange gradient in the screenshot.
The outline button beside it stayed parked at `-224px`, untouched.

eslint + `tsc --noEmit` clean, production build passes.

## 2026-09-08 — Statement band back to a horizontal scroll pan, on a pin that works

The client wanted the horizontal band all along. It failed the first time because of the
sticky bug, not because horizontal was the wrong idea — so with the pin now genuinely
holding, the pan is back, plus the two things it was missing.

### The holds

The pan no longer runs the full length of the track. `HEAD = 0.06`, `TAIL = 0.15`, so it
starts a moment after the band pins and **finishes at 85% of the track**:

- the head hold leaves the opening words still before anything moves;
- the tail hold is the point of the exercise — it keeps "...and delivered to Perth." on
  screen after the pan completes, so the end of the line can be read. Without it the pan
  and the pin end together and the last words arrive exactly as the band lets go. That
  was "the line never finishes".

### Two measurement bugs, both the same shape

`travel` was measured as `row.scrollWidth - row.clientWidth`, and it came back **short
twice**, each time stopping the pan early and leaving "Perth." inside the right-hand
fade at the exact moment it was supposed to be readable:

1. With `px-[14vw]` on the row: `scrollWidth` **does not count the trailing padding** of
   overflowing content. Measured 3283 where 3494 was needed.
2. Replacing the padding with a trailing flex spacer did not fix it either — 3296, only
   13px better. `scrollWidth` on the row was not picking up the overflowing flex child.

Fixed by measuring the thing itself: `w-max` on the line, and `travel =
line.offsetWidth - row.clientWidth`. The line's own box **is** the content width,
spacers included, and nothing has to be inferred. 3507 at 1440, and "Perth." now lands
at 933–1210 against a fade that starts at 1325.

Both lead-in and lead-out are real flex children rather than padding, since that is what
survives measurement, and 14vw against an 8% fade is what clears the mask at both holds.

### Verified at 1440x900

`travel` 3507, section 3120 (~3.5 viewports). **Sticky pinned at `top: 0` at all eight
progress points.** Pan tracks to within 1px of `-travel x panned` throughout:

| progress | panX | expected | bar |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0.06 | 0 | 0 | 0 |
| 0.25 | −844 | −843 | 0.24 |
| 0.45 | −1732 | −1731 | 0.49 |
| 0.65 | −2620 | −2619 | 0.75 |
| 0.85 | **−3507** | −3507 | 1.00 |
| 0.93 | −3507 | −3507 | 1.00 |
| 1 | −3507 | −3507 | 1.00 |

"More" sits at x 214 at the head hold, clear of the 115px left fade. "Perth." ends at
1210 at the tail hold, clear of the 1325px right fade. Page horizontal overflow 0.

At 390x844: 22px type, travel 1885, section 2037 (2.4 viewports), pin holding, both ends
clear of their fades, pan completes, no page overflow.

### A note on verifying this

`window.scrollTo()` in the hidden preview pane **does not reliably emit a scroll event**,
so a programmatic sweep reads stale transforms and the pan looks broken when it is not —
the first sweep showed `panX` stuck at 0 through 65% of the track. Dispatching
`new Event("scroll")` after each jump gives correct readings. Worth remembering: two
separate "bugs" this session were the harness, not the code (this, and reading a stale
`offsetTop` while images settled above the band).

**Not verified:** the reduced-motion branch, which renders the wrapped, unpanned form.
The pane cannot emulate the preference.

eslint + `tsc --noEmit` clean, production build passes.

## 2026-09-08 — The statement line now emerges on scroll, and sticky actually sticks

The client asked for the line to emerge **on scroll**, not on a timer. The reveal is now
scrubbed against scroll progress: the section is a `240svh` track with a `position:
sticky` child, and as you scroll through it the sentence writes itself in word by word,
left to right. The pin holds until the last token lands, and the finished line then holds
for the rest of the track.

Nothing pans. The sentence still wraps and sits still — that part of the earlier fix
stays, because panning is what stopped the line ever finishing.

### The bug underneath all of this: sticky was never sticking

Worth recording, because it silently broke two versions of this section and cost the
most time.

`position: sticky` had **no effect at all**. Measuring
`sticky.getBoundingClientRect().top` across the track gave 0, −252, −504, −756, −1008,
−1260 — the "pinned" band was riding straight up with the page. Both the panned version
and the first scrub version were built on a pin that did not exist, which is a large part
of why the band never read right.

Two causes, found in order:

1. `overflow-hidden` on the section itself. An ancestor with `overflow: hidden` becomes
   the sticky element's scroll container; that box does not scroll, so the child stops
   sticking. Moved the clip onto the sticky child, where it is wanted anyway to keep a
   token still in the air from bleeding into the section above.
2. **`overflow-x-hidden` on the home page wrapper** — the real culprit, and it would have
   broken `sticky` for *any* section on the page. Changed to **`overflow-x-clip`**, which
   clips identically but does **not** create a scroll container. Page horizontal overflow
   is still 0 at 390 afterwards, so the containment it was there for is intact.

The other pages still wrap in `overflow-x-hidden`. Nothing on them uses `sticky` today,
but the same one-word change is waiting there if anything ever does.

### How the scrub works

- Progress comes from the section's own rect each scroll, so it stays correct however the
  page reflows above it — which matters here, because images settling higher up move this
  section while it is being measured.
- Token `i` starts emerging at `(i / n) * 0.72` and takes `0.16` of progress to arrive.
  That spread leaves the last ~10% of the track as a hold on the completed line, and puts
  about five tokens in flight at any moment, so it reads as a rolling wave rather than a
  queue.
- Each token gets `opacity` plus a `translate3d` in **em**, so the travel scales with the
  type at every breakpoint. Chips fall `-2.6em`, plain words `-0.7em`, keeping the
  reference's hierarchy of highlight-as-event.
- The row settles out of `scale(1.05)` across the first quarter of the track.
- Values are written **straight to the DOM**, never through React state — 25 tokens
  re-rendering per scroll frame would be a re-render storm. A `last`-progress guard makes
  every scroll event outside the band a single float compare instead of 50 style writes.
- `globals.css` puts **no transition** on the tokens on purpose: a transition would lag
  behind the scrub and smear the reveal. Tokens are visible by default and JS takes them
  away on mount, so with no JS — or under `prefers-reduced-motion: reduce`, where the
  effect returns early — the sentence is simply all there.

### Verified at 1440x900

Section 2160 (240svh). **`stickyTop` is 0 at every one of seven progress points** — the
band is genuinely pinned now. Reveal tracks scroll:

| progress | landed | in flight | hidden |
|---|---|---|---|
| 0 | 0 | 0 | 25 |
| 0.2 | 2 | 5 | 18 |
| 0.4 | 9 | 5 | 11 |
| 0.6 | 16 | 5 | 4 |
| 0.8 | 23 | 2 | 0 |
| 0.9 | **25** | 0 | 0 |
| 1 | 25 | 0 | 0 |

Page horizontal overflow 0. A mid-reveal frame at 55% shows the sentence landed through
"home —", "freshly" caught in the air above its mark, "prepared," faint below it, and
everything after still hidden.

**Not verified:** the reduced-motion branch, as before — the preview pane cannot emulate
the preference.

eslint + `tsc --noEmit` clean, production build passes.

## 2026-09-08 — Statement band rebuilt: the line completes, and the motion is techinfinity’s

Replaces the scroll-panned version committed earlier the same day. Two things were
wrong with it, and the client was right about both.

### The line never finished

The pan and the pin ended at the same instant, so the last words of the sentence arrived
exactly as the sticky released and the section scrolled away. You could never read the
end of the line.

### It was the wrong animation entirely

The techinfinity band is **not** a scroll scrub. It is a Framer Motion `whileInView`
stagger that plays once and settles — sampling its transform across 1200px of further
scroll returns identical values. What it actually does:

| | reference | ours |
|---|---|---|
| entrance | chips `translateY(-500px)` → 0, staggered | chips `-3.1em` → 0, plain words `-0.7em` → 0 |
| stagger | ~0.12s over ~6 chips | 38ms over 25 tokens |
| easing | `back.out(1.4)` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| row | perspective-scales to rest | `scale(1.08)` → `scale(1)`, 1s `power3.out` |
| chips | 16px radius, 24px padding, gradient grounds, individually rotated | `0.28em` radius, `0.34em` padding, gradient grounds, per-chip tilt |
| after | holds | holds |

So: **no track, no pin, no pan.** The sentence wraps and sits still, complete and
readable, and the whole thing is a one-shot entrance.

### Built with no dependency

All of the motion is in `globals.css` under `.statement`, keyed off a single
`data-shown` attribute. The stagger is per-token `transition-delay`; the two travel
distances arrive as `--drop`. The only JS is the IntersectionObserver that sets the
attribute, with `Reveal`’s 2500ms failsafe so the sentence can never stay hidden.

Only `opacity` and `transform` animate, so the cost does not grow with the length of the
sentence — which matters at 25 tokens. GSAP was not added; the reference is a
ScrollTrigger recreation of a Framer effect, and this is ~45 lines of CSS.

### Measure

Chips take gradient grounds now rather than flat fills, mapped onto the brand — the
client’s artwork uses pastel pink and lavender, so those two become brand-red → orange
and green-dark → green. Six gradients, all primary palette plus the two accent greens.

The type and the measure are set **together**: `max-w-[86rem]` with
`text-[clamp(19px,2.5vw,36px)]`. The first cut used `max-w-[64rem]` at up to 44px and
broke the sentence over **six** lines, which reads as a paragraph. It is now four at
1440. The client’s artwork sets it over two, but two would need ~2500px of line at this
weight — not available at any real viewport.

### Stickers on a dark ground

Two were sized and shadowed for a light ground and sank into the ink: the steel tiffin
(1.45em → **1.95em**) and the Perth Bell Tower (1.5em → **2.2em**). The dark
`drop-shadow` did nothing on ink either, so image stickers now carry a **light halo**,
`drop-shadow-[0_0_0.26em_rgba(252,243,205,0.4)]`.

### Verified at 1440x900

Section exactly **900** — one screen. **4** visual lines, no horizontal clipping
(`scrollWidth === clientWidth`), last token "Perth." fully inside the section and the
viewport, so **the line finishes**. 25 tokens, 11 gradient chips, 6 image stickers all
loaded, `data-shown="true"`, row transform settled to identity and both the first and
last token at `opacity: 1`.

**Not verified:** the staggered entrance as motion. The preview pane is hidden, which
pauses animation; what is confirmed is the rest state and that the transitions complete.
The stagger, the overshoot and the row settle want a look in a real browser.

**Also still not verified:** the `prefers-reduced-motion: reduce` branch, which lands
everything at rest with `transition: none`. The pane cannot emulate the preference.

eslint + `tsc --noEmit` clean, production build passes.

## 2026-09-08 — "More than a meal" statement band, scroll-panned

A new section on the home page, `DabbaCarries`, for the client’s line:

> "More than a meal, every dabba carries tradition, care, familiar flavours, and the
> feeling of home — freshly prepared, carefully packed, and delivered to Perth."

It sets as **one very wide row that pans left as you scroll past it**, following the
techinfinity band the client linked. Sits between `StandFor` and `NeverJustLunch`, on
ink, so the page runs ink → cream → ink → paper → paper → red → paper → cream and no two
adjacent sections share a ground.

### How the scrub is built

- The section is a tall **scroll track**; the visible band is a `position: sticky` child
  one viewport high. **Sticky does the pinning** — no JS holds an element in place,
  nothing fights the browser’s scroll anchoring, no layout is written per frame.
- Per scroll, JS writes exactly two things: one `translate3d` on the row and one
  `scaleX` on the progress rule. Both are compositor properties.
- **No rAF loop.** Scroll events already fire at frame rate, and a rAF loop would keep
  spinning while the band is nowhere near the viewport.
- **No GSAP.** The reference is a GSAP/ScrollTrigger pattern, but it is ~70 lines of
  sticky + one transform here, and the repo has no animation dependency to justify.
- The track height is **derived from the row**, never guessed:
  `height: calc(100svh + travel/1.6 px)`, where `travel = row.scrollWidth -
  row.clientWidth`. Change the copy or the type and the pacing holds. Measured at 1440:
  travel 4210 → section 3531 (900 + 2631). At 390: travel 1989 → section 2087.

The **edge mask** is what makes it a *reveal* rather than a slide — words fade up as
they arrive from the right and fade out at the left, so the row has no hard ends. The
row’s `px-[16vw]` lead-in and lead-out is sized to clear that 10% fade, so the first
word is fully lit at rest and the last one still is when the pan finishes.

### A bug worth recording

The first cut keyed `scrubbing` off `travel > 0`. That cannot work: with `travel` at its
initial `0` the row renders **wrapped**, a wrapped row has no horizontal overflow, so
`scrollWidth - clientWidth` measures `0` and the scrub could never switch itself on.
`scrubbing` now keys off the motion preference alone, so the row is always laid out
`nowrap` when it is going to be panned, and `travel` measures something real.

### Chips and stickers

11 highlighted words, 9 stickers, tokenised in `DABBA_CARRIES` in `src/data/home.ts`.
The client’s reference used pastel **pink and lavender**, neither of which is a brand
colour; those two map onto **brand-red** and **brand-green-dark**, so the six chip
grounds are all primary palette. Stickers reuse existing assets — the butter chicken
bowl, the tiffin dabba, a grayscaled `net-05` snapshot in a pale border for the
reference’s photo tile, chilli and curry-leaf cut-outs, the Perth landmark — plus three
drawn glyphs (heart, house, parcel) in brand-yellow. No new artwork was generated.

### Verified

Pan tracks scroll **to the pixel**, at both widths, reading the row’s computed matrix at
five scroll positions:

| progress | 1440 panX / expected | 390 panX / expected |
|---|---|---|
| 0 | 0 / 0 | 0 / 0 |
| 0.25 | −1052 / −1052 | −497 / −497 |
| 0.5 | −2105 / −2105 | −995 / −994 |
| 0.75 | −3157 / −3157 | −1492 / −1492 |
| 1 | −4209 / −4210 | −1989 / −1989 |

Progress rule tracks 0 → 0.33 → 0.66 → 1. Mask applied to the pan window. 8 sections,
band ground `rgb(42, 24, 16)`, sticky child exactly 900 at 900, 11 chips, 9 stickers,
all words present in order, no page-level horizontal overflow at 390.

**A note on that verification.** The first mobile run appeared to fail — progress 0.5
read as 0.767 — but the fault was in the test, not the component: it computed all five
scroll targets from one `offsetTop` read up front, and images settling above the band
moved the section underneath it. The component reads `getBoundingClientRect()` live on
every scroll, so it is immune; re-reading the position per iteration gave exact numbers.

**Not verified:** the `prefers-reduced-motion: reduce` fallback (no track, no sticky, no
scrub — the sentence just wraps). The preview pane cannot emulate the preference. The
branch is a single boolean and was code-reviewed, but it wants a look in a real browser
with the OS setting on.

### One for the client

"freshly prepared, carefully packed" now appears twice on the home page — here, and as
the third beat of the "It’s Never Just Lunch" ladder further down, which is the content
doc’s own wording. Worth deciding which one keeps it.

eslint + `tsc --noEmit` clean.

## 2026-09-08 — Placeholder reviews for previewing the deck, and click-to-centre

### Four invented reviews, behind a flag

The content doc only supplies three reviews, so the deck could never be judged in the
state it was actually built for. `src/data/home.ts` now also holds
`PLACEHOLDER_TESTIMONIALS` — **four invented reviews, not real customers, not real
quotes** — gated behind `SHOW_PLACEHOLDER_REVIEWS`, currently `true`. The deck renders
`REVIEW_DECK`, which is the doc's three plus the placeholders while the flag is on;
flipping it to `false` leaves the three real ones and nothing else.

>>> **THE FLAG MUST BE SET TO FALSE BEFORE THE SITE GOES LIVE.** <<<

Publishing invented testimonials as genuine is misleading conduct under Australian
Consumer Law, and all four of these are invented. Each carries `placeholder: true` in
the data as a second marker, and the block above them in `home.ts` says so in full.

They are written to the doc's own lengths (82–98 characters) and rating spread (three
5★, one 4★) so the layout is being judged honestly rather than against copy that
happens to fit, and they use Perth suburbs — Northbridge, Joondalup, Canning Vale,
Subiaco — because that is the launch city. The doc's three real ones are still
attributed to Parramatta, Melbourne CBD and Box Hill, which are not.

### Clicking a card brings it to the centre

The deck now has three controls: the arrows, the dots, and the cards themselves.

It is an **overlay `<button>`** inside the `<figure>`, not a handler on the figure: a
`<figure>` is neither focusable nor keyboard-operable, and a `<button>` may not legally
wrap a `<blockquote>`. Only the two shoulder cards get one —
  - the **centre** card has none, so its quote stays selectable and clicking where you
    are already looking does nothing;
  - the **parked** cards get none either, so they never take a tab stop while invisible.

Parked cards also gained `pointerEvents: "none"`. At `opacity: 0` they were still
catching clicks aimed at whatever sat beneath them — a bug that could only appear once
the deck held more than three cards, which until now it never did.

`aria-hidden` came off the off-slot cards. Every review is real page content and should
be readable at all times; hiding four of seven from the accessibility tree to match
what is visually on top was the wrong trade.

Keys moved from `review.name` to `` `${name}-${suburb}` `` now that the list is long
enough for a first name to repeat.

### Verified at 1366×768 with the section snapped to the viewport top

- 7 cards, 7 dots, exactly **2** overlay buttons, centre card has none
- all 4 parked cards report `pointer-events: none`
- **0** quote overflow on all seven panels — the placeholder copy fits the set height
- section still exactly **768** — 0px over one screen — 10px under the header, 52px
  bottom room, everything visible
- click the right shoulder → it takes the centre and the deck re-slots around it;
  click the left shoulder → same. Both confirmed by reading which card holds `z-index: 30`

eslint + `tsc --noEmit` clean, production build passes (22 static pages).

## 2026-09-08 — Reviews rebuilt as a rotating deck, one screen, red cards

Three changes to the home page, on the reference card the client sent.

### The reviews are now an overlapping deck

`ReviewDeck` replaces the three-column grid: three cards abreast, the middle one
tilted `-6.5deg` and scaled `1.06` so it sits forward, the shoulders at `0.9` and
`±2.5deg`. It cycles every **4.2s**, so each review takes its turn in the centre and
gets the diagonal treatment — verified stepping 0 -> 1 -> 2 with the active dot
following (Priya -> Arjun -> Meera).

Built as a **single-cell CSS grid** with every card stacked in that one cell. That is
what makes it work with no measuring: the cards are centred on each other, they all
take the same height, and transforms don't affect layout, so the tilt and the scale
can't reflow the page. Shoulder offset is one `--deck-x` custom property set
responsively (60% / 70% / 78%), so one rule covers every breakpoint.

Only `transform` and `opacity` animate — both stay on the compositor. `box-shadow`
is deliberately **not** animated (it repaints every frame); one shadow value serves
all three cards and `scale()` shrinks it on the shoulders for free, which is also
what makes the centre card read as lifted.

Controls: arrows plus dots, and the rotation pauses on hover and on `focus-within`
so a review can't slide away mid-sentence. Verified held for 9.5s under hover — two
missed advances — then resumed on leave. No autoplay under
`prefers-reduced-motion: reduce`; the deck geometry and the arrows stay.

Deck supports **more than three** reviews as asked: `offsetFrom` wraps the signed
distance the shorter way round, and anything two or more slots out parks off to its
side at `opacity: 0`, ready to slide in. The doc still only gives three.

### Card colour — red panel in a white frame

The client picked this from three options. The paper frame stays; the inner panel
goes **brand-red** with the quote in **cream**, so the frame is the pale thing and
the panel is the dark thing — the reference card's photo-in-a-polaroid relationship,
and it carries at deck scale on a cream ground where cream-on-cream did not. The
yellow star sticker and the orange footer dot are unchanged. Verified computed:
frame `rgb(255,253,246)`, panel `rgb(175,20,17)`, quote `rgb(252,243,205)`.

### The section now holds one screen

`min-h-[100svh]` with `flex flex-col justify-center`, and everything that would push
it over is capped against `svh` with `min()` — the width breakpoint picks the size it
wants and a short viewport takes the smaller: heading `sm:text-[min(44px,5svh)]`,
kicker `text-[min(30px,3.4svh)]`, quote `text-[min(20px,2.1svh)]`, panel padding
`p-[min(21px,2.4svh)]`, deck padding `py-[min(48px,5.2svh)]`, card height
`h-[clamp(230px,36svh,340px)]`.

`pt-[88px]` is measured, not chosen. The header is fixed and 82px tall, floating over
whatever is beneath it, so less than that puts the kicker behind the nav; more than
that and the content box stops clearing the block at 768. `pt-24` (96px) was the
first attempt and left the section **17px over** one screen at 768.

Verified with the section snapped to the viewport top — section height exactly equal
to the viewport at every size, nothing hidden:

| viewport | section | under header | bottom room | all visible |
|---|---|---|---|---|
| 1366x768 | 768 | 11px | 51px | yes |
| 1440x900 | 900 | 37px | 79px | yes |
| 1920x1080 | 1080 | — | — | one screen |
| 390x844 | 844 | 48px | 82px | yes |

No quote overflows its panel at any of those sizes (`scrollHeight - clientHeight`
is 0 on all three cards), and no horizontal overflow at 390. The card height is now
**set** rather than driven by the copy, which is what guarantees the fit — a review
much longer than the doc's would clip, so the panel carries `overflow-hidden`.

### The hero's checkered print is gone

The `graph-paper-light` overlay is removed from `HomeHero` — 0 grid layers left in
the section, and the section itself never carried the class. The print belongs on
flat brand grounds; ruled over moving footage it read as a grid sitting on the lens
rather than as paper. The texture still returns on the cream section the wave hands
down to. `grain` stays — that is fractal noise, not the checker.

eslint + `tsc --noEmit` clean, production build passes.

## 2026-09-08 — Home page built, with the film in the hero

Seven sections, in the content doc's own order for section 1 (Home Page):

1. **Hero** — the film full-bleed, `HomeHero` + `HeroVideo`
2. **What We Stand For** — the six-word marquee, now shared with `/about`
3. **It's Never Just Lunch** — "EVERY DABBA, EVERY DAY"
4. **However You Eat...** — the existing `DabbaOfferings`, reused
5. **Why The Dabba?** — Trust / Discipline / People / Home on red
6. **Perth — Where The Legacy Lands** — the four audiences + "Check If We Deliver"
7. **What Our Customers Say** — the three quotes + "Share Your Dabba Story"

Grounds run ink -> cream -> paper -> paper -> red -> paper -> cream, so the two
printed bands sit at the middle and the end instead of stacking.

### The hero

`/videos/hero.mp4` (1920x1080, 46s, H.264, no audio track, 11.4MB), downloaded from
the Dropbox link. `HeroVideo` always renders the poster still server-side and eager,
then layers the `<video>` over it only when
`(min-width: 768px) and (prefers-reduced-motion: no-preference)` matches, read
through `useSyncExternalStore` so the server snapshot is `false` and there is no
hydration mismatch. Verified: the video element mounts at 1440 and does **not** at
390, so no phone pays 11MB for decoration.

The poster still is the file's own first frame, written out through a throwaway
route handler and then deleted (`public/images/hero-video-poster.jpg`, 1600x900).

Over film the type has to be the bright thing, so the headline runs
cream -> yellow -> green on an ink scrim rather than the usual red -> green on cream.
The scrim is two **mutually exclusive** halves — a full veil below `lg`, a
left-weighted one from `lg`. They were stacking at first, which compounded to ~0.59
opacity on the right and greyed the whole film out.

### One thing that has to change before this ships

The film is a corporate animation for **Emons**, a Dutch freight company, and their
wordmark is painted across the trailers and the depot wall — large and legible right
behind the headline, at both 1440 and 390. It cannot ship on Mumbai Dabbawala's home
page. Swapping it is one line: `HERO_VIDEO.src` in `src/data/home.ts` (and the
poster still alongside it).

### Content notes

- The doc's "Verified Customer" tick under each testimonial is **not** printed. It
  asserts the reviews have been verified, which is the same class of claim the
  accuracy statistics are held back for, and the Perth launch it sits above hasn't
  happened. Quotes, star ratings (5/5/4) and attributions are the doc's, verbatim.
  The three suburbs the doc gives — Parramatta, Melbourne CBD, Box Hill — are in
  Sydney and Melbourne, not Perth.
- `WHAT_WE_STAND_FOR` was lifted out of `about/page.tsx` into
  `src/components/StandFor.tsx` and is now used by both pages — a pure move, no
  markup change. `/about` re-verified: 6 sections, all four headings, 12 marquee
  tiles in the right order.
- Photos use the site's existing generic alt, "A Mumbai dabbawala at work", rather
  than invented descriptions. Frames were matched to source aspect so `object-cover`
  crops nothing: net-08 (600x900) in `aspect-[2/3]`, net-03 (900x900) in
  `aspect-square`.
- Emoji bullets from the doc are redrawn as line glyphs in the palette, as elsewhere.

### Verified

eslint + `tsc --noEmit` clean, production build passes (22 static pages). At 1440:
7 sections with the intended grounds, all 16 headings present, no broken images,
`scrollWidth == clientWidth`. Card rows measure equal-height and bottom-aligned
(Why The Dabba 4x284px, Testimonials 3x286px). The two φ splits measure 787/487 =
1.616. At 390: no overflow, hero at 100svh, seal clear of the route ticker.
Star ratings render 5/5/4 filled.

Console clean on a fresh load — the hydration and `sizes` warnings seen mid-session
were artefacts of the DOM mutations used to force the hidden preview pane to paint.

## 2026-09-07 — Timeline plane enlarged

Flight-path plane up **1.32x**: 100 -> 132 SVG units on desktop, 58 -> 76 below
768, with `x`/`y` at `-size/2` so it stays centred on the path. The outer `#plane`
group keeps the translate and the heading rotation, so only the image box changes.

Measured: 132px at 1440 (viewBox `0 0 1040 2230` renders 1:1 there, so units are
CSS px), 100px at 390 where the SVG scales up to fit. No overlap with any milestone
card, and it is still positioned on the path.

**A rebase note.** This landed on top of `a554f4b`, which rewrote
`JourneyTimeline.tsx` and had already made the plane responsive (58/100) — my
original commit bumped the old flat `84` and would have conflicted. Rather than
resolve it, I reset onto their version and re-applied the same 1.32x to their two
breakpoints, so their rewrite is untouched and the intent carries over.

## 2026-09-07 — Chef's Corner deck heading renamed

"The People Behind / Every Dabba" -> **"Meet The Hands / Behind It"**, which also
clears the duplicate with `/about`, where the same words are the content doc's own
"Life of a Dabbawala" heading. `The People Behind` no longer appears on
`/chefs-corner`.

Split after "Hands" so the strong phrase carries the first line and the poster
stack keeps two lines of similar weight. Both lines fit with no wrap at 1440 and at
390, and the colours stayed on the convention (`rgb(175, 20, 17)` then
`rgb(44, 73, 15)`).

**One thing left for the client:** the script kicker directly above still reads
"Meet the kitchen", so "Meet" now opens both the kicker and the headline. Not
changed — it is their copy — but it wants a different kicker, e.g. "Behind the
counter" or "The kitchen crew".

## 2026-09-07 — Chef's Corner headings brought onto the palette convention

Every poster stack on the site runs **brand-red -> brand-green-dark** on a
brand-yellow shadow. Chef's Corner's two section headings were the only pair left
running **ink -> brand-red**:

- `ChefDeck` — "The People Behind / Every Dabba"
- `FromTheKitchen` — "Wisdom From The / Dabbawala Kitchen"

Both recoloured, and both lines given an explicit `--po-color` rather than relying
on the `.poster` fallback, so they read the same as the rest without depending on a
default.

Verified all three stacks on the page compute `rgb(175, 20, 17)` then
`rgb(44, 73, 15)` with a `rgb(255, 218, 45)` shadow. The hero ("Fresh Ingredients /
Nothing Fussy") was already correct.

**Worth the client's attention:** "The People Behind / Every Dabba" is now the
heading of a section on *both* `/chefs-corner` and `/about` — the About one comes
from the content doc's "Life of a Dabbawala" copy, so the Chef's Corner one is the
one to rename. Not changed here; it is a copy decision.

## 2026-09-07 — Autoplay runs the morph, right to left

Three things, all in the deck.

**1. Autoplay skipped the morph entirely.** The timer called `setActive` directly,
so a pick grew the card out of its thumbnail but a slideshow tick just swapped the
image. It now goes through the same measure-lift-go path as a pointer pick, via an
`advanceRef` so the interval stays on `[]` deps and isn't rebuilt each render.

**2. The conveyor ran the wrong way.** It stepped `active - 1`, which takes the
incoming dish from the *left* pair — so the card appeared from the left and the old
one flew off right. Stepping `active + 1` makes the incoming dish the first of the
right-hand thumbnails, and leaves the outgoing one as the last of the left pair.

**3. Two measurement bugs, same root cause.** `getBoundingClientRect()` includes
transforms, and both sides measured a card that could still be carrying one:

- the grow measured `to` *before* cancelling the previous animation, so `to` was the
  card's scaled-down box and the keyframe came out `scale(1, 1)` with a translate
  against the wrong origin;
- `liftOutgoing` cloned the card without settling it, so the clone inherited the
  scaled box and the shrink also came out `scale(1)`.

Both now cancel before they measure.

Measured on an autoplay tick, the two halves are proper mirrors:

| | Start | End |
| --- | --- | --- |
| Incoming card | `dx +420, dy +340, scale 0.338` | `none` |
| Outgoing clone | `none` | `dx -155, dy +340, scale 0.338` |

Same scale (135/400 = 0.338) and same `dy`, opposite horizontal directions — in
from the right, out to the left. No clones accumulating across ticks.

## 2026-09-07 — Slideshow cadence on the chef deck

Client asked for fast auto rotation, "like slideshow type". `AUTOPLAY_MS` 6500 ->
**3200**. Measured over four ticks: 3230 / 3217 / 3138ms, mean 3195 — so the 760ms
morph plays and the card then holds still for about 2.4s before the next one.

Worth noting it sat at 3000 before and the client called it too fast. That was the
morph glitching, not the interval — the promoted image was being downloaded
mid-animation and `transition-all` was fighting the FLIP. With the morph on the
compositor the same cadence reads as a slideshow rather than a jitter.

Pause-on-hover stays: the client picked the plain speed-up over the variant that
also dropped it, and at a 3.2s cadence the deck would otherwise move the card out
from under the cursor faster than before.

## 2026-09-07 — Morph slowed and the curve softened

**Length wasn't the only problem — the curve was.**
`cubic-bezier(0.22, 1, 0.36, 1)` is an ease-out quint: it leaves fast and brakes
hard, so it reads as a snap no matter how long you make it. Slowing that curve down
would just have made a slow snap. Both animations now run
`cubic-bezier(0.4, 0, 0.2, 1)` — a gentle ease-in-out, so each end settles instead
of one end whipping.

520ms -> **760ms**, and the timing lives in `MORPH_MS` / `MORPH_EASE` at the top of
the file rather than being written out at each call site. Four things were timed
against the old 520 and would have drifted out of step:

| | Before | After |
| --- | --- | --- |
| Grow and shrink | 520ms | `MORPH_MS` (760) |
| `isTransitioning` window, which drives the copy fade | 400ms | `MORPH_MS` |
| Copy block transition | 400ms ease-out | 700ms, same curve |
| Clone cleanup floor | 900ms | `MORPH_MS + 400` |

The big card's `box-shadow` transition also went 500 -> 700ms so the shadow doesn't
finish settling while the card is still moving.

Verified: two animations at 760ms on `cubic-bezier(0.4, 0, 0.2, 1)`, still
transform and opacity only, copy block at `0.7s` on the same curve, and no clones
left behind after a settle or after a four-click burst.

## 2026-09-07 — Deck transitions moved entirely onto the compositor

Four things were still making the main thread work during the 520ms transition.

**1. The grow interpolated `border-radius`.** Radius is not a compositable
property, so the card was repainted every frame for the whole animation — the
single biggest cost here. Both animations are now transform and opacity only.
Verified by reading the running keyframes: nothing outside
`transform` / `opacity` / `composite` appears in either.

**2. Nothing declared `will-change`,** so the browser only promoted a layer once
the animation had already begun. The card gets `will-change: transform` when the
grow starts and has it cleared again by the grow's own `finished` — a permanent
`will-change` holds a layer alive for nothing. The clone declares
`transform, opacity` up front.

**3. All seven thumbnails were rebuilt on every change.** They were keyed
`left-${title}-${idx}-${pos}` and `right-${title}-${idx}-${pos}`, so a position
shift changed every key and React destroyed and recreated all seven buttons and
their images mid-animation. Keyed by `chef.title` now — measured 3 of 7 nodes
reused where it was 0. It is not 7 of 7 because chefs move between the left and
right groups, which are different parents, so React cannot carry a node across;
that would need the windowed layout replaced by one flat list.

**4. Three `transition-all` declarations were left** — on the thumbnails, the tag
pill (over a `backdrop-blur`, so the worst place for it) and the quote block.
Narrowed to the properties that actually change: `transform,box-shadow`,
`opacity`, `opacity,translate`. `transition-all` count in the file is now 0.

The 16 elements still computing `transition-property: all` are a red herring —
that is the property's initial value, and their duration is `0s`, so nothing
transitions.

## 2026-09-07 — The outgoing card now shrinks back, mirroring the grow

Client wanted the main image to travel the opposite way, as the thumbnail travels
in. Only the incoming card was animating; the outgoing dish simply vanished,
because the big card is **one stable node whose `src` swaps** — after the swap
there is nothing of the old dish left on the page to animate.

So the old card is lifted out first: on pick, before `go()`, the big card is cloned
into a `position: fixed` element sitting exactly on its own rect, and the layout
effect then animates that clone down into the thumbnail the outgoing dish now
occupies. Thumbnails carry `data-chef` so the clone can find its landing slot; if
the dish has scrolled out of the visible window the clone just fades in place.

Measured on one pick — the two animations are exact mirrors:

| | Keyframes |
| --- | --- |
| Incoming card | `translate(-310px, 340px) scale(0.3375, 0.346154)` -> `none` |
| Outgoing clone | `none` -> `translate(575px, 340px) scale(0.3375, 0.346154)` |

Same scale factors, opposite direction.

**Two things that needed care:**

- **Clones were piling up.** Cleanup hung off `animation.finished`, which never
  resolves while the document is hidden — WAAPI pauses there — so one clone stayed
  behind per transition. They now carry `data-deck-ghost`, every stray one is swept
  before a new one is made, there is a 900ms `setTimeout` floor, and unmount clears
  them. Measured: 1 clone mid-transition, 0 after it settles, 0 after a five-click
  burst.
- **`performance.now()` tripped `react-hooks/purity`.** The hook is aliased
  (`useIsoLayoutEffect`) to avoid the SSR warning, which stops the lint plugin
  recognising the body as effect code rather than render. The clock wasn't needed
  anyway — the hover-pan hold-off is now a `flipBusy` flag released by the grow's
  own `finished`.

## 2026-09-07 — Chef deck: glitch-free grow, slower rotation

Client: the glide stutters, and the rotation is too fast. Three separate causes for
the stutter, all fixed.

**1. The promoted image had to be downloaded mid-animation.** Thumbnails carried
`sizes="140px"` while the big card carried `sizes="…400px"`, so the two resolved to
different srcset candidates. Promoting a card meant fetching and decoding a source
the browser had never seen — right in the middle of a 520ms grow. Thumbnails now
use the big card's `sizes`, so every dish resolves to one candidate and the swap is
a cache hit. Verified: each of the deck's images now reports exactly one width
(`w=640`) across both roles, where it used to report two.

**2. `transition-all duration-500` on the big card was interpolating `transform`
at the same time the FLIP animated it** — two engines writing the same property.
Narrowed to `transition-[box-shadow]`; computed style now reads
`box-shadow / 0.5s`. The copy column's `transition-all` went to nothing for the
same reason: it only ever needed the opacity fade it already has.

**3. Hover-panning ran during the grow.** Moving the pointer across the deck lerps
the scroll container every frame, so the track was gliding sideways while the card
scaled. The rAF loop now holds off for 560ms after a grow starts (`flipUntil`),
which is the animation's 520ms plus a frame.

**Rotation 3000ms -> 6500ms.** Measured the real period across three ticks:
6494ms, 6552ms, mean 6523ms.

While measuring, autoplay refused to tick for 16s — which turned out to be
pause-on-hover working correctly, since an earlier synthetic `mouseover` was still
in effect. Worth knowing before treating a stopped deck as a bug.

## 2026-09-07 — Right column of the 135+ section is a photograph now

The boarding pass went the same way as the plain box before it, and for the same
underlying reason: **that column was restating 1890 -> 2026, which the journey
timeline immediately above already tells in full.** With nothing of its own to say
it was always going to read as decoration, whatever it was dressed as. So it now
carries content instead — `net-02.jpg`, the platform shot of a dabbawala with a
crate of tiffins overhead, with the site's `Starburst` as a "Since 1890" seal
breaking its top-left corner and a small caption underneath.

Two details worth the note:

- **The frame follows the photograph, not the other way round.** `net-02` is
  900x600, so the container is `aspect-[4/3]`. The first attempt used `net-03` in a
  4:5 portrait frame — that image is a ceremonial handover, which the caption
  "Mumbai · the daily run" did not describe, and the portrait crop threw away the
  width the crate needs.
- **The seal was being clipped on mobile.** At 390 the figure starts 20px in, so
  `-left-5` plus the −8deg rotation's spill put it past the viewport edge, where the
  page wrapper's `overflow-x-hidden` cut it off. Now `-left-2 -top-3` at 88px on
  mobile, stepping to `-left-5 -top-5` at 104px from `sm`. Measured: seal left edge
  at 6px at 390, and at 1440 it sits 26px over the photo's corner as intended.

`net-02` also appears as a 2x1 frame in the gallery further down the page. Worth a
dedicated photograph here if one exists.

## 2026-09-07 — 1890/2026 becomes a boarding pass; gallery header centred

**The year block.** Two poster numerals stacked in a plain cream box with a hairline
between them — no idea in it, and it did not belong to anything else on the page.
Rebuilt as a boarding pass, which is the motif the hero ("Mumbai To Perth / Carried
By Hand") and the journey timeline already run on:

- `Departure / 1890 / The first delivery · Mumbai` on the top stub, `Arrival / 2026
  / Perth · from 14 September` on the bottom one.
- Between them the site's own `.ticker-rule` dashes with the plane cut-out centred
  on them, and a `bg-paper` notch punched into each edge so it reads as a
  perforation.
- Cream ground with the graph print and a `brand-red/12` edge, so it sits in the
  paper section as a card rather than a tint.

Measured 495x394 at 1440, 350x310 at 390, no overflow.

**Gallery header centred.** "Life of a Dabbawala" was left-aligned while its
ten-frame mosaic below it is symmetrical, so the block read as though it had
slipped. `mx-auto max-w-3xl text-center`, and the paragraph needed `mx-auto` of its
own because `max-w-measure` was holding it to the left edge.

Worth recording: the plane image reports `complete: false` in this session, and so
does the existing `RouteTicker` plane on the same page. It is not a bug — the file
serves 200 (165KB) and `/_next/image` optimises it fine; `next/image` lazy-loads by
default and this session's Browser pane is hidden, so the intersection never fires.
Forcing `loading="eager"` in the console made it render.

## 2026-09-07 — Hover picks the card again, now with the grow visible

Client wants hover selection back, and wants to see the card enlarge while it
happens. Both are in: `handleCardHover` records the thumbnail's rect on
`mouseenter` and hands it to the same FLIP that the click path uses, so the card
grows from the hovered thumbnail instead of appearing at full size.

**The settle delay is 180ms, not the original 40ms.** That is what makes the ask
possible rather than a preference: the grow runs 520ms, and at 40ms a sweep across
the rail re-selected every thumbnail it passed, cancelling each animation before a
frame of it was visible. Measured with a 50ms-per-thumbnail sweep across four
thumbnails — nothing fires mid-sweep, and it settles once on the thumbnail the
pointer stopped on. A deliberate hover selects after 180ms and plays the whole
grow: keyframes `translate(420px, 340px) scale(0.3375, 0.346154)` -> `none` against
a 135x180 thumbnail and a 400x520 card.

Click still picks immediately and cancels any pending hover pick; leaving the deck
drops it too. Autoplay stays paused while the pointer is inside, which hover
selection depends on — otherwise the timer moves the card out from under the
cursor mid-grow.

## 2026-09-07 — Chef deck: the card now visibly grows, and autoplay stops under the cursor

**Why the enlarge never animated.** The active card carried
`key={`active-${activeChef.title}`}`, so every selection unmounted it and mounted a
fresh node. A newly mounted element has no previous state, so `transition-all` had
nothing to interpolate — the big card simply appeared at full size. On top of that
the thumbnail and the big card are different elements, so there was no shared thing
for CSS to animate between at all.

Fixed with a FLIP: the click records the thumbnail's `getBoundingClientRect()`, and
a layout effect measures the new big card and animates it from that rect via the
Web Animations API — 520ms on `cubic-bezier(0.22, 1, 0.36, 1)`, with the corner
radius interpolated too. The key came off both the card and the quote block so the
nodes are stable and their own transitions can run.

Verified by reading the running animation: target is the active card, duration 520,
keyframes `translate(575px, 340px) scale(0.3375, 0.346154)` -> `none`, against a
135x180 thumbnail and a 400x520 card — 135/400 = 0.3375 and 180/520 = 0.346, so it
starts at exactly the thumbnail's position and size. Any in-flight animation on the
node is cancelled first, so a fast run of clicks can't stack transforms.

**Two UX faults from the earlier review, now fixed:**

- **Autoplay no longer moves the card you are aiming at.** The 3s timer only
  guarded against dragging, so the deck advanced under the cursor. It now pauses
  while the pointer is inside the deck and while anything in it has focus. Measured:
  idle it advances within 4.2s; with the pointer inside it held the same dish for
  4.4s.
- **Hover no longer selects.** `handleCardHover` picked a card 40ms after
  `mouseenter`, so one sweep across the rail fired six selections while autoplay and
  drag competed with it. Hover is now only a visual cue and a click picks. Its dead
  timeout ref and the effect cleanup that referenced it are gone, which also cleared
  a standing eslint warning.

The helper line said "Hover over any dish to enlarge", which described the removed
behaviour; it now reads "Pick any dish to bring it forward…".

**Still outstanding, raised before and not actioned:** the deck prints
`{"★".repeat(5)}` — a hardcoded five-star rating on all nine dishes. That is a
fabricated customer rating on a real business's site, and it needs either removing
or replacing with something true. Left in place because deleting client content
twice unasked is not my call.

## 2026-09-07 — Lead paragraphs down one rung on the ramp

Lead paragraphs were `text-phi-2 sm:text-phi-3`, i.e. 16px stepping to 20px on
desktop. Against the poster headings the 20px read oversized. Dropped the `sm:`
step so they hold at `text-phi-2` (16px) at every width — still the ramp's body
size, nothing off-scale.

Changed site-wide rather than only on About: it is the same lead-paragraph token on
every page (15 occurrences across 7 files), and shrinking it on one page is exactly
the sort of per-page drift that caused the "not matching the look and feel" note
earlier.

Verified on About: four lead paragraphs, all computing 16px, no `sm:text-phi-3`
left anywhere in `src`.

## 2026-09-07 — Void under the values marquee closed

`pb-phi-6 sm:pb-phi-7` left 144px of empty cream under a single line of script,
which read as a hole rather than as breathing room. The 100svh forcing that had
justified that much padding is gone, so it went to `pb-phi-4 sm:pb-phi-5`
(34 / 55).

| | Before | After |
| --- | --- | --- |
| Padding bottom (desktop) | 144px | 55px |
| Space under the script line | 144px | 23px |
| Script line to the next section's kicker | ~199px | 110px |
| Section height | 733px | 644px |

110px between the tail of one section and the kicker of the next is the separation
the rest of the site runs, and the following section already brings its own 55px of
top padding — which is what made 144px here excessive. At 390 the bottom is 34px
and the section is 589px.

## 2026-09-07 — The six values become a single-line marquee

The 3x2 grid is now one continuous line, reusing the site's existing rail rather
than a new mechanism: `.rail` + `.rail-track` (`rail-scroll`, 22s linear, paused on
`:hover` and `:focus-within`, and already listed in the `prefers-reduced-motion`
block). Points worth keeping:

- The track holds the six tiles **twice** because the keyframe travels `-50%`; the
  loop only reads as seamless if the content is doubled. Measured track width 3392,
  i.e. exactly two passes.
- The duplicate set is `aria-hidden`, so the six values are announced once rather
  than twice. The number keeps counting 01–06 across both passes via
  `i % VALUES.length`.
- The rail sits **outside** the padded container so it bleeds edge to edge. A
  marquee that stops at a page margin reads as a broken row rather than a loop.
- Tiles are a fixed `236 / 268px` wide with the word at `26 / 32px`, down from
  38px — a marquee tile can't be as wide as a third of the grid was.

`lg:min-h-[100svh]` came back out. It was there to force two rows of tiles into one
screen; a single line is 733px at 1440x900 and 644px at 390 wide, comfortably one
view on its own, so forcing a full screen only bought empty space above and below.

**Not verified: the scroll itself.** CSS animations are throttled with the page in
this session's hidden Browser pane, same cause as the timeline — the track's
transform does not advance while `document.visibilityState` is `"hidden"`. The
declaration is correct (`22s linear infinite rail-scroll`) and this is the same
class already driving the region rail, but the motion wants a look in a real
browser.

## 2026-09-07 — "What We Stand For" fits one screen

The section ran 1004px against a 900px viewport. Now `lg:min-h-[100svh]` with
`flex-col justify-center` and `lg:py-phi-4`, so it centres in exactly one screen.

Fitting it at one height is easy; fitting it at every height is the actual problem.
At 900 it landed at 900, but a 1440x768 laptop was still 105px over. The tile
height therefore follows the viewport:

```
lg:min-h-[clamp(150px,21svh,196px)]
```

plus the grid and closing line drop to `lg:mt-phi-3`. Measured, section height
against viewport height:

| Viewport | Section | Over | Tile |
| --- | --- | --- | --- |
| 1600 x 1080 | 1080 | 0 | 196 |
| 1440 x 900 | 900 | 0 | 189 |
| 1440 x 768 | 768 | 0 | 161 |
| 390 x 844 | 988 | — flows | 168 |

Left to flow below `lg` on purpose: six tiles stack three rows deep on a phone, and
forcing 100svh there would squash them to about 90px each — which is the squat pill
this section was just rebuilt to get away from. All six poster words still fit with
no overflow at 390.

## 2026-09-07 — "What We Stand For" rebuilt as poster tiles

Six identical squat white pills carrying a number and a word, in a six-across row,
with a wide gap above them. Nothing in it was doing any work.

Rebuilt as six colour-blocked tiles, 3-up on desktop and 2-up on mobile, each
196px tall (168 on mobile) instead of a 90px pill:

- The **word is the subject**, set in poster type with the offset shadow, at the
  bottom of the tile. The number drops to a faint `font-poster` mark top-right.
- Grounds cycle **red / cream / orange / cream / red / orange** — primary palette
  only. The brand sheet reserves the secondary greens and yellow for icons and
  minimal accents, so those appear on the glyphs and the poster shadow and never as
  a ground.
- Each tile gets a drawn glyph in the secondary palette: sprout, stamp, price tag,
  clock, shield-and-tick, hands.

Still no invented one-liner under each word — the doc gives the six words and
nothing else, so colour, scale and an icon carry the tile instead of made-up copy.

Also closed the gap: `mt-phi-5` -> `mt-phi-4` above the grid and below it, so the
block reads as one unit (lead to grid now 34px, grid to the closing script line
66px).

Word sizes are stepped `22 / 30 / 38px`: "Affordable" and "Convenient" are ten
characters and overran a 2-up tile at 390px at the first size. Measured after —
all six words fit with 0px overflow at both 390 and 1440.

## 2026-09-07 — Gallery bento now tiles with no holes

The mosaic left two empty cells in its last row. It is arithmetic, not styling:
five columns means every row holds 5 cells, so the spans have to sum to a multiple
of 5. A 2x2 lead plus nine 1x1 frames is area 4 + 9 = **13**, and three rows need
**15** — hence two holes.

Recomposed to area 15 with the same ten frames: one 2x2, two 2x1, seven 1x1
(4 + 2 + 1 + 1 + 2 + 5 = 15). Declared in placement order in a `GALLERY` array, so
plain row flow packs it without needing `grid-auto-flow: dense`:

| Row | Cells |
| --- | --- |
| 1 | lead 2x2, wide 2x1, single |
| 2 | (lead continues), single, wide 2x1 |
| 3 | five singles |

Row height comes from the 1x1 frames, which carry `lg:aspect-square`; the spanning
frames take `lg:aspect-auto` so they inherit that height rather than forcing their
own.

Below `lg` every frame is 1x1 in two columns — ten frames is exactly five rows, so
that tiles on its own and needs no spans at all. The old version applied the 2x2
at every width, which is where the mobile raggedness came from too.

Measured at 1440: content right edge 1329 against a 1329 grid, rows at y 0 / 269 /
538 with a 253px pitch, grid height 791 = 3x253 + 2x16 — three full rows, nothing
empty. At 390: two columns, all ten cells identical width and height, no overflow.

## 2026-09-07 — About page rebuilt in the site's own language

The page's own sections were written in a different visual language to the rest of
the site: `bg-white` grounds, `font-display font-extrabold` headings, and
`tracking-[0.24em]` uppercase eyebrows, where every other page uses `--color-paper`
/ `bg-brand-cream` grounds, `.poster-stack` headings with the offset shadow, and a
`font-script` kicker in brand orange. Rewrote the three off-brand sections and
added the closing band the other pages all have.

| Section | Ground | Rhythm |
| --- | --- | --- |
| Hero (`PageHero`) | cream | 89 / 89 |
| Journey timeline | paper | 89 / 144 |
| 135+ Years | paper | 55 / 89 |
| What We Stand For | cream + graph print | 55 / 144 |
| Life of a Dabbawala | paper | 55 / 144 |
| Perth 2026 (new) | brand red + wave | 233 / 89 |

- **What We Stand For** now leads with a `font-script` kicker and a poster stack
  ("Six Words. / One Promise."), then the six values as numbered cards with poster
  numerals cycling red / orange / green-dark, closing on "Every single dabba." in
  script. The doc gives the six words and nothing else, so they stand on their own
  — no invented one-liner under each, which is the obvious thing to add and the
  wrong thing to make up for a real brand's values page.
- **Life of a Dabbawala** gets the same kicker + poster stack treatment, and the
  ten-frame mosaic keeps its two-up lead frame but on brand paper with a hover
  scale.
- **Perth 2026** was a plain centred paragraph on white. It is now the red closing
  band the other pages use: `WaveDivider`, poster stack, two CTAs and the
  `RouteTicker`.

**`.journey-flow` was the only pure `#ffffff` on the site.** Everything else is
`--color-paper` (`#fffdf6`), so the timeline had a visible seam against the cream
hero above it. Moved onto `var(--color-paper)` with the phi rhythm. The two
remaining `#fff` in the stylesheet are correct: one is inside `@media print`, the
other is `.tl-sticker`, where white reads as photo mount.

Verified at 1440 and 390: six sections, zero pure-white grounds, five poster stacks,
seven script kickers, rhythm entirely on the Fibonacci steps, hero exactly one
screen (844/844 at 390), values and gallery both two-up on mobile, ten gallery
images with none broken, no horizontal overflow, build and tsc clean.

## 2026-09-07 — About page content, timeline robustness, closing-CTA clearance

### Closing CTAs started inside the wave

All three red closing sections carried `pt-phi-6` (89px) against a wave band that
is 110px tall on mobile and 150px on desktop, so the first line of copy sat inside
the curve. Added `--space-phi-8: 233px` (the next Fibonacci step) and set
`pt-phi-7 sm:pt-phi-8`. Measured after: 233px padding against a 150px band leaves
115px of clearance on desktop, 144 against 110 leaves 66px on mobile. Fixed on
`/plans`, `/regional-food-stories` and `/whats-cooking-tomorrow` — the same fault
was on all three, not just the one flagged.

### About page — content from section 2 of the doc

Added the lead the doc opens with and the page was missing: "135+ Years. Studied,
Respected, Still Delivering." with the Harvard Business School sentence, on a
1.618fr split beside a 1890/2026 block. "What We Stand For" and "Life of a
Dabbawala" were already present and already match the doc.

**Removed two claims the client's own document forbids.** Section 2 carries the
note: *"Specific accuracy statistics to be reinstated only once independently
verified and legally cleared."* The page was publishing:

- a hero fact reading **"99.9% — Six Sigma accuracy"**, now "5 — Regional cuisines";
- "six generations of **six-sigma punctuality**" in the Perth paragraph, now "six
  generations of practice".

The 200k daily-deliveries figure stays: it is a scale figure the client already
publishes on their existing site, not an accuracy statistic.

### Timeline

Two real faults, both of which could leave the section blank:

1. `measure()` ran once on mount and `applyProgress` began `if (!routeLen) return`.
   `getTotalLength()` can return 0 before layout settles, and a single 0 there
   disabled the section for the life of the page. It now re-measures instead of
   giving up.
2. Everything was driven by a permanent `requestAnimationFrame` loop, while the one
   synchronous `applyProgress(0)` on mount writes `opacity: 0` inline on every card.
   Anywhere frames are not served the section stayed invisible — and the loop also
   ran every frame for the life of the page, far off-screen, calling
   `getPointAtLength` each time. Now driven from a passive `scroll` listener,
   coalesced through one frame with a 120ms timeout as the floor so an unserved
   frame cannot strand it, and the easing moved into CSS transitions on the cards,
   plates, bodies, nodes and the route dash. `prefers-reduced-motion` renders the
   finished state and attaches nothing.

**Not verified: the scroll choreography itself.** The Browser pane in this session
is hidden — `document.visibilityState` is `"hidden"` and `requestAnimationFrame`
serves 0 frames in 600ms — which is also why screenshots kept coming back blank all
session. That is what made the timeline look permanently dead when I first measured
it. What is verified is the resting state: route length 4643, plane positioned, and
all five cards, plates, bodies and both nodes at opacity 1, so the content can no
longer be stuck hidden. The motion needs a look in a real browser.

## 2026-09-07 — Hovered fan card now actually comes forward

Client: the hovered card stayed behind its neighbours. Cause: each card was wrapped
in its own `Reveal`, and `.reveal` keeps `transform: translate3d(0,0,0)` even once
shown. A non-`none` transform creates a stacking context, so a card's hover
`z-index: 40` only competed inside its own wrapper — the wrappers themselves sat at
`z-index: auto` and stacked in DOM order, meaning the leftmost card could never
rise above the others.

Fixed by hoisting `Reveal` to wrap the whole row, so the four cards are siblings in
one stacking context. Cost: the per-card entrance stagger goes (the fan now rises
as a group). Not worth reintroducing with a keyframe — an entrance animation on
`rotate`/`translate` would fight the hover transition on the same properties.

Also moved the hover's `rotate` and `translate` onto hover-only custom properties
(`--fan-rot`, `--fan-lift`) read through a fallback chain:
`rotate: var(--fan-rot, var(--fan-tilt, 0deg))`. The base values arrive as inline
custom properties, and an inline custom property beats a stylesheet one — the
hover-only variables are never set inline, so the hover rule always wins.

Verified with a real pointer: with the pointer away the cards read z 1/2/3/4 and the
overlap between cards 1 and 2 belongs to "Rested Grain"; hovering the leftmost card
takes it to z 40 and that same overlap point becomes "Staged Spicing". The lift,
straighten and scale are in the compiled sheet and were confirmed by applying the
same declarations as a class (rotate 0deg, scale 1.06); they could not be observed
under a live pointer because the Browser pane appears to emulate
`prefers-reduced-motion: reduce` while it drives pointer actions, which is exactly
the branch that holds the geometry still.

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

---

## Merge: origin/main (24 commits) into local timeline rework

Pulled the 24 upstream commits (phi type scale, About rebuild, Chef's Corner deck rewrite,
"What We Stand For" poster tiles) on top of substantial uncommitted local work. Local work
was CRLF while the repo is LF, which made a naive 3-way merge report every file as one
whole-file conflict — normalising line endings first reduced it to 2 real hunks per file.

Resolutions:
- **Timeline (`JourneyTimeline.tsx`, `journeyMilestones.ts`, `dish-gujarati.gif`)** — kept
  local wholesale, per instruction. Upstream's own timeline commit was therefore not taken;
  its two robustness ideas are noted below as follow-ups.
- **`globals.css`** — kept upstream's non-timeline work (paper background on `.journey-flow`,
  phi padding, `.fan-card`, `.route-progress`). Rejected two upstream hunks:
  - `transition: opacity .5s` on `.timeline-postcard`: upstream moved its easing into CSS,
    but the local JS writes opacity every frame from the card's live rect, so a transition
    would lag the scroll by half a second — the exact problem that rework removed.
  - re-added `.menu-card-*` / `.menu-food-card` rules: dead, nothing renders those classes
    any more (verified by grep across `src/`).
- **`page.tsx` / `PageHero.tsx`** — kept the local mobile-responsive sizing, so 4 spots stay
  on explicit `text-[9px] sm:…` values rather than upstream's `text-phi-*` scale.
- **`ChefDeck.tsx`** — took upstream. Local held only autoplay/duration tweaks (3000→1400ms,
  400→180ms) against the old deck, which upstream rewrote (287 lines).

Verified after merge: `tsc --noEmit` clean; `/`, `/about`, `/chefs-corner` all 200; timeline
geometry unchanged (path 3124, corridor 2230, every pin still inside its card at 1440/1100/820).

**Follow-ups worth taking from upstream's timeline commit**: re-measuring when
`getTotalLength()` returns 0 before layout settles, and a `prefers-reduced-motion` branch.
Neither is in the local version.
