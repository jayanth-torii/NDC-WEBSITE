import React from "react";

type IconProps = {
  className?: string;
  size?: number;
  /** When true, plays a more pronounced loop (used during loading) */
  animated?: boolean;
};

function IconShell({
  size = 24,
  className = "",
  children,
  title,
}: IconProps & { children: React.ReactNode; title: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`act-icon ${className}`}
      aria-hidden="true"
      role="img"
    >
      <title>{title}</title>
      {children}
    </svg>
  );
}

const accent = "var(--color-orange, #f6872a)";
const stroke = "currentColor";

/* ─── Shared loading spinner (GIF-style loop) ─── */

export function ActivityLoadingIcon({ size = 28, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={`act-icon ${className}`}
      aria-hidden="true"
    >
      <circle
        cx="24"
        cy="24"
        r="16"
        stroke="currentColor"
        strokeOpacity="0.15"
        strokeWidth="3"
      />
      <circle
        className="act-spin-origin"
        cx="24"
        cy="24"
        r="16"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="28 80"
      />
      <circle
        className="act-pulse-dot"
        cx="24"
        cy="24"
        r="4"
        fill={accent}
      />
    </svg>
  );
}

/* ─── Student Oriented Cells ─── */

export function AntiRaggingIcon(props: IconProps) {
  return (
    <IconShell title="Anti Ragging" {...props}>
      <path
        className="act-breathe"
        d="M24 5.5L39 12.8V24C39 33.6 32.6 41.8 24 44.2C15.4 41.8 9 33.6 9 24V12.8L24 5.5Z"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.06"
      />
      <path
        className="act-draw-check"
        d="M16.5 24.5L21.8 29.8L32 18.5"
        stroke={accent}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className="act-spark" cx="34" cy="11" r="1.6" fill={accent} />
    </IconShell>
  );
}

export function WomenCellIcon(props: IconProps) {
  return (
    <IconShell title="Women Cell" {...props}>
      <circle
        className="act-breathe"
        cx="24"
        cy="14"
        r="6.8"
        stroke={stroke}
        strokeWidth="2.1"
        fill="currentColor"
        fillOpacity="0.06"
      />
      <path
        d="M24 20.8V34"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M17.5 28H30.5"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        className="act-float-y"
        d="M19.5 39C19.5 35.8 21.5 33.5 24 33.5C26.5 33.5 28.5 35.8 28.5 39"
        stroke={accent}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <circle className="act-spark act-spark-delay" cx="33.5" cy="11" r="2" fill={accent} />
      <circle className="act-spark" cx="14" cy="12" r="1.3" fill={accent} fillOpacity="0.7" />
    </IconShell>
  );
}

export function GrievanceIcon(props: IconProps) {
  return (
    <IconShell title="Grievance Redressal" {...props}>
      <path
        d="M9 13.5C9 11.5 10.7 9.8 12.7 9.8H29C31 9.8 32.7 11.5 32.7 13.5V26C32.7 28 31 29.7 29 29.7H17.5L11 36.2V29.7H12.7C10.7 29.7 9 28 9 26V13.5Z"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        className="act-type-line"
        d="M15 17H27M15 22.5H23"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g className="act-pop">
        <circle cx="35.5" cy="33.5" r="7.2" fill="#fff" stroke={accent} strokeWidth="2.1" />
        <path
          d="M32.6 33.7L34.6 35.7L38.6 31.3"
          stroke={accent}
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </IconShell>
  );
}

export function AntiHarassmentIcon(props: IconProps) {
  return (
    <IconShell title="Anti Sexual Harassment" {...props}>
      <path
        className="act-breathe"
        d="M24 7L37 13V23.5C37 32.5 31.4 39.8 24 42.5C16.6 39.8 11 32.5 11 23.5V13L24 7Z"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        className="act-heartbeat"
        d="M24 20C24 20 19.5 16.8 19.5 20.2C19.5 22.4 24 26.5 24 26.5C24 26.5 28.5 22.4 28.5 20.2C28.5 16.8 24 20 24 20Z"
        fill={accent}
      />
      <path
        d="M17.5 31H30.5"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
      />
    </IconShell>
  );
}

export function EqualOpportunityIcon(props: IconProps) {
  return (
    <IconShell title="Equal Opportunity" {...props}>
      <circle cx="15.5" cy="15.5" r="5.2" stroke={stroke} strokeWidth="2.1" />
      <circle cx="32.5" cy="15.5" r="5.2" stroke={stroke} strokeWidth="2.1" />
      <path
        d="M7.5 37C7.5 31.2 11 26.5 15.5 26.5C20 26.5 23.5 31.2 23.5 37"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M24.5 37C24.5 31.2 28 26.5 32.5 26.5C37 26.5 40.5 31.2 40.5 37"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        className="act-bridge"
        d="M18.5 15.5H29.5"
        stroke={accent}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle className="act-pulse-dot" cx="24" cy="15.5" r="2.4" fill={accent} />
    </IconShell>
  );
}

export function EcoCellIcon(props: IconProps) {
  return (
    <IconShell title="Eco Cell" {...props}>
      <path
        d="M24 41V21"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        className="act-leaf-sway"
        d="M24 21C24 21 12.5 21.5 10.5 10.5C22 8.5 24 21 24 21Z"
        stroke={accent}
        strokeWidth="2.1"
        strokeLinejoin="round"
        fill="#f6872a"
        fillOpacity="0.18"
        style={{ transformOrigin: "24px 21px" }}
      />
      <path
        className="act-leaf-sway-alt"
        d="M24 25.5C24 25.5 35.5 23 37.5 12C26.5 12.5 24 25.5 24 25.5Z"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.06"
        style={{ transformOrigin: "24px 25px" }}
      />
      <path
        d="M15 41H33"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <circle className="act-spark" cx="31" cy="9" r="1.8" fill={accent} />
    </IconShell>
  );
}

/* ─── Faculty Oriented Cells ─── */

export function FacultyWelfareIcon(props: IconProps) {
  return (
    <IconShell title="Faculties Welfare" {...props}>
      <path
        className="act-heartbeat"
        d="M24 39.5C24 39.5 8.5 30 8.5 19.2C8.5 14 12.5 10.5 17.2 10.5C20 10.5 22.4 11.9 24 14.2C25.6 11.9 28 10.5 30.8 10.5C35.5 10.5 39.5 14 39.5 19.2C39.5 30 24 39.5 24 39.5Z"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        className="act-pop"
        d="M17.5 22H30.5M24 17.5V26.5"
        stroke={accent}
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </IconShell>
  );
}

export function MinorityCellIcon(props: IconProps) {
  return (
    <IconShell title="SC ST OBC Minority Cell" {...props}>
      <circle
        className="act-ring"
        cx="24"
        cy="24"
        r="14.5"
        stroke={stroke}
        strokeWidth="2.1"
        strokeDasharray="6 4"
      />
      <circle className="act-breathe" cx="24" cy="17.5" r="3.6" fill={accent} />
      <circle cx="16" cy="29" r="3.3" stroke={stroke} strokeWidth="2" />
      <circle cx="32" cy="29" r="3.3" stroke={stroke} strokeWidth="2" />
      <path
        d="M20.5 20L17.5 26M27.5 20L30.5 26"
        stroke={accent}
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.8"
      />
    </IconShell>
  );
}

export function StudyCircleIcon(props: IconProps) {
  return (
    <IconShell title="Faculty Study Circle" {...props}>
      <path
        d="M11 13.5H22C23.4 13.5 24.5 14.6 24.5 16V37C24.5 36 23.5 35.2 22.3 35.2H11V13.5Z"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        d="M37 13.5H26C24.6 13.5 23.5 14.6 23.5 16V37C23.5 36 24.5 35.2 25.7 35.2H37V13.5Z"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        className="act-type-line"
        d="M14.5 20H20M14.5 25H18.5M27.5 20H33M27.5 25H31.5"
        stroke={accent}
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <circle className="act-spark" cx="24" cy="9" r="1.5" fill={accent} />
    </IconShell>
  );
}

export function EdCellIcon(props: IconProps) {
  return (
    <IconShell title="ED Cell" {...props}>
      <path
        className="act-breathe"
        d="M24 7C18 7 13.2 11.8 13.2 17.8C13.2 22.2 15.6 25.9 19.2 27.6V32H28.8V27.6C32.4 25.9 34.8 22.2 34.8 17.8C34.8 11.8 30 7 24 7Z"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path d="M19.2 36H28.8" stroke={stroke} strokeWidth="2.1" strokeLinecap="round" />
      <path d="M20.8 40H27.2" stroke={stroke} strokeWidth="2.1" strokeLinecap="round" />
      <path
        className="act-glow-cross"
        d="M24 13.5V19M21 16.2H27"
        stroke={accent}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle className="act-spark" cx="37" cy="11" r="1.7" fill={accent} />
      <circle className="act-spark act-spark-delay" cx="11" cy="13" r="1.3" fill={accent} />
    </IconShell>
  );
}

export function IccCellIcon(props: IconProps) {
  return (
    <IconShell title="ICC Cell" {...props}>
      <path d="M24 7V41" stroke={stroke} strokeWidth="2.1" strokeLinecap="round" />
      <path d="M13 41H35" stroke={stroke} strokeWidth="2.1" strokeLinecap="round" />
      <g className="act-balance">
        <path
          d="M24 11H35.5L33.2 20.5H24"
          stroke={accent}
          strokeWidth="2.1"
          strokeLinejoin="round"
        />
        <circle cx="35.5" cy="20.5" r="2.6" fill={accent} />
      </g>
      <g className="act-balance-alt">
        <path
          d="M24 11H12.5L14.8 20.5H24"
          stroke={stroke}
          strokeWidth="2.1"
          strokeLinejoin="round"
        />
        <circle cx="12.5" cy="20.5" r="2.6" stroke={stroke} strokeWidth="1.8" />
      </g>
    </IconShell>
  );
}

/* ─── Academic & Social Engagement ─── */

export function NccIcon(props: IconProps) {
  return (
    <IconShell title="NCC" {...props}>
      <path
        d="M15.5 9.5H32.5L30.2 18.5H17.8L15.5 9.5Z"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path d="M24 18.5V41" stroke={stroke} strokeWidth="2.1" strokeLinecap="round" />
      <path d="M17 41H31" stroke={stroke} strokeWidth="2.1" strokeLinecap="round" />
      <path d="M24 9.5V5.5" stroke={accent} strokeWidth="2.1" strokeLinecap="round" />
      <path
        className="act-star-spin"
        d="M24 22.5L25.8 26.8L30.5 27.2L26.9 30.3L28 35L24 32.6L20 35L21.1 30.3L17.5 27.2L22.2 26.8L24 22.5Z"
        fill={accent}
        style={{ transformOrigin: "24px 29px" }}
      />
    </IconShell>
  );
}

export function NssIcon(props: IconProps) {
  return (
    <IconShell title="NSS And Red Cross" {...props}>
      <path
        d="M13.5 22C13.5 18.2 16.3 15.5 20 15.5H21.5V24C21.5 26.5 23.5 28.5 26 28.5H29C33.2 28.5 35.5 25.6 35.5 22.2C35.5 18.8 32.8 16.5 29.5 16.5H28"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 15.5C20 11.8 22.8 9 26.5 9C30.2 9 33 12 33 15.8"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <g className="act-pop">
        <path
          d="M17.5 33.5H30.5M24 29V40"
          stroke={accent}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    </IconShell>
  );
}

export function CommerceForumIcon(props: IconProps) {
  return (
    <IconShell title="Commerce And Management Forum" {...props}>
      <rect
        x="8.5"
        y="14"
        width="31"
        height="23"
        rx="3.5"
        stroke={stroke}
        strokeWidth="2.1"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path d="M8.5 22H39.5" stroke={stroke} strokeWidth="2.1" />
      <path
        d="M15.5 14V10.8C15.5 9.5 16.5 8.5 17.8 8.5H30.2C31.5 8.5 32.5 9.5 32.5 10.8V14"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <path
        className="act-chart-draw"
        d="M16 30L21.5 26.5L27 32L34.5 23.5"
        stroke={accent}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className="act-pulse-dot" cx="34.5" cy="23.5" r="2" fill={accent} />
    </IconShell>
  );
}

export function AmbedkarStudyIcon(props: IconProps) {
  return (
    <IconShell title="Ambedkar Study Circle" {...props}>
      <path
        d="M13.5 37V15.5C13.5 13.6 15 12 16.9 12H31.1C33 12 34.5 13.6 34.5 15.5V37"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path d="M11 37H37" stroke={stroke} strokeWidth="2.1" strokeLinecap="round" />
      <path
        className="act-float-y"
        d="M24 12V7.5"
        stroke={accent}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <circle className="act-glow-flame" cx="24" cy="5.8" r="2.2" fill={accent} />
      <path
        className="act-type-line"
        d="M18.5 20.5H29.5M18.5 26H26"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </IconShell>
  );
}

export function IndustrialVisitIcon(props: IconProps) {
  return (
    <IconShell title="Industrial Visit" {...props}>
      <path d="M7.5 39H40.5" stroke={stroke} strokeWidth="2.1" strokeLinecap="round" />
      <path
        d="M9.5 39V19.5L18 13V39"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <path
        d="M18 39V23.5H28.5V39"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        d="M28.5 39V17.5L39 24V39"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <path
        className="act-type-line"
        d="M12.5 25.5H15M12.5 31H15M21.5 29H25M32 29H35.5"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g className="act-smoke">
        <path d="M33 13V8" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        <path d="M30.5 8H37" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      </g>
    </IconShell>
  );
}

export const ACTIVITY_ICONS: Record<string, React.ComponentType<IconProps>> = {
  "anti-ragging-cell": AntiRaggingIcon,
  "women-cell": WomenCellIcon,
  "students-grievance-cell": GrievanceIcon,
  "anti-sexual-harassment-cell": AntiHarassmentIcon,
  "equal-opportunity-cell": EqualOpportunityIcon,
  "eco-clubs": EcoCellIcon,
  "faculties-welfare": FacultyWelfareIcon,
  "sc-st-obc-minority-cell": MinorityCellIcon,
  "faculty-study-circle": StudyCircleIcon,
  "ed-cell": EdCellIcon,
  "icc-cell": IccCellIcon,
  "ncc-cell": NccIcon,
  "nss-cell": NssIcon,
  "commerce-and-management-forum": CommerceForumIcon,
  "ambedkar-study-circle": AmbedkarStudyIcon,
  "industrial-visit": IndustrialVisitIcon,
};
