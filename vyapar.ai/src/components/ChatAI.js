import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, User } from 'lucide-react';
import VyaparLogo from './VyaparLogo';

export default function ChatAI(){
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hello Boss! Vyapar AI is online. Main aapki business growth mein kaise madad kar sakta hoon?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(scrollToBottom, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const newMsg = { id: Date.now(), sender: 'user', text: inputText };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "Bohot badhiya sawal hai! Data check kar raha hoon...",
        "Analysis ke hisab se, aapko inventory badhani chahiye.",
        "Market trend upar ja raha hai, profit book karne ka sahi samay hai.",
        "Maine report generate kar di hai, aap analytics tab mein dekh sakte hain.",
        "Samajh gaya boss, ispe turant kaam shuru karta hoon!",
        "Is mahine aapki sales pichle mahine se 15% zyada hai. Badhai ho!",
      ];
      const randomResponse = responses[Math.floor(Math.random()*responses.length)];
      setMessages(prev => [...prev, { id: Date.now()+1, sender: 'ai', text: randomResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] animate-slideUp relative overflow-hidden rounded-3xl border border-indigo-500/30 shadow-2xl">
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-xl z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 bg-gray-900/50 p-4 border-b border-gray-700 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-800/50 flex items-center justify-center border border-white/10 shadow-lg"><VyaparLogo size={28} /></div>
          <div>
            <h3 className="text-white font-bold flex items-center gap-2">Vyapar AI Assistant <Sparkles size={14} className="text-yellow-400" /></h3>
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span><span className="text-xs text-green-400 font-medium">Online & Ready</span></div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map(msg => (
          <div key={msg.id} className={`flex items-end gap-3 ${msg.sender==='user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender==='ai' && (<div className="w-8 h-8 rounded-full bg-gray-800 flex-shrink-0 flex items-center justify-center border border-indigo-500/30"><VyaparLogo size={20} /></div>)}
            <div className={`max-w-[80%] p-4 rounded-2xl shadow-lg transition-all duration-300 ${msg.sender==='user' ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-br-none' : 'bg-gray-800 border border-gray-700 text-gray-100 rounded-bl-none'}`}>
              <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
              <span className={`text-[10px] block mt-1 opacity-60 ${msg.sender==='user' ? 'text-right' : 'text-left'}`}>{new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
            </div>
            {msg.sender==='user' && (<div className="w-8 h-8 rounded-full bg-gray-700 border border-gray-600 flex-shrink-0 flex items-center justify-center"><User size={16} className="text-gray-300" /></div>)}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-end gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex-shrink-0 flex items-center justify-center border border-indigo-500/30"><VyaparLogo size={20} /></div>
            <div className="bg-gray-800 border border-gray-700 p-4 rounded-2xl rounded-bl-none flex items-center gap-1">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative z-10 p-4 bg-gray-900/50 backdrop-blur-md border-t border-gray-800">
        <form onSubmit={handleSend} className="flex gap-3 max-w-4xl mx-auto">
          <input type="text" value={inputText} onChange={(e)=>setInputText(e.target.value)} placeholder="Ask anything about your business..." className="flex-1 bg-gray-800/80 text-white border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder-gray-500" />
          <button type="submit" disabled={!inputText.trim()} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white p-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center justify-center w-12"><Send size={20} /></button>
        </form>
      </div>
    </div>
  );
}
