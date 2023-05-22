import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchUserInfo,
  getCurrentUserId,
  getUserInfo,
} from '../../store/user-slice';
import {
  CoachCertificates,
  CoachProfileNavigation,

  UserInfo,
} from '../../components';

export function CoachProfile() {
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector(getCurrentUserId);
  const userInfo = useAppSelector(getUserInfo);


  useEffect(() => {
    dispatch(fetchUserInfo(currentUserId));
  }, [currentUserId, dispatch]);


  if (!userInfo) return null;

  const { certificates, } = userInfo;


  return (
    <main>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Личный кабинет</h1>

            <UserInfo userInfo={userInfo}/>
            <div className="inner-page__content">
              <div className="personal-account-coach">
                <CoachProfileNavigation />
                <CoachCertificates certificates={certificates} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
