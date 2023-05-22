import { ChangeEvent, useEffect, useState } from 'react';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import cn from 'classnames';

import {
  CoachInterface,
  Gender,
  Skill,
  UpdateProfileInterface,
  UserInterface,
} from '@fit-friends/shared-types';
import { Loading } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchUserInfo,
  getCurrentUserId,
  getIsUserLoading,
  updateUserProfileAction,
} from '../../store/user-slice';
import { APIRoute, FILES_URL } from '../../app.constants';
import { WorkoutsButtons, CustomSelect } from '../forms';
import { apiUpload } from '../../store';
import { dirtyValues } from '../../utils';
import {
  FormValues,
  updateUserInfoFormOptions,
} from './update-user-info-form-options';

type UserInfoProps = {
  userInfo: UserInterface;
};

export function UserInfo({ userInfo }: UserInfoProps) {
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector(getCurrentUserId);
  const isLoading = useAppSelector(getIsUserLoading);
  const [currentAvatar, setCurrentAvatar] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm(updateUserInfoFormOptions);

  const {
    register,
    formState: { errors, isDirty, dirtyFields },
    handleSubmit,
    control,
    reset,
    setValue,
  } = form;

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

      setCurrentAvatar(avatar);
    }
  }, [reset, userInfo]);

  useEffect(() => {
    setValue('avatar', currentAvatar, { shouldDirty: true });
  }, [setValue, currentAvatar]);

  const {
    field: { onChange: onLocationChange },
  } = useController({ name: 'location', control });
  const {
    field: { onChange: onGenderChange },
  } = useController({ name: 'gender', control });
  const {
    field: { onChange: onSkillChange },
  } = useController({ name: 'skill', control });

  if (!userInfo) return null;

  const { gender, location, skill } = userInfo;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (isDirty) {
      dispatch(
        updateUserProfileAction(
          dirtyValues(dirtyFields, data) as UpdateProfileInterface
        )
      );
    }
    setIsEditing(false);
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

  return (
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
                  disabled={!isEditing}
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
                <svg
                  width="16"
                  height="16"
                  aria-hidden="true"
                  style={{
                    animation: 'rotation 2s infinite linear',
                  }}
                >
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

            {isEditing ? (
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
            ) : (
              <button
                className="btn-flat btn-flat--underlined user-info-edit__save-button"
                type="button"
                aria-label="Изменить"
                onClick={(evt) => {
                  evt.preventDefault();
                  setIsEditing(true);
                }}
              >
                <svg width="12" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-edit"></use>
                </svg>
                <span>Изменить</span>
              </button>
            )}

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
                      <input
                        type="text"
                        readOnly={!isEditing}
                        {...register('name')}
                      />
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
                    <span className="custom-textarea__label">Описание</span>
                    <textarea
                      readOnly={!isEditing}
                      {...register('achievements')}
                    ></textarea>
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
                    disabled={!isEditing}
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
                disabled={!isEditing}
                styleName={'user-info-edit__specialization'}
                form={form}
                selected={[]}
              />
            </div>
            <CustomSelect
              styleClass="user-info-edit__select"
              disabled={!isEditing}
              options={locationSelectOptions}
              onChange={onLocationChange}
              value={location}
              label="Локация"
              errors={errors}
            />

            <CustomSelect
              styleClass="user-info-edit__select"
              disabled={!isEditing}
              options={genderSelectOptions}
              onChange={onGenderChange}
              value={gender}
              label="Пол"
              errors={errors}
            />

            <CustomSelect
              styleClass="user-info-edit__select"
              disabled={!isEditing}
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
  );
}
