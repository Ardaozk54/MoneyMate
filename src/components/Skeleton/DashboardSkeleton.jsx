import Skeleton from "./Skeleton";
import TransactionRowSkeleton from "./TransactionRowSkeleton";

function DashboardSkeleton() {
  return (
    <main className="dashboard skeleton-page" aria-busy="true">
      <span className="skeleton-status" role="status">
        Dashboard is loading
      </span>

      <section className="summary-cards" aria-hidden="true">
        {Array.from({ length: 3 }, (_, index) => (
          <article className="summary-card" key={index}>
            <Skeleton width="34%" height="0.75rem" />
            <Skeleton width="58%" height="2rem" radius="10px" />
            <Skeleton width="44%" height="0.75rem" />
          </article>
        ))}
      </section>

      <section className="dashboard-grid" aria-hidden="true">
        <section className="analytics-card skeleton-analytics-card">
          <header className="analytics-header">
            <div className="skeleton-heading-group">
              <Skeleton width="90px" height="1rem" />
              <Skeleton width="130px" height="0.75rem" />
            </div>
            <Skeleton width="148px" height="42px" radius="10px" />
          </header>

          <div className="analytics-content">
            <Skeleton
              width="240px"
              height="240px"
              radius="50%"
              className="skeleton-chart"
            />

            <div className="stats-section">
              {Array.from({ length: 4 }, (_, index) => (
                <div className="skeleton-stat" key={index}>
                  <div className="skeleton-stat-heading">
                    <Skeleton width={`${48 + index * 7}%`} height="0.8rem" />
                    <Skeleton width="30px" height="0.8rem" />
                  </div>
                  <Skeleton height="5px" radius="999px" />
                  <Skeleton width="72px" height="0.75rem" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="transaction-list">
          <div className="transaction-header">
            <Skeleton width="155px" height="1rem" />
          </div>

          {Array.from({ length: 5 }, (_, index) => (
            <TransactionRowSkeleton key={index} />
          ))}
        </section>
      </section>
    </main>
  );
}

export default DashboardSkeleton;
