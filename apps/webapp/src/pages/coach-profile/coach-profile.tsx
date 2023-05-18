import { ChangeEvent, useEffect, useState } from 'react';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import cn from 'classnames';

import {
  CoachInterface,
  Gender,
  Location,
  Skill,
  UpdateProfileInterface,
} from '@fit-friends/shared-types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchUserInfo,
  getCurrentUserId,
  getIsUserLoading,
  getUserInfo,
  updateUserProfileAction,
} from '../../store/user-slice';
import { CustomSelect, WorkoutsButtons } from '../../components/forms';
import {
  FormValues,
  updateCoachProfileFormOptions,
} from './update-coach-profile-form-options';
import { APIRoute, FILES_URL } from '../../app.constants';
import { apiUpload } from '../../store';
import { Loading } from '../../components';
import { dirtyValues } from '../../utils';

export function CoachProfile() {
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector(getCurrentUserId);
  const userInfo = useAppSelector(getUserInfo);
  const isLoading = useAppSelector(getIsUserLoading);

  const form = useForm(updateCoachProfileFormOptions);
  const [currentAvatar, setCurrentAvatar] = useState('');

  const {
    register,
    formState: { errors, isDirty, dirtyFields },
    handleSubmit,
    control,
    reset,
    setValue,
  } = form;

  const {
    field: { onChange: onLocationChange },
  } = useController({ name: 'location', control });
  const {
    field: { onChange: onGenderChange },
  } = useController({ name: 'gender', control });
  const {
    field: { onChange: onSkillChange },
  } = useController({ name: 'skill', control });

  useEffect(() => {
    dispatch(fetchUserInfo(currentUserId));
  }, [currentUserId, dispatch]);

  useEffect(() => {
    if (userInfo) {
      const {
        avatar,
        name,
        hasPersonalTrainings,
        location,
        skill,
        trainings,
        gender,
        achievements,
      } = userInfo as unknown as CoachInterface;

      reset({
        avatar,
        name,
        hasPersonalTrainings,
        location,
        skill,
        trainings,
        gender,
        achievements,
      });
    }
    setCurrentAvatar(userInfo?.avatar ? userInfo.avatar : '');
  }, [reset, userInfo]);

  useEffect(() => {
    setValue('avatar', currentAvatar, { shouldDirty: true });
  }, [setValue, currentAvatar]);

  if (!userInfo) return null;

  const { location, gender, skill } = userInfo;

  const locationSelectOptions = Object.entries(Location).map(
    ([key, value]) => ({ key, value })
  );
  const genderSelectOptions = Object.entries(Gender).map(([key, value]) => ({
    key,
    value,
  }));
  const skillSelectOptions = Object.entries(Skill).map(([key, value]) => ({
    key,
    value,
  }));

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (isDirty) {
      dispatch(
        updateUserProfileAction(
          dirtyValues(dirtyFields, data) as UpdateProfileInterface
        )
      );
    }
  };

  const onAvatarInputChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }

    const formData = new FormData();
    formData.append('avatar', evt.target.files[0]);

    const { data: newAvatar } = await apiUpload.post(
      APIRoute.UploadAvatar,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    setCurrentAvatar(newAvatar.filename);
  };

  return (
    <main>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Личный кабинет</h1>

            <section className="user-info-edit">
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <div className="user-info-edit__header">
                    <div className="input-load-avatar">
                      <label>
                        <input
                          className="visually-hidden"
                          type="file"
                          accept="image/png, image/jpeg"
                          onChange={onAvatarInputChange}
                        />
                        <span className="input-load-avatar__avatar" />
                        <img
                          src={`${FILES_URL}${currentAvatar}`}
                          srcSet={`${FILES_URL}${currentAvatar} 2x`}
                          width="98"
                          height="98"
                          alt={userInfo.name}
                        />
                      </label>
                    </div>
                    <div className="user-info-edit__controls">
                      <button
                        className="user-info-edit__control-btn"
                        aria-label="обновить"
                        onClick={() => dispatch(fetchUserInfo(currentUserId))}
                      >
                        <svg width="16" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-change"></use>
                        </svg>
                      </button>
                      <button
                        className="user-info-edit__control-btn"
                        aria-label="удалить"
                      >
                        <svg width="14" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-trash"></use>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <form
                    className="user-info-edit__form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <input type="hidden" {...register('avatar')} />
                    <button
                      className="btn-flat btn-flat--underlined user-info-edit__save-button"
                      type="submit"
                      aria-label="Сохранить"
                    >
                      <svg width="12" height="12" aria-hidden="true">
                        <use xlinkHref="#icon-edit"></use>
                      </svg>
                      <span>Сохранить</span>
                    </button>
                    <div className="user-info-edit__section">
                      <h2 className="user-info-edit__title">Обо мне</h2>
                      <div
                        className={cn({
                          'custom-input--error': errors?.name,
                        })}
                      >
                        <div className="custom-input user-info-edit__input">
                          <label>
                            <span className="custom-input__label">Имя</span>
                            <span className="custom-input__wrapper">
                              <input type="text" {...register('name')} />
                            </span>
                          </label>
                        </div>
                        <div className="custom-input__error">
                          {errors.name?.message as string}
                        </div>
                      </div>
                      <div
                        className={cn({
                          'custom-input--error': errors?.achievements,
                        })}
                      >
                        <div className="custom-textarea user-info-edit__textarea">
                          <label>
                            <span className="custom-textarea__label">
                              Описание
                            </span>
                            <textarea {...register('achievements')}></textarea>
                          </label>
                        </div>
                        <div className="custom-input__error">
                          {errors.achievements?.message as string}
                        </div>
                      </div>
                    </div>
                    <div className="user-info-edit__section user-info-edit__section--status">
                      <h2 className="user-info-edit__title user-info-edit__title--status">
                        Статус
                      </h2>
                      <div className="custom-toggle custom-toggle--switch user-info-edit__toggle">
                        <label>
                          <input
                            type="checkbox"
                            {...register('hasPersonalTrainings')}
                          />
                          <span className="custom-toggle__icon">
                            <svg width="9" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-check"></use>
                            </svg>
                          </span>
                          <span className="custom-toggle__label">
                            Готов тренировать
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="user-info-edit__section">
                      <h2 className="user-info-edit__title user-info-edit__title--specialization">
                        Специализация
                      </h2>
                      <WorkoutsButtons
                        styleName={'user-info-edit__specialization'}
                        form={form}
                        selected={[]}
                      />
                    </div>
                    <CustomSelect
                      styleClass="user-info-edit__select"
                      options={locationSelectOptions}
                      onChange={onLocationChange}
                      value={location}
                      label="Локация"
                      errors={errors}
                    />

                    <CustomSelect
                      styleClass="user-info-edit__select"
                      options={genderSelectOptions}
                      onChange={onGenderChange}
                      value={gender}
                      label="Пол"
                      errors={errors}
                    />

                    <CustomSelect
                      styleClass="user-info-edit__select"
                      options={skillSelectOptions}
                      onChange={onSkillChange}
                      value={skill}
                      label="Уровень"
                      errors={errors}
                    />
                  </form>
                </>
              )}
            </section>
            <div className="inner-page__content">
              <div className="personal-account-coach">
                <div className="personal-account-coach__navigation">
                  <a
                    className="thumbnail-link thumbnail-link--theme-light"
                    href="#"
                  >
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-flash"></use>
                      </svg>
                    </div>
                    <span className="thumbnail-link__text">Мои тренировки</span>
                  </a>
                  <a
                    className="thumbnail-link thumbnail-link--theme-light"
                    href="#"
                  >
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-add"></use>
                      </svg>
                    </div>
                    <span className="thumbnail-link__text">
                      Создать тренировку
                    </span>
                  </a>
                  <a
                    className="thumbnail-link thumbnail-link--theme-light"
                    href="#"
                  >
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-friends"></use>
                      </svg>
                    </div>
                    <span className="thumbnail-link__text">Мои друзья</span>
                  </a>
                  <a
                    className="thumbnail-link thumbnail-link--theme-light"
                    href="#"
                  >
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-bag"></use>
                      </svg>
                    </div>
                    <span className="thumbnail-link__text">Мои заказы</span>
                  </a>
                  <div className="personal-account-coach__calendar"></div>
                </div>
                <div className="personal-account-coach__additional-info">
                  <div className="personal-account-coach__label-wrapper">
                    <h2 className="personal-account-coach__label">
                      Дипломы и сертификаты
                    </h2>
                    <button
                      className="btn-flat btn-flat--underlined personal-account-coach__button"
                      type="button"
                    >
                      <svg width="14" height="14" aria-hidden="true">
                        <use xlinkHref="#icon-import"></use>
                      </svg>
                      <span>Загрузить</span>
                    </button>
                    <div className="personal-account-coach__controls">
                      <button
                        className="btn-icon personal-account-coach__control"
                        type="button"
                        aria-label="previous"
                      >
                        <svg width="16" height="14" aria-hidden="true">
                          <use xlinkHref="#arrow-left"></use>
                        </svg>
                      </button>
                      <button
                        className="btn-icon personal-account-coach__control"
                        type="button"
                        aria-label="next"
                      >
                        <svg width="16" height="14" aria-hidden="true">
                          <use xlinkHref="#arrow-right"></use>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <ul className="personal-account-coach__list">
                    <li className="personal-account-coach__item">
                      <div className="certificate-card certificate-card--edit">
                        <div className="certificate-card__image">
                          <picture>
                            <source
                              type="image/webp"
                              srcSet="../../assets/img/content/certificates-and-diplomas/certificate-1.webp, ../../assets/img/content/certificates-and-diplomas/certificate-1@2x.webp 2x"
                            />
                            <img
                              src="../../assets/img/content/certificates-and-diplomas/certificate-1.jpg"
                              srcSet="../../assets/img/content/certificates-and-diplomas/certificate-1@2x.jpg 2x"
                              width="294"
                              height="360"
                              alt="Сертификат - Биомеханика ударов в боксе"
                            />
                          </picture>
                        </div>
                        <div className="certificate-card__buttons">
                          <button
                            className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
                            type="button"
                          >
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg>
                            <span>Изменить</span>
                          </button>
                          <button
                            className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                            type="button"
                          >
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg>
                            <span>Сохранить</span>
                          </button>
                          <div className="certificate-card__controls">
                            <button
                              className="btn-icon certificate-card__control"
                              type="button"
                              aria-label="next"
                            >
                              <svg width="16" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-change"></use>
                              </svg>
                            </button>
                            <button
                              className="btn-icon certificate-card__control"
                              type="button"
                              aria-label="next"
                            >
                              <svg width="14" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-trash"></use>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="personal-account-coach__item">
                      <div className="certificate-card">
                        <div className="certificate-card__image">
                          <picture>
                            <source
                              type="image/webp"
                              srcSet="../../assets/img/content/certificates-and-diplomas/certificate-2.webp, ../../assets/img/content/certificates-and-diplomas/certificate-2@2x.webp 2x"
                            />
                            <img
                              src="../../assets/img/content/certificates-and-diplomas/certificate-2.jpg"
                              srcSet="../../assets/img/content/certificates-and-diplomas/certificate-2@2x.jpg 2x"
                              width="294"
                              height="360"
                              alt="Сертификат - Организационно-методическая подготовка и проведение групповых и индивидуальных физкультурно-оздоровительных занятий"
                            />
                          </picture>
                        </div>
                        <div className="certificate-card__buttons">
                          <button
                            className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
                            type="button"
                          >
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg>
                            <span>Изменить</span>
                          </button>
                          <button
                            className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                            type="button"
                          >
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg>
                            <span>Сохранить</span>
                          </button>
                          <div className="certificate-card__controls">
                            <button
                              className="btn-icon certificate-card__control"
                              type="button"
                              aria-label="next"
                            >
                              <svg width="16" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-change"></use>
                              </svg>
                            </button>
                            <button
                              className="btn-icon certificate-card__control"
                              type="button"
                              aria-label="next"
                            >
                              <svg width="14" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-trash"></use>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="personal-account-coach__item">
                      <div className="certificate-card">
                        <div className="certificate-card__image">
                          <picture>
                            <source
                              type="image/webp"
                              srcSet="../../assets/img/content/certificates-and-diplomas/certificate-3.webp, ../../assets/img/content/certificates-and-diplomas/certificate-3@2x.webp 2x"
                            />
                            <img
                              src="../../assets/img/content/certificates-and-diplomas/certificate-3.jpg"
                              srcSet="../../assets/img/content/certificates-and-diplomas/certificate-3@2x.jpg 2x"
                              width="294"
                              height="360"
                              alt="Сертифиционный курс по кроссфиту 2-го уровня"
                            />
                          </picture>
                        </div>
                        <div className="certificate-card__buttons">
                          <button
                            className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
                            type="button"
                          >
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg>
                            <span>Изменить</span>
                          </button>
                          <button
                            className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                            type="button"
                          >
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg>
                            <span>Сохранить</span>
                          </button>
                          <div className="certificate-card__controls">
                            <button
                              className="btn-icon certificate-card__control"
                              type="button"
                              aria-label="next"
                            >
                              <svg width="16" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-change"></use>
                              </svg>
                            </button>
                            <button
                              className="btn-icon certificate-card__control"
                              type="button"
                              aria-label="next"
                            >
                              <svg width="14" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-trash"></use>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="personal-account-coach__item">
                      <div className="certificate-card">
                        <div className="certificate-card__image">
                          <picture>
                            <source
                              type="image/webp"
                              srcSet="../../assets/img/content/certificates-and-diplomas/certificate-4.webp, ../../assets/img/content/certificates-and-diplomas/certificate-4@2x.webp 2x"
                            />
                            <img
                              src="../../assets/img/content/certificates-and-diplomas/certificate-4.jpg"
                              srcSet="../../assets/img/content/certificates-and-diplomas/certificate-4@2x.jpg 2x"
                              width="294"
                              height="360"
                              alt="Сертификат инструкторов йоги"
                            />
                          </picture>
                        </div>
                        <div className="certificate-card__buttons">
                          <button
                            className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
                            type="button"
                          >
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg>
                            <span>Изменить</span>
                          </button>
                          <button
                            className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                            type="button"
                          >
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg>
                            <span>Сохранить</span>
                          </button>
                          <div className="certificate-card__controls">
                            <button
                              className="btn-icon certificate-card__control"
                              type="button"
                              aria-label="next"
                            >
                              <svg width="16" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-change"></use>
                              </svg>
                            </button>
                            <button
                              className="btn-icon certificate-card__control"
                              type="button"
                              aria-label="next"
                            >
                              <svg width="14" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-trash"></use>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="personal-account-coach__item">
                      <div className="certificate-card">
                        <div className="certificate-card__image">
                          <picture>
                            <source
                              type="image/webp"
                              srcSet="../../assets/img/content/certificates-and-diplomas/certificate-5.webp, ../../assets/img/content/certificates-and-diplomas/certificate-5@2x.webp 2x"
                            />
                            <img
                              src="../../assets/img/content/certificates-and-diplomas/certificate-5.jpg"
                              srcSet="../../assets/img/content/certificates-and-diplomas/certificate-5@2x.jpg 2x"
                              width="294"
                              height="360"
                              alt="Сертификат фитне аэробики"
                            />
                          </picture>
                        </div>
                        <div className="certificate-card__buttons">
                          <button
                            className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
                            type="button"
                          >
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg>
                            <span>Изменить</span>
                          </button>
                          <button
                            className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                            type="button"
                          >
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg>
                            <span>Сохранить</span>
                          </button>
                          <div className="certificate-card__controls">
                            <button
                              className="btn-icon certificate-card__control"
                              type="button"
                              aria-label="next"
                            >
                              <svg width="16" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-change"></use>
                              </svg>
                            </button>
                            <button
                              className="btn-icon certificate-card__control"
                              type="button"
                              aria-label="next"
                            >
                              <svg width="14" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-trash"></use>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="personal-account-coach__item">
                      <div className="certificate-card">
                        <div className="certificate-card__image">
                          <picture>
                            <source
                              type="image/webp"
                              srcSet="../../assets/img/content/certificates-and-diplomas/certificate-6.webp, ../../assets/img/content/certificates-and-diplomas/certificate-6@2x.webp 2x"
                            />
                            <img
                              src="../../assets/img/content/certificates-and-diplomas/certificate-6.jpg"
                              srcSet="../../assets/img/content/certificates-and-diplomas/certificate-6@2x.jpg 2x"
                              width="294"
                              height="360"
                              alt="Сертификат фитне аэробики"
                            />
                          </picture>
                        </div>
                        <div className="certificate-card__buttons">
                          <button
                            className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
                            type="button"
                          >
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg>
                            <span>Изменить</span>
                          </button>
                          <button
                            className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                            type="button"
                          >
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg>
                            <span>Сохранить</span>
                          </button>
                          <div className="certificate-card__controls">
                            <button
                              className="btn-icon certificate-card__control"
                              type="button"
                              aria-label="next"
                            >
                              <svg width="16" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-change"></use>
                              </svg>
                            </button>
                            <button
                              className="btn-icon certificate-card__control"
                              type="button"
                              aria-label="next"
                            >
                              <svg width="14" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-trash"></use>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
