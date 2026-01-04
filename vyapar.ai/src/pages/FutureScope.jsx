import React from 'react';
import TiltCard from '../components/ui/TiltCard';
import { Rocket, Mic, ShieldCheck, Globe, Cpu } from 'lucide-react';

export default function FutureScope(){
  const items = [
    { title: 'Voice Command 2.0', desc: `Operate your entire dashboard with natural language voice commands. 'Hey Vyapar, show me today's profit.'`, icon: Mic, color: 'text-pink-400', border: 'border-pink-500/30', bg: 'from-pink-900/20 to-gray-900' },
    { title: 'Blockchain Inventory', desc: 'Immutable ledger for supply chain transparency. Track every item from factory to customer.', icon: ShieldCheck, color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'from-emerald-900/20 to-gray-900' },
    { title: 'Global Trade Connect', desc: 'One-click cross-border payments and automated customs compliance AI agent.', icon: Globe, color: 'text-blue-400', border: 'border-blue-500/30', bg: 'from-blue-900/20 to-gray-900' },
    { title: 'Neural Forecasting', desc: 'Predict market trends before they happen using our proprietary deep learning models.', icon: Cpu, color: 'text-purple-400', border: 'border-purple-500/30', bg: 'from-purple-900/20 to-gray-900' },
  ];

  return (
    <div className="space-y-8 animate-slideUp">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3"><Rocket className="text-purple-500" size={36} /> Future Roadmap</h2>
        <p className="text-gray-400 text-lg">We are building the next generation of business intelligence. Here is what's coming next for Vyapar AI.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-transparent via-indigo-600 to-transparent z-0"></div>

        {items.map((item, idx) => (
          <TiltCard key={idx} className={`relative z-10 bg-gradient-to-br ${item.bg} p-6 rounded-2xl border ${item.border} backdrop-blur-xl group hover:scale-105 transition-all duration-300`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl bg-gray-800/50 border border-white/5 ${item.color} shadow-lg`}>
                <item.icon size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  {item.title}
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300 uppercase tracking-wide border border-white/5">Coming Soon</span>
                </h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </TiltCard>
        ))}

        <div className="mt-12 bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 animate-pulse-slow"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-4">Buildathon Goal</h3>
            <p className="text-indigo-200 max-w-3xl mx-auto italic text-lg">"To democratize enterprise-grade AI analytics for small businesses, enabling them to compete in the global market with data-driven confidence."</p>
          </div>
        </div>
      </div>
    </div>
  );
}
