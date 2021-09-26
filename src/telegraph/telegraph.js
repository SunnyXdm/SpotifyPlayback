import editPage from './editPage.js';
import telegraphNodes from '../utils/telegraphNodes.js';
import axios from 'axios'

const telegraph = async users => {
	await axios.all(
		users.map(async user => {
			if (user.telegraph_access_token) {
				const data = telegraphNodes(user);
				await editPage(data);
			}
		})
	);
};
export default telegraph;
