import React from "react";
import Link from "next/link";

type Variant = "primary" | "ghost" | "ghost-light";

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-orange text-white shadow-[0_10px_24px_rgba(246,135,42,0.28)] hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(246,135,42,0.38)]",
  ghost:
    "bg-transparent text-navy border-2 border-navy hover:bg-navy hover:text-white",
  "ghost-light":
    "bg-transparent text-white border-2 border-white/60 hover:bg-white hover:text-navy",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[10px] px-[30px] py-[14px] text-[15px] font-bold transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer";

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    external?: boolean;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button(props: ButtonProps) {
  const { variant = "primary", className = "", children } = props;
  const classes = `${base} ${variantClasses[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, external, ...rest } = props as ButtonAsLink;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={classes}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  const { variant: _v, className: _c, children: _ch, ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
