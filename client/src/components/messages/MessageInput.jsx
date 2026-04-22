import { BsSend } from "react-icons/bs";
import React, { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form
      className="px-4 py-3 backdrop-blur-md bg-primary/70 border-t border-[#66666625] sticky bottom-0 z-10"
      onSubmit={handelSubmit}
    >
      <div className="w-full relative flex items-center">

        {/* Input */}
        <input
          type="text"
          className="w-full pr-14 pl-5 py-3 rounded-full 
                     border border-[#66666630]
                     bg-bgColor/60 backdrop-blur
                     text-ascent-1 text-sm
                     placeholder:text-ascent-2/70
                     focus:outline-none focus:ring-2 focus:ring-[#0444a4]/30 focus:border-[#0444a4]/60
                     transition-all duration-200
                     shadow-sm"
          placeholder="Send a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Send Button */}
        <button
          type="submit"
          className="absolute right-2 h-10 w-10 rounded-full
                     flex items-center justify-center
                     bg-[#0444a4]
                     text-white
                     shadow-md
                     hover:shadow-lg hover:scale-[1.05]
                     active:scale-[0.95]
                     transition-all duration-200
                     send-btn"
        >
          {loading ? (
            <span className="loading loading-dots loading-sm"></span>
          ) : (
            <BsSend size={16} />
          )}
        </button>
      </div>

      {/* UI-only CSS */}
      <style>{`
        .send-btn{
          overflow: hidden;
          position: relative;
        }

        .send-btn::after{
          content:"";
          position:absolute;
          inset:-2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.25),
            transparent
          );
          transform: translateX(-120%);
          transition: transform .6s ease;
        }

        .send-btn:hover::after{
          transform: translateX(120%);
        }

        @media (prefers-reduced-motion: reduce){
          .send-btn::after{ display:none; }
        }
      `}</style>
    </form>
  );
};

export default MessageInput;