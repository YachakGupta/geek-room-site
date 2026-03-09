"use client";

import { useEffect, useState } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

export default function ScrambleText({ text, className = "", delay = 0, speed = 30 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) {
      setDisplayText("");
      return;
    }

    let index = 0;
    const chars = new Array(text.length).fill("");
    const interval = setInterval(() => {
      const finalString = text;
      const scrambledArray: string[] = [];

      for (let i = 0; i < chars.length; i++) {
        if (i <= index) {
          scrambledArray.push(finalString[i]);
        } else {
          scrambledArray.push(CHARS[Math.floor(Math.random() * CHARS.length)]);
        }
      }

      setDisplayText(scrambledArray.join(""));

      if (index >= chars.length - 1) {
        clearInterval(interval);
        setDisplayText(finalString);
      } else {
        index++;
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isVisible, text, speed]);

  return <span className={className}>{displayText}</span>;
}
