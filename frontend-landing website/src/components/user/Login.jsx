import React, { useEffect, useState } from "react";
import "../../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [isLoginError, setIsLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ---------------- INPUT HANDLING ---------------- */

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInput = (e) => {
    setIsLoginError(false);

    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: value ? "" : "true"
    }));
  };

  useEffect(() => {
    setIsButtonDisabled(!(user.email && user.password));
  }, [user.email, user.password]);

  /* ---------------- LOGIN ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = user;

    /* ---------- DUMMY LOGIN (KEEP) ---------- */
    if (
      (email === "admin@gmail.com" && password === "admin123") ||
      (email === "agent@gmail.com" && password === "agent123") ||
      (email === "user@gmail.com" && password === "user123")
    ) {
      let role = "USER";

      if (email === "admin@gmail.com") role = "ADMIN";
      else if (email === "agent@gmail.com") role = "AGENT";

      dispatch(
        setCredentials({
          user: {
            username: email,
            roles: [role]
          },
          token: null
        })
      );

      toast.success("Login successful");

      if (role === "ADMIN") navigate("/admin/dashboard");
      else if (role === "AGENT") navigate("/agent/dashboard");
      else navigate("/user/dashboard");

      return;
    }

    /* ---------- REAL AUTH API ---------- */
    try {
      const response = await axios.post(
        "http://10.145.52.5:5003/api/pkisim2.1/users/validate",
        {
          username: email,
          password: password
        },
        {
          headers:{
            "Content-Type":"application/json"
          }
        }
      );

      const data = response.data;

      if (!data.success) {
        throw new Error(data.message);
      }

      const { username, role, accstatus, email: userEmail } = data.data;

      if (accstatus !== "ACTIVE") {
        toast.error("Account is inactive. Contact admin.");
        return;
      }

      dispatch(
        setCredentials({
          user: {
            username,
            email: userEmail,
            roles: [role]
          },
          token: null
        })
      );

      toast.success("Login successful");

      if (role === "ADMIN") navigate("/admin/dashboard");
      else if (role === "AGENT") navigate("/agent/dashboard");
      else navigate("/user/dashboard");

    } catch (error) {
      setIsLoginError(true);
      toast.error("Invalid username or password");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome to JioBusiness</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          {/* Email / Username */}
          <div className={`input-box ${errors.email ? "errors-bar" : ""}`}>
            <input
              id="email"
              type="text"
              name="email"
              value={user.email}
              onChange={handleInput}
              required
            />
            <label htmlFor="email">E-mail ID / Jio User ID</label>
          </div>
          {errors.email && (
            <span className="error-message">
              <RxCrossCircled /> Enter E-mail ID / Jio User ID
            </span>
          )}

          {/* Password */}
          <div className={`input-box ${errors.password ? "errors-bar" : ""}`}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handleInput}
              required
            />
            <button
              type="button"
              className="password-btn"
              onClick={handlePasswordToggle}
            >
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </button>
            <label htmlFor="password">Password</label>
          </div>
          {errors.password && (
            <span className="error-message">
              <RxCrossCircled /> Enter Password
            </span>
          )}

          {/* Remember */}
          <div className="checkbox">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <Link to="/bussiness/login">Forget password?</Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="login-btn"
            disabled={isButtonDisabled}
          >
            Log in
          </button>
        </form>

        <h6 className="forget-id">
          <Link to="/bussiness/login">Forget Jio ID?</Link>
          <span> | </span>
          <Link to="/bussiness/login">Activate account</Link>
        </h6>

        {isLoginError && (
          <div className="login-error">
            Jio ID or Password is wrong. Please re-enter and try again.
          </div>
        )}

        <p className="terms-of-services">
          By continuing, you agree to our <Link>Terms of Service</Link> and{" "}
          <Link>Privacy & Legal Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
