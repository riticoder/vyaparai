import React from 'react';
import { TrendingUp, Clock, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import TiltCard from '../components/ui/TiltCard';

export default function Overview(){
  const stats = [
    { title: "Total Sales", value: "₹ 1,24,500", trend: "+12%", isUp: true, color: "from-blue-600 to-indigo-600", icon: TrendingUp },
    { title: "Pending Orders", value: "45", trend: "-5%", isUp: false, color: "from-orange-500 to-red-500", icon: Clock },
    { title: "Net Profit", value: "₹ 82,400", trend: "+24%", isUp: true, color: "from-emerald-500 to-teal-600", icon: Zap },
  ];

  return (
    <div className="space-y-8 animate-slideUp">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">Business Overview</h2>
          <p className="text-gray-400">Aaj ka taza hisab-kitab.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-semibold shadow-lg shadow-indigo-600/30 transition-transform active:scale-95">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, idx) => (
          <TiltCard key={idx} className={`p-8 rounded-3xl bg-gradient-to-br ${stat.color} shadow-2xl border border-white/10 relative overflow-hidden group`}>
            <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4 group-hover:scale-150 transition-transform duration-500">
              <stat.icon size={120} />
            </div>
            <div className="relative z-10">
              <p className="text-white/80 text-lg font-medium mb-2">{stat.title}</p>
              <h3 className="text-4xl font-extrabold text-white mb-4">{stat.value}</h3>
              <div className="flex items-center gap-2 bg-black/20 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
                {stat.isUp ? <ArrowUpRight className="text-green-300" size={18} /> : <ArrowDownRight className="text-red-300" size={18} />}
                <span className="text-white font-bold">{stat.trend}</span>
                <span className="text-white/70 text-sm">vs last week</span>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      <TiltCard className="bg-gray-800/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-700 shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-white">Sales Performance</h3>
          <select className="bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 outline-none focus:border-indigo-500">
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
        <div className="h-64 flex items-end justify-between gap-4">
          {[35,55,45,70,60,85,95].map((h,i)=> (
            <div key={i} className="w-full h-full group relative flex flex-col justify-end items-center">
              <div className="w-full bg-gradient-to-t from-indigo-600 to-purple-400 rounded-t-2xl transition-all duration-500 hover:from-indigo-400 hover:to-purple-300 shadow-[0_0_20px_rgba(99,102,241,0.5)] relative" style={{height: `${h}%`}}>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-gray-900 font-bold px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg pointer-events-none whitespace-nowrap z-10">{h}k</div>
              </div>
              <p className="text-center text-gray-500 mt-2 text-sm font-medium">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}</p>
            </div>
          ))}
        </div>
      </TiltCard>
    </div>
  );
}
