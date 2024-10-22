import { useState, useEffect } from "react";

type UseRowAnimations = {
  hasError: boolean;
  disabled: boolean;
};

export const useRowAnimations = ({ hasError, disabled }: UseRowAnimations) => {
  const [shake, setShake] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [hop, setHop] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    setAnimate(true);
  }, []);

  // Detect when the Row becomes disabled to trigger the hop effect
  useEffect(() => {
    if (disabled) {
      setHop(true);
      // Remove hop class after animation completes
      const timer = setTimeout(() => setHop(false), 500); // Match duration with CSS animation
      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [disabled]);

  // Apply shake effect when error occurs
  useEffect(() => {
    if (hasError) {
      setShake(true);
      // Remove shake class after the animation duration
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [hasError]);

  return {
    hop,
    animate,
    shake,
  };
};
