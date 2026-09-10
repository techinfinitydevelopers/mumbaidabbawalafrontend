"use client";

import Image from 'next/image';
import { useCallback, useRef } from 'react';
import s from './DabbaLine.module.css';
import { useTrackScroll, type Frame } from '@/hooks/useTrackScroll';

/* ---------- palette ----------
   The reference's pastels are replaced by the brand tokens: the line now sits on paper,
   not on near-black, and these are the same chip grounds the section used before. Each
   pill carries its own text colour because the reds and the forest green need cream on
   them while the light ones need ink. */
const PILL = {
  orange: { bg: 'var(--color-brand-orange)', fg: 'var(--color-brand-cream)' },
  green: { bg: 'var(--color-brand-green)', fg: 'var(--color-ink)' },
  cream: { bg: 'var(--color-brand-cream)', fg: 'var(--color-ink)' },
  red: { bg: 'var(--color-brand-red)', fg: 'var(--color-brand-cream)' },
  yellow: { bg: 'var(--color-brand-yellow)', fg: 'var(--color-ink)' },
  forest: { bg: 'var(--color-brand-green-dark)', fg: 'var(--color-brand-cream)' },
} as const;

/** The heritage stamp: an orange burst with the brand yellow set into it. */
const BURST = 'var(--color-brand-orange)';
const BURST_TEXT = 'var(--color-brand-cream)';
const BURST_ACCENT = 'var(--color-brand-yellow)';

/** Ink, for every hand-drawn mark now that the ground is paper. */
const MARK = 'var(--color-ink)';

/** The three inline marks the artwork does not cover. */
const GLYPHS = {
  heart:
    'M12 20.5C6.5 16.8 3 13.8 3 10.2A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 9 2.6c0 3.6-3.5 6.6-9 10.3Z',
  parcel: 'M3.5 8.2 12 4.2l8.5 4V16L12 20l-8.5-4V8.2ZM12 20V9.4M3.5 8.2 12 12l8.5-3.8',
} as const;

/**
 * A sticker is a piece of the brand's own artwork, not an emoji.
 *
 * - `cutout` is a transparent PNG from `/images/items` or `/images/cutouts`, dropped
 *   straight into the line;
 * - `photo` is a snapshot from the network archive, given a pale border and a tilt so it
 *   reads as pinned to the sentence rather than as an inline image;
 * - `glyph` is one of the two drawn marks (the heart, the parcel) that no photograph
 *   covers.
 *
 * `size` is the sticker's height in `em`, so it tracks the type size at every breakpoint.
 */
type Sticker =
  | { kind: 'cutout'; src: string; place?: 'above' | 'right' | 'left'; rot?: number; size?: number }
  | { kind: 'photo'; src: string; place?: 'above' | 'right' | 'left'; rot?: number; size?: number }
  | {
      kind: 'glyph';
      name: keyof typeof GLYPHS;
      place?: 'above' | 'right' | 'left';
      rot?: number;
      size?: number;
    };
type Spark = 'tl' | 'tr' | 'bl';

type Token = {
  text: string;
  pill?: keyof typeof PILL;
  /** slight rotation on the pill, for the hand-placed feel */
  rot?: number;
  sticker?: Sticker;
  house?: boolean;
  arrow?: boolean;
  /** the 1890 → 2026 starburst */
  badge?: boolean;
  /** part of the { } frame: comes in before what it wraps */
  brace?: boolean;
  /** sits inside the { } frame: reveals only after the braces are there */
  inner?: boolean;
  /** hand-drawn three-stroke marks */
  sparkles?: Spark[];
  /** the rotating checker diamond */
  checkers?: Spark[];
  dash?: boolean;
};

/**
 * The line, read left to right as the track travels. Verbatim as the client supplied it on
 * 2026-09-08:
 *
 *   "More than a meal, every dabba carries tradition, care, familiar flavours, and the
 *    feeling of home — freshly prepared, carefully packed, and delivered to Perth."
 *
 * It is tokenised because the band highlights individual words and hangs artwork off them.
 * This array is the single place all the content lives — the words, which of them take a
 * pill, which carry a sticker, which sit inside the braces.
 *
 * NOTE for the client: "freshly prepared, carefully packed" also appears, near enough word
 * for word, as the third beat of the "It's Never Just Lunch" ladder further down the page.
 * Worth deciding which one keeps it.
 */
const TOKENS: Token[] = [
  { text: 'More', sparkles: ['tl'] },
  { text: 'than', pill: 'orange' },
  { text: 'a' },
  {
    text: 'meal,',
    pill: 'green',
    sticker: { kind: 'cutout', src: '/images/items/butterchicken-bowl.png', rot: -8, size: 1.5 },
    sparkles: ['tr'],
  },
  { text: 'every' },
  {
    text: 'dabba',
    pill: 'cream',
    rot: -1,
    sticker: { kind: 'cutout', src: '/images/items/tiffin-dabba.png', rot: 4, size: 2.2 },
    sparkles: ['tr'],
    checkers: ['bl'],
  },
  { text: 'carries' },
  {
    text: 'tradition,',
    pill: 'red',
    sticker: { kind: 'photo', src: '/images/about/net-05.jpg', rot: -6, size: 1.5 },
    sparkles: ['tr'],
  },
  /* the heritage stamp sits right after "tradition," */
  { text: '', badge: true },
  {
    text: 'care,',
    pill: 'yellow',
    rot: 1,
    sticker: { kind: 'glyph', name: 'heart', place: 'right', rot: 12, size: 0.85 },
  },
  { text: 'familiar' },
  {
    text: 'flavours,',
    pill: 'forest',
    sticker: { kind: 'cutout', src: '/images/cutouts/spice-chilli.png', rot: 5, size: 1.35 },
    sparkles: ['tl'],
  },
  { text: 'and' },
  { text: '{', brace: true },
  { text: 'the', inner: true },
  { text: 'feeling', inner: true },
  { text: 'of', inner: true },
  { text: 'home', pill: 'green', house: true, sparkles: ['tl'], inner: true },
  { text: '}', brace: true },
  { text: '—', dash: true },
  { text: 'freshly', pill: 'cream', rot: -1.5 },
  { text: 'prepared,' },
  {
    text: 'carefully',
    pill: 'forest',
    rot: 1,
    sticker: { kind: 'cutout', src: '/images/cutouts/spice-curryleaf.png', place: 'left', rot: -18, size: 1.5 },
    sparkles: ['bl'],
  },
  {
    text: 'packed,',
    sticker: { kind: 'glyph', name: 'parcel', rot: 6, size: 1.15 },
    sparkles: ['tr'],
  },
  { text: 'and', checkers: ['tr'] },
  { text: 'delivered', pill: 'green' },
  { text: 'to' },
  { text: 'Perth.', pill: 'red', rot: -1 },
  {
    text: '',
    sticker: { kind: 'cutout', src: '/images/stickers/run-perth.png', rot: -7, size: 2.6 },
    arrow: true,
  },
];

/** the opening brace anchors the two-phase reveal of everything it wraps */
const BRACE_INDEX = TOKENS.findIndex((t) => t.brace);
const CLOSE_BRACE_INDEX = TOKENS.length - 1 - [...TOKENS].reverse().findIndex((t) => t.brace);
/** gap the empty brace pair holds before the words push them apart */
const TIGHT_GAP = 46;

/** burst rotation per px of track travel — roughly one turn as it crosses */
const SPIN_PER_PX = 0.22;

/**
 * Where each word comes in from, cycled by position in the line.
 *
 * Every word rising the same 30px out of the same blur made the row read as one object
 * sliding up behind a mask — the entrances all landed on the same beat because they were
 * the same entrance. Giving each word its own vector breaks that: some drop in from
 * above, some lift from below, some slide in from the side, each with its own settling
 * tilt. The line assembles rather than scrolls.
 *
 * The table is walked by index, not sampled randomly. Random would re-roll on every
 * remount and could put three identical entrances in a row; a hand-ordered cycle of seven
 * against a line of thirty-odd tokens never repeats a neighbour and is the same every
 * time, which means it can actually be art-directed.
 *
 * `x` and `y` are the offset in px at the start of the entrance, `rot` the tilt it
 * settles out of.
 */
const ENTRANCES = [
  { x: 0, y: 34, rot: -3 },
  { x: 30, y: -18, rot: 2.6 },
  { x: 0, y: -32, rot: 2 },
  { x: -26, y: 16, rot: -3.4 },
  { x: 0, y: 30, rot: 3.2 },
  { x: 24, y: 24, rot: -2.2 },
  { x: -30, y: -20, rot: 2.8 },
] as const;


/** position of each braced word within its group, -1 for everything else */
const INNER_ORDER = (() => {
  const order: number[] = [];
  let n = 0;
  TOKENS.forEach((t, i) => { order[i] = t.inner ? n++ : -1; });
  return order;
})();

const SENTENCE = TOKENS.map((t) => t.text)
  .filter(Boolean)
  .join(' ');

const SPARK_CLASS: Record<Spark, string> = {
  tl: s.sparkleTopLeft,
  tr: s.sparkleTopRight,
  bl: s.sparkleBottomLeft,
};

/** even starburst: alternating outer/inner radius around a circle */
function burstPath(spikes = 26, outer = 100, inner = 79, c = 100) {
  const step = Math.PI / spikes;
  let d = '';
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = i * step - Math.PI / 2;
    d += `${i === 0 ? 'M' : 'L'}${(c + r * Math.cos(a)).toFixed(2)} ${(c + r * Math.sin(a)).toFixed(2)}`;
  }
  return `${d}Z`;
}
const BURST_PATH = burstPath();

/**
 * One piece of artwork in the line.
 *
 * Everything is sized off `size` in `em` so a sticker keeps its proportion to the word it
 * hangs on at every breakpoint. The wrapper span — not this — is what the scroll loop
 * animates, so nothing here writes a transform of its own.
 */
function Sticker({ sticker }: { sticker: NonNullable<Token['sticker']> }) {
  if (sticker.kind === 'glyph') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={MARK}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={s.stickerGlyph}
      >
        <path d={GLYPHS[sticker.name]} />
      </svg>
    );
  }

  if (sticker.kind === 'photo') {
    // a snapshot pinned to the sentence: the pale border and the tilt are what stop it
    // reading as just another inline image
    return (
      <span className={s.stickerPhoto} aria-hidden="true">
        <Image src={sticker.src} alt="" fill sizes="200px" className={s.stickerPhotoImg} />
      </span>
    );
  }

  return (
    <Image
      src={sticker.src}
      alt=""
      aria-hidden="true"
      width={240}
      height={240}
      className={s.stickerCutout}
    />
  );
}

function SparkleMark() {
  return (
    <svg viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <path d="M1.5 8 L8.5 15.5" stroke={MARK} strokeWidth="1.9" strokeLinecap="round" />
      <path d="M12 1.5 L13 11" stroke={MARK} strokeWidth="1.9" strokeLinecap="round" />
      <path d="M24 7 L17 15" stroke={MARK} strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

/** five squares in a checker step, set on the diagonal */
function CheckerMark() {
  return (
    <svg viewBox="0 0 53 53" fill="none" aria-hidden="true">
      <path d="M31.7465 17.9869L17.6153 21.2805L20.9089 35.4117L35.0402 32.1181L31.7465 17.9869Z" fill={MARK} />
      <path d="M20.9037 35.4127L6.77246 38.7064L10.0661 52.8376L24.1973 49.544L20.9037 35.4127Z" fill={MARK} />
      <path d="M49.1601 28.82L35.0289 32.1136L38.3225 46.2449L52.4538 42.9512L49.1601 28.82Z" fill={MARK} />
      <path d="M14.3109 7.15628L0.179688 10.4499L3.47333 24.5812L17.6046 21.2875L14.3109 7.15628Z" fill={MARK} />
      <path d="M42.5774 0.563523L28.4462 3.85717L31.7398 17.9884L45.8711 14.6948L42.5774 0.563523Z" fill={MARK} />
    </svg>
  );
}

function HeritageBadge({
  setBurst,
  setText,
}: {
  setBurst: (el: HTMLElement | SVGElement | null) => void;
  setText: (el: HTMLElement | SVGElement | null) => void;
}) {
  return (
    <span className={s.badge}>
      {/* the burst spins on its own; the numbers stay upright */}
      <svg ref={setBurst} className={s.burst} viewBox="0 0 200 200" aria-hidden="true">
        <path d={BURST_PATH} fill={BURST} />
      </svg>
      <span ref={setText} className={s.burstText} aria-hidden="true">
        <span className={s.burstYear} style={{ color: BURST_TEXT }}>
          1890
        </span>
        <svg className={s.burstArrow} viewBox="0 0 14 22" fill="none">
          <path
            d="M7 1 V17 M2 12 L7 18 L12 12"
            stroke={BURST_TEXT}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={s.burstYear} style={{ color: BURST_TEXT }}>
          202<span style={{ color: BURST_ACCENT }}>6</span>
        </span>
      </span>
    </span>
  );
}

export default function DabbaLine() {
  const sectionRef = useRef<HTMLElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const words = useRef<(HTMLSpanElement | null)[]>([]);
  const pills = useRef<(HTMLSpanElement | null)[]>([]);
  /* Extras (stickers, house, arrow, burst) get their own slots rather than
     reusing the word index: one token can carry two of them, and sharing an
     index meant the second ref silently overwrote the first. Each slot keeps
     the word it should follow, and how it should idle once revealed. */
  type Slot = {
    el: HTMLElement | SVGElement | null;
    word: number;
    idle?: 'bob' | 'spin' | 'twinkle';
    seed?: number;
    /** parallax strength; alternates sign so layers split fore/aft */
    depth?: number;
  };
  const extras = useRef<Slot[]>([]);
  const lastX = useRef(0);
  const vel = useRef(0);

  const onFrame = useCallback(({ x, step, panel }: Frame) => {
    const now = performance.now() / 1000;
    const vw = window.innerWidth || 1;

    /* Scroll velocity, smoothed. It skews the line while it is moving and
       lets the loose elements lag behind, which is what sells the weight. */
    const raw = x - lastX.current;
    lastX.current = x;
    vel.current += (raw - vel.current) * 0.18;
    const v = Math.max(-26, Math.min(26, vel.current));
    const skew = v * -0.16;

    /* where an element sits across the screen, -0.5 (left) .. 0.5 (right) */
    const screen = (el: HTMLElement | null) =>
      el ? (el.offsetLeft - x + el.offsetWidth / 2) / vw - 0.5 : 0;

    /* A wider progress than panel(): it keeps climbing well after the element
       has entered, which is what lets the braces land first and the words they
       wrap arrive later. Runs over ~1.15 stage widths of travel. */
    const wide = (el: HTMLElement | null) =>
      el ? Math.min(1, Math.max(0, (x - (el.offsetLeft - vw)) / (vw * 1.8))) : 0;

    const braceEl = words.current[BRACE_INDEX] ?? null;
    const closeBraceEl = words.current[CLOSE_BRACE_INDEX] ?? null;
    const framePhase = wide(braceEl);

    /* The reference keeps the empty pair tight and pushes the closing brace
       right as the words arrive. Done with a transform so the rest of the line
       never reflows: the opening brace holds its place, everything after the
       closing one stays put, and only the gap between them opens. */
    const collapse = 1 - step(framePhase - 0.22, 0, 0, 0.07);
    let closeDx = 0;
    if (braceEl && closeBraceEl) {
      const tight = braceEl.offsetLeft + braceEl.offsetWidth + TIGHT_GAP;
      closeDx = (tight - closeBraceEl.offsetLeft) * collapse;
    }

    /* braces first, then what they wrap; everything else reveals on entry */
    const progressAt = (i: number) => {
      const token = TOKENS[i];
      /* Braces fade in as a tight pair (0.06 -> 0.13), hold shut briefly, the
         gap opens (0.22 -> 0.29), then the words rise into it (0.30 -> 0.44,
         lightly staggered left to right). */
      if (token?.brace) return step(framePhase - 0.06, 0, 0, 0.07);
      if (token?.inner) return step(framePhase - 0.3, 0, 0, 0.12, INNER_ORDER[i] * 0.022);

      /* Anything inside the lead-in is on stage before a single pixel has been
         scrolled, so it has no entrance to play: `panel()` would leave it part-blurred
         and part-risen at rest with no way to finish. Those words are just there. */
      const el = words.current[i];
      if (el && el.offsetLeft < vw) return 1;

      return step(panel(el), 0, 0, 1);
    };

    words.current.forEach((el, i) => {
      if (!el) return;
      const token = TOKENS[i];
      const t = progressAt(i);

      if (token?.inner) {
        /* Inside the braces the words stay a group — they all rise, lightly staggered,
           because that beat is the frame closing and then filling. They only alternate
           which side they lean in from, which varies the entrance without breaking the
           four of them apart. */
        const lean = (INNER_ORDER[i] % 2 ? 1 : -1) * 18;
        el.style.opacity = String(t);
        el.style.transform =
          `translate(${((1 - t) * lean).toFixed(2)}px, ${((1 - t) * 34).toFixed(2)}px) ` +
          `skewX(${skew}deg)`;
        el.style.filter = t > 0.99 ? 'none' : `blur(${((1 - t) * 4).toFixed(2)}px)`;
        return;
      }

      /* The closing brace's own travel is the gap opening, which is not an entrance and
         has to survive on top of one — so it is added to the vector rather than
         replacing it. */
      const entrance = ENTRANCES[i % ENTRANCES.length];
      const dx = (i === CLOSE_BRACE_INDEX ? closeDx : 0) + (1 - t) * entrance.x;

      // each word arrives from its own direction, unblurs, and settles out of its tilt
      el.style.opacity = String(t);
      el.style.transform =
        `translate(${dx.toFixed(2)}px, ${((1 - t) * entrance.y).toFixed(2)}px) ` +
        `rotate(${((1 - t) * entrance.rot).toFixed(2)}deg) skewX(${skew}deg)`;
      el.style.filter = t > 0.99 ? 'none' : `blur(${(1 - t) * 7}px)`;
    });

    pills.current.forEach((el, i) => {
      if (!el) return;
      const t = Math.min(1, progressAt(i) / 0.82);
      // overshoot once, then hold
      const pop = 1 + 0.06 * Math.sin(Math.PI * Math.min(t, 1));
      el.style.transform = `scale(${(0.88 + t * 0.12) * pop}) rotate(var(--rot, 0deg))`;
    });

    extras.current.forEach((slot) => {
      if (!slot?.el) return;
      const t = Math.min(1, progressAt(slot.word) / 0.78);
      const seed = slot.seed ?? 0;
      const pop = 1 + 0.16 * Math.sin(Math.PI * Math.min(t, 1));
      const p = screen(words.current[slot.word]);

      let idleRot = 0;
      let idleY = 0;
      let idleScale = 1;
      /* depth: loose elements drift against the line as they cross the screen,
         so the row reads as layers rather than one flat strip */
      const driftX = p * (slot.depth ?? 0) * 70;

      if (t > 0.6) {
        const settle = (t - 0.6) / 0.4;
        if (slot.idle === 'bob') {
          idleY = Math.sin(now * 1.6 + seed) * 4 * settle;
          idleRot = (Math.sin(now * 1.1 + seed) * 3 - v * 0.5) * settle;
        } else if (slot.idle === 'spin') {
          // scroll-driven: it turns while the page moves and holds when it stops
          idleRot = x * SPIN_PER_PX;
        } else if (slot.idle === 'twinkle') {
          idleRot = now * 45 + seed * 40;
          idleScale = 1 + 0.12 * Math.sin(now * 2.4 + seed) * settle;
        }
      }

      slot.el.style.opacity = String(Math.min(1, t * 1.5));
      slot.el.style.transform =
        `translate(calc(var(--tx, 0px) + ${driftX.toFixed(2)}px), ${idleY.toFixed(2)}px) ` +
        `scale(${(t * pop * idleScale).toFixed(4)}) ` +
        `rotate(calc(var(--rot, 0deg) + ${idleRot.toFixed(2)}deg))`;
    });
  }, []);

  useTrackScroll(sectionRef, clipRef, trackRef, onFrame);

  /* Slot counters are re-initialised on every render, so the mapping from a
     DOM node to its animation slot stays stable (and StrictMode-safe). */
  let slotIndex = -1;
  const claim = () => ++slotIndex;
  const setExtra =
    (slot: number, word: number, idle?: Slot['idle'], drift = true) =>
    (el: HTMLElement | SVGElement | null) => {
      extras.current[slot] = {
        el,
        word,
        idle,
        seed: slot * 1.7,
        depth: drift ? (slot % 2 ? 1 : -1) * (0.4 + (slot % 3) * 0.3) : 0,
      };
    };

  return (
    <section ref={sectionRef} className={s.scroller} aria-label={SENTENCE}>
      <div className={s.stage}>
        {/* The section's own title, in the brand script — it holds still while the line
            travels under it, so the reader keeps the frame for the sentence even a dozen
            screens into the pin. */}
        <p className={s.kicker}>What a dabba carries</p>

        <div ref={clipRef} className={s.clip}>
          <div ref={trackRef} className={s.track}>
            {/* the line runs on past the left edge and starts partway in from the right;
                the lead-in is sized in the stylesheet, where the type size lives */}
            <div className={`${s.spacer} ${s.leadIn}`} />

            {TOKENS.map((token, i) => {
              const stickerSlot = token.sticker ? claim() : -1;
              const houseSlot = token.house ? claim() : -1;
              const arrowSlot = token.arrow ? claim() : -1;
              const burstSlot = token.badge ? claim() : -1;
              const burstTextSlot = token.badge ? claim() : -1;
              const sparkSlots = (token.sparkles ?? []).map(() => claim());
              const checkerSlots = (token.checkers ?? []).map(() => claim());

              const cls = [
                s.word,
                token.arrow ? s.tail : '',
                token.badge ? s.badgeBox : '',
              ].join(' ');

              return (
                <span key={i} ref={(el) => { words.current[i] = el; }} className={cls}>
                  {token.badge ? (
                    <HeritageBadge
                      setBurst={setExtra(burstSlot, i, 'spin', false)}
                      setText={setExtra(burstTextSlot, i, undefined, false)}
                    />
                  ) : token.pill ? (
                    <span
                      ref={(el) => { pills.current[i] = el; }}
                      className={s.pill}
                      style={{
                        background: PILL[token.pill].bg,
                        color: PILL[token.pill].fg,
                        ['--rot' as string]: `${token.rot ?? 0}deg`,
                      }}
                    >
                      {token.text}
                    </span>
                  ) : (
                    <span
                      className={token.dash ? s.dash : token.brace ? s.brace : s.plain}
                    >
                      {token.text}
                    </span>
                  )}

                  {token.sticker && (
                    <span
                      ref={setExtra(stickerSlot, i, 'bob')}
                      className={[
                        s.sticker,
                        token.sticker.place === 'right' ? s.stickerRight : '',
                        token.sticker.place === 'left' ? s.stickerLeft : '',
                      ].join(' ')}
                      style={{
                        // the sticker's own box is 1em tall and the artwork fills it, so
                        // `size` scales the whole thing off the word it hangs on
                        fontSize: `${token.sticker.size ?? 1.5}em`,
                        ['--rot' as string]: `${token.sticker.rot ?? 0}deg`,
                        ['--tx' as string]: token.sticker.place ? '0px' : '-50%',
                      }}
                      aria-hidden="true"
                    >
                      <Sticker sticker={token.sticker} />
                    </span>
                  )}

                  {token.house && (
                    <svg
                      ref={setExtra(houseSlot, i, 'bob')}
                      className={s.house}
                      style={{ ['--tx' as string]: '-50%' }}
                      viewBox="0 0 30 26"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 12.5 L15 3 L27 12.5 M6 11 V23 H24 V11"
                        stroke={MARK}
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}

                  {token.arrow && (
                    <svg
                      ref={setExtra(arrowSlot, i)}
                      className={s.arrow}
                      style={{ ['--tx' as string]: '0px' }}
                      viewBox="0 0 44 22"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M2 4 C14 20 28 20 40 11" stroke={MARK} strokeWidth="1.7" strokeLinecap="round" />
                      <path
                        d="M33 12 L40 11 L37 4"
                        stroke={MARK}
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}

                  {token.sparkles?.map((where, n) => (
                    <span
                      key={`s-${where}`}
                      ref={setExtra(sparkSlots[n], i)}
                      className={`${s.sparkle} ${SPARK_CLASS[where]}`}
                      style={{ ['--tx' as string]: '0px' }}
                      aria-hidden="true"
                    >
                      <SparkleMark />
                    </span>
                  ))}

                  {token.checkers?.map((where, n) => (
                    <span
                      key={`c-${where}`}
                      ref={setExtra(checkerSlots[n], i, 'twinkle')}
                      className={`${s.checker} ${SPARK_CLASS[where]}`}
                      style={{ ['--tx' as string]: '0px' }}
                      aria-hidden="true"
                    >
                      <CheckerMark />
                    </span>
                  ))}
                </span>
              );
            })}

            <div className={s.spacer} style={{ width: '30vw' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
