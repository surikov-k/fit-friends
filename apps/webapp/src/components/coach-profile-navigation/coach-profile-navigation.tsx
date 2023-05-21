import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '../../app.constants';
import { ModalContext } from '../../contexts';
import { ModalCreateWorkout } from '../modals';

export function CoachProfileNavigation() {
  const { open } = useContext(ModalContext);
  const onCreateWorkoutClick = () => {
    open(<ModalCreateWorkout />);
  };

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
      <div
        className="thumbnail-link thumbnail-link--theme-light"
        onClick={onCreateWorkoutClick}
      >
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <use xlinkHref="#icon-add"></use>
          </svg>
        </div>
        <span className="thumbnail-link__text">Создать тренировку</span>
      </div>
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
