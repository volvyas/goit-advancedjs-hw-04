import axios from 'axios';

const API_KEY = atob('MzQyMTE2MzEtNjBjMWE0YThmNDJkZmI1Y2Q2YWEwOGM4ZQ=='); //TODO need to research beeter way to hide API key in frontend code

export default async function getImagesByQuery(query, page = 1) {
  const response = await axios.get(
    `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&pretty=true&orientation=horizontal&per_page=15&page=${page}&safesearch=true`
  );

  return response.data;
}
