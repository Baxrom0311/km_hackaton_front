import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="section-shell flex min-h-screen items-center justify-center py-12">
      <div className="glass-card max-w-xl p-8 text-center md:p-10">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#7b61ff]">404</div>
        <h1 className="mt-5 text-4xl font-bold text-white md:text-5xl">Bu sahifa topilmadi.</h1>
        <p className="mt-4 text-base leading-relaxed text-white/60">
          Asosiy sahifaga qayting.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#00f5d4] px-5 py-3 text-sm font-bold text-[#0a0f1e] transition hover:shadow-[0_0_30px_rgba(0,245,212,0.4)] hover:-translate-y-0.5"
        >
          <ArrowLeft className="h-4 w-4" />
          Bosh sahifaga qaytish
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
