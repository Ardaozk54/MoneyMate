import "./Skeleton.css";

function Skeleton({
  width = "100%",
  height = "1rem",
  radius = "8px",
  className = "",
}) {
  return (
    <span
      className={`mm-skeleton ${className}`.trim()}
      style={{ width, height, borderRadius: radius }}
      aria-hidden="true"
    />
  );
}

export default Skeleton;
