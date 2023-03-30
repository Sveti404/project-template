import React from 'react';
import axios from 'axios';
  
function Sidebar_item({ itemClicked, roomID }) {
    return <div className='sidebar_item' onClick={itemClicked}>{roomID}</div>;
}

function MessageList({ elements }) {
    return <div className='message_list'>{elements}</div>
}

const Chat = () => {
    const [messages, setMessages] = React.useState([]);
    const [nickname, setNickname] = React.useState("Anonymous");
    const [message, setMessage] = React.useState("");
    const [room, setRoom] = React.useState(1);
    const [rooms, setRooms] = React.useState([])

    const onNicknameChange = (event) => {
        setNickname(event.target.value);
    }

    const onMessageChange = (event) => {
        setMessage(event.target.value);
    }
    
    const onRoomChange = (event) => {
        setRoom(event.target.value);
    }

    function GetMessages(roomID) {
        if (roomID > -1) {
            axios.get('http://95.216.143.26:9000/api/chats/'+roomID).then(response => {
                var list = response.data.results.map(res => <div className='message'>{res.message} - {res.nickname} - {res.room}</div>);
                setMessages(list);
            });    
        } else {
            axios.get('http://95.216.143.26:9000/api/chats').then(response => {
                var list = response.data.results.map(res => <div className='message'>{res.message} - {res.nickname} - {res.room}</div>);
                setMessages(list);
            });


        }
    }
    
    setInterval(GetMessages(room), 10000);

    function GetAllRooms() {
        axios.get('http://95.216.143.26:9000/api/chats').then(response => {
            var res = [];
            for (var i = 0; i < response.data.results.length; i++) {
                res.push(response.data.results[i].room);
            }
            setRooms(res);
        });
    }

    function PostMessage() {
        if (message !== "" && typeof room !== 'number' && room > 0 && message.length <= 140) {
            axios.post('http://95.216.143.26:9000/api/chats', {
                nickname: nickname,
                room: room,
                message: message
            });
            setMessage("");
        }
    }

    function RoomList({}) {
        GetAllRooms();
        var res = [];
        for (var i = 0; i < rooms.length; i++) {
            res.push(<Sidebar_item itemClicked={() => GetMessages(rooms[i])} roomID={rooms[i]}/>);
        }
        return res;
    }

    return (
        <>
            <div id="sidebar">
                <input id='nickname' placeholder={"nickname"} onChange={onNicknameChange}></input>
                <Sidebar_item itemClicked={() => GetMessages(-1)} roomID={"main"}/>
                
            </div>
            <MessageList elements={messages}/>
            <div id="message-send-container">
                <input id='roomID' defaultValue={1} onChange={onRoomChange}></input>
                <input id="messageBox" value={message} onChange={onMessageChange}></input>
                <button id="sendMessage" onClick={PostMessage}>SEND</button>
            </div>
        </>

    );
}

export default Chat;