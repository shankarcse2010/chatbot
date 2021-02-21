import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import persistState from 'redux-localstorage';
import finalReducer from '../reducers';

const store = {
  userDetails: {
    chatHistory:[
      {
        messageId: Date.now(),
        messageHistory: [
          {
            timeStamp:new Date(),
            msg:'Hi'
          }
        ],
        type: "income" },
        {
        messageId: Date.now(),
        messageHistory: [{
          timeStamp:new Date(),
          msg:'Hello'
        }],
        type: "out_going"}
        
    ]
  }
};
const middleware = applyMiddleware(thunk, logger);
const enchancer = compose(middleware, persistState(null, {
  key: 'chatApp'
}));
const finalStore = createStore(finalReducer, store, enchancer);

export default finalStore;
