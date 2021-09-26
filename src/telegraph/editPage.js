import axios from 'axios';

const editPage = async data => {
	try {
		const url = 'https://api.telegra.ph/editPage';
		const result = await axios.post(url, data);
		return result.data;
	} catch (error) {
		console.log(error);
	}
};
export default editPage;
