import "./styles.scss";

interface LoaderProps {
  count?: number;
}

export const BlogSectionSkeletonLoader: React.FC<LoaderProps> = ({
  count = 6,
}) => {
  return (
    <ul className="blog-section-skeleton__container" role="list">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="blog-section-skeleton__card">
          <div className="blog-section-skeleton__card-inner">
            <div className="blog-section-skeleton__image-placeholder"></div>
            <div className="blog-section-skeleton__content">
              <div className="blog-section-skeleton__title-placeholder"></div>

              <div className="blog-section-skeleton__excerpt-container">
                <div className="blog-section-skeleton__excerpt-line blog-section-skeleton__excerpt-line--full"></div>
                <div className="blog-section-skeleton__excerpt-line blog-section-skeleton__excerpt-line--medium"></div>
                <div className="blog-section-skeleton__excerpt-line blog-section-skeleton__excerpt-line--small"></div>
              </div>

              <div className="blog-section-skeleton__meta">
                <div className="blog-section-skeleton__meta-item blog-section-skeleton__meta-item--date"></div>
                <div className="blog-section-skeleton__meta-dot"></div>
                <div className="blog-section-skeleton__meta-item blog-section-skeleton__meta-item--author"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </ul>
  );
};

export const BlogPostDetailLoader: React.FC = () => {
  return (
    <main className="blog-detail-skeleton__container">
      <div className="blog-detail-skeleton__breadcrumb"></div>

      <section className="blog-detail-skeleton__hero-section">
        <div className="blog-detail-skeleton__hero-image"></div>
        <div className="blog-detail-skeleton__hero-meta">
          <div className="blog-detail-skeleton__hero-meta-item"></div>
          <div className="blog-detail-skeleton__hero-meta-item"></div>
        </div>
      </section>

      <section className="blog-detail-skeleton__content-section">
        <div className="blog-detail-skeleton__main-content">
          {[...Array(10)].map((_, i) => {
            // Vary the content width to simulate different elements
            const widthClass =
              i % 3 === 0
                ? "blog-detail-skeleton__content-block--w-full"
                : i % 3 === 1
                  ? "blog-detail-skeleton__content-block--w-large"
                  : "blog-detail-skeleton__content-block--w-medium";
            const heightClass =
              i % 4 === 0
                ? "blog-detail-skeleton__content-block--h6"
                : i % 4 === 1
                  ? "blog-detail-skeleton__content-block--h5"
                  : i % 4 === 2
                    ? "blog-detail-skeleton__content-block--h4"
                    : "blog-detail-skeleton__content-block--h8";
            const alternateClass =
              i % 2 === 0
                ? ""
                : "blog-detail-skeleton__content-block--alternate";

            return (
              <div
                key={i}
                className={`blog-detail-skeleton__content-block ${heightClass} ${widthClass} ${alternateClass}`}
              ></div>
            );
          })}
        </div>

        <div className="blog-detail-skeleton__sidebar">
          <div className="blog-detail-skeleton__toc-container">
            <div className="blog-detail-skeleton__toc-title"></div>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="blog-detail-skeleton__toc-item"
                style={{ width: `${60 + i * 10}%` }}
              ></div>
            ))}
          </div>

          <div className="blog-detail-skeleton__related-desktop">
            <div className="blog-detail-skeleton__related-title"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="blog-detail-skeleton__related-item">
                <div className="blog-detail-skeleton__related-thumb"></div>
                <div className="blog-detail-skeleton__related-content">
                  <div className="blog-detail-skeleton__related-item-title"></div>
                  <div className="blog-detail-skeleton__related-item-meta"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="blog-detail-skeleton__related-mobile">
        <div className="blog-detail-skeleton__related-mobile-title"></div>
        <div className="blog-detail-skeleton__related-mobile-grid">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="blog-detail-skeleton__related-mobile-item">
              <div className="blog-detail-skeleton__related-mobile-image"></div>
              <div className="blog-detail-skeleton__related-mobile-title-item"></div>
              <div className="blog-detail-skeleton__related-mobile-meta"></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export const AdminBlogSkeletonLoader: React.FC<LoaderProps> = ({
  count = 6,
}) => {
  return (
    <div className="admin-blog-skeleton__container">
      <div className="admin-blog-skeleton__add-button"></div>
      <div className="admin-blog-skeleton__grid">
        {Array.from({ length: count }).map((_, index) => (
          <AdminBlogSkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
};

const AdminBlogSkeletonCard: React.FC = () => {
  return (
    <div className="admin-blog-skeleton__card">
      <div className="admin-blog-skeleton__image-container">
        <div className="admin-blog-skeleton__status-badge"></div>
      </div>

      <div className="admin-blog-skeleton__content">
        <div className="admin-blog-skeleton__title-container">
          <div className="admin-blog-skeleton__title-line admin-blog-skeleton__title-line--large"></div>
          <div className="admin-blog-skeleton__title-line admin-blog-skeleton__title-line--small"></div>
        </div>

        <div className="admin-blog-skeleton__excerpt-container">
          <div className="admin-blog-skeleton__excerpt-line admin-blog-skeleton__excerpt-line--full"></div>
          <div className="admin-blog-skeleton__excerpt-line admin-blog-skeleton__excerpt-line--full"></div>
          <div className="admin-blog-skeleton__excerpt-line admin-blog-skeleton__excerpt-line--medium"></div>
        </div>

        <div className="admin-blog-skeleton__meta-container">
          <div className="admin-blog-skeleton__meta-item">
            <div className="admin-blog-skeleton__meta-icon"></div>
            <div className="admin-blog-skeleton__meta-text admin-blog-skeleton__meta-text--date"></div>
          </div>
          <div className="admin-blog-skeleton__meta-item">
            <div className="admin-blog-skeleton__meta-icon"></div>
            <div className="admin-blog-skeleton__meta-text admin-blog-skeleton__meta-text--views"></div>
          </div>
        </div>

        <div className="admin-blog-skeleton__actions">
          <div className="admin-blog-skeleton__button admin-blog-skeleton__button--primary"></div>
          <div className="admin-blog-skeleton__button admin-blog-skeleton__button--secondary"></div>
        </div>
      </div>
    </div>
  );
};
