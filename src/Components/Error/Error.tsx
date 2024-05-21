import './Error.css';

const Error = ({ image, message }: { image: string; message: string }) => {
  return (
    <div className='error-section'>
      <img src={image} alt='error-image' width={300} />
      <div className='error-message-section'>
        <h1 className='error-message-section__error-message'>{message}</h1>
      </div>
    </div>
  );
};

export default Error;
