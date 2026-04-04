import React from 'react';

export function SupportRobotAvatar({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="headGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1a2e"/>
          <stop offset="100%" stopColor="#16213e"/>
        </linearGradient>
        <linearGradient id="eyeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00f5ff"/>
          <stop offset="100%" stopColor="#b829f7"/>
        </linearGradient>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a2e"/>
          <stop offset="100%" stopColor="#0d0d1a"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="strongGlow">
          <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Antenna */}
      <line x1="200" y1="50" x2="200" y2="80" stroke="#00f5ff" strokeWidth="3" filter="url(#glow)">
        <animate attributeName="y1" values="50;45;50" dur="2s" repeatCount="indefinite"/>
      </line>
      <circle cx="200" cy="45" r="6" fill="#00f5ff" filter="url(#strongGlow)">
        <animate attributeName="r" values="6;8;6" dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="45;40;45" dur="2s" repeatCount="indefinite"/>
      </circle>
      
      {/* Ear pieces */}
      <rect x="110" y="110" width="20" height="40" rx="5" fill="url(#headGrad)" stroke="#00f5ff" strokeWidth="1" opacity="0.8"/>
      <rect x="270" y="110" width="20" height="40" rx="5" fill="url(#headGrad)" stroke="#b829f7" strokeWidth="1" opacity="0.8"/>
      
      {/* Head */}
      <rect x="130" y="80" width="140" height="110" rx="25" fill="url(#headGrad)" stroke="#2a2a4a" strokeWidth="2"/>
      
      {/* Visor / Eye Band */}
      <rect x="145" y="110" width="110" height="35" rx="17" fill="rgba(0,0,0,0.5)" stroke="url(#eyeGrad)" strokeWidth="2"/>
      
      {/* Eyes */}
      <circle cx="175" cy="127" r="10" fill="#00f5ff" filter="url(#strongGlow)">
        <animate attributeName="r" values="10;12;10" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="175" cy="127" r="5" fill="#fff" opacity="0.9"/>
      
      <circle cx="225" cy="127" r="10" fill="#b829f7" filter="url(#strongGlow)">
        <animate attributeName="r" values="10;12;10" dur="3s" repeatCount="indefinite" begin="0.5s"/>
      </circle>
      <circle cx="225" cy="127" r="5" fill="#fff" opacity="0.9"/>
      
      {/* Mouth */}
      <rect x="175" y="160" width="50" height="8" rx="4" fill="#2a2a4a"/>
      <rect x="180" y="162" width="8" height="4" rx="2" fill="#00f5ff" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1s" repeatCount="indefinite"/>
      </rect>
      <rect x="192" y="162" width="8" height="4" rx="2" fill="#00f5ff" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite"/>
      </rect>
      <rect x="204" y="162" width="8" height="4" rx="2" fill="#00f5ff" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.4;0.9" dur="0.8s" repeatCount="indefinite"/>
      </rect>
      <rect x="216" y="162" width="8" height="4" rx="2" fill="#b829f7" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.2s" repeatCount="indefinite"/>
      </rect>
      
      {/* Neck */}
      <rect x="185" y="190" width="30" height="25" rx="5" fill="url(#bodyGrad)" stroke="#2a2a4a" strokeWidth="1"/>
      <line x1="190" y1="195" x2="190" y2="210" stroke="#00f5ff" strokeWidth="1" opacity="0.4"/>
      <line x1="200" y1="195" x2="200" y2="210" stroke="#b829f7" strokeWidth="1" opacity="0.4"/>
      <line x1="210" y1="195" x2="210" y2="210" stroke="#00f5ff" strokeWidth="1" opacity="0.4"/>
      
      {/* Body */}
      <path d="M140 215 L130 320 Q130 340 150 340 L250 340 Q270 340 270 320 L260 215 Z" 
            fill="url(#bodyGrad)" stroke="#2a2a4a" strokeWidth="2"/>
      
      {/* Chest Panel */}
      <rect x="160" y="235" width="80" height="60" rx="10" fill="rgba(0,0,0,0.4)" stroke="#1a1a3e" strokeWidth="1"/>
      
      {/* Chest Core */}
      <circle cx="200" cy="265" r="20" fill="rgba(0, 245, 255, 0.1)" stroke="#00f5ff" strokeWidth="2" filter="url(#glow)">
        <animate attributeName="r" values="20;22;20" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="200" cy="265" r="12" fill="rgba(0, 245, 255, 0.2)" filter="url(#strongGlow)">
        <animate attributeName="r" values="12;14;12" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="200" cy="265" r="5" fill="#00f5ff" filter="url(#strongGlow)"/>
      
      {/* Chest Lines */}
      <line x1="165" y1="310" x2="235" y2="310" stroke="#2a2a4a" strokeWidth="1"/>
      <line x1="165" y1="315" x2="235" y2="315" stroke="#2a2a4a" strokeWidth="1"/>
      <line x1="165" y1="320" x2="235" y2="320" stroke="#2a2a4a" strokeWidth="1"/>
      
      {/* Left Arm */}
      <path d="M140 220 L105 230 Q90 235 85 250 L80 310 Q78 325 90 325 L105 325 Q115 325 115 315 L120 260 L135 250" 
            fill="url(#bodyGrad)" stroke="#2a2a4a" strokeWidth="2"/>
      {/* Left hand glow */}
      <circle cx="97" cy="325" r="8" fill="rgba(184, 41, 247, 0.2)" filter="url(#glow)"/>
      
      {/* Right Arm */}
      <path d="M260 220 L295 230 Q310 235 315 250 L320 310 Q322 325 310 325 L295 325 Q285 325 285 315 L280 260 L265 250" 
            fill="url(#bodyGrad)" stroke="#2a2a4a" strokeWidth="2"/>
      {/* Right hand glow */}
      <circle cx="303" cy="325" r="8" fill="rgba(0, 245, 255, 0.2)" filter="url(#glow)"/>
      
      {/* Left Shoulder */}
      <circle cx="140" cy="225" r="15" fill="url(#headGrad)" stroke="#00f5ff" strokeWidth="1.5"/>
      <circle cx="140" cy="225" r="5" fill="#00f5ff" opacity="0.3" filter="url(#glow)"/>
      
      {/* Right Shoulder */}
      <circle cx="260" cy="225" r="15" fill="url(#headGrad)" stroke="#b829f7" strokeWidth="1.5"/>
      <circle cx="260" cy="225" r="5" fill="#b829f7" opacity="0.3" filter="url(#glow)"/>
      
      {/* Legs */}
      <rect x="155" y="340" width="35" height="70" rx="8" fill="url(#bodyGrad)" stroke="#2a2a4a" strokeWidth="2"/>
      <rect x="210" y="340" width="35" height="70" rx="8" fill="url(#bodyGrad)" stroke="#2a2a4a" strokeWidth="2"/>
      
      {/* Knee Joints */}
      <circle cx="172" cy="375" r="6" fill="#1a1a2e" stroke="#b829f7" strokeWidth="1"/>
      <circle cx="228" cy="375" r="6" fill="#1a1a2e" stroke="#00f5ff" strokeWidth="1"/>
      
      {/* Feet */}
      <path d="M145 405 L145 425 Q145 435 155 435 L200 435 Q205 435 205 430 L205 410 L195 405 Z" 
            fill="url(#bodyGrad)" stroke="#2a2a4a" strokeWidth="2"/>
      <path d="M255 405 L255 425 Q255 435 245 435 L200 435 Q195 435 195 430 L195 410 L205 405 Z" 
            fill="url(#bodyGrad)" stroke="#2a2a4a" strokeWidth="2"/>
      
      {/* Foot lights */}
      <line x1="155" y1="430" x2="190" y2="430" stroke="#00f5ff" strokeWidth="2" opacity="0.5" filter="url(#glow)"/>
      <line x1="210" y1="430" x2="245" y2="430" stroke="#b829f7" strokeWidth="2" opacity="0.5" filter="url(#glow)"/>
      
      {/* Energy lines on body */}
      <line x1="150" y1="240" x2="150" y2="330" stroke="#00f5ff" strokeWidth="1" opacity="0.2" strokeDasharray="5,5">
        <animate attributeName="stroke-dashoffset" values="0;-10" dur="1s" repeatCount="indefinite"/>
      </line>
      <line x1="250" y1="240" x2="250" y2="330" stroke="#b829f7" strokeWidth="1" opacity="0.2" strokeDasharray="5,5">
        <animate attributeName="stroke-dashoffset" values="0;-10" dur="1s" repeatCount="indefinite"/>
      </line>
    </svg>
  );
}
