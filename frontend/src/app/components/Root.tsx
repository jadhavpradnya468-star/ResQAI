import { Outlet } from "react-router";
import { BottomNav } from "./BottomNav";
import { ChatBot } from "./ChatBot";

export function Root() {
  return (
    <div className="min-h-screen bg-white">
      <Outlet />
      <ChatBot />
      <BottomNav />
    </div>
  );
}
