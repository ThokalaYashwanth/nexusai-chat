const FEATURE_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
      </svg>
    ),
    title: 'Intelligent answers',
    desc: 'Powered by Claude, understands complex queries'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>
      </svg>
    ),
    title: 'Code & markdown',
    desc: 'Syntax-highlighted code, tables, and rich formatting'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/>
      </svg>
    ),
    title: 'Persistent history',
    desc: 'All conversations saved, resume anytime'
  },
]

export default function WelcomeScreen() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 animate-fade-in">
      {/* Logo */}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>
          </svg>
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-white dark:border-gray-950 shadow-sm" />
      </div>

      <h1 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 text-center mb-2 tracking-tight">
        Welcome to NexusAI
      </h1>
      <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm mb-10 leading-relaxed">
        Your intelligent assistant. Ask anything — coding, research, writing, analysis, or just a conversation.
      </p>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl">
        {FEATURE_CARDS.map((f, i) => (
          <div key={i} className="glass rounded-2xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/20 text-brand-500 flex items-center justify-center mx-auto mb-3">
              {f.icon}
            </div>
            <p className="font-medium text-slate-700 dark:text-slate-200 text-sm mb-1">{f.title}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 leading-snug">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
