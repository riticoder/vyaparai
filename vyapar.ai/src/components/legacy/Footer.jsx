import React from 'react';
import '../../App.css';

export default function Footer() {
  return (
    <footer style={{padding: '12px', background: '#f6f6f6'}}>
      <div style={{textAlign: 'center', color: '#333'}}>© {new Date().getFullYear()} Vyapar.ai</div>
    </footer>
  );
}
