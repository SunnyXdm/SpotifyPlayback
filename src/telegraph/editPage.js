import axios from 'axios';

const editPage = async data => {
	try {
		const url = 'https://api.telegra.ph/editPage';
		const result = await axios.post(url, data);
		console.log(result.data);
		return result.data;
	} catch (error) {
		console.log(error.response.data);
	}
};
export default editPage;
