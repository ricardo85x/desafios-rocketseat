import produce from "immer";

const INITIAL_STATE = {
  meetup: null
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@meetup/CREATE_SUCCESS": {
        draft.meetup = action.payload.data;
        break;
      }
      case "@meetup/UPDATE_SUCCESS": {
        draft.meetup = action.payload.data;
        break;
      }
      case "@meetup/DELETE_SUCCESS": {
        draft.meetup = null;
        break;
      }
      case "@meetup/SIGN_OUT": {
        draft.meetup = null;
        break;
      }
      default:
    }
  });
}
