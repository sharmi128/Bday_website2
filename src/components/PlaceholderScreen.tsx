function PlaceholderScreen() {
  return (
    <div className="placeholder-screen">
      <div className="placeholder-glow" />
      <div className="placeholder-content">
        <div className="placeholder-sparkle placeholder-sparkle-a" aria-hidden="true">✦</div>
        <div className="placeholder-sparkle placeholder-sparkle-b" aria-hidden="true">✦</div>
        <div className="placeholder-sparkle placeholder-sparkle-c" aria-hidden="true">✦</div>
        <h2 className="placeholder-title">Your surprise is just beginning... ✨</h2>
        <p className="placeholder-sub">Something magical is on its way 🎁</p>
      </div>
    </div>
  )
}

export default PlaceholderScreen