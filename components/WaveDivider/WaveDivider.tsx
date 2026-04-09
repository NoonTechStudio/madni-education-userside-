// Server Component — reusable wave SVG divider
interface WaveDividerProps {
  fromColor: string;
  toColor: string;
  path?: string;
}

export default function WaveDivider({
  fromColor,
  toColor,
  path = "M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z",
}: WaveDividerProps) {
  return (
    <div className="wave-divider" aria-hidden="true" style={{ background: fromColor }}>
      <svg
        viewBox="0 0 1440 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d={path} fill={toColor} />
      </svg>
    </div>
  );
}
