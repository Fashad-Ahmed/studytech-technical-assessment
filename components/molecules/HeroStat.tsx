import CountUp from "@/components/atoms/CountUp";

type Props = {
  value: number;
  label: string;
  color: string;
  suffix?: string;
};

export default function HeroStat({ value, label, color, suffix = "" }: Props) {
  return (
    <div className="space-y-1.5">
      <p className={`font-display text-3xl font-bold tracking-[-0.025em] ${color}`}>
        <CountUp value={value} />
        {suffix}
      </p>
      <p className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.14em]">
        {label}
      </p>
    </div>
  );
}
