export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <span
      className={`brand flex min-w-0 items-center gap-2.5 ${inverse ? 'text-white' : 'text-navy'}`}
    >
      <svg
        className="shrink-0"
        width="38"
        height="42"
        viewBox="0 0 42 46"
        role="img"
        aria-label="Conceptual Foundation symbol"
      >
        <path d="M4 19C15 18 18 26 20 40C6 37 1 29 4 19Z" fill="#096E12" />
        <path d="M34 4C35 17 28 25 19 28C16 13 22 6 34 4Z" fill="#0166FE" />
        <path d="M17 5C27 11 30 19 29 28C15 23 10 15 17 5Z" fill="#FEC722" />
        <path d="M13 32C23 25 33 29 40 40C27 44 19 42 13 32Z" fill="#01154A" />
      </svg>
      <span className="min-w-0 block leading-tight">
        <strong className="block text-[13px] font-black tracking-tight sm:text-[15px]">
          Christopher Peter Jen Initiative
        </strong>
        <span className="block text-[10px] font-semibold sm:text-[11px]">
          Skills Acquisition Foundation
        </span>
      </span>
    </span>
  );
}
