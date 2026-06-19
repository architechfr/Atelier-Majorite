// Identité visuelle « L'Atelier Majorité »

export function Monogram({ size = 36 }: { size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white font-black leading-none shadow-sm ring-1 ring-marine-900/10"
      style={{ width: size, height: size, fontSize: size * 0.46 }}
    >
      <span className="text-marine-700">A</span>
      <span className="-ml-0.5 text-atelier-500">M</span>
    </span>
  );
}

export function Logo({
  light = false,
  size = 36,
}: {
  light?: boolean;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Monogram size={size} />
      <div className="leading-tight">
        <p
          className={`text-sm font-extrabold tracking-tight ${
            light ? "text-white" : "text-marine-900"
          }`}
        >
          L'Atelier
        </p>
        <p className="text-sm font-extrabold leading-tight tracking-tight text-atelier-500">
          Majorité
        </p>
      </div>
    </div>
  );
}
