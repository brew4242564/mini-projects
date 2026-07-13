import { useState } from "react";
import { signIn, signUp } from "../../services/authServices";
import styles from "./Auth.module.css";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const { error } = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      if (isSignUp) {
        setErrorMsg("cuenta creada, podes iniciar sesion.");
      }
    } catch (err) {
      console.error("Auth error: ", err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.buttonLog}>{isSignUp ? "Sign up" : "Login"}</button>
        </form>
        {errorMsg && <p className="auth-error">{errorMsg}</p>}

        <button onClick={() => setIsSignUp(!isSignUp)} className="auth-toggle" className={styles.buttonAlt}>
          {isSignUp
            ? "Already have an account? Log in."
            : "Don't have an account? Sign up."}
        </button>
      </div>
    </div>
  );
};

export default Auth;
