import Skeleton from "./Skeleton";
import TransactionRowSkeleton from "./TransactionRowSkeleton";

function TransactionsSkeleton() {
  return (
    <main className="transactions-page skeleton-page" aria-busy="true">
      <span className="skeleton-status" role="status">
        Transactions are loading
      </span>

      <section className="page-header" aria-hidden="true">
        <Skeleton width="190px" height="2rem" radius="10px" />
        <Skeleton
          width="320px"
          height="1rem"
          className="skeleton-page-subtitle"
        />
      </section>

      <section className="filter-bar skeleton-filter-bar" aria-hidden="true">
        <Skeleton height="42px" radius="10px" className="skeleton-search" />
        <Skeleton width="165px" height="42px" radius="10px" />
        <Skeleton width="165px" height="42px" radius="10px" />
      </section>

      <section className="transactions-container">
        {Array.from({ length: 5 }, (_, index) => (
          <TransactionRowSkeleton withActions key={index} />
        ))}
      </section>
    </main>
  );
}

export default TransactionsSkeleton;
