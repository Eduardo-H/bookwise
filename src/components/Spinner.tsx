import { SpinnerGap } from 'phosphor-react'

export function Spinner() {
  return (
    <div className="animate-spin">
      <SpinnerGap size={28} className="text-gray-100" />
    </div>
  )
}
