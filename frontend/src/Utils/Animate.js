export const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

export const spring = {
  transition: {
    type: 'spring',
    damping: 80,
    stiffness: 300,
  },
};
export const icon = {
  hidden: {
    pathLength: 0,
    fill: 'rgba(255, 255, 255, 0)',
  },
  visible: {
    pathLength: 1,
    fill: 'rgba(255, 255, 255, 1)',
  },
};

export const dropIn = {
  hidden: {
    translateY: -100,
    opacity: 0,
  },
  visible: {
    translateY: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 15,
      stiffness: 150,
    },
  },
  exit: {
    translateY: 100,
    opacity: 0,
  },
};
export const buttonVariants = {
  visible: {
    x: [-20, 0],
    transition: { delay: 0.1 },
  },
  hover: {
    scale: 1.1,
    textShadow: '0px 0px 0px rgb(255,255,255)',
    boxShadow: '0px 0px 0px rgb(255,255,255)',
  },
};
