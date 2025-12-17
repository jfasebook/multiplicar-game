import MultiplicationGame from "../islands/MultiplicationGame.tsx";
import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet" />
        <style>
          {`
            body { font-family: 'Orbitron', sans-serif; }
            .neon-text { text-shadow: 0 0 10px rgba(224, 107, 255, 0.8), 0 0 20px rgba(224, 107, 255, 0.4); }
            .gold-text { text-shadow: 0 0 10px rgba(255, 196, 0, 0.8), 0 0 20px rgba(255, 196, 0, 0.4); }
          `}
        </style>
      </Head>
      <div 
        class="min-h-screen px-4 py-8 font-sans bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop")' }}
      >
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>
        
        <div class="relative z-10 max-w-screen-lg mx-auto flex flex-col items-center justify-center w-full">
          <h1 class="text-5xl sm:text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFC400] via-[#E06BFF] to-[#FFC400] mb-8 drop-shadow-sm text-center tracking-widest py-4 uppercase italic transform -skew-x-6 px-2">
            Huntrix
            <span class="block text-3xl sm:text-4xl md:text-5xl mt-2 text-white gold-text not-italic skew-x-0">Math Battle</span>
          </h1>
          <div class="w-full px-2 sm:px-0">
            <MultiplicationGame />
          </div>
        </div>
      </div>
    </>
  );
}
