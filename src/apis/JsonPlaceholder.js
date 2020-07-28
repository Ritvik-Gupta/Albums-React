import Axios from 'axios';

const instance = Axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com/',
});

export default instance;
