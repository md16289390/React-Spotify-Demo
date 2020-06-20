import React, { Component  } from 'react';
import Nav from '../Nav';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LOGOUT } from "../../actions/user/types";
import { getUserPlaylist, addNotes } from '../../actions/user';
import { Button, Modal, message } from 'antd'
import 'antd/dist/antd.css';
import _ from 'underscore';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            showModal: false,
            modalSubmit: false,
            notes: '',
            currentPlaylistId: '',
            currentPlayListName: ''
        }
        this.logout =  this.logout.bind(this);
    }

    componentDidMount(){
        this.props.getUserPlaylist({token: this.props.user.token}, res => {
            if(res){
              this.setState({loading: false});
            }
          });
    }
    
    showPlaylistResults = (playlists) => {
        if(playlists !== undefined){
            let results = [];
            if(playlists.items.length  !== 0){
                playlists.items.map((playlist, index) => {
                    if(playlist.images[0]!==undefined){
                        let hasImage = playlist.images[0];
                        results.push(
                            <div key={playlist.id} className="album-list" onClick = {() => {this.openNotesForm(playlist.id, playlist.name)}}>
                                <img src= {hasImage.url} alt='playlist url'/>
                                <span className = "album-name"> {playlist.name} </span>
                                <span className = "album-count-songs"> {playlist.tracks && playlist.tracks.total ? playlist.tracks.total : 0} </span>
                            </div>
                        )
                    }
                });
                return results;
            }else{
                return <p> No Playlist Found</p>
            }
        }else{
            return <p> No Playlist Found</p>
        }
    }

    logout(){
        this.props.logout();
    }

    openNotesForm(playlistId, playlistName){
        let data = {showModal: true, currentPlayListName: playlistName, currentPlaylistId: playlistId};
        let notes = _.findWhere(this.props.user.notes, {id: playlistId});
        if(notes){
            data = {...data, notes : notes.notes};
        }
        this.setState(data);
    }

    handleOk(){
        let context = this;
        context.setState({modalSubmit: true});
        context.props.addNotes({id: this.state.currentPlaylistId, notes: this.state.notes}, res=>{
            if(res){
                message.success('Notes added successfully');
                context.setState({modalSubmit: false, showModal: false, notes: ''});
            }else{
                context.setState({modalSubmit: false});
            }
        });
    }

    handleCancel(){
        this.setState({showModal: false});
    }

    change(e){
        this.setState({notes: e.target.value});
    }

    render() {
        const { images, display_name } = this.props.user.user;
        return <div>
            <Modal
                title={`Add Notes for ${this.state.currentPlayListName}`}
                visible={this.state.showModal}
                width={1000}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                footer={[
                    <Button key="back" onClick={() => this.handleCancel()}>
                      Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={this.state.modalSubmit} onClick={() => this.handleOk()}>
                      Submit
                    </Button>
                  ]}
                >
                <div className="form-group"><textarea className="form-control album-notes" rows="3" placeholder="Type your notes here" onChange = {(e) => {this.change(e)}} value = {this.state.notes}>  </textarea></div>
            </Modal>
            <Nav 
                imageURL={images && images.length ? images[0].url : ""} 
                display_name={display_name}
                logoutHandler ={this.logout}
                {...this.props}
            />
            <div className="container">
                {this.state.loading ? 'Loading...' : this.showPlaylistResults(this.props.user.playlist)}
            </div>
          </div>;            
    }
}
const mapStateToProps = state => ({ user : state.user });
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch({type: LOGOUT}),
    getUserPlaylist: bindActionCreators(getUserPlaylist, dispatch),
    addNotes: bindActionCreators(addNotes, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);