type Size = "lg" | "md" | "sm";

type Props = {
  size?: Size;
  className?: string;
  floatVariant?: "a" | "b";
};

const sizeMap: Record<Size, string> = {
  lg: "w-72 h-72",
  md: "w-44 h-44",
  sm: "w-24 h-24",
};

export default function GlossyOrb({ size = "lg", className = "", floatVariant = "a" }: Props) {
  return (
    <div
      className={`relative ${sizeMap[size]} ${className} ${
        floatVariant === "a" ? "animate-orb-a" : "animate-orb-b"
      }`}
      style={{ perspective: "800px" }}
    >
      {/* core sphere body */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95) 0%, rgba(196,170,255,0.85) 14%, rgba(124,92,255,0.9) 38%, rgba(74,47,196,0.95) 62%, rgba(26,15,92,1) 100%)",
          boxShadow:
            "inset -16px -16px 40px rgba(20,10,70,0.55), inset 10px 10px 30px rgba(255,255,255,0.4), 0 30px 60px -10px rgba(74,47,196,0.5)",
        }}
      />
      {/* rotating specular shine */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden animate-orb-shine"
        style={{ mixBlendMode: "overlay" }}
      >
        <div
          className="absolute w-[140%] h-[140%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.15) 30%, transparent 60%)",
          }}
        />
      </div>
      {/* glassy top highlight */}
      <div
        className="absolute top-[8%] left-[18%] w-[35%] h-[22%] rounded-full bg-white/70 blur-[3px]"
        style={{ transform: "rotate(-18deg)" }}
      />
    </div>
  );
}
