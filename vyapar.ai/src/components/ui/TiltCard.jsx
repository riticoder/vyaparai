import React from 'react';

export default function TiltCard({ children, className = '' }){
  return (
    <div className={`transform hover:-translate-y-1 transition-transform duration-300 ${className}`}>
      {children}
    </div>
  );
}
