import Image from 'next/image';

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <span
      className={`brand flex min-w-0 items-center gap-2.5 ${inverse ? 'text-white' : 'text-navy'}`}
    >
      <Image
        className="brand-logo size-[72px] shrink-0 object-contain"
        src="/images/foundation-badge.png"
        width={72}
        height={72}
        sizes="(max-width: 359px) 48px, (max-width: 639px) 56px, 72px"
        alt="Christopher Peter Jen Foundation Skills Acquisition Initiative badge"
        priority
      />
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
