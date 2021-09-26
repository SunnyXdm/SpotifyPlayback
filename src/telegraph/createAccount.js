import axios from 'axios';
const createAccount = async data => {
	try {
		const url = 'https://api.telegra.ph/createAccount';
		const result = await axios.post(url, {
			short_name: data.short_name,
			author_name: data.author_name,
			author_url: data.author_url
		});
		return result.data;
	} catch (error) {
		console.log(error.response.data);
	}
};
export default createAccount;
