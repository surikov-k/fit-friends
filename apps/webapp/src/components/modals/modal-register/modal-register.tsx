import { useContext, useEffect } from 'react';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import cn from 'classnames';

import { Gender, Location, UserRole } from '@fit-friends/shared-types';
import { FormValues, registerFormOptions } from './register-form-options';
import { ModalContext } from '../../../contexts';
import { Select, UploadAvatar } from '../../forms';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getAuthError,
  getRegistrationStatus,
  registerUserAction,
} from '../../../store/user-slice';
import { ModalCoachProfile } from '../modal-coach-profile';
import { ModalClientProfile } from '../modal-client-profile';

export function ModalRegister() {
  const { open, close } = useContext(ModalContext);
  const form = useForm<FormValues>(registerFormOptions);
  const dispatch = useAppDispatch();
  const authError = useAppSelector(getAuthError);
  const registrationStatus = useAppSelector(getRegistrationStatus);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = form;

  const {
    field: { onChange: onLocationChange },
  } = useController({ name: 'location', control });

  const submit: SubmitHandler<FormValues> = (data) => {
    dispatch(registerUserAction(data));
  };

  useEffect(() => {
    if (registrationStatus === UserRole.Client) {
      close();
      open(<ModalClientProfile />);
    }
    if (registrationStatus === UserRole.Coach) {
      close();
      open(<ModalCoachProfile />);
    }
  }, [registrationStatus, close, open]);

  const locationOptions = Object.entries(Location).map(([key, value]) => ({
    key,
    value,
  }));

  return (
    <div className="popup-form popup-form--sign-up">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__title-wrapper">
            <h1 className="popup-form__title">Регистрация</h1>
          </div>
          <div className="popup-form__form">
            <form onSubmit={handleSubmit(submit)}>
              <div className="sign-up">
                <UploadAvatar form={form} />
                <div className="sign-up__data">
                  <div
                    className={cn('custom-input', {
                      'custom-input--error': errors?.name,
                    })}
                  >
                    <label>
                      <span className="custom-input__label">Имя</span>
                      <span className="custom-input__wrapper">
                        <input type="text" {...register('name')} />
                      </span>
                      <span className="custom-input__error">
                        {errors.name?.message}
                      </span>
                    </label>
                  </div>
                  <div
                    className={cn('custom-input', {
                      'custom-input--error': errors?.email,
                    })}
                  >
                    <label>
                      <span className="custom-input__label">E-mail</span>
                      <span className="custom-input__wrapper">
                        <input {...register('email')} />
                      </span>
                      <span className="custom-input__error">
                        {errors.email?.message}
                      </span>
                    </label>
                  </div>
                  <div
                    className={cn('custom-input', {
                      'custom-input--error': errors?.birthday,
                    })}
                  >
                    <label>
                      <span className="custom-input__label">Дата рождения</span>
                      <span className="custom-input__wrapper">
                        <input type="date" {...register('birthday')} />
                      </span>
                      <span className="custom-input__error">
                        {errors.birthday?.message}
                      </span>
                    </label>
                  </div>
                  <Select
                    label="Ваша локация"
                    options={locationOptions}
                    onChange={onLocationChange}
                    errors={errors}
                  />
                  <div
                    className={cn('custom-input', {
                      'custom-input--error': errors?.password,
                    })}
                  >
                    <label>
                      <span className="custom-input__label">Пароль</span>
                      <span className="custom-input__wrapper">
                        <input
                          type="password"
                          {...register('password')}
                          autoComplete="off"
                        />
                      </span>
                      <span className="custom-input__error">
                        {errors.password?.message}
                      </span>
                    </label>
                  </div>
                  <div
                    className={cn('sign-up__radio', {
                      'custom-input--error': errors?.gender,
                    })}
                  >
                    <span className="sign-up__label">Пол</span>
                    <div className="custom-toggle-radio custom-toggle-radio--big">
                      <div className="custom-toggle-radio__block">
                        <label>
                          <input
                            type="radio"
                            {...register('gender')}
                            value={Gender.Male}
                          />
                          <span className="custom-toggle-radio__icon"></span>
                          <span className="custom-toggle-radio__label">
                            Мужской
                          </span>
                        </label>
                      </div>
                      <div className="custom-toggle-radio__block">
                        <label>
                          <input
                            type="radio"
                            {...register('gender')}
                            value={Gender.Female}
                          />
                          <span className="custom-toggle-radio__icon"></span>
                          <span className="custom-toggle-radio__label">
                            Женский
                          </span>
                        </label>
                      </div>
                      <div className="custom-toggle-radio__block">
                        <label>
                          <input
                            type="radio"
                            {...register('gender')}
                            value={Gender.Common}
                          />
                          <span className="custom-toggle-radio__icon"></span>
                          <span className="custom-toggle-radio__label">
                            Неважно
                          </span>
                        </label>
                      </div>
                    </div>{' '}
                    <div className="custom-input__error">
                      {errors.gender?.message}
                    </div>
                  </div>
                </div>
                <div className="sign-up__role">
                  <h2 className="sign-up__legend">Выберите роль</h2>
                  <div className="role-selector sign-up__role-selector">
                    <div className="role-btn">
                      <label>
                        <input
                          className="visually-hidden"
                          type="radio"
                          value="Coach"
                          defaultChecked={true}
                          {...register('role')}
                        />
                        <span className="role-btn__icon">
                          <svg width="12" height="13" aria-hidden="true">
                            <use xlinkHref="#icon-cup"></use>
                          </svg>
                        </span>
                        <span className="role-btn__btn">
                          Я хочу тренировать
                        </span>
                      </label>
                    </div>
                    <div className="role-btn">
                      <label>
                        <input
                          className="visually-hidden"
                          type="radio"
                          value="Client"
                          {...register('role')}
                        />
                        <span className="role-btn__icon">
                          <svg width="12" height="13" aria-hidden="true">
                            <use xlinkHref="#icon-weight" />
                          </svg>
                        </span>
                        <span className="role-btn__btn">
                          Я хочу тренироваться
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div
                  className={cn('sign-up__checkbox', {
                    'custom-input--error': errors?.agreement,
                  })}
                >
                  <label>
                    <input
                      type="checkbox"
                      {...register('agreement')}
                      defaultChecked={true}
                    />
                    <span className="sign-up__checkbox-icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg>
                    </span>
                    <span className="sign-up__checkbox-label">
                      Я соглашаюсь с <span>политикой конфиденциальности</span>{' '}
                      компании
                    </span>
                    <div className="custom-input__error">
                      {errors.agreement?.message}
                    </div>
                  </label>
                </div>
                <button className="btn sign-up__button" type="submit">
                  Продолжить
                </button>
                <div
                  className="custom-input custom-input--error"
                  style={{ justifyContent: 'center' }}
                >
                  <span className="custom-input__error">{authError}</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
