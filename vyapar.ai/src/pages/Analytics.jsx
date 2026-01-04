import React from 'react';
import TiltCard from '../components/ui/TiltCard';
import { BarChart2 } from 'lucide-react';

export default function Analytics(){
  const sources = [
    { name: 'Direct', val: 40, col: 'bg-blue-500' },
    { name: 'Social Media', val: 35, col: 'bg-purple-500' },
    { name: 'Referral', val: 15, col: 'bg-pink-500' },
    { name: 'Organic Search', val: 10, col: 'bg-teal-500' },
  ];

  return (
    <div className="space-y-6 animate-slideUp">
      <h2 className="text-3xl font-bold text-white flex items-center gap-3"><BarChart2 className="text-teal-400" /> Deep Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TiltCard className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Traffic Source</h3>
          <div className="space-y-4">
            {sources.map((item,i) => (
              <div key={i}>
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>{item.name}</span>
                  <span>{item.val}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div className={`${item.col} h-full relative`} style={{ width: `${item.val}%` }}>
                    <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TiltCard>

        <TiltCard className="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Target Achievement</h3>
            <p className="text-gray-400 text-sm">Monthly sales goal progress</p>
          </div>
          <div className="flex items-center justify-center py-8">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 192 192">
                <circle cx="96" cy="96" r="88" className="stroke-gray-700" strokeWidth="12" fill="none" />
                <circle cx="96" cy="96" r="88" className="stroke-teal-500" strokeWidth="12" fill="none" strokeDasharray="552" strokeDashoffset="138" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">75%</span>
                <span className="text-teal-400 text-sm uppercase tracking-wider font-bold">Achieved</span>
              </div>
            </div>
          </div>
        </TiltCard>
      </div>
    </div>
  );
}
