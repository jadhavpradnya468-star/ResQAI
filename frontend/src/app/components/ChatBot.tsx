import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Mic } from "lucide-react";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your AI rescue assistant. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

const handleSend = async () => {
    if (!inputValue.trim()) return;

    // User message add karo
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: inputValue, sender: "user" },
    ]);

    const userMessage = inputValue;
    setInputValue("");

    try {
      // Backend se real response lo
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: data.reply,
          sender: "bot",
        },
      ]);

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Sorry, connection error. Please try again!",
          sender: "bot",
        },
      ]);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 md:bottom-8 md:right-8 w-[calc(100%-2rem)] md:w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-[#FF6B35]/20"
          >
            <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl">
                  🐾
                </div>
                <div>
                  <h3 className="text-white" style={{ fontWeight: 700 }}>
                    First Aid Assistant
                  </h3>
                  <p className="text-white/80 text-sm">Online now</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-[#FFF8F5]">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "bot" && (
                    <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      🐾
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-[#FF6B35] text-white"
                        : "bg-white border-2 border-[#FF6B35] text-[#1A1A1A]"
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 bg-white border-t border-[#FF6B35]/20">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about first aid..."
                  className="flex-1 px-4 py-3 bg-[#FFF8F5] rounded-xl border border-[#FF6B35]/20 focus:outline-none focus:border-[#FF6B35]"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-[#FF6B35] text-white p-3 rounded-xl hover:bg-[#FF8C42] transition-colors"
                >
                  <Mic className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  className="bg-[#FF6B35] text-white p-3 rounded-xl hover:bg-[#FF8C42] transition-colors"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-4 md:bottom-8 md:right-8 w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] text-white rounded-full shadow-2xl flex items-center justify-center z-40"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <MessageCircle className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
