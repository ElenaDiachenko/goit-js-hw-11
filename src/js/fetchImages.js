import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

export const  fetchImages = async (value, page)=> {
  const searchParams = new URLSearchParams({
    key: '28311245-d5a87b2fb61808ea8cd4c4eb5',
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: page
  })
  // return await axios.get(`/api/?${searchParams}`).then(response => response.data);
  try {
  const res = await axios.get(`/api/?${searchParams}`);
    return res.data;
  } catch (error) {console.log(error) }
}
