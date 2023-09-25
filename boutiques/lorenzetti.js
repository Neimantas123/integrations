import dotenv from 'dotenv';
import { fetchPost } from '../integrations/xmag/integrations/fetchPost.js';
import { updateQuantities } from '../integrations/xmag/integrations/updateQuantity.js';
dotenv.config();

const webkulAPI = process.env.API;
const lorenzettiWebkulKey = process.env.LORENZETTIWEBKUL;
const lorenzettiKey = process.env.LORENZETTIKEY;
const lorenzettiAPI = process.env.LORENZETTIAPI;

const lorenzettiIntegration = async () => {
  await fetchPost(lorenzettiKey, lorenzettiAPI, webkulAPI, lorenzettiWebkulKey);
  // await updateQuantities(
  //   lorenzettiKey,
  //   lorenzettiAPI,
  //   webkulAPI,
  //   lorenzettiWebkulKey
  // );
};

export { lorenzettiIntegration };
