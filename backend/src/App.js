import './App.css';

import {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {nanoid} from "nanoid";

const socket = io.connect("https://localhost:5000");
const userName = nanoid(10);

function App() {
  
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
      e.preventDefault();
      socket.emit("chat", {message, userName});
      setMessage('');
  }

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    })
  })

  return (
    <div className="App">
      <header className="App-header">
          <h1>MyChat</h1>
          {
          chat.map((payload,index) => {
            return(
              <p key={index}><span>{payload.userName}: </span>{payload.message}</p>
            )  
          })
          }
          <form onSubmit={sendChat}>
              <input type="text" name="chat" placeholder="send message"
              value={message} onChange={(e) => {
                  setMessage(e.target.value)
              }}/>
              <button type="submit">Send</button>
          </form>
      </header>
    </div>
  );
}

export default App;
