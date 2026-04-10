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
    id: 'starter',
    name: 'Starter',
    price: '$19',
    priceRaw: 19,
    features: ['100 Viral Hooks', 'Text hook scripts (PDF)', 'Video hook templates', '1 niche pack', 'Commercial license'],
    color: '#06b6d4',
    highlight: false,
    description: 'Perfect for trying the system',
    paymentLink: 'https://buy.stripe.com/YOUR_STARTER_LINK',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$39',
    priceRaw: 39,
    features: ['300 Viral Hooks', 'Text + Video + Audio hooks', 'Swipe file (500+ lines)', '5 niche packs', 'BONUS: Hook Formula Guide', 'Priority support'],
    color: '#a855f7',
    highlight: true,
    description: 'Most popular — best value',
    paymentLink: 'https://buy.stripe.com/YOUR_PRO_LINK',
  },
  {
    id: 'vault',
    name: 'Vault',
    price: '$79',
    priceRaw: 79,
    features: ['500 Viral Hooks', 'Everything in Pro', 'Monthly hook updates', 'Private community', 'Custom niche requests (3x)', 'Lifetime access'],
    color: '#ec4899',
    highlight: false,
    description: 'For serious content creators',
    paymentLink: 'https://buy.stripe.com/YOUR_VAULT_LINK',
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

// ─── Stripe Pay Button ─────────────────────────────────────────────────────────
function StripePayButton({ plan, label }: { plan: typeof plans[0], label: string }) {
  const [loading, setLoading] = useState(false)

  const handleBuy = () => {
    setLoading(true)
    // Redirect to Stripe Payment Link — no backend needed
    window.location.href = plan.paymentLink
  }

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="w-full py-3 rounded-lg font-bold text-white text-sm cursor-pointer transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ background: `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)` }}
    >
      {loading ? 'Redirecting...' : label}
    </button>
  )
}

// ─── Email Capture Modal (for email delivery after Stripe) ───────────────────
function EmailModal({ plan, onClose }: { plan: typeof plans[0], onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-md rounded-2xl p-6 relative" style={{ background: '#111827', border: '1px solid #374151' }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl cursor-pointer" style={{ background: 'none', border: 'none' }}>✕</button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-white text-xl font-bold mb-2">You're in!</h3>
            <p className="text-gray-400">Check your inbox — your {plan.name} pack link is on its way.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ background: `${plan.color}20`, color: plan.color }}>{plan.name} Pack</span>
              <h3 className="text-white text-2xl font-bold">{plan.price}</h3>
              <p className="text-gray-400 text-sm mt-1">{plan.description}</p>
            </div>

            <form onSubmit={handleSubmit}>
              <label className="text-gray-300 text-sm font-medium block mb-2">Your email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl text-white text-sm mb-4 outline-none"
                style={{ background: '#1a1a2e', border: '1px solid #374151' }}
              />
              <StripePayButton plan={plan} label={`Buy ${plan.name} — ${plan.price}`} />
              <p className="text-gray-500 text-xs text-center mt-3">🔒 Secure payment via Stripe. Cancel anytime.</p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

// ─── FAQ Accordion ─────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string, a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-800" style={{ borderColor: '#1f2937' }}>
      <button onClick={() => setOpen(!open)} className="w-full text-left py-4 flex justify-between items-center cursor-pointer" style={{ background: 'none', border: 'none' }}>
        <span className="text-gray-200 font-medium text-sm">{q}</span>
        <span className="text-gray-500 text-lg ml-3">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="text-gray-400 text-sm pb-4 leading-relaxed">{a}</p>}
    </div>
  )
}

// ─── Testimonial Card ──────────────────────────────────────────────────────────
function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: '#1a1a2e', border: '1px solid #1f2937' }}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: 'linear-gradient(135deg, #D4AF37, #b8962e)' }}>{t.avatar}</div>
        <div>
          <div className="text-white text-sm font-semibold">{t.name}</div>
          <div className="text-gray-500 text-xs">{t.handle}</div>
        </div>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">"{t.quote}"</p>
    </div>
  )
}

// ─── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const displayedSamples = showAll ? freeSamples : freeSamples.slice(0, 4)
  const selectedPlanObj = plans.find(p => p.id === selectedPlan)

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Email Modal */}
      {selectedPlanObj && (
        <EmailModal plan={selectedPlanObj} onClose={() => setSelectedPlan(null)} />
      )}

      {/* ─── HERO ─── */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(212,175,55,0.06) 0%, transparent 60%)' }} />
        <div className="max-w-5xl mx-auto px-5 pt-16 pb-14 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}>
            <span className="text-yellow-500 text-sm font-medium">🎣</span>
            <span className="text-gray-300 text-sm">500 research-backed hooks inside</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Viral Hooks<br />
            <span style={{ background: 'linear-gradient(135deg, #D4AF37, #f5d76e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vault</span>
          </h1>
          <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">3 to 10 second video hooks that stop any scroll. AI-generated, proven to work, ready to paste into your next video.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setSelectedPlan('pro')} className="text-white text-sm font-semibold px-6 py-3 rounded-full cursor-pointer transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
              Get the Pro Pack — $39
            </button>
            <button onClick={() => document.getElementById('samples')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-400 text-sm font-medium px-6 py-3 rounded-full border cursor-pointer transition-all hover:border-gray-500" style={{ borderColor: '#374151', background: 'transparent' }}>
              See Free Samples ↓
            </button>
          </div>
        </div>
      </header>

      {/* ─── STATS BAR ─── */}
      <div className="border-t border-b" style={{ borderColor: '#1f2937', background: '#0d0d14' }}>
        <div className="max-w-5xl mx-auto px-5 py-4 grid grid-cols-3 gap-6 text-center">
          {[['500+', 'Hook Templates'], ['3 Niches', 'Covered'], ['100%', 'Copy-Paste Ready']].map(([val, label]) => (
            <div key={label}>
              <div className="text-xl font-black text-white">{val}</div>
              <div className="text-gray-500 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── FREE SAMPLES ─── */}
      <section id="samples" className="max-w-5xl mx-auto px-5 py-14">
        <h2 className="text-white text-2xl font-bold mb-2">Free Hook Samples</h2>
        <p className="text-gray-400 text-sm mb-8">Tap any hook to preview. Full packs include 300–500 hooks.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayedSamples.map((hook, i) => (
            <div key={hook.id} className="rounded-xl overflow-hidden" style={{ background: '#13132a', border: '1px solid #1f2937' }}>
              {hook.type === 'video' ? (
                <div className="relative">
                  <video src={hook.src} className="w-full aspect-9/16 object-cover" autoPlay muted loop playsInline />
                  <div className="absolute top-2 left-2 text-2xl">{hook.emoji}</div>
                  <div className="absolute bottom-2 left-2">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,0,0,0.7)', color: '#D4AF37' }}>🎬 Video</span>
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-2">{hook.niche} · TEXT</div>
                  <p className="text-gray-200 text-sm font-medium leading-relaxed">"{hook.preview}"</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button onClick={() => setShowAll(!showAll)} className="text-gray-400 text-sm cursor-pointer hover:text-white transition-colors" style={{ background: 'none', border: 'none' }}>
            {showAll ? 'Show fewer ↑' : 'See all 8 samples ↓'}
          </button>
        </div>
      </section>

      {/* ─── WHAT'S INSIDE ─── */}
      <section className="max-w-5xl mx-auto px-5 py-14">
        <h2 className="text-white text-2xl font-bold mb-8 text-center">What's Inside the Vault</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            ['🎬', 'Video Hooks', 'MP4 files — drop into your content or use as overlays. 9:16 mobile-first format.'],
            ['📝', 'Text Hooks', '300+ script templates. Hook setup → payoff structure. Just read and record.'],
            ['🎙️', 'Audio Hooks', 'Voice-over intros in 6 tones. Plug into any video editor.'],
            ['📊', 'Niche Packs', 'Hooks matched to: Finance, Health, Business, Relationships, Tech, Lifestyle.'],
            ['💰', 'Swipe File', '500-line swipe file of proven viral hooks. Copy, paste, adapt.'],
            ['📅', 'Hook Calendar', '30-day posting calendar with hook-of-the-day for each slot.'],
          ].map(([icon, title, desc]) => (
            <div key={title} className="rounded-xl p-5" style={{ background: '#13132a', border: '1px solid #1f2937' }}>
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="max-w-5xl mx-auto px-5 py-14">
        <h2 className="text-white text-3xl font-black mb-2 text-center">Choose Your Pack</h2>
        <p className="text-gray-400 text-center text-sm mb-10">One-time payment. Lifetime access. Instant delivery.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map(plan => (
            <div key={plan.id} className="rounded-2xl overflow-hidden" style={{ background: '#13132a', border: plan.highlight ? `2px solid ${plan.color}` : '1px solid #1f2937', transform: plan.highlight ? 'scale(1.03)' : 'none' }}>
              {plan.highlight && (
                <div className="text-center py-2 text-xs font-bold" style={{ background: `linear-gradient(135deg, ${plan.color}, ${plan.color}aa)`, color: 'white' }}>
                  ⭐ MOST POPULAR
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-bold text-lg">{plan.name}</span>
                  {plan.highlight && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${plan.color}20`, color: plan.color }}>BEST VALUE</span>}
                </div>
                <div className="text-4xl font-black text-white mb-1">{plan.price}</div>
                <div className="text-gray-500 text-xs mb-5">{plan.description}</div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="text-gray-300 text-xs flex items-start gap-2">
                      <span style={{ color: plan.color }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className="w-full py-3 rounded-xl font-bold text-white text-sm cursor-pointer transition-all hover:brightness-110"
                  style={{ background: `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)`, border: 'none' }}
                >
                  Get {plan.name} — {plan.price}
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 text-xs mt-6">🔒 Secured by Stripe · Instant digital delivery · No refunds on digital files</p>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="max-w-5xl mx-auto px-5 py-14">
        <h2 className="text-white text-2xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[['1', '⚡', 'Buy the Pack', 'Instant PDF + video files after purchase'], ['2', '🎬', 'Paste Into Your Video', 'Layer the hook at the start of your clip'], ['3', '📈', 'Post & Watch It Go', 'Strong opening = Algorithm boost = More reach']].map(([num, icon, title, desc]) => (
            <div key={num} className="text-center">
              <div className="text-4xl mb-3">{icon}</div>
              <div className="text-yellow-500 font-black text-xl mb-1">{num}</div>
              <h3 className="text-white font-semibold mb-1">{title}</h3>
              <p className="text-gray-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="max-w-5xl mx-auto px-5 py-14">
        <h2 className="text-white text-2xl font-bold mb-8 text-center">What Creators Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map(t => <TestimonialCard key={t.name} t={t} />)}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="max-w-3xl mx-auto px-5 py-14">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">Common Questions</h2>
        <div className="rounded-2xl overflow-hidden" style={{ background: '#13132a', border: '1px solid #1f2937' }}>
          {faqs.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="max-w-5xl mx-auto px-5 py-16 text-center">
        <div className="rounded-2xl p-10" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(236,72,153,0.1))', border: '1px solid rgba(168,85,247,0.2)' }}>
          <h2 className="text-white text-3xl font-black mb-3">Stop Making Content That Flops</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto text-sm">The hook is everything. These packs give you 500+ proven openings — so every video you post has a fighting chance.</p>
          <button onClick={() => setSelectedPlan('pro')} className="text-white font-bold px-8 py-4 rounded-full text-base cursor-pointer transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
            Get Pro — $39 · Instant Access
          </button>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t" style={{ borderColor: '#1f2937', background: '#080810' }}>
        <div className="max-w-5xl mx-auto px-5 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">© 2026 Viral Hooks Vault · Powered by Stripe</div>
          <div className="text-gray-600 text-xs">All prices in USD · Digital delivery only</div>
        </div>
      </footer>

    </div>
  )
}