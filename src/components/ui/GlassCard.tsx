export default function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl bg-glass-bg border border-glass-border backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}
