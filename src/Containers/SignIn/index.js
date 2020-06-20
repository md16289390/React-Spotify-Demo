import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { spotifyWebApiURL } from "../../Constants";
import { getUserDetails } from '../../actions/user';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authToken: "",
      authorized: false
    };
  }

  componentDidMount = () => {
    let context = this;
    let url = window.location.href;
    if (url.indexOf("token=") > -1) {
      let authToken = url
        .split("token=")[1]
        .split("&")[0]
        .trim();
      let authorized = true;
      this.setState({ authToken, authorized }, ()=> {
        context.handleAuthFlow();
      });
    }
  };

  handleAuthFlow = event => {
    if (this.state.authorized) {
      const { authToken } = this.state;
      this.props.getUserDetails({authorized: this.state.authorized, authToken}, res => {
        if(res){
          this.props.history.push('/my-albums');
        }else{
          window.location.assign(spotifyWebApiURL); 
        }
      });
    } else {
      window.location.assign(spotifyWebApiURL);
    }
  };

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h3 className="display-4">
              My Test React Spotify App
            </h3>
            <hr className="my-4" />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p className="display-5">
              {!this.state.authorized && 
              `Click the button below to authorize your Spotify account to start using React Spotify!`}
            </p>
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={this.handleAuthFlow}
            >
              {!this.state.authorized ? 
              `Sign in with Spotify`:
              `Connecting...`}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  getUserDetails: bindActionCreators(getUserDetails, dispatch)
});
export default connect(null, mapDispatchToProps)(App);
