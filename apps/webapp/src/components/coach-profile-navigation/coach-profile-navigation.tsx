import { Link } from 'react-router-dom';
import { AppRoute } from '../../app.constants';

export function CoachProfileNavigation() {
  return (
    <div className="personal-account-coach__navigation">
      <Link
        className="thumbnail-link thumbnail-link--theme-light"
        to={AppRoute.Workouts}
      >
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <use xlinkHref="#icon-flash"></use>
          </svg>
        </div>
        <span className="thumbnail-link__text">Мои тренировки</span>
      </Link>
      <Link
        className="thumbnail-link thumbnail-link--theme-light"
        to={AppRoute.Workouts}
      >
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <use xlinkHref="#icon-add"></use>
          </svg>
        </div>
        <span className="thumbnail-link__text">Создать тренировку</span>
      </Link>
      <Link
        className="thumbnail-link thumbnail-link--theme-light"
        to={AppRoute.Friends}
      >
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <use xlinkHref="#icon-friends"></use>
          </svg>
        </div>
        <span className="thumbnail-link__text">Мои друзья</span>
      </Link>
      <Link
        className="thumbnail-link thumbnail-link--theme-light"
        to={AppRoute.Orders}
      >
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <use xlinkHref="#icon-bag"></use>
          </svg>
        </div>
        <span className="thumbnail-link__text">Мои заказы</span>
      </Link>
      <div className="personal-account-coach__calendar"></div>
    </div>
  );
}
