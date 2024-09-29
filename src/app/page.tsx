"use client"
import { useState } from "react";
import type { MessageData } from "@/utils/types";
import { Send } from "lucide-react";
import { prompt } from "@/utils/request";


export default function Page() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [input, setInput] = useState("");


  async function handleSend(){
    if (!input) return;

    const message = { role: "user", content: input };
    setMessages(prev => [...prev, message]);
    setInput("");
    
    const response = await prompt([...messages, { role: "user", content: input }]);
    setMessages(prev => [...prev, response]);
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                message.role === "user" ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white border-t md:px-20">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send size={30} />
          </button>
        </div>
      </div>
    </div>
  );
}