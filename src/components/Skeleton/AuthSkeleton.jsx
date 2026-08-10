import Skeleton from "./Skeleton";

function AuthSkeleton() {
  return (
    <main className="auth-skeleton" aria-busy="true">
      <span className="skeleton-status" role="status">
        Session is loading
      </span>

      <section className="auth-skeleton-card" aria-hidden="true">
        <Skeleton width="52px" height="52px" radius="14px" />
        <Skeleton width="150px" height="1.75rem" radius="10px" />
        <Skeleton width="220px" height="0.85rem" />
        <div className="auth-skeleton-fields">
          <Skeleton height="44px" radius="10px" />
          <Skeleton height="44px" radius="10px" />
          <Skeleton height="44px" radius="10px" />
        </div>
      </section>
    </main>
  );
}

export default AuthSkeleton;
