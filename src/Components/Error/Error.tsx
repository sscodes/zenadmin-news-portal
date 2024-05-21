import Images from '../../Assets';
import './Error.css';

const Error = () => {
  return (
    <div className='error-section'>
      <img src={Images.Error} alt='error-image' width={300} />
      <div className='error-message-section'>
        <h1 className='error-message-section__error-message'>
          Something wrong.
        </h1>
        <h1 className='error-message-section__error-message'>
          Sorry, we're having some techinical issues try to refresh the page.
        </h1>
      </div>
    </div>
  );
};

export default Error;
