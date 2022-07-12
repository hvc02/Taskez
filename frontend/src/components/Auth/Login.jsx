import React, { useState } from "react";
import TextField from "../TextField/TextField";
import Button from "../Button/Button";
import ShowPassword from "../../assets/images/show-pass.svg";
import HidePassword from "../../assets/images/hide-pass.svg";

const Login = ({
  handleChange,
  handleSubmit,
  values,
  errors,
  serverError,
  isSubmitting,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <form onSubmit={handleSubmit} className="login__form">
        <div className="form-group">
          <TextField
            value={values.email}
            onChange={handleChange}
            name="email"
            placeholder="Email address"
            type="text"
          />
        </div>
        <div className="form-group ">
          <div className="password__container">
            <TextField
              value={values.password}
              onChange={handleChange}
              name="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
            />

            <img
              className="password__icon"
              src={showPassword ? ShowPassword : HidePassword}
              alt="show password"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {errors.email && <p className="form__error-text"> {errors.email}</p>}
          {serverError.msg && (
            <p className="form__error-text">{serverError.msg}</p>
          )}
        </div>
        <div className="checkbox">
          <input
            className="checkbox__input"
            type="checkbox"
            name="checkbox"
            id="checkbox"
            checked={values.checkbox}
            onChange={handleChange}
          />
          <label className="checkbox__label" htmlFor="checkbox">
            Remember me
          </label>
        </div>
        <Button
          text="Submit"
          variant="filled"
          fullwidth={true}
          isLoading={isSubmitting}
          disabled={!values.email || !values.password}
        />
      </form>
    </>
  );
};

export default Login;
