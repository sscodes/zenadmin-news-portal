import { ImagesTypes } from '../Types/Type';

const Images: ImagesTypes = {
  Profile: new URL('./Profile.svg', import.meta.url).href,
  Error: new URL('./Error.svg', import.meta.url).href,
  NotFoundError: new URL('./NotFound.svg', import.meta.url).href,
};

export default Images;
