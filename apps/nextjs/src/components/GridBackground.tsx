export function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Perspective grid */}
      <div
        className="absolute inset-0"
        style={{
          perspective: "500px",
          perspectiveOrigin: "50% 0%",
        }}
      >
        <div
          className="absolute left-0 right-0 top-0 h-[200vh] origin-top"
          style={{
            transform: "rotateX(60deg)",
            background:
              "linear-gradient(rgba(var(--primary-rgb,0,180,255),0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--primary-rgb,0,180,255),0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Radial fade overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />

      {/* Top glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb,0,180,255),0.06),transparent_70%)]" />
    </div>
  )
}
