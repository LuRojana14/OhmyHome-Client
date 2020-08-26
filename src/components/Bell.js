import React from "react";
import { motion } from "framer-motion";
export function Bell() {
  return (
    <div style={{ margin: 2 }}>
      <motion.div
        animate={{
          rotate: [0, 6, 0, -6, 0],
        }}
        transition={{ loop: Infinity }}
        style={{
          display: "inline-block",
          originX: "top",
          originY: "center",
        }}
      >
        <span
          style={{ fontSize: "3rem" }}
          role="img"
          aria-label="notification-bell"
        >
          🔔
        </span>
      </motion.div>
    </div>
  );
}
