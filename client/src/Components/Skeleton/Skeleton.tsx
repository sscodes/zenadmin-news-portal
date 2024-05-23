import './Skeleton.css';

const Skeleton = () => {
  return (
    <div>
      <div className='home-skeleton-section'>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className='home-skeleton-section__skeleton animate-pulse'
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
