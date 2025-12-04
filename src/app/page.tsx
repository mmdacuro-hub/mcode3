import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-red-800 via-red-950 to-black font-sans relative">

      {/* LEFT SIDE — Images (fixed independently) */}
      <div className="flex flex-col items-center gap-4 absolute left-30 top-1/2 -translate-y-1/2">
        <Image src="/image/nest.png" alt="NestJS Logo" width={200} height={200} />
        <Image src="/image/next.png" alt="NextJS Logo" width={200} height={200} />
      </div>

      {/* RIGHT SIDE — Main Box */}
      <main className="w-full max-w-2xl p-30 bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl flex flex-col items-center text-white space-y-10 relative left-5">
        <h1 className="text-4xl font-bold text-center">
          Welcome to NextJS and NestJS Authentication
        </h1>

        <div className="flex flex-row gap-4">
          {/* Login Button */}
          <Link
            href="/login"
            className="flex h-15 items-center gap-3 rounded-full bg-white text-black px-9 hover:bg-gray-500"
          >
            Login
          </Link>

          {/* Register Button */}
          <Link
            href="/register"
            className="flex h-15 items-center justify-center rounded-full border border-white px-6 hover:bg-white/10 text-white"
          >
            Register
          </Link>
        </div>
      </main>

      {/* RIGHT VERTICAL TEXT — DACURO */}
      <div className="absolute right-43 top-1/2 -translate-y-1/2 flex flex-col text-white text-6xl font-semibold tracking-widest">
        <span>D</span>
        <span>A</span>
        <span>C</span>
        <span>U</span>
        <span>R</span>
        <span>O</span>
      </div>

    </div>
  );
}
