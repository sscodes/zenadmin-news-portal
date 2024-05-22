export const techErrorMessage =
  "Sorry, we're having some techinical issues try to refresh the page.";

export const notFoundErrorMessage = 'Sorry, no news found with that keyword.';

export const delay = 1000;

export const loaderVariants = {
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
