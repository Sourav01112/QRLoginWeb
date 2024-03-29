import axios from "axios";
import React, { useEffect, useState } from "react";
import YourComponent from "../../testing";

export const Login = () => {
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [uniqueIdentifier, setUniqueIdentifier] = useState('')


  const generateRandomString = (length) => {
    const crypto = window.crypto || window.msCrypto;
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    const randomString = Array.from(array, (byte) => byte.toString(36))
      .join("")
      .slice(0, length);
    return randomString;
  };

  const handleQRGeneration = async() => {
    setLoading(true);
    const uniqueIdentifier =  generateRandomString(60);
    setUniqueIdentifier(uniqueIdentifier)
    axios
      .post("http://192.168.0.108:3001/api/session/generateQR", {
        uniqueIdentifier,
      })
      .then((response) => {
        const result = response.data.data.qrCode;
        setQrCode(result);
      })
      .catch((error) => {
        console.error("API Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  return (
    <div>
      {!qrCode ? (
        <>
          <button onClick={handleQRGeneration} disabled={loading}>
            {loading ? "Generating QR Code..." : "click to reload QR Code"}
          </button>
          <h3>No QR to show</h3>
        </>
      ) : (
        <>
          <img src={qrCode} alt="QR Code" />
        </>
      )}

      <YourComponent uniqueIdentifierFrom={uniqueIdentifier} />
    </div>
  );
};
