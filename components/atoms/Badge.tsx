import type { ReactNode } from "react";

type Variant = "brand" | "ghost" | "neutral";

type Props = {
  children: ReactNode;
  variant?: Variant;
};

const variantClasses: Record<Variant, string> = {
  brand: "bg-brand-light text-brand",
  ghost: "bg-white/10 text-white/60",
  neutral: "bg-gray-100 text-gray-500",
};

export default function Badge({ children, variant = "brand" }: Props) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-medium whitespace-nowrap ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
