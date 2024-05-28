import { motion } from 'framer-motion';
import { LOADERVARIANTS } from '../../Constants/Constants';
import './Loader.css';

const Loader = () => {
  return (
    <motion.div
      className='loader'
      variants={LOADERVARIANTS}
      animate='animationOne'
    />
  );
};

export default Loader;
