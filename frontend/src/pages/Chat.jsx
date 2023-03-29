import React from 'react';
import axios from 'axios';

function Click(roomID) {

  
}
  
function Sidebar_item({ itemClicked, roomID }) {
    return <div className='sidebar_item' onClick={itemClicked}>{roomID}</div>;
}

function MessageList({ elements }) {
    return <div className='message_list'>{elements}</div>
}  

const Chat = () => {
    const [selectedRoomId, setSelectedRoomId] = React.useState(-1);
    function GetMessages(roomID) {
        if (roomID > -1) {
  
        } else {
            axios.get('http://localhost:9000/api/chats').then(function (response) {
                var result = [];
                for (var i = 0; i < response.data.results.length; i++) {
                    result.push(<div>{response.data.results[i]}</div>);
                }
                return result;
            })
        }
    }
    return (
        <>
            <div id="sidebar">
                <Sidebar_item itemClicked={() => setSelectedRoomId(-1)} roomID={"main"}/>
            </div>
            <MessageList elements={GetMessages(selectedRoomId)}/>
            <div id="message-send-container">
                <input id="messageBox"></input>
                <button id="sendMessage">SEND</button>
            </div>
        </>

    );
}

export default Chat;