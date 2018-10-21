import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://my-react-burger-8f058.firebaseio.com/'
});

export default instance;