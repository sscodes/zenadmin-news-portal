export const TECHERRORMESSAGE =
  "Sorry, we're having some techinical issues try to refresh the page.";

export const NOTFOUNDERRORMESSAGE = 'Sorry, no news found with that keyword.';

export const DELAY = 1000;

export const LOADERVARIANTS = {
  animationOne: {
    borderRadius: ['50%', '0%', '50%'],
    rotate: [0, 180, 360],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: 'loop' as const,
      ease: 'easeInOut',
      times: [0, 0.5, 1],
    },
  },
};

export const CIRCLEVARIANTS = {
  initial: { scale: 0 },
  animate: {
    scale: [0, 1],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

export const EXCLAMATIONVARIANTS = {
  initial: { height: 0 },
  animate: {
    height: ['0%', '100%'],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
      DELAY: 0.5,
    },
  },
};

export const CONTAINERVARIANTS = {
  initial: { opacity: 0 },
  animate: {
    opacity: [0, 1, 1, 0],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
};

export const DIRECTION_LEFT = 'LEFT';
export const DIRECTION_RIGHT = 'RIGHT';