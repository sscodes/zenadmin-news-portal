import React from 'react';
import { motion } from 'framer-motion';
import './Loader.css';

const loaderVariants = {
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

const Loader = () => {
  return (
    <motion.div
      className='loader'
      variants={loaderVariants}
      animate='animationOne'
    />
  );
};

export default Loader;
