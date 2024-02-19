import { useEffect, useState } from "react";
import io from "socket.io-client";

const YourComponent = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
  
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
    }

    const socket = io("http://192.168.56.1:3001");

    socket.on("response", (data) => {
      console.log("Received userLoggedIn:", data);

      localStorage.setItem("userData", JSON.stringify(data));

      setUserData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
