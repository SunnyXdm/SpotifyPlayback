import bulkUserUpdate from '../database/bulkUserUpdate.js';

const updateTokens = async status => {
	const updateData = [];
	status.map(user => {
		if (user.new_token) {
			updateData.push({
				updateOne: {
					filter: { _id: user.user_id },
					update: { $set: user.tokens },
					upsert: false
				}
			});
		}
	});
	if (!!updateData.length) {
		bulkUserUpdate(updateData);
		console.log('DB Updated');
	}
};

export default updateTokens;
