import Skeleton from "./Skeleton";

function TransactionRowSkeleton({ withActions = false }) {
  return (
    <article className="skeleton-transaction-row" aria-hidden="true">
      <div className="skeleton-transaction-info">
        <Skeleton width="min(180px, 70%)" height="0.95rem" />
        <Skeleton width="76px" height="24px" radius="999px" />
      </div>

      <div className="skeleton-transaction-meta">
        <Skeleton width="92px" height="1.2rem" />
        <Skeleton width="72px" height="0.75rem" />
      </div>

      {withActions && (
        <div className="skeleton-transaction-actions">
          <Skeleton width="34px" height="34px" />
          <Skeleton width="34px" height="34px" />
        </div>
      )}
    </article>
  );
}

export default TransactionRowSkeleton;
