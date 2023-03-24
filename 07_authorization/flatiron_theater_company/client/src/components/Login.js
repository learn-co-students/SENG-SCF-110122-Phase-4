import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, ERR_DIV } from "../styled/Form";

function Login({ updateUser }) {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const { name, password } = formData;

  function onSubmit(e) {
    e.preventDefault();

    fetch(`/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          updateUser(user);
          history.push(`/users/${user.id}`);
        });
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <Form onSubmit={onSubmit}>
        <label>Username</label>
        <input type="text" name="name" value={name} onChange={handleChange} />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />

        <input type="submit" value="Log in!" />
      </Form>
      {errors ? <ERR_DIV>{errors}</ERR_DIV> : null}
    </>
  );
}

export default Login;
