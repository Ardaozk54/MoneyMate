import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import AuthCard from "../components/Auth/AuthCard";
import InputField from "../components/Form/InputField/InputField";

import { login } from "../services/authService";

import "./LoginPage.css";
import { useSettings } from "../context/SettingsContext";

function LoginPage() {
  const navigate = useNavigate();
  const { t } = useSettings();

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
      newErrors.email = t("emailRequired");
    }

    if (!formData.password.trim()) {
      newErrors.password = t("passwordRequired");
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    try {
      await login(formData.email, formData.password);

      toast.success(t("loginSuccess"));

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <AuthCard title={t("welcomeBack")} subtitle={t("signInSubtitle")}>
      <form onSubmit={handleSubmit}>
        <InputField
          label={t("email")}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          error={errors.email}
        />

        <InputField
          label={t("password")}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="********"
          error={errors.password}
        />

        <button className="auth-btn" type="submit">
          {t("login")}
        </button>
      </form>

      <p className="auth-footer">
        {t("noAccount")} <Link to="/register">{t("createOne")}</Link>
      </p>
    </AuthCard>
  );
}

export default LoginPage;
