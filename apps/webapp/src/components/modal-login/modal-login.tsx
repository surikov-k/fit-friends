import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import cn from 'classnames';

import { ModalContext } from '../../contexts';
import { FormValues, loginFormOptions } from './login-form-options';

export function ModalLogin() {
  const { close } = useContext(ModalContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>(loginFormOptions);

  const submitHandler: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    close();
  };

  return (
    <div className="popup-form popup-form--sign-in">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__title-wrapper">
            <h1 className="popup-form__title">Вход</h1>
          </div>
          <div className="popup-form__form">
            <form method="post" onSubmit={handleSubmit(submitHandler)}>
              <div className="sign-in">
                <div
                  className={cn('custom-input sign-in__input', {
                    'custom-input--error': errors?.email,
                  })}
                >
                  <label>
                    <span className="custom-input__label">E-mail</span>
                    <span className="custom-input__wrapper">
                      <input {...register('email')} />
                    </span>
                    <span className="custom-input__error">
                      {errors?.email?.message}
                    </span>
                  </label>
                </div>
                <div
                  className={cn('custom-input sign-in__input', {
                    'custom-input--error': errors?.password,
                  })}
                >
                  <label>
                    <span className="custom-input__label">Пароль</span>
                    <span className="custom-input__wrapper">
                      <input {...register('password')} type="password" />
                    </span>
                    <span className="custom-input__error">
                      {errors.password?.message}
                    </span>
                  </label>
                </div>
                <button className="btn sign-in__button" type="submit">
                  Продолжить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
