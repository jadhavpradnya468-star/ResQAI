import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Heart, MapPin } from "lucide-react";

export function Home() {
  const navigate = useNavigate();

  const floatingAnimals = ["🐕", "🐈", "🦜", "🐇", "🐾"];

  return (
    <div className="min-h-screen overflow-hidden pb-20">
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] via-[#FF8C42] to-[#FFA559] opacity-10"
        style={{
          clipPath: "ellipse(100% 60% at 50% 40%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="text-8xl"
            >
              🐾
            </motion.div>
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-[#FF6B35] rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl text-center mb-4 tracking-tight"
          style={{ fontWeight: 700, color: "#1A1A1A" }}
        >
          Rescue. Respond. Repeat.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-center mb-12 text-[#717182]"
        >
          AI-powered animal rescue at your fingertips
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 max-w-2xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/upload")}
            className="flex items-center justify-center gap-3 bg-[#FF6B35] text-white px-8 py-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            style={{ fontWeight: 600 }}
          >
            <Heart className="w-6 h-6" />
            Report Injury
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/vets")}
            className="flex items-center justify-center gap-3 bg-white text-[#FF6B35] px-8 py-5 rounded-2xl border-2 border-[#FF6B35] shadow-lg hover:shadow-xl transition-shadow"
            style={{ fontWeight: 600 }}
          >
            <MapPin className="w-6 h-6" />
            Find Nearby Vets
          </motion.button>
        </div>

        <div className="relative h-64">
          {floatingAnimals.map((emoji, index) => (
            <motion.div
              key={index}
              className="absolute text-5xl opacity-30"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * 200,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 50 - 25, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: index * 0.3,
              }}
              style={{
                left: `${(index + 1) * 18}%`,
                top: `${Math.random() * 80}%`,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16"
        >
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#FF6B35]/20">
            <div className="text-4xl mb-3">⚡</div>
            <h3 style={{ fontWeight: 600 }}>Instant Analysis</h3>
            <p className="text-[#717182] mt-2">
              Upload a photo and get AI-powered injury assessment in seconds
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#FF6B35]/20">
            <div className="text-4xl mb-3">🏥</div>
            <h3 style={{ fontWeight: 600 }}>Find Help Fast</h3>
            <p className="text-[#717182] mt-2">
              Locate nearby veterinary clinics with real-time availability
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#FF6B35]/20">
            <div className="text-4xl mb-3">💬</div>
            <h3 style={{ fontWeight: 600 }}>24/7 Guidance</h3>
            <p className="text-[#717182] mt-2">
              Chat with AI for immediate first aid instructions
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
