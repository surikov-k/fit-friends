import { useNavigate } from 'react-router-dom';

export function NavigateBackButton() {
  const navigate = useNavigate();
  return (
    <button
      className="btn-flat friends-list__back"
      type="button"
      onClick={(params) => {
        navigate(-1);
      }}
    >
      <svg width={14} height={10} aria-hidden="true">
        <use xlinkHref="#arrow-left" />
      </svg>
      <span>Назад</span>
    </button>
  );
}
