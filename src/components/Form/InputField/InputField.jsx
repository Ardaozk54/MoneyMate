import "./InputField.css";

function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
}) {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>

      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? "input-error" : ""}
      />

      {error && <p className="input-error-message">{error}</p>}
    </div>
  );
}

export default InputField;
