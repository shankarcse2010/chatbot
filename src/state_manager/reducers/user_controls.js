
import { USER_MSG } from "../actions/user_details/user_message";
import { UPDATE_MSG } from "../actions/user_details/update_msg";


const userDetails = (state = {}, action) => {
  let newState = state;
  switch (action.type) {
    case USER_MSG:

      newState = {
        ...newState,
        chatHistory:[...state.chatHistory,{...action.payload.newMsg}]
      };
      break;
    case UPDATE_MSG:

      newState = {
        ...newState,
        chatHistory:[...action.payload.updatedMsg]
      };
      break;

    default:
      break;
  }
  return newState;
};

export default userDetails;
