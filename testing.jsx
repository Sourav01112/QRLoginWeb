import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";


const YourComponent = ({ uniqueIdentifierFrom }) => {
  const [userData, setUserData] = useState(null);
  console.log({ uniqueIdentifierFrom })

  let payload = {
    check: 'true'
  }

  useEffect(() => {
    const storedData = localStorage.getItem("userData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
    }

    const socket = io("http://192.168.0.108:3001");

    socket.on('connect', () => {
      if (uniqueIdentifierFrom !== '') {
        socket.emit('custom-event', uniqueIdentifierFrom);
      }
    });

    socket.on('custom-event', (query) => {
      console.log('Received query response:', query);

      if (query !== null) {


        axios
          .post("http://192.168.0.108:3001/api/user/check-User", {
            query,
          })
          .then((response) => {
            console.log({ response })

          })
          .catch((error) => {
            console.error("API Error:", error);
          })
        
      }

    });
    return () => {
      console.log("Disconnecting socket");
      socket.disconnect();
    };
  }, [uniqueIdentifierFrom]);

  return (
    <>
      <h1>Hello</h1>
      {userData && (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>City: {userData.city}</p>
        </div>
      )}
    </>
  );
};

export default YourComponent;


