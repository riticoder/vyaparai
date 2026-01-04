import React from 'react';
import VyaparLogo from './VyaparLogo';

export default function Loader(){
  return (
    <div className="flex flex-col items-center justify-center h-full animate-fadeIn">
      <div className="relative w-32 h-32 flex items-center justify-center">
         <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl animate-pulse"></div>
         <VyaparLogo size={80} className="animate-bounce" />
      </div>
      <h2 className="mt-8 text-2xl font-bold text-white tracking-widest animate-pulse">VYAPAR AI LOADING...</h2>
    </div>
  );
}
