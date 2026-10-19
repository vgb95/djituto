export function BrandMark({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      role="img"
      aria-label="TUTO"
      className="brand-mark"
    >
      <rect width="512" height="512" rx="116" fill="currentColor" />
      <circle cx="256" cy="256" r="142" fill="none" stroke="#C8F84A" strokeWidth="3" opacity=".32" />
      <circle cx="256" cy="256" r="122" fill="none" stroke="#C8F84A" strokeWidth="30" />
      <circle cx="256" cy="256" r="74" fill="#C8F84A" />
      <circle cx="256" cy="256" r="44" fill="currentColor" />
      <circle cx="298" cy="216" r="13" fill="#FF5C35" />
      <path
        d="M256 76v30M256 406v30M76 256h30M406 256h30"
        stroke="#F2EFE6"
        strokeWidth="8"
        strokeLinecap="round"
        opacity=".6"
      />
    </svg>
  )
}
