'use client'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

// Each card either auto-plays a bg video, or shows an image with a play-trigger
const videos = [
  {
    type: 'ambient',
    src: 'https://cdn.prod.website-files.com/60997e06a8d6843b1cb9c2c9/6137f5934a37785d98949e18_3%20vids%20CTA%20section_2_1-transcode.mp4',
    poster: 'https://cdn.prod.website-files.com/60997e06a8d6843b1cb9c2c9/6568ad9f2175ce82c7aabff1_6127fefdbe2c904b042303bd_team_face-wepb.webp',
    label: 'Our Craft',
    title: 'Excellence in every job',
    span: 'col-span-2 row-span-2',
  },
  {
    type: 'testimonial',
    src: 'https://cdn.prod.website-files.com/60997e06a8d6843b1cb9c2c9/61292528c18dc048a3c6cb2c_2%20first%20sequences-transcode.mp4',
    poster: 'https://cdn.prod.website-files.com/60997e06a8d6843b1cb9c2c9/6568ad9d2175ce82c7aabe65_6138f184312c13c9a8ab96bb_Capture-d%E2%80%99%C3%A9cran%2C-le-2021-09-08-%C3%A0-13.21-webp.webp',
    label: 'Customer Review',
    quote: '"Rob cares. Anytime we had questions, he would walk us through beginning to end."',
    span: 'col-span-1 row-span-1',
  },
  {
    type: 'ambient',
    src: 'https://cdn.prod.website-files.com/60997e06a8d6843b1cb9c2c9/6137f5934a37785d98949e18_3%20vids%20CTA%20section_2_1-transcode.mp4',
    poster: 'https://cdn.prod.website-files.com/60997e06a8d6843b1cb9c2c9/6568ada36f54c48557b67fa1_6127fe4be9458bbed805b5c6_rob%20at%20client%27s%20door-min.webp',
    label: 'On Location',
    title: 'At your door, fast',
    span: 'col-span-1 row-span-1',
  },
]

function AmbientVideoCard({ video }: { video: typeof videos[0] }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (ref.current) {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) ref.current?.play().catch(() => {})
          else ref.current?.pause()
        })
      }, { threshold: 0.3 })
      obs.observe(ref.current)
      return () => obs.disconnect()
    }
  }, [])

  return (
    <div className={`relative rounded-2xl overflow-hidden ${video.span} min-h-[300px]`}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="metadata"
        poster={video.poster}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={video.src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-[#060f24]/80 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 p-7">
        <div className="label-chip-white mb-3">{video.label}</div>
        <h3 className="font-display text-2xl text-white">{video.title}</h3>
      </div>
    </div>
  )
}

function TestimonialVideoCard({ video }: { video: typeof videos[0] }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    if (!ref.current) return
    if (playing) { ref.current.pause(); setPlaying(false) }
    else { ref.current.play(); setPlaying(true) }
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden ${video.span} min-h-[260px] bg-[#060f24]`}>
      <video
        ref={ref}
        playsInline
        preload="metadata"
        poster={video.poster}
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      >
        <source src={video.src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-[#060f24]/90 via-[#060f24]/30 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-between p-7">
        <div className="label-chip-white">{video.label}</div>
        {!playing && (
          <div>
            <p className="text-white/90 text-sm italic leading-relaxed mb-4">{video.quote}</p>
            <button onClick={toggle} className="play-btn w-12 h-12 shadow-lg">
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                <path d="M0 0L14 8L0 16V0Z" fill="#060f24"/>
              </svg>
            </button>
          </div>
        )}
        {playing && (
          <button onClick={toggle} className="self-start bg-white/20 backdrop-blur-sm border border-white/20 text-white font-condensed text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full">
            ■ Pause
          </button>
        )}
      </div>
    </div>
  )
}

export default function VideoShowcase() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
          <div>
            <p className="label-chip mb-4">See The Work</p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-[#060f24] leading-[1.05]">
              Craftsmanship you can<br/><span className="italic">see and feel.</span>
            </h2>
          </div>
          <Link href="/reviews" className="btn-ghost-navy whitespace-nowrap">Customer Stories</Link>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[260px]">
          {videos.map((v, i) =>
            v.type === 'ambient'
              ? <AmbientVideoCard key={i} video={v} />
              : <TestimonialVideoCard key={i} video={v} />
          )}
        </div>
      </div>
    </section>
  )
}
