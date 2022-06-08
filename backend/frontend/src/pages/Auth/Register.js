import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SIGNUP_USER } from "../../gqlOperations/mutations/UserMutations";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);
  const saveData = (e) => {
    e.preventDefault();
    console.log(formData);
    signupUser({
      variables: {
        userNew: formData,
      },
    });
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // console.log("datadatadata----->",data)
  useEffect(() => {
    if (data) {
      setFormData({ firstName: "", lastName: "", email: "", password: "" });
      toast("User Created Successfully");
      navigate("/login");
    }
    if (error) toast.error(error.message);
  }, [data, error]);
  return (
    <section className="register_Section">
      <form onSubmit={saveData} className="register_Form">
        <div>
          <label>FirstName</label>
          <input
            type="text"
            placeholder="firstName"
            autoComplete="off"
            value={formData.firstName}
            onChange={handleChange}
            name="firstName"
          />
        </div>
        <div>
          <label>lastName</label>
          <input
            type="text"
            name="lastName"
            autoComplete="off"
            value={formData.lastName}
            placeholder="lastName"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            required
            name="email"
            placeholder="email"
            value={formData.email}
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
            value={formData.password}
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        {loading ? (
          <h1>Loading ...</h1>
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
        <p>Already LoggedIn ! Login ?</p>
        <p>Forget password</p>
      </div>
    </section>
  );
};

export default Register;
