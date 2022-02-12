import React, { useState, useEffect } from "react";
import "../styles/popup-register.scss";
import { InputForm } from "./InputForm";

const PopupRegister = (props) => {
  const initialValues = { name: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
    //eslint-disable-next-line
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Wajib diisi!";
    }
    if (!values.email) {
      errors.email = "Format email salah!";
    } else if (!regex.test(values.email)) {
      errors.email = "Ini bukan format email yang valid!";
    }
    if (!values.password) {
      errors.password = "Wajib diisi!";
    }
    return errors;
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <InputForm
            title="Name"
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            isSubmit={isSubmit}
          />
          <p>{isSubmit && formErrors.name}</p>
          <InputForm
            title="Email"
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            isSubmit={isSubmit}
          />
          <p>{isSubmit && formErrors.email}</p>
          <InputForm
            title="Password"
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            isSubmit={isSubmit}
          />
          <p>{isSubmit && formErrors.password}</p>

          <button className="btn-login">Login</button>
        </form>
        <button
          className="btn-close"
          onClick={() => {
            props.setTrigger(false);
            setIsSubmit(null);
          }}
        >
          <i className="fa fa-close icon"></i>
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};
export default PopupRegister;
