import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import { Home, Upload, MapPin, BarChart3 } from "lucide-react";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/upload", icon: Upload, label: "Upload" },
    { path: "/vets", icon: MapPin, label: "Vets" },
    { path: "/dashboard", icon: BarChart3, label: "Dashboard" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#FF6B35]/20 shadow-2xl z-30">
      <div className="flex items-center justify-around px-4 py-3 max-w-2xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <motion.button
              key={item.path}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 flex-1 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#FF6B35] rounded-full"
                />
              )}
              <div
                className={`p-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-[#FF6B35] text-white"
                    : "bg-transparent text-[#717182]"
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span
                className={`text-xs ${
                  isActive ? "text-[#FF6B35]" : "text-[#717182]"
                }`}
                style={{ fontWeight: isActive ? 600 : 400 }}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
