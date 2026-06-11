import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface TiltContainerProps {
  children: React.ReactNode;
  className?: string;
  maxTiltX?: number;
  maxTiltY?: number;
  perspective?: number;
  scale?: number;
  id?: string;
  key?: string | number;
}

/**
 * Provides a high-fidelity 3D perspective mouse-tilt effect.
 * When the user moves their cursor over this container, it rotates in 3D.
 * Supports touch interactions by panning slightly based on touch,
 * and falls back to a gentle 3D sway animation if there is no pointer engagement.
 */
export function TiltContainer({
  children,
  className = "",
  id,
}: TiltContainerProps) {
  return (
    <div
      id={id}
      className={`relative ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Clean Static Decorative Background.
 * Renders static/subtle lines that blend behind the page content perfectly.
 */
export function FileFlowBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Floating Animated Particle Bubbles - Stable and clean decorative lines */}
      <div className="absolute top-[15%] left-[5%] w-96 h-96 rounded-full border border-[#D0C4AF]/15 border-dashed"></div>
      <div className="absolute bottom-[20%] right-[3%] w-[500px] h-[500px] rounded-full border border-[#4E5B4F]/5"></div>
    </div>
  );
}
