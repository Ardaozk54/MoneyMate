import "./AuthCard.css";

function AuthCard({ title, subtitle, children }) {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-header">
          <h1 className="auth-logo">💰 MoneyMate</h1>

          <h2>{title}</h2>

          <p>{subtitle}</p>
        </div>

        {children}
      </section>
    </main>
  );
}

export default AuthCard;
