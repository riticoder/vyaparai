import React from 'react';
import VyaparLogo from './VyaparLogo';

export default function Loader(){
  return (
    <div className="w-full h-64 flex items-center justify-center">
      <div className="animate-spin-slow">
        <VyaparLogo size={54} />
      </div>
    </div>
  );
}
