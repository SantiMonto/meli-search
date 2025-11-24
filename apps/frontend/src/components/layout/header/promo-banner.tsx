import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PromoBannerProps {
  className?: string;
}

export function PromoBanner({ className }: PromoBannerProps) {
  return (
    <Link
      href="/offers"
      className={cn(
        'flex items-center bg-[#FFFFFF] rounded-tl-full rounded-tr-full rounded-br-full overflow-hidden h-10 hover:opacity-90 transition-opacity',
        className,
      )}
    >
      <div className="bg-[#000000] h-full px-2 flex items-center justify-center">
        <span className="text-[#FFFFFF] font-extrabold text-sm whitespace-nowrap">
          ENVÍO GRATIS
        </span>
      </div>
      <div className="px-2 flex flex-col justify-center leading-tight whitespace-nowrap">
        <span className="text-[9px]">
          EN TU <strong>PRIMERA COMPRA</strong>
        </span>
        <span className="text-[9px] font-medium">EXCLUSIVO EN APP</span>
      </div>
    </Link>
  );
}
