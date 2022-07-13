import { useState } from "react";

export const initialState = {
  fullname: "",
  email: "",
  password: "",
  checkbox: true,
};
const useForm = () => {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setValues({
      ...values,
      [name]: name !== "checkbox" ? value : !values.checkbox,
    });
  };

  return { handleChange, values, setValues };
};

export default useForm;
