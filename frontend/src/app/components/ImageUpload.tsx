import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, AlertCircle, CheckCircle, Clock } from "lucide-react";

export function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [gpsLocation, setGpsLocation] = useState<{lat: number, lng: number} | null>(null);
  const [result, setResult] = useState<{
    animal: string;
    severity: "severe" | "moderate" | "mild";
    description: string;
    icon: string;
  } | null>(null);

const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      await analyzeImage(file);
    }
    navigator.geolocation.getCurrentPosition((pos) => {
  setGpsLocation({
    lat: pos.coords.latitude,
    lng: pos.coords.longitude
  });
});
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      await analyzeImage(file);
    }
  };

  const analyzeImage = async (file: File) => {
    setAnalyzing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      setResult({
        animal: data.animal || "Unknown",
        severity: (data.severity?.toLowerCase() || "moderate") as "severe" | "moderate" | "mild",
        description: `${data.animal} detected with ${data.severity} condition. Please follow first aid steps and contact vet immediately.`,
        icon: getAnimalIcon(data.animal),
      });

    } catch (error) {
      setResult({
        animal: "Unknown",
        severity: "moderate",
        description: "Could not analyze image. Please try again.",
        icon: "🐾",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const getAnimalIcon = (animal: string) => {
    const icons: { [key: string]: string } = {
      dog: "🐕",
      cat: "🐈",
      cow: "🐄",
      bird: "🦜",
      horse: "🐎",
    };
    return icons[animal?.toLowerCase()] || "🐾";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "severe":
        return "bg-red-500";
      case "moderate":
        return "bg-[#FF8C42]";
      case "mild":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "severe":
        return <AlertCircle className="w-5 h-5" />;
      case "moderate":
        return <Clock className="w-5 h-5" />;
      case "mild":
        return <CheckCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };
 const sendToDoctorWhatsApp = () => {
  const doctorPhone = "91XXXXXXXXXX";

  const locationLink = gpsLocation
    ? `https://maps.google.com/?q=${gpsLocation.lat},${gpsLocation.lng}`
    : "Location not available";

  const message = 
`🚨 *ResQAI - Emergency Animal Rescue Report*

🐾 *Animal:* ${result?.animal}
⚠️ *Severity:* ${result?.severity?.toUpperCase()}
📍 *Location:* ${locationLink}
🕐 *Time:* ${new Date().toLocaleString()}

✅ *AI Verified Report*
📸 *Geotagged Photo Attached*

_Sent via ResQAI Animal Rescue System_`;

  const whatsappUrl = `https://wa.me/${doctorPhone}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#FFF8F5] pb-20 pt-8 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl text-center mb-8"
          style={{ fontWeight: 700, color: "#1A1A1A" }}
        >
          Upload Injured Animal Photo
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="relative bg-white rounded-2xl p-12 shadow-lg mb-8 border-2 border-dashed border-[#FF6B35]/50 hover:border-[#FF6B35] transition-colors cursor-pointer"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          {!selectedImage && (
            <div className="text-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex justify-center mb-4"
              >
                <div className="bg-[#FFF8F5] p-6 rounded-full">
                  <Upload className="w-12 h-12 text-[#FF6B35]" />
                </div>
              </motion.div>
              <h3 className="mb-2" style={{ fontWeight: 600, color: "#1A1A1A" }}>
                Drop your image here
              </h3>
              <p className="text-[#717182]">or click to browse</p>
              <p className="text-sm text-[#717182] mt-4">
                Supports: JPG, PNG, HEIC
              </p>
            </div>
          )}

          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative"
            >
              <img
                src={selectedImage}
                alt="Uploaded animal"
                className="w-full h-64 object-cover rounded-xl"
              />
            </motion.div>
          )}
        </motion.div>

        <AnimatePresence>
          {analyzing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl p-8 shadow-lg mb-8"
            >
              <div className="flex items-center justify-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-[#FF6B35] border-t-transparent rounded-full"
                />
                <p className="text-lg" style={{ fontWeight: 600 }}>
                  Analyzing image with AI...
                </p>
              </div>
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-[#FF6B35]/20"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl">{result.icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl" style={{ fontWeight: 700 }}>
                    {result.animal} Detected
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <motion.div
                      animate={
                        result.severity === "severe"
                          ? { scale: [1, 1.1, 1] }
                          : {}
                      }
                      transition={{ duration: 1, repeat: Infinity }}
                      className={`flex items-center gap-2 ${getSeverityColor(
                        result.severity
                      )} text-white px-4 py-2 rounded-full`}
                      style={{ fontWeight: 600 }}
                    >
                      {getSeverityIcon(result.severity)}
                      {result.severity.toUpperCase()}
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="bg-[#FFF8F5] rounded-xl p-6">
                <h4 className="mb-2" style={{ fontWeight: 600 }}>
                  Assessment:
                </h4>
                <p className="text-[#1A1A1A]">{result.description}</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 bg-[#FF6B35] text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                style={{ fontWeight: 600 }}
              >
                Find Nearest Vet
              </motion.button>
              <motion.button
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
             onClick={sendToDoctorWhatsApp}
             className="w-full mt-3 bg-green-500 text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
             style={{ fontWeight: 600 }}
>
  <span className="text-xl">💬</span>
  Send to Doctor on WhatsApp
</motion.button>
            </motion.div>
            
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
