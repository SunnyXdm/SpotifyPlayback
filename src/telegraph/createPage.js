import axios from 'axios';

const createPage = async data => {
	try {
		const url = 'https://api.telegra.ph/createPage';
		const result = await axios.post(url, {
			access_token: data.access_token,
			title: data.title,
			author_name: data.author_name,
			author_url: data.author_url,
			content: data.content
		});
		return result.data;
	} catch (error) {
		console.log(error.response.data);
	}
};
export default createPage;
