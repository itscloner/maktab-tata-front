// ایلوستریشن‌های SVG سبک و اختصاصی برای وضعیت‌های خالی/خطا/عدم دسترسی
// (به‌جای تصاویر خارجی، برای عملکرد کامل آفلاین)

export function EmptyBoxIllustration({
  color = "#0F6E5C",
}: {
  color?: string;
}) {
  return (
    <svg
      width="120"
      height="100"
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="60" cy="88" rx="38" ry="6" fill={color} opacity="0.08" />
      <path d="M20 40 60 24 100 40 60 56 20 40Z" fill={color} opacity="0.14" />
      <path d="M20 40V70L60 86V56L20 40Z" fill={color} opacity="0.22" />
      <path d="M100 40V70L60 86V56L100 40Z" fill={color} opacity="0.32" />
      <path
        d="M20 40 60 24 100 40 60 56 20 40Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M60 56V86" stroke={color} strokeWidth="2" />
      <path
        d="M20 40 60 56 100 40"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ErrorIllustration({ color = "#C1543F" }: { color?: string }) {
  return (
    <svg
      width="120"
      height="100"
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="60" cy="50" r="34" fill={color} opacity="0.1" />
      <circle cx="60" cy="50" r="34" stroke={color} strokeWidth="2" />
      <path
        d="M60 36V54"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="60" cy="64" r="2.5" fill={color} />
    </svg>
  );
}

export function LoginHeroIllustration({
  primary = "#0F6E5C",
  accent = "#C68F2C",
}: {
  primary?: string;
  accent?: string;
}) {
  return (
    <img src="taha.png" />
    // <svg width="280" height="240" viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg">
    //   <circle cx="140" cy="120" r="110" fill={primary} opacity="0.08" />
    //   <circle cx="140" cy="120" r="80" fill={primary} opacity="0.10" />
    //   <path
    //     d="M140 60c-26 22-42 46-42 70a42 42 0 0 0 84 0c0-24-16-48-42-70z"
    //     fill={accent}
    //     opacity="0.9"
    //   />
    //   <path d="M110 150a30 30 0 0 0 60 0" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    //   <g opacity="0.55">
    //     <circle cx="70" cy="70" r="5" fill={primary} />
    //     <circle cx="210" cy="80" r="4" fill={accent} />
    //     <circle cx="200" cy="170" r="6" fill={primary} />
    //     <circle cx="60" cy="170" r="4" fill={accent} />
    //   </g>
    // </svg>
  );
}
