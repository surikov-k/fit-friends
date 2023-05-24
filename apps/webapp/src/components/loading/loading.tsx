import './loading.css';

export function Loading() {
  return (
    <div className="loading">
      <svg
        className="loading-spinner"
        width={60}
        height={60}
        aria-hidden="true"
      >
        <use xlinkHref="#icon-logotype" />
      </svg>
    </div>
  );
}
