import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import validateForm from "../utils/form-validation";
import useForm, { initialState } from "../hooks/useForm";
import { login, register } from "../api/services";
import { ReactComponent as LoginIllustration } from "../assets/images/login.svg";

const Auth = () => {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["session"]);
  const { handleChange, values, setValues } = useForm();
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({
    form: "login",
    serverError: {},
    isSubmitting: false,
  });
  const { form, serverError, isSubmitting } = state;

  const handleLogin = async (e) => {
    e.preventDefault();

    const isError = validateForm(values);
    setErrors(isError);
    if (Object.keys(isError).length) {
      return;
    }

    if (!Object.keys(isError).length) {
      try {
        setState((prevState) => ({
          ...prevState,
          isSubmitting: true,
        }));
        const { email, password } = values;
        const response = await login({ email, password });
        const { token } = response.data;
        setCookie("session", token, { path: "/" });
        navigate("/projects");
      } catch (error) {
        const msg =
          error?.response?.data || "Unable to login. Kindly contact support.";
        setState((prevState) => ({
          ...prevState,
          serverError: { msg },
        }));
      } finally {
        setState((prevState) => ({
          ...prevState,
          isSubmitting: false,
        }));
      }
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const isError = validateForm(values);
    setErrors(isError);

    if (Object.keys(isError).length) {
      return;
    }

    if (!Object.keys(isError).length) {
      try {
        setState((prevState) => ({
          ...prevState,
          isSubmitting: true,
        }));
        const { fullname: name, email, password } = values;
        const response = await register({ name, email, password });
        const { token } = response.data;
        setCookie("session", token, { path: "/" });
        navigate("/projects");
      } catch (error) {
        const msg =
          error?.response?.data || "Unable to signup. Kindly contact support.";
        setState((prevState) => ({
          ...prevState,
          serverError: { msg },
        }));
      } finally {
        setState((prevState) => ({
          ...prevState,
          isSubmitting: false,
        }));
      }
    }
  };

  const handleResetForm = () => {
    setErrors({});
    setValues(initialState);
    setState((prevState) => ({
      ...prevState,
      serverError: {},
    }));
  };

  const isLoginActive = `auth__action-title ${
    form === "login" ? "form-active" : ""
  }`;
  const isSignupActive = `auth__action-title  ${
    form === "signup" ? "form-active" : ""
  }`;

  const handleFormChange = (form) => {
    if (form === "login")
      setState((prevState) => ({
        ...prevState,
        form: "login",
      }));
    else
      setState((prevState) => ({
        ...prevState,
        form: "signup",
      }));

    handleResetForm();
  };
  return (
    <div className="auth flex items-center justify-between">
      <div className="auth__img-wrapper">
        <LoginIllustration className="auth__img" />
      </div>
      <div className="auth__container">
        <div className="auth__action flex">
          <p
            className={isLoginActive}
            onClick={() => handleFormChange("login")}
          >
            Log In
          </p>
          <p
            className={isSignupActive}
            onClick={() => handleFormChange("signup")}
          >
            Sign up
          </p>
        </div>

        <div className="auth__main">
          {form === "login" && (
            <div className="auth__desc">
              <p>To Continue</p>
              <span>We need your email and password</span>
            </div>
          )}

          {form === "login" && (
            <Login
              handleChange={handleChange}
              handleSubmit={handleLogin}
              values={values}
              errors={errors}
              serverError={serverError}
              isSubmitting={isSubmitting}
            />
          )}

          {form === "signup" && (
            <Signup
              handleChange={handleChange}
              handleSubmit={handleSignup}
              values={values}
              errors={errors}
              serverError={serverError}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
