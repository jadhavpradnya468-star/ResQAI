import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Navigation, Star } from "lucide-react";

export function NearbyVets() {
  const [vets, setVets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch('/api/vets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            })
          });
          const data = await res.json();
          setVets(data);
        } catch {
          setVets(getMockVets());
        } finally {
          setLoading(false);
        }
      },
      () => {
        setVets(getMockVets());
        setLoading(false);
      }
    );
  }, []);

  const getMockVets = () => [
    { name: "Emergency Pet Care Center", rating: 4.9, distance: "0.8 km", phone: "(555) 123-4567", address: "123 Main Street" },
    { name: "City Veterinary Hospital", rating: 4.7, distance: "1.2 km", phone: "(555) 234-5678", address: "456 Oak Avenue" },
    { name: "Animal Wellness Clinic", rating: 4.8, distance: "1.5 km", phone: "(555) 345-6789", address: "789 Pine Road" },
    { name: "24/7 Pet Emergency", rating: 4.6, distance: "2.1 km", phone: "(555) 456-7890", address: "321 Elm Boulevard" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#FFF8F5] pb-20 pt-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <MapPin className="w-8 h-8 text-[#FF6B35]" />
          <h2 className="text-4xl" style={{ fontWeight: 700, color: "#1A1A1A" }}>
            Nearby Vets
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 shadow-lg mb-8 overflow-hidden"
        >
          <div className="bg-gradient-to-br from-[#FF6B35]/10 to-[#FF8C42]/10 h-64 rounded-xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <MapPin className="w-20 h-20 text-[#FF6B35] opacity-20" />
            </div>
            <div className="relative z-10 text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-4 h-4 bg-[#FF6B35] rounded-full mx-auto mb-4"
              />
              <p className="text-[#717182]" style={{ fontWeight: 600 }}>
                Your Location
              </p>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-[#FF6B35] border-t-transparent rounded-full mx-auto"
            />
            <p className="mt-4 text-[#717182]">Finding nearby vets...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {vets.map((vet: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-[#FF6B35]/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl mb-2" style={{ fontWeight: 700 }}>
                      {vet.name || vet.vicinity}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-[#717182]">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span style={{ fontWeight: 600 }}>{vet.rating || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Navigation className="w-4 h-4 text-[#FF6B35]" />
                        <span>{vet.distance || "Nearby"}</span>
                      </div>
                    </div>
                    <p className="text-sm text-[#717182] mt-2">{vet.address || vet.vicinity}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-[#FF6B35] text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                    style={{ fontWeight: 600 }}
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-white text-[#FF6B35] px-6 py-3 rounded-xl border-2 border-[#FF6B35] shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                    style={{ fontWeight: 600 }}
                  >
                    <Navigation className="w-4 h-4" />
                    Directions
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}