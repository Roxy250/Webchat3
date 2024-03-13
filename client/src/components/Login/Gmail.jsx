import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const LoginGmail = () => {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token:", response.credential);
    const userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "870805169859-bgm764msno3hs3h3asr29ul9jom6tsec.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), { theme: "outline", size: "large" });

  }, []);

  return (
    <div>
      <div id="signInDiv"></div>
      {
      Object.keys(user).length != 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
      {user && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h3>{user.name}</h3>
          <ul>
            {Object.entries(user).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value.toString()}
              </li>
            ))}
          </ul>
        </div>
        )}
    </div>
  );
}

export default LoginGmail;
