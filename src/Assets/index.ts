import { imagesTypes } from '../Types/Type';

const Images: imagesTypes = {
  Profile: new URL('./Profile.svg', import.meta.url).href,
  Error: new URL('./Error.svg', import.meta.url).href,
};

export default Images;
