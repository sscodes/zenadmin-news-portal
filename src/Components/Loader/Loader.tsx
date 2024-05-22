import { motion } from 'framer-motion';
import { loaderVariants } from '../../Constants/Constants';
import './Loader.css';

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
