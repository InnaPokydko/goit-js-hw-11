import axios from 'axios';

BASE_URL = 'https://pixabay.com/api/';
const KEY = '34168491-a08a19ec58377d1b70d25ff83';

export async function fatchImg(query, page, perPage) {
  try {
    const respons = await axios.get(
      `${BASE_URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    
    return respons;
  } catch (error) {
    console.log(error);
  }
}



// BASE_URL = 'https://pixabay.com/api/';
// const KEY = '34168491-a08a19ec58377d1b70d25ff83';

// export async function fatchImg(name) {
//   try {
//     const respons = await axios.get(
//       `${BASE_URL}?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`
//     );
//     // const imgs = await respons.json();
//     return respons;
//   } catch (error) {
//     console.log(error);
//   }
// }
