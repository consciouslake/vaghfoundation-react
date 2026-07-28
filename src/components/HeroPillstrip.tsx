export function HeroPillstrip({ pills }: { pills: string[] }) {
  return (
    <div className="wrap hero-pillstrip">
      {pills.map((p) => (
        <span key={p} className="hero-pill">
          {p}
        </span>
      ))}
    </div>
  )
}
