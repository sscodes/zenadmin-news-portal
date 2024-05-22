import { motion } from 'framer-motion';
import React from 'react';
import {
  circleVariants,
  containerVariants,
  exclamationVariants,
} from '../../Constants/Constants';
import './ErrorAnimation.css';

const ErrorAnimation: React.FC = () => {
  return (
    <motion.div
      className='error-container'
      variants={containerVariants}
      initial='initial'
      animate='animate'
    >
      <motion.div
        className='red-circle'
        variants={circleVariants}
        initial='initial'
        animate='animate'
      >
        <motion.div
          className='exclamation-mark'
          variants={exclamationVariants}
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
