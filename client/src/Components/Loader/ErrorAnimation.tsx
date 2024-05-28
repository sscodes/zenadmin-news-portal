import { motion } from 'framer-motion';
import React from 'react';
import {
  CIRCLEVARIANTS,
  CONTAINERVARIANTS,
  EXCLAMATIONVARIANTS,
} from '../../Constants/Constants';
import './ErrorAnimation.css';

const ErrorAnimation: React.FC = () => {
  return (
    <motion.div
      className='error-container'
      variants={CONTAINERVARIANTS}
      initial='initial'
      animate='animate'
    >
      <motion.div
        className='error-container__red-circle'
        variants={CIRCLEVARIANTS}
        initial='initial'
        animate='animate'
      >
        <motion.div
          className='error-container__exclamation-mark'
          variants={EXCLAMATIONVARIANTS}
          initial='initial'
          animate='animate'
        >
          !
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ErrorAnimation;
