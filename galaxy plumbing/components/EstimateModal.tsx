'use client'
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

const ModalContext = createContext<{ open: () => void }>({ open: () => {} })

export function useEstimateModal() {
  return useContext(ModalContext)
}

export function EstimateModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    if (isOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  return (
    <ModalContext.Provider value={{ open }}>
      {children}
      {isOpen && <EstimateModal onClose={close} />}
    </ModalContext.Provider>
  )
}

function EstimateModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#060f24]/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#060f24] rounded-t-2xl px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl text-white">Free Estimate</h2>
            <p className="font-condensed text-[14px] tracking-wide text-white/50 uppercase mt-1">We respond within 1-2 hours</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white text-xl"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="px-8 py-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="font-condensed text-[14px] tracking-[0.2em] uppercase text-gray-400 block mb-2">First Name</label>
              <input type="text" placeholder="John" className="input-field" />
            </div>
            <div>
              <label className="font-condensed text-[14px] tracking-[0.2em] uppercase text-gray-400 block mb-2">Last Name</label>
              <input type="text" placeholder="Smith" className="input-field" />
            </div>
          </div>
          <div>
            <label className="font-condensed text-[14px] tracking-[0.2em] uppercase text-gray-400 block mb-2">Phone Number</label>
            <input type="tel" placeholder="(416) 555-0123" className="input-field" />
          </div>
          <div>
            <label className="font-condensed text-[14px] tracking-[0.2em] uppercase text-gray-400 block mb-2">Email Address</label>
            <input type="email" placeholder="john@example.com" className="input-field" />
          </div>
          <div>
            <label className="font-condensed text-[14px] tracking-[0.2em] uppercase text-gray-400 block mb-2">Service Address</label>
            <input type="text" placeholder="123 Main St, Toronto, ON" className="input-field" />
          </div>
          <div>
            <label className="font-condensed text-[14px] tracking-[0.2em] uppercase text-gray-400 block mb-2">Service Needed</label>
            <select className="input-field">
              <option value="">Select a service...</option>
              <option>Emergency Repairs</option>
              <option>Water Leak Detection</option>
              <option>Drain Camera Inspection</option>
              <option>Drain Snaking & Cleaning</option>
              <option>Sump Pump</option>
              <option>Toilet Repairs</option>
              <option>Water Heaters & Boilers</option>
              <option>Water Filtration</option>
              <option>In-Floor Heating</option>
              <option>Faucets</option>
              <option>Vanities & Sinks</option>
              <option>Back Water Valves</option>
              <option>Property Management</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="font-condensed text-[14px] tracking-[0.2em] uppercase text-gray-400 block mb-2">Describe Your Issue</label>
            <textarea rows={4} placeholder="Tell us what's going on..." className="input-field resize-none" />
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1 accent-[#060f24]" />
            <span className="text-base text-gray-500">This is an emergency — please contact me ASAP</span>
          </label>
          <button className="btn-gold w-full justify-center">Send My Estimate Request</button>
          <p className="text-xs text-gray-400 text-center">For emergencies, call <a href="tel:416-727-5810" className="text-[#e8a800] font-bold hover:underline">416-727-5810</a> directly.</p>
        </div>
      </div>
    </div>
  )
}
