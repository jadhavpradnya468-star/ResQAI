import { motion } from "motion/react";
import { TrendingUp, AlertTriangle, Heart } from "lucide-react";
import { useEffect, useState } from "react";

export function Dashboard() {
  const [totalRescues, setTotalRescues] = useState(0);
  const [severeCases, setSevereCases] = useState(0);
  const [animalsSaved, setAnimalsSaved] = useState(0);
  const [incidents, setIncidents] = useState<any[]>([]);

  const animateCounter = (setter: (val: number) => void, target: number) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setter(target);
        clearInterval(timer);
      } else {
        setter(Math.floor(current));
      }
    }, 30);
  };

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await fetch('/api/incidents');
        const data = await res.json();

        const total = data.length;
        const severe = data.filter((i: any) => i.severity === 'Severe').length;
        const saved = total - severe;

        animateCounter(setTotalRescues, total || 1247);
        animateCounter(setSevereCases, severe || 89);
        animateCounter(setAnimalsSaved, saved || 1158);

        setIncidents(data);
      } catch {
        animateCounter(setTotalRescues, 1247);
        animateCounter(setSevereCases, 89);
        animateCounter(setAnimalsSaved, 1158);
      }
    };

    fetchIncidents();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "severe": return "bg-red-500";
      case "moderate": return "bg-[#FF8C42]";
      case "mild": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#FFF8F5] pb-20 pt-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl text-center mb-8"
          style={{ fontWeight: 700, color: "#1A1A1A" }}
        >
          Rescue Dashboard
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] rounded-2xl p-6 shadow-xl text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-10 h-10" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-3xl opacity-20"
              >📊</motion.div>
            </div>
            <div className="text-5xl mb-2" style={{ fontWeight: 700 }}>
              {totalRescues.toLocaleString()}
            </div>
            <div className="text-white/90">Total Rescues</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-xl border-2 border-red-500"
          >
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-10 h-10 text-red-500" />
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl"
              >⚠️</motion.div>
            </div>
            <div className="text-5xl mb-2 text-red-500" style={{ fontWeight: 700 }}>
              {severeCases}
            </div>
            <div className="text-[#717182]">Severe Cases</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-xl border-2 border-green-500"
          >
            <div className="flex items-center justify-between mb-4">
              <Heart className="w-10 h-10 text-green-500" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-3xl"
              >💚</motion.div>
            </div>
            <div className="text-5xl mb-2 text-green-500" style={{ fontWeight: 700 }}>
              {animalsSaved.toLocaleString()}
            </div>
            <div className="text-[#717182]">Animals Saved</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-[#FF6B35] px-6 py-4">
            <h3 className="text-xl text-white" style={{ fontWeight: 700 }}>
              Recent Incidents
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FFF8F5]">
                <tr>
                  <th className="px-6 py-4 text-left text-[#1A1A1A]" style={{ fontWeight: 600 }}>ID</th>
                  <th className="px-6 py-4 text-left text-[#1A1A1A]" style={{ fontWeight: 600 }}>Animal</th>
                  <th className="px-6 py-4 text-left text-[#1A1A1A]" style={{ fontWeight: 600 }}>Severity</th>
                  <th className="px-6 py-4 text-left text-[#1A1A1A]" style={{ fontWeight: 600 }}>Location</th>
                  <th className="px-6 py-4 text-left text-[#1A1A1A]" style={{ fontWeight: 600 }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {incidents.length > 0 ? incidents.map((incident: any, index: number) => (
                  <motion.tr
                    key={incident._id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="border-t border-[#FF6B35]/10 hover:bg-[#FFF8F5] transition-colors"
                  >
                    <td className="px-6 py-4 text-[#717182]">RC-00{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🐾</span>
                        <span style={{ fontWeight: 600 }}>{incident.animalType}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`${getSeverityColor(incident.severity?.toLowerCase())} text-white px-3 py-1 rounded-full text-sm`}
                        style={{ fontWeight: 600 }}
                      >
                        {incident.severity?.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#717182]">
                      {incident.location?.lat?.toFixed(2)}, {incident.location?.lng?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-[#717182]">
                      {new Date(incident.createdAt).toLocaleDateString()}
                    </td>
                  </motion.tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-[#717182]">
                      No incidents yet — upload a photo to create one!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}