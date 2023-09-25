import axios from 'axios';

const getProductsXmag = async (xmagkey, xmagApi) => {
  const url = `${xmagApi}/Products/GetProducts?DBContext=default&key=${xmagkey}`;

  try {
    const response = await axios.get(url);
    const products = response.data.product;
    // for (const product of products) {
    //   // Access the items array within the product item
    //   const items = product.items;

    //   console.log(items);
    // }
    console.log('Getting products from xmag');
    return products;
  } catch (error) {
    console.error(`Error: ${error}`);
    return [];
  }
};

const updatedProductsXmag = async (xmagkey, xmagApi) => {
  const dbContext = 'Default';
  const dateStart = '2023.08.21';
  const timeStart = '00:00:00';
  const timeEnd = '23:59:59';
  const apiUrl = `${xmagApi}/Products/GetProductsByDateANDTimeStockChange?DBContext=${dbContext}&key=${xmagkey}&DateStart=${dateStart}&TimeStart=${timeStart}&TimeEnd=${timeEnd}`;
  //

  try {
    const response = await axios.get(apiUrl);

    if (response.status === 404) {
      throw new Error('404 Not Found: Incorrect API endpoint');
    } else if (response.status >= 400) {
      throw new Error(`${response.status} Error: ${response.statusText}`);
    }

    if (Array.isArray(response.data.product)) {
      return response.data; // Return the whole response.data object
    } else {
      console.log('API response:', response.data);
      throw new Error('Product data from API is not an array');
    }
  } catch (error) {
    console.error('Error fetching updated products:', error);
    throw error;
  }
};

//Start before uploading new products

// const getXmagUpdatedProducts = async (xmagkey, xmagApi, specificDate) => {
//   const dbContext = 'Default';
//   const timeStart = '00:00:00';
//   const timeEnd = '23:59:59';

//   // Format the specificDate to the desired format 'yyyy.mm.dd'
//   const formattedDate = specificDate
//     .toISOString()
//     .split('T')[0]
//     .replace(/-/g, '.');

//   const apiUrl = `${xmagApi}/Products/GetProductsByDateANDTimeStockChange?DBContext=${dbContext}&key=${xmagkey}&DateStart=${formattedDate}&TimeStart=${timeStart}&TimeEnd=${timeEnd}`;

//   try {
//     const response = await axios.get(apiUrl);

//     if (response.status === 404) {
//       throw new Error('404 Not Found: Incorrect API endpoint');
//     } else if (response.status >= 400) {
//       throw new Error(`${response.status} Error: ${response.statusText}`);
//     }

//     if (Array.isArray(response.data.product)) {
//       return response.data; // Return the whole response.data object
//     } else {
//       console.log('API response:', response.data);
//       throw new Error('Product data from API is not an array');
//     }
//   } catch (error) {
//     console.error('Error fetching updated products:', error);
//     throw error;
//   }
// };

export { getProductsXmag, updatedProductsXmag };
