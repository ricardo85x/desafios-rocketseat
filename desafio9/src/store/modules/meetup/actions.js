export function updateMeetupRequest(data, id) {
    return {
      type: "@meetup/UPDATE_REQUEST",
      payload: { data, meetup_id: id }
    };
  }
  
  export function updateMeetupSuccess(data) {
    return {
      type: "@meetup/UPDATE_SUCCESS",
      payload: { data }
    };
  }
  
  export function updateMeetupFailure() {
    return {
      type: "@meetup/UPDATE_FAILURE"
    };
  }

  export function createMeetupRequest(data) {
    return {
      type: "@meetup/CREATE_REQUEST",
      payload: { data }
    };
  }
  
  export function createMeetupSuccess(data) {
    return {
      type: "@meetup/CREATE_SUCCESS",
      payload: { data }
    };
  }
  
  export function createMeetupFailure() {
    return {
      type: "@meetup/CREATE_FAILURE"
    };
  }


  export function deleteMeetupRequest(id) {
    return {
      type: "@meetup/DELETE_REQUEST",
      payload: { meetup_id: id  }
    };
  }
  
  export function deleteMeetupSuccess(data) {
    return {
      type: "@meetup/DELETE_SUCCESS",
      payload: { data }
    };
  }
  
  export function deleteMeetupFailure() {
    return {
      type: "@meetup/DELETE_FAILURE"
    };
  }
  