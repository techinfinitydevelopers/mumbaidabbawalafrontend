import Link from "next/link";

/**
 * The site's one button.
 *
 * The skew-wipe visual lives in `globals.css` under `.btn` (see the note there for the
 * mechanic and how it differs from the Uiverse original the client picked). This
 * component's job is only to assemble the right classes and, importantly, to wrap the
 * label in the `<span>` the effect needs: `::before` fills the button box, so the padding
 * has to sit on an inner element or the panel gets pushed around instead of the text.
 *
 * Everything that used to be a hand-rolled pill — `rounded-full bg-brand-red px-7 py-3.5
 * text-[11px] font-bold uppercase …` repeated across two dozen files — goes through here,
 * so the radius, the padding scale and the hover are defined once.
 *
 * `href` renders a `next/link`; without it you get a real `<button>`, which also means
 * `type="button"` is set for you rather than defaulting to submit.
 */

export type ButtonVariant =
  | "red"
  | "orange"
  | "yellow"
  | "cream"
  | "paper"
  | "outline"
  | "outlineCream";

export type ButtonSize = "sm" | "md" | "lg";

/** Variant → the CSS class that carries its four custom properties. */
const VARIANT: Record<ButtonVariant, string> = {
  red: "btn-red",
  orange: "btn-orange",
  yellow: "btn-yellow",
  cream: "btn-cream",
  paper: "btn-paper",
  outline: "btn-outline btn-sweep-in",
  outlineCream: "btn-outline-cream btn-sweep-in",
};

/**
 * Padding and label scale, on the inner span. These are the three sizes the site was
 * already using by hand: `sm` in the heroes, `md` for most CTAs, `lg` for the closing
 * ones on the red bands.
 */
const SIZE: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-[10px] tracking-[0.16em] sm:px-7 sm:py-3.5 sm:text-[11px] sm:tracking-[0.18em]",
  md: "px-7 py-3.5 text-[11px] tracking-[0.18em]",
  lg: "px-8 py-4 text-[11px] tracking-[0.18em]",
};

type CommonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Optional leading icon. Sized to 1.2em by the stylesheet, as in the original. */
  icon?: React.ReactNode;
  /** Extra classes for the outer element — layout only (width, margins, alignment). */
  className?: string;
};

type Props = CommonProps &
  (
    | ({ href: string } & Omit<React.ComponentPropsWithoutRef<typeof Link>, "href" | "className">)
    | ({ href?: undefined } & Omit<React.ComponentPropsWithoutRef<"button">, "className">)
  );

export default function Button({
  children,
  variant = "red",
  size = "md",
  icon,
  className = "",
  ...rest
}: Props) {
  const shell = `btn ${VARIANT[variant]} ${className}`;
  const label = (
    <span className={`${SIZE[size]} font-bold uppercase leading-none`}>
      {icon}
      {children}
    </span>
  );

  if (rest.href !== undefined) {
    const { href, ...linkProps } = rest as { href: string } & Record<string, unknown>;
    return (
      <Link href={href} className={shell} {...linkProps}>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" className={shell} {...(rest as React.ComponentPropsWithoutRef<"button">)}>
      {label}
    </button>
  );
}

/**
 * A square icon button — the deck arrows, the social links, the slider controls. Same
 * wipe, no label, and the same 15px radius as everything else rather than a circle.
 */
export function IconButton({
  children,
  variant = "outline",
  className = "",
  size = 40,
  ...rest
}: Omit<CommonProps, "size" | "icon"> & {
  size?: number;
} & (
    | ({ href: string } & Omit<React.ComponentPropsWithoutRef<typeof Link>, "href" | "className">)
    | ({ href?: undefined } & Omit<React.ComponentPropsWithoutRef<"button">, "className">)
  )) {
  const shell = `btn btn-icon ${VARIANT[variant]} ${className}`;
  const label = (
    <span style={{ width: size, height: size }} className="leading-none">
      {children}
    </span>
  );

  if (rest.href !== undefined) {
    const { href, ...linkProps } = rest as { href: string } & Record<string, unknown>;
    return (
      <Link href={href} className={shell} {...linkProps}>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" className={shell} {...(rest as React.ComponentPropsWithoutRef<"button">)}>
      {label}
    </button>
  );
}
