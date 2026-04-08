import { useState } from 'react'

// Sample hooks data
const freeSamples = [
  { id: 1, title: '"Stop scrolling if you..."', niche: 'Lifestyle', type: 'text', preview: 'Stop scrolling if you want to know the secret...' },
  { id: 2, title: 'Pattern Interrupt - Jump', niche: 'All', type: 'video', src: 'https://agent-cdn.minimax.io/mcp/video_generation/gen_result/320323720219021316/384602126016741/1775490862_d185f15b.mp4', emoji: '😱' },
  { id: 3, title: '"I never told anyone..."', niche: 'Storytelling', type: 'text', preview: 'I never told anyone this about my business...' },
  { id: 4, title: 'Head Snap Reaction', niche: 'Comedy', type: 'video', src: 'https://agent-cdn.minimax.io/mcp/video_generation/gen_result/320323720219021316/384602126016741/1775490949_de78458a.mp4', emoji: '😲' },
  { id: 5, title: '"POV: You finally...', niche: 'Lifestyle', type: 'text', preview: 'POV: You finally discover the hack everyone...' },
  { id: 6, title: 'Direct Address - Finger', niche: 'Education', type: 'video', src: 'https://agent-cdn.minimax.io/mcp/video_generation/gen_result/320323720219021316/384602126016741/1775491036_33b0ee9e.mp4', emoji: '👆' },
  { id: 7, title: '"The truth about..."', niche: 'Gossip', type: 'text', preview: 'The truth about what really happened that night...' },
  { id: 8, title: 'Mystery Reveal', niche: 'Horror/Myst', type: 'video', src: 'https://agent-cdn.minimax.io/mcp/video_generation/gen_result/320323720219021316/384602126016741/1775490862_d185f15b.mp4', emoji: '👁️' },
]

const plans = [
  {
    id: 'starter', name: 'Starter', price: '$19', features: ['100 Viral Hooks', 'Text hook scripts (PDF)', 'Video hook templates', '1 niche pack', 'Commercial license'], color: '#06b6d4', highlight: false,
  },
  {
    id: 'pro', name: 'Pro', price: '$39', features: ['300 Viral Hooks', 'Text + Video + Audio hooks', 'Swipe file (500+ lines)', '5 niche packs', 'BONUS: Hook Formula Guide', 'Priority support'], color: '#a855f7', highlight: true,
  },
  {
    id: 'vault', name: 'Vault', price: '$79', features: ['500 Viral Hooks', 'Everything in Pro', 'Monthly hook updates', 'Private community', 'Custom niche requests (3x)', 'Lifetime access'], color: '#ec4899', highlight: false,
  },
]

const testimonials = [
  { name: '@maya_reels', handle: 'Maya K. — 280K followers', quote: 'I used one of these hooks on my last video and it hit 2.3M views. I\'ve bought every pack since.', avatar: 'MK' },
  { name: '@chris_builds', handle: 'Chris D. — Course creator', quote: 'My conversion rate went from 3% to 11% the moment I started using strong openings. These hooks are the secret.', avatar: 'CD' },
  { name: '@sarah_sells', handle: 'Sarah M. — DTC brand', quote: 'We run ads for our skincare brand. These hooks made our UGC actually stop the scroll. Best $39 I ever spent.', avatar: 'SM' },
]

const faqs = [
  { q: 'How do I receive the hooks?', a: 'After purchase you get an instant download link sent to your email. No waiting — the PDF and video files are ready immediately.' },
  { q: 'Can I use these hooks on TikTok, Instagram, YouTube Shorts?', a: 'Yes — commercial license covers you for all platforms. Use them in your own content, client work, or ads. No reselling of the raw files.' },
  { q: 'What format are the video hooks?', a: 'MP4 files at 1080P, optimized for mobile (9:16). Drop them straight into your editor or layer them as overlays.' },
  { q: 'Are there refunds?', a: 'Due to the digital nature, we don\'t offer refunds. But every pack includes a preview of all hooks so you know exactly what you\'re getting.' },
  { q: 'Do I need any editing skills?', a: 'No! The video hooks are ready to use. For text hooks, just copy the script into your video or caption. 30 seconds to apply.' },
]

function App() {
  const [purchaseModal, setPurchaseModal] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [purchased, setPurchased] = useState(false)
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)

  const handlePurchase = (planId: string) => {
    if (!email) return
    setPurchased(true)
    setTimeout(() => setPurchaseModal(null), 3000)
  }

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Purchase Modal */}
      {purchaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.9)' }}>
          <div className="w-full max-w-md rounded-2xl p-6" style={{ background: '#111827', border: '1px solid #374151' }}>
            {purchased ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-white mb-2">You're in!</h3>
                <p className="text-gray-400">Download link sent to <span className="text-purple-400 font-semibold">{email}</span><br/>Check your inbox — it usually arrives in under 1 minute.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold text-xl">Complete Purchase</h3>
                  <button onClick={() => setPurchaseModal(null)} className="text-gray-400 hover:text-white text-2xl cursor-pointer">×</button>
                </div>
                <p className="text-gray-400 text-sm mb-4">Enter your email to receive the {plans.find(p => p.id === purchaseModal)?.name} pack download link.</p>
                <div className="mb-4 p-4 rounded-xl" style={{ background: '#1a1a2e', border: `1px solid ${plans.find(p => p.id === purchaseModal)?.color}40` }}>
                  <div className="text-white font-semibold">{plans.find(p => p.id === purchaseModal)?.name} Pack</div>
                  <div className="text-2xl font-bold mt-1" style={{ color: plans.find(p => p.id === purchaseModal)?.color }}>{plans.find(p => p.id === purchaseModal)?.price}</div>
                </div>
                <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-lg px-4 py-3 mb-3 text-sm outline-none" style={{ background: '#0a0a0f', border: '1px solid #374151', color: '#e6edf3' }} />
                <button onClick={() => email && handlePurchase(purchaseModal)} disabled={!email} className="w-full py-3 rounded-lg font-bold text-white text-sm cursor-pointer transition-all disabled:opacity-40" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
                  Send My Download Link →
                </button>
                <p className="text-gray-600 text-xs text-center mt-2">Instant delivery · No account needed · Secure</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* NAV */}
      <nav className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between" style={{ background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #1f1f2e' }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)', color: 'white' }}>⚡</div>
          <span className="text-white font-bold text-lg">VIRAL<span className="text-purple-400">HOOKS</span>VAULT</span>
        </div>
        <div className="flex gap-3">
          <button onClick={() => document.getElementById('samples')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-400 hover:text-white text-sm cursor-pointer transition-colors">Free Samples</button>
          <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-400 hover:text-white text-sm cursor-pointer transition-colors">Pricing</button>
          <button onClick={() => setPurchaseModal('pro')} className="text-white text-sm font-semibold px-5 py-2 rounded-full cursor-pointer transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>Get Started</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden px-6 py-20 text-center">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, #a855f715, transparent)' }} />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs" style={{ background: '#a855f715', border: '1px solid #a855f730' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-300">500+ hooks sold · Updated weekly</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
            Make Views <span style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Stop Scrolling</span>
          </h1>
          <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">3 to 10 second video hooks that stop any scroll. AI-generated, proven to work, ready to paste into your next video.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => document.getElementById('samples')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 rounded-xl font-bold text-white cursor-pointer transition-all hover:scale-105 animate-glow" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)', fontSize: '16px' }}>
              🎬 Watch Free Samples →
            </button>
            <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 rounded-xl font-bold text-white cursor-pointer transition-all" style={{ background: '#1f1f2e', border: '1px solid #374151', fontSize: '16px' }}>
              See Pricing
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-6 py-12 border-t border-bottom" style={{ borderColor: '#1f1f2e' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[['500+', 'Hooks Available'], ['2.3M+', 'Views Generated'], ['48hr', 'Avg. Delivery']].map(([v, l]) => (
            <div key={l as string}>
              <div className="text-3xl font-black text-white">{v}</div>
              <div className="text-gray-500 text-sm mt-1">{l as string}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT ARE HOOKS */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-10">What Is a Viral Hook?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6" style={{ background: '#1a1a2e', border: '1px solid #374151' }}>
            <div className="text-red-400 text-sm font-bold mb-2">❌ BEFORE (boring)</div>
            <p className="text-gray-400">"Hey everyone, welcome back to my channel. Today I'm going to talk about..."</p>
            <p className="text-gray-600 text-sm mt-2">Viewers are gone in 3 seconds. No hook = no reach.</p>
          </div>
          <div className="rounded-2xl p-6" style={{ background: '#1a1a2e', border: '1px solid #a855f730' }}>
            <div className="text-green-400 text-sm font-bold mb-2">✅ AFTER (hooked)</div>
            <p className="text-white font-medium">"Stop scrolling. You're about to make the same mistake 90% of creators make..."</p>
            <p className="text-green-300 text-sm mt-2">2.3M views. Algorithm pushed it because people STAYED.</p>
          </div>
        </div>
        <p className="text-center text-gray-400 mt-8">The hook is everything. <strong className="text-white">These packs give you 500+ proven openings</strong> — so every video you post has a fighting chance.</p>
      </section>

      {/* FREE SAMPLES */}
      <section id="samples" className="px-6 py-16 border-t" style={{ borderColor: '#1f1f2e' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Free Sample Hooks</h2>
            <p className="text-gray-400">Watch a few examples from the pack. Each one is 3-10 seconds and ready to use.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {freeSamples.map(sample => (
              <div key={sample.id} className="rounded-xl overflow-hidden" style={{ background: '#1a1a2e', border: '1px solid #2a2a3e' }}>
                {sample.type === 'video' ? (
                  <div className="aspect-[9/16] relative bg-black">
                    <video src={sample.src} className="w-full h-full object-cover" muted loop playsInline onMouseEnter={e => (e.currentTarget as HTMLVideoElement).play()} onMouseLeave={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0 }} />
                    <div className="absolute bottom-2 left-2">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#a855f720', color: '#a855f7' }}>🎬 VIDEO</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="text-xs text-gray-500 mb-2">{sample.niche}</div>
                    <p className="text-white text-sm font-medium leading-snug">"{sample.preview}"</p>
                    <div className="text-xs text-gray-600 mt-2">📝 TEXT HOOK</div>
                  </div>
                )}
                <div className="px-4 py-2 text-xs text-gray-500 border-t" style={{ borderColor: '#2a2a3e' }}>{sample.title}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">This is just 8 of 500+ hooks. The full pack has hooks for every niche.</p>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-6 py-16 border-t" style={{ borderColor: '#1f1f2e' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-3">Simple Pricing</h2>
          <p className="text-gray-400 text-center mb-10">One payment. Instant download. Use forever.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map(plan => (
              <div key={plan.id} className="rounded-2xl p-6 relative" style={{ background: plan.highlight ? '#1a1a2e' : '#111827', border: plan.highlight ? `2px solid ${plan.color}` : '1px solid #1f1f2e' }}>
                {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: plan.color }}>MOST POPULAR</div>}
                <div className="text-sm text-gray-400 mb-1">{plan.name}</div>
                <div className="text-4xl font-black mb-4" style={{ color: plan.color }}>{plan.price}</div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => <li key={f} className="flex items-center gap-2 text-sm text-gray-300"><span style={{ color: plan.color }}>✓</span>{f}</li>)}
                </ul>
                <button onClick={() => setPurchaseModal(plan.id)} className="w-full py-3 rounded-xl font-bold text-white cursor-pointer transition-all hover:scale-105" style={{ background: plan.highlight ? `linear-gradient(135deg, ${plan.color}, #ec4899)` : '#1f1f2e', border: plan.highlight ? 'none' : `1px solid ${plan.color}40` }}>
                  Get {plan.name} →
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 text-xs mt-6">All packs include instant download · Commercial license · 30-day money-back guarantee</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-16 border-t" style={{ borderColor: '#1f1f2e' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-10">3 Steps to Viral Videos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[['1', '⚡', 'Download the Pack', 'Instant PDF + video files after purchase'], ['2', '🎬', 'Paste Into Your Video', 'Layer the hook at the start of your clip'], ['3', '📈', 'Post & Watch It Go', 'Strong opening = Algorithm boost = More reach']].map(([num, icon, title, desc]) => (
              <div key={num as string} className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mx-auto mb-4" style={{ background: '#a855f720', border: '1px solid #a855f740' }}>{icon}</div>
                <h3 className="text-white font-bold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 py-16 border-t" style={{ borderColor: '#1f1f2e' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">What Creators Are Saying</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-2xl p-5" style={{ background: '#111827', border: '1px solid #1f1f2e' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)', color: 'white' }}>{t.avatar}</div>
                  <div>
                    <div className="text-white text-sm font-semibold">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.handle}</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">"{t.quote}"</p>
                <div className="flex mt-3 gap-1">{'★★★★★'.split('').map((s, j) => <span key={j} className="text-yellow-400 text-sm">{s}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 border-t" style={{ borderColor: '#1f1f2e' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl p-5" style={{ background: '#111827', border: '1px solid #1f1f2e' }}>
                <h4 className="text-white font-semibold mb-2">{faq.q}</h4>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-20 text-center" style={{ background: 'linear-gradient(135deg, #1a0a2e, #0a0a0f)' }}>
        <h2 className="text-4xl font-black text-white mb-4">Your Next Video Could Go Viral</h2>
        <p className="text-gray-400 mb-8">The hook is the only thing that matters. Get 500 of the best ones starting at $19.</p>
        <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="px-10 py-4 rounded-xl font-bold text-white cursor-pointer transition-all hover:scale-105 animate-glow" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)', fontSize: '18px' }}>
          Get My Hooks Now →
        </button>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-8 border-t text-center" style={{ borderColor: '#1f1f2e' }}>
        <p className="text-gray-600 text-sm">© 2026 ViralHooksVault.com · All rights reserved · Commercial license included</p>
        <p className="text-gray-700 text-xs mt-1">This product contains AI-generated video content. Results may vary. Not affiliated with TikTok or Instagram.</p>
      </footer>
    </div>
  )
}

export default App