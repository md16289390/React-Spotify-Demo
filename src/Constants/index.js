/*
 * @file: index.js
 * @description: Configure API Url's/constants for the application
 * @author: Megha Sethi
 * */
let URI;
const scopes = "user-read-private+user-read-email+playlist-read-private+user-top-read+user-read-recently-played";

if(process.env.NODE_ENV === 'production'){
  URI = "https://react-spotify-demo.com"; //dummy url for production, you can add your own
}else{
  URI = "http://localhost:3000/";
}
export const redirectURI = URI;
export const spotifyWebApiURL = `https://accounts.spotify.com/authorize/?client_id=${process.env.REACT_APP_ClientID
}&response_type=token&redirect_uri=${redirectURI}&scope=${scopes}`;
export const SPOTIFY_API_URI = "https://api.spotify.com/v1/";
