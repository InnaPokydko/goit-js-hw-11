import axios from "axios"
{ fatchImg }

BASE_URL = 'https://pixabay.com/api/';
const KEY = '34168491-a08a19ec58377d1b70d25ff83';

// function fatchImg() {
//     return fetch(`${BASE_URL}/`).then(
//       (response) => {
//         if (!response.ok) {
//           throw new Error(response.status);
//         }
//         return response.json();
//       }
//     );
//   }

  const fatchImg = async () => {
    const response = await fetch(`${BASE_URL}?KEY`);
    const imgs = await response.json();
    return imgs;
  };
  
  fatchImg().then(imgs => console.log(imgs));