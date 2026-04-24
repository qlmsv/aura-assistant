import Image from "next/image";

type Props = {
  size?: number;
  className?: string;
  glow?: boolean;
  priority?: boolean;
};

/** Round photo avatar of Alina — replaces the "А" letter badge everywhere. */
export function Avatar({ size = 32, className = "", glow = false, priority = false }: Props) {
  return (
    <span
      className={`relative inline-flex overflow-hidden rounded-full ring-1 ring-accent/40 ${
        glow ? "shadow-glow" : ""
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/alina-avatar.jpg"
        alt="Алина"
        width={size * 2}
        height={size * 2}
        priority={priority}
        className="h-full w-full object-cover object-[center_22%]"
        sizes={`${size}px`}
      />
    </span>
  );
}
