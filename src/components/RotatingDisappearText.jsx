import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const RotatingDisappearText = ({ textArray, interval = 2200, style = {} }) => {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const textChangeInterval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, interval);

    return () => clearInterval(textChangeInterval);
  }, [interval, textArray.length]);

  const disappearVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)", scale: 1.1 },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 },
    exit: { opacity: 0, y: -20, filter: "blur(10px)", scale: 0.9 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.h1
        key={textIndex}
        variants={disappearVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          display: "inline-block",
        }}
      >
        {textArray[textIndex]}
      </motion.h1>
    </AnimatePresence>
  );
};

export default RotatingDisappearText;
