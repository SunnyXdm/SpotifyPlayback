// User Schema for MongoDB
import mongoose from 'mongoose';
const { Schema } = mongoose;
const user = {
  access_token:
    'BQCexi62R95_xOFeOUl-rZWfF_TSz54O2xN_1RYoeEyqXj3GDvgoP50tIdAoSKZ4iCHz9tLDpMPvnpBxNa9nevXZLgwFm1UexLt31Zuhb5wLMIQtIx5-rV6jql5C1pgBdCMGq5Mg4nA938p9068Nsb4aLhecxcl45Ne_RWwkhugxp5Ca7ws2dRcZHn_cLabXY-RVW89P2xw',
  token_type: 'Bearer',
  expires_in: 3600,
  refresh_token:
    'AQACHbNR_xil8pdHPd4pm3WJvp9xI0vwzFK_c6-j1fnYEXnqMrcFieMd9A5d5tbShFWIP_r63x36FvL6Nkt4LM1zE9jbIhWRco0rcKwb4AxC7EMgiLQZC_ZwqITDTiwDaLo',
  scope: 'user-read-currently-playing',
  user_id: '680240877',
  message_id: '446',
  name: 'Sunny',
};
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  message_id: {
    type: String,
  },
  access_token: {
    type: String,
  },
  refresh_token: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);
export default User;
