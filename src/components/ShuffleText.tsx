import React, { useState, useEffect, useRef } from 'react';

interface ShuffleTextProps {
  text: string;
  className?: string;
}

const ShuffleText: React.FC<ShuffleTextProps> = ({ text, className = "" }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startShuffle = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        text.split('').map((char, index) => {
          if (index < iteration) {
            return text[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, 30);
  };

  const stopShuffle = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(text);
  };

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={startShuffle}
      onMouseLeave={stopShuffle}
    >
      <span className="invisible whitespace-nowrap">{text}</span>
      <span className={`absolute left-0 top-0 whitespace-nowrap ${className}`} aria-hidden="true">
        {displayText}
      </span>
    </span>
  );
};

export default ShuffleText;
