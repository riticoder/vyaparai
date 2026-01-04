import React from 'react';
import logo from '../logo.svg';
import '../App.css';

export default function Header() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Welcome to Vyapar.ai</h1>
    </header>
  );
}
