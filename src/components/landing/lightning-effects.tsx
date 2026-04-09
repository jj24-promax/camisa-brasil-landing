"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Bolt = {
  id: number;
  x: number;
  y: number;
  color: "blue" | "gold";
  rotation: number;
  scale: number;
};

export function LightningEffects() {
  const [bolts, setBolts] = useState<Bolt[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newBolt: Bolt = {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 80,
          color: Math.random() > 0.5 ? "blue" : "gold",
          rotation: Math.random() * 360,
          scale: 0.5 + Math.random() * 1.5,
        };
        setBolts((prev) => [...prev, newBolt]);
        setTimeout(() => {
          setBolts((prev) => prev.filter((b) => b.id !== newBolt.id));
        }, 800);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden opacity-30">
      {bolts.map((bolt) => (
        <motion.div
          key={bolt.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0.5, 1, 0],
            scale: bolt.scale 
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: `${bolt.x}%`,
            top: `${bolt.y}%`,
            rotate: `${bolt.rotation}deg`,
            color: bolt.color === "blue" ? "#3b82f6" : "#fbbf24",
            filter: `blur(1px) drop-shadow(0 0 15px ${bolt.color === "blue" ? "#1d4ed8" : "#d97706"})`,
          }}
        >
          <svg
            width="40"
            height="100"
            viewBox="0 0 40 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-32 md:w-20 md:h-56"
          >
            <path
              d="M30 0L5 55H18L10 100L35 45H22L30 0Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}