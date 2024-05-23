import './Error.css';

const Error = ({
  loader,
  message,
}: {
  loader: JSX.Element;
  message: string;
}) => {
  return (
    <div className='error-section'>
      {loader}
      <div className='error-section__error-message-section'>
        <h1 className='error-section__error-message'>{message}</h1>
      </div>
    </div>
  );
};

export default Error;
