export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="text-center mb-12">
      <p className="text-primary uppercase tracking-[0.3em] text-xs font-bold mb-3">
        {eyebrow}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
      {description && (
        <p className="text-gray-400 max-w-2xl mx-auto mt-4">{description}</p>
      )}
    </div>
  );
}
