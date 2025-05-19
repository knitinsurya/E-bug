import { supabase } from "../supabase";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 Sign Up
  const signUpUser = async () => {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) console.error("Sign Up Error:", error.message);
    else console.log("User Signed Up:", user);
  };

  // 🔹 Sign In
  const signInUser = async () => {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) console.error("Sign In Error:", error.message);
    else console.log("User Signed In:", user);
  };

  // 🔹 Logout
  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Logout Error:", error.message);
    else console.log("User Logged Out");
  };

  return (
    <div>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={signUpUser}>Sign Up</button>
      <button onClick={signInUser}>Sign In</button>
      <button onClick={signOutUser}>Logout</button>
    </div>
  );
};

export default Auth;
