'use client'
import { useEstimateModal } from './EstimateModal'

export default function EstimateButton({ className = 'btn-gold', children = 'Free Estimate' }: { className?: string; children?: React.ReactNode }) {
  const { open } = useEstimateModal()
  return (
    <button onClick={open} className={className}>
      {children}
    </button>
  )
}
