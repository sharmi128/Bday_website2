interface FlashProps {
  trigger: number
}

function CelebratoryFlash({ trigger }: FlashProps) {
  if (trigger <= 0) return null
  return (
    <>
      <div className="pop-flash" key={`flash-${trigger}`} aria-hidden="true" />
      <div className="pop-ring" key={`ring-${trigger}`} aria-hidden="true" />
    </>
  )
}

export default CelebratoryFlash