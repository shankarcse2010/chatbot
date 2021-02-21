
export const UPDATE_MSG = "user/messagesupdate";

export default (updateMsg, msdId) => (dispatch, getState) => {
  const { userDetails: { chatHistory } } = getState();
  const updatedMsg = chatHistory.filter(ele => {
    if (ele.messageId === msdId) ele.messageHistory.unshift({
      timeStamp: new Date(),
      msg: updateMsg
    });
    return true
  });

  dispatch({
    type: UPDATE_MSG,
    payload: {
      updatedMsg
    }
  })
};
