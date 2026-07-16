import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import AuthCard from "../components/Auth/AuthCard";
import InputField from "../components/Form/InputField/InputField";

import { login } from "../services/authService";

import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function validate() {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    try {
      await login(formData.email, formData.password);

      toast.success("Welcome back!");

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to continue managing your finances."
    >
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          error={errors.email}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="********"
          error={errors.password}
        />

        <button className="auth-btn" type="submit">
          Login
        </button>
      </form>

      <p className="auth-footer">
        Don't have an account? <Link to="/register">Create one</Link>
      </p>
    </AuthCard>
  );
}

export default LoginPage;
