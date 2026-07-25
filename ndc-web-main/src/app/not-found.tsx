import Link from "next/link";
import { Home, Compass, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import "./not-found.css";

export default function NotFound() {
  return (
    <div className="error-page relative w-full min-h-screen flex items-center overflow-hidden bg-[#f8fafd]">
      {/* Dust particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="starsec"></div>
        <div className="starthird"></div>
        <div className="starfourth"></div>
        <div className="starfifth"></div>
      </div>

      {/* Lamp - strictly top right corner */}
      <div className="lamp__wrap absolute top-0 right-[-150px] w-[300px] pointer-events-none opacity-60 md:opacity-100 z-10">
        <div className="lamp">
          <div className="cable"></div>
          <div className="cover"></div>
          <div className="in-cover">
            <div className="bulb"></div>
          </div>
          <div className="light"></div>
        </div>
      </div>
      
      {/* Content */}
      <section className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 py-20 flex justify-center">
        <div className="max-w-3xl text-center flex flex-col items-center">
          <h3 className="text-[#f6872a] font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3">
            Oops! You've landed on
          </h3>
          <h1 className="text-6xl md:text-[90px] font-black uppercase leading-[0.95] tracking-tight">
            <span className="block text-[#0e2455]">Page Not</span>
            <span className="block text-[#f6872a]">Found!</span>
          </h1>
          <p className="mt-6 text-[#53545b] text-base md:text-lg leading-relaxed max-w-lg font-medium mx-auto">
            The page you're looking for might have been moved, removed, or never existed. Don't worry, even astronauts take a wrong turn sometimes.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="flex items-center justify-center gap-3 bg-[#111936] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#f6872a] transition-all duration-300 shadow-[0_8px_20px_rgba(17,25,54,0.2)] hover:shadow-[0_8px_20px_rgba(246,135,42,0.3)] hover:-translate-y-1"
            >
              <Home size={20} />
              <span>Back to Home</span>
            </Link>
            <Link 
              href="/" 
              className="flex items-center justify-center gap-3 bg-transparent border-2 border-[#111936] text-[#111936] px-8 py-4 rounded-xl font-semibold hover:bg-[#111936] hover:text-white transition-all duration-300 hover:-translate-y-1"
            >
              <Compass size={20} />
              <span>Explore Site</span>
            </Link>
          </div>

          <div className="mt-20 flex flex-col items-center">
            <h4 className="text-[#0e2455] font-bold text-lg">Need help?</h4>
            <p className="text-[#53545b] mt-1 font-medium text-center">
              Visit our <Link href="/contact-us" className="text-[#f6872a] font-semibold hover:underline">Help Center</Link> or contact support.
            </p>
            <div className="flex gap-4 mt-6 justify-center">
              <Link href="#" className="w-10 h-10 rounded-full bg-[#f1f3f7] flex items-center justify-center text-[#111936] hover:bg-[#f6872a] hover:text-white transition-colors">
                <Facebook size={18} fill="currentColor" className="border-none" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-[#f1f3f7] flex items-center justify-center text-[#111936] hover:bg-[#f6872a] hover:text-white transition-colors">
                <Twitter size={18} fill="currentColor" className="border-none" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-[#f1f3f7] flex items-center justify-center text-[#111936] hover:bg-[#f6872a] hover:text-white transition-colors">
                <Linkedin size={18} fill="currentColor" className="border-none" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-[#f1f3f7] flex items-center justify-center text-[#111936] hover:bg-[#f6872a] hover:text-white transition-colors">
                <Instagram size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
