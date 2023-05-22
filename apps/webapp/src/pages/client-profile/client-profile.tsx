import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getCurrentUserId,
  getUserInfo,
  fetchUserInfo,
} from '../../store/user-slice';
import { CaloriesTargets, ClientProgress, UserInfo } from '../../components';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../app.constants';

export function ClientProfile() {
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector(getCurrentUserId);
  const userInfo = useAppSelector(getUserInfo);

  useEffect(() => {
    dispatch(fetchUserInfo(currentUserId));
  }, [currentUserId, dispatch]);
  if (!userInfo) return null;

  const { caloriesPerDay = 0 } = userInfo;
  return (
    <main>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Личный кабинет</h1>
            <UserInfo userInfo={userInfo} />
            <div className="inner-page__content">
              <div className="personal-account-user">
                <CaloriesTargets caloriesPerDay={caloriesPerDay} />
                <div className="personal-account-user__info">
                  <Link
                    className="thumbnail-link thumbnail-link--theme-dark"
                    to={AppRoute.WorkoutsLog}
                  >
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-dark">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-ranking"></use>
                      </svg>
                    </div>
                    <span className="thumbnail-link__text">
                      Дневник тренировок
                    </span>
                  </Link>
                  <Link
                    className="thumbnail-link thumbnail-link--theme-dark"
                    to={AppRoute.NutritionLog}
                  >
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-dark">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-book"></use>
                      </svg>
                    </div>
                    <span className="thumbnail-link__text">
                      Дневник питания
                    </span>
                  </Link>
                  <ClientProgress />
                  <div className="personal-account-user__diagram"></div>
                </div>
                <div className="personal-account-user__additional-info">
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
                    to={AppRoute.UserGyms}
                  >
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-weight"></use>
                      </svg>
                    </div>
                    <span className="thumbnail-link__text">Мои залы</span>
                  </Link>
                  <Link
                    className="thumbnail-link thumbnail-link--theme-light personal-account-user__shop"
                    to={AppRoute.UserPurchases}
                  >
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-shopping-cart"></use>
                      </svg>
                    </div>
                    <span className="thumbnail-link__text">Мои покупки</span>
                  </Link>
                  <div className="personal-account-user__calendar"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
