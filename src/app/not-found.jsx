import Link from "next/link";
import { TbHomeFilled } from "react-icons/tb";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#0d1f3c] flex items-center justify-center px-4 border-b border-white">
      <div className="text-center">
        {/* Big 404 */}
        <div className="relative mb-8">
          <p className="text-[10rem] sm:text-[14rem] font-black text-white/5 leading-none select-none">404</p>
          {/* Badge moved to bottom of 404 */}
          <div className="flex justify-center -mt-6">
            <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs tracking-widest uppercase font-semibold px-5 py-2 rounded-full mt-6">Page Not Found</span>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">Oops! This page doesn't exist.</h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto mb-8">The page you're looking for may have been moved, deleted, or never existed. Let's get you back on track.</p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/">
            <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#0d1f3c] text-sm font-semibold px-6 py-3 rounded-xl transition-colors">
              <TbHomeFilled size={16} />
              Back to Home
            </button>
          </Link>
          <Link href="/rooms">
            <button className="flex items-center gap-2 bg-transparent hover:bg-white/5 text-white text-sm font-medium px-6 py-3 rounded-xl border border-white/20 transition-colors">
              Browse Rooms
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
