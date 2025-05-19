import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./Login.css";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isRegistering) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          name,
          email,
          createdAt: new Date(),
        });

        alert("Registration successful!");
        setIsRegistering(false);
      } catch (error) {
        alert("Error: " + error.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        navigate("/");
      } catch (error) {
        alert("Login failed: " + error.message);
      }
    }

    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      {/* Robot on the left */}
      <div className="floating-robot">
        <iframe
          title="B33 - Pollinator Robot"
          frameBorder="0"
          allowFullScreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          src="https://sketchfab.com/models/9112fdb300ac471dac8c221e89103147/embed?autospin=1&autostart=1&transparent=1"
          className="sketchfab-iframe"
        ></iframe>
      </div>

      {/* Form on the right */}
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form-title">{isRegistering ? "Register" : "Login"}</h2>

        {isRegistering && (
          <div className="flex-column">
            <label>Full Name</label>
            <div className="inputForm">
              <input
                type="text"
                placeholder="Enter your full name"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        <div className="flex-column">
          <label>Email</label>
          <div className="inputForm">
            <input
              type="email"
              placeholder="Enter your email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex-column">
          <label>Password</label>
          <div className="inputForm">
            <input
              type="password"
              placeholder="Enter your password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="button-submit" disabled={loading}>
          {loading ? "Processing..." : isRegistering ? "Register" : "Login"}
        </button>

        <p className="p">
          {isRegistering ? "Already have an account?" : "Don't have an account?"}
          <span className="span" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Login" : "Register"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
