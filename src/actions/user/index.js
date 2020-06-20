/*
 * @file: index.js
 * @description: Configure all functions for API Calls from User
 * @author: Megha Sethi
 * */
import RestClient from '../../utils/RestClient';
import { SPOTIFY_API_URI } from '../../Constants';
import * as TYPE from './types';

const userLoginDetails = data => ({ type: TYPE.LOGIN_USER, data });
const userPlaylists = data => ({ type: TYPE.GET_PLAYLIST, data });
const saveNotes = data => ({ type: TYPE.ADD_NOTES, data });

//Function to get user details from spotify
export const getUserDetails = (data, cb) => dispatch => {
    RestClient.get(`${SPOTIFY_API_URI}me?access_token=${data.authToken}`, '')
        .then(result => {
            if(result.status === 200){
                dispatch(userLoginDetails({user: result.data, token : data.authToken, authorized: data.authorized}));
                cb(true);
            }else{
                cb(false);
            }            
        }).catch(error => {
            cb(false);
        });
};

//Function to get user playlist
export const getUserPlaylist = (data, cb) => dispatch => {
    RestClient.get(`${SPOTIFY_API_URI}me/playlists?access_token=${data.token}`, '')
        .then(result => {
            if(result.status === 200){
                dispatch(userPlaylists(result.data));
                cb(true);
            }else{
                cb(false);
            }            
        }).catch(error => {
            cb(false);
        });
};

//Function to add Notes
export const addNotes = (data, cb) => dispatch => {
    RestClient.post(`https://jsonplaceholder.typicode.com/posts`, data)
    .then(result => {
        if(result.status === 200 || result.status === 201){
            dispatch(saveNotes(data));
            cb(true);
        }else{
            cb(false);
        }            
    }).catch(error => {
        cb(false);
    });
};