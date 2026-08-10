import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import AuthCard from "../components/Auth/AuthCard";
import InputField from "../components/Form/InputField/InputField";

import { register } from "../services/authService";

import "./RegisterPage.css";
import { useSettings } from "../context/SettingsContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useSettings();

  const [formData, setFormData] = useState({
    name: "",
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

    if (!formData.name.trim()) {
      newErrors.name = t("nameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("emailRequired");
    }

    if (!formData.password.trim()) {
      newErrors.password = t("passwordRequired");
    }

    if (formData.password.length < 6) {
      newErrors.password = t("passwordMin");
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    try {
      await register(formData.name, formData.email, formData.password);

      toast.success(t("accountCreated"));

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error(error.message);
    }
  }

  return (
    <AuthCard title={t("createAccount")} subtitle={t("registerSubtitle")}>
      <form onSubmit={handleSubmit}>
        <InputField
          label={t("name")}
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          error={errors.name}
        />

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
          {t("createAccount")}
        </button>
      </form>

      <p className="auth-footer">
        {t("alreadyAccount")} <Link to="/login">{t("login")}</Link>
      </p>
    </AuthCard>
  );
}

export default RegisterPage;
