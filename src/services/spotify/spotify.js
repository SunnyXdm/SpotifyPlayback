import getArrayInChunks from '../../utils/getArrayInChunks.js';
import composer from './composer.js';

export default async function spotify(users) {
  try {
    const chunks = getArrayInChunks(users, 10);
    const results = [];
    for (const users of chunks) {
      const data = await Promise.all(users.map((user) => composer(user)));
      results.push(...data);
    }
    return results;
  } catch (error) {
    console.log('error fetching spotify data', error);
  }
}
