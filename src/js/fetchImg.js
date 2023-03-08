import axios from "axios"

BASE_URL = 'https://pixabay.com/api/';
const KEY = '34168491-a08a19ec58377d1b70d25ff83';

  export async function fatchImg () {
    const newImg = await fetch(`${BASE_URL}?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`);
   
    try {
      const response = await axios.get(newImg);
      
      return response;
    } catch (error) {
      console.log(error);
    }
  }
    
  fatchImg();
  