import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — GEEKROOM",
  description: "Get in touch with GEEKROOM.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 overflow-hidden bg-[#050505] flex items-center justify-center">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#00F2FF]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF8C00]/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-4xl mx-auto rounded-3xl border border-white/10 bg-[#050505]/40 p-8 sm:p-12 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F2FF] to-white pb-2 mb-4">
          CONTACT <span className="text-[#00F2FF]">SYSTEM</span>
        </h1>
        <p className="text-[#ededed]/70 text-lg mb-10 max-w-2xl">
          Initialize a communication link. Whether you have questions or want to collaborate, securely transmit your message to our systems.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00F2FF] to-[#FF8C00] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-[#050505] rounded-xl p-6 border border-white/5">
                <h3 className="text-[#00F2FF] font-mono text-sm tracking-widest mb-2 uppercase">Comm-Link</h3>
                <a
                  href="mailto:geekroom@jimsemtc.in"
                  className="text-xl font-medium text-white hover:text-[#00F2FF] transition-colors gap-2 inline-flex items-center break-all"
                >
                  geekroom@jimsemtc.in
                </a>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF8C00] to-[#00F2FF] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-[#050505] rounded-xl p-6 border border-white/5">
                <h3 className="text-[#FF8C00] font-mono text-sm tracking-widest mb-2 uppercase">Network Nodes</h3>
                <div className="flex gap-4 text-[#ededed]/70">
                  <a href="https://www.linkedin.com/in/geek-room-jims-emtc-0078b43b5?utm_source=share_via&utm_content=profile&utm_medium=member_android" className="hover:text-[#FF8C00] transition-colors">LinkedIn</a>
                  <span className="text-white/20">|</span>
                  <a href="https://www.instagram.com/geekroom.jemtec/?hl=en" className="hover:text-[#FF8C00] transition-colors">Instagram</a>
                  <span className="text-white/20">|</span>
                  <a href="https://github.com/sahil7700/geek-room-site" className="hover:text-[#FF8C00] transition-colors">GitHub</a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-5">
            <div>
              <input
                type="text"
                placeholder="YOUR.NAME"
                className="w-full bg-[#050505]/60 border border-white/10 rounded-xl px-5 py-4 text-[#ededed] placeholder-white/20 focus:outline-none focus:border-[#00F2FF]/50 focus:ring-1 focus:ring-[#00F2FF]/50 transition-all text-sm font-mono"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="YOUR.EMAIL@DOMAIN.COM"
                className="w-full bg-[#050505]/60 border border-white/10 rounded-xl px-5 py-4 text-[#ededed] placeholder-white/20 focus:outline-none focus:border-[#00F2FF]/50 focus:ring-1 focus:ring-[#00F2FF]/50 transition-all text-sm font-mono"
              />
            </div>
            <div>
              <textarea
                placeholder="ENTER MESSAGE PROTOCOL..."
                rows={4}
                className="w-full bg-[#050505]/60 border border-white/10 rounded-xl px-5 py-4 text-[#ededed] placeholder-white/20 focus:outline-none focus:border-[#00F2FF]/50 focus:ring-1 focus:ring-[#00F2FF]/50 transition-all text-sm font-mono resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black bg-[#00F2FF] rounded-xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative flex items-center gap-2">
                TRANSMIT SECURELY
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </span>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
