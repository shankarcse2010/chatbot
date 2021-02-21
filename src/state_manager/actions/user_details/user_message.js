
export const USER_MSG = "user/newmsg";

export default (newMsg) => (dispatch) => {
  dispatch({
    type:USER_MSG,
    payload: {
      newMsg
    }
  })
};
