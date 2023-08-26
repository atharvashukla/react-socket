import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:5001";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("countUpdated", (updatedCount) => {
      setCount(updatedCount);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <h1>React + Socket.io</h1>
      <p>Current Count: {count}</p>
    </div>
  );
}

export default App;
