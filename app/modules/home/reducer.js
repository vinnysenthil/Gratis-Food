

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'events_fetch':
      console.log(action);
      return action.payload;
    default:
      return state;
  }
};
