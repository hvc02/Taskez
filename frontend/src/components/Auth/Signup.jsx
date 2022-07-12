import React, { useState } from "react";
import Button from "../Button/Button";
import TextField from "../TextField/TextField";
import ShowPassword from "../../assets/images/show-pass.svg";
import HidePassword from "../../assets/images/hide-pass.svg";

const Signup = ({
  handleChange,
  handleSubmit,
  values,
  errors,
  serverError,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <form onSubmit={handleSubmit} className="login__form">
        <div className="form-group">
          <TextField
            value={values.fullname}
            onChange={handleChange}
            name="fullname"
            placeholder="Full name"
            type="text"
          />
        </div>
        <div className="form-group">
          <TextField
            value={values.email}
            onChange={handleChange}
            name="email"
            placeholder="Email address"
            type="text"
          />
        </div>
        <div className="form-group">
          <div className="password__container">
            <TextField
              value={values.password}
              onChange={handleChange}
              name="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
            />

            <img
              className="show-password-icon"
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
        <Button
          text="submit"
          variant="filled"
          fullwidth={true}
          disabled={!values.fullname || !values.email || !values.password}
        />
      </form>
    </>
  );
};

export default Signup;
