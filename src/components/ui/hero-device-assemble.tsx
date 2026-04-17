"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export interface HeroDeviceAssembleProps {
  device?: "laptop" | "phone";
  accentColor?: string;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-sans), -apple-system, BlinkMacSystemFont, sans-serif";

function MockUI({ accentColor }: { accentColor: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        background: "#0b0b0f",
        fontFamily: FONT_FAMILY,
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          height: "10%",
          background: "#111118",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 8,
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.18)" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.18)" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.18)" }} />
      </div>
      <div style={{ flex: 1, display: "flex" }}>
        {/* Sidebar */}
        <div
          style={{
            width: "22%",
            background: "#0e0e14",
            borderRight: "1px solid rgba(255,255,255,0.05)",
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ height: 12, borderRadius: 4, background: accentColor, opacity: 0.85, width: "70%" }} />
          <div style={{ height: 10, borderRadius: 4, background: "rgba(255,255,255,0.1)", width: "85%" }} />
          <div style={{ height: 10, borderRadius: 4, background: "rgba(255,255,255,0.08)", width: "60%" }} />
          <div style={{ height: 10, borderRadius: 4, background: "rgba(255,255,255,0.08)", width: "75%" }} />
        </div>
        {/* Content */}
        <div
          style={{
            flex: 1,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
          }}
        >
          <h1 style={{ fontSize: 32, fontWeight: "bold", margin: 0 }}>
            Welcome to my portfolio
          </h1>
          <p style={{ fontSize: 24, opacity: 0.8, margin: 0 }}>
            Bhavesh Adivi
          </p>
        </div>
      </div>
    </div>
  );
}

export function HeroDeviceAssemble({
  device = "laptop",
  accentColor = "#22c55e",
  className,
}: HeroDeviceAssembleProps) {
  const isPhone = device === "phone";

  // Device dimensions
  const deviceW = isPhone ? 320 : 760;
  const deviceH = isPhone ? 640 : 470;
  const screenInset = isPhone ? 12 : 18;
  const bezelRadius = isPhone ? 36 : 14;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 30, stiffness: 100 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 30, stiffness: 100 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const assembleTransition = {
    duration: 1.5,
    type: "spring" as const,
    bounce: 0.1,
  };

  return (
    <div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "radial-gradient(ellipse at center, #1a1a22 0%, #050507 70%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: 2000,
        fontFamily: FONT_FAMILY,
      }}
    >
      <motion.div
        initial={{ rotateX: -22, rotateY: 28, z: -800, opacity: 0 }}
        animate={{ rotateX: 0, rotateY: 0, z: 0, opacity: 1 }}
        transition={assembleTransition}
        style={{
          position: "relative",
          width: deviceW,
          height: deviceH,
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
        }}
      >
        {/* Back lid */}
        <motion.div
          initial={{ z: 1000 }}
          animate={{ z: -8 }}
          transition={assembleTransition}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, #1f2128 0%, #0e1014 100%)",
            borderRadius: bezelRadius + 4,
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 60px 120px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        />

        {/* Keyboard / chassis base */}
        {!isPhone && (
          <motion.div
            initial={{ z: -800 }}
            animate={{ z: 0 }}
            transition={assembleTransition}
            style={{
              position: "absolute",
              left: -40,
              right: -40,
              bottom: -28,
              height: 28,
              transformOrigin: "top center",
              background: "linear-gradient(180deg, #2a2d36 0%, #14161c 100%)",
              borderRadius: "0 0 12px 12px",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
              rotateX: 78,
            }}
          />
        )}

        {/* Bezel frame */}
        <motion.div
          initial={{ z: 600 }}
          animate={{ z: 0 }}
          transition={assembleTransition}
          style={{
            position: "absolute",
            inset: 0,
            background: "#0a0a0d",
            borderRadius: bezelRadius,
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.04), 0 20px 60px rgba(0,0,0,0.5)",
          }}
        />

        {/* UI screen */}
        <motion.div
          initial={{ z: 300 }}
          animate={{ z: 0 }}
          transition={assembleTransition}
          style={{
            position: "absolute",
            inset: screenInset,
            borderRadius: bezelRadius - 6,
            overflow: "hidden",
            background: "black",
          }}
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            style={{ position: "absolute", inset: 0 }}
          >
            <MockUI accentColor={accentColor} />
            {/* Shimmer sweep */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)`,
                mixBlendMode: "screen",
                pointerEvents: "none",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
