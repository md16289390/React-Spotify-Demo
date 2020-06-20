/*
 * @file: user.js
 * @description: Configure reducer for user model
 * @author: Megha Sethi
 * */
import {
  LOGIN_USER,
  LOGOUT,
  GET_PLAYLIST,
  ADD_NOTES
} from "../../actions/user/types";
import _ from 'underscore';

const initialState = {
  authorized: false,
  token: '',
  user : {},
  playlist: [],
  notes: []
};

export default (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        ...action.data
      }
    case GET_PLAYLIST: 
      return {
        ...state,
        playlist : action.data
      }
    case ADD_NOTES:
      let notes = state.notes;
      let index = _.findIndex(notes, {id: action.data.id});
      if(index !== -1){
        notes[index] = action.data;
      }else{
        notes.push(action.data);
      }
      return {
        ...state,
        notes : notes
      }
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
