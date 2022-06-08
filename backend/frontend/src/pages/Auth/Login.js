import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SIGNIN_USER } from "../../gqlOperations/mutations/UserMutations";
import { useNavigate } from "react-router-dom";
import { saveTokenOnLS } from "../../services/localStorage";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [signupUser, { data, loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted(data) {
      saveTokenOnLS(data);
      navigate("/profile");
      setFormData({ email: "", password: "" });
    },
  });

  const saveData = (e) => {
    e.preventDefault();
    signupUser({
      variables: {
        userSignin: formData,
      },
    });
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (data) toast("User Created Successfully");
    if (error) toast.error(error.message);
  }, [data, error]);
  return (
    <section className="register_Section">
      <form onSubmit={saveData} className="register_Form">
        <div>
          <label>Email</label>
          <input
            type="email"
            required
            name="email"
            placeholder="email"
            autoComplete="off"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            name="password"
            placeholder="password"
            minLength={5}
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="register_Form__ButtonDiv">
            <button type="submit">Submit</button>
            <button type="cancel" className="cancel-btn">
              Cancel
            </button>
          </div>
        )}
      </form>
      <div className="register_EndDiv">
        <p>Not Registered ! Registered ?</p>
        <p>Forget password</p>
      </div>
    </section>
  );
};

export default Login;
