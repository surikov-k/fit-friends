import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  clientProfileFormOptions,
  ClientProfileFormValues,
} from './client-profile-form-options';

import { CaloriesTargetsInputs } from './calories-targets-inputs';
import { ModalContext } from '../../../contexts';
import { DurationButtons, SkillButtons, WorkoutsField } from '../../forms';
import { AppRoute, AuthorizationStatus } from '../../../app.constants';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getAuthStatus,
  saveClientProfileAction,
} from '../../../store/user-slice';

export function ModalClientProfile() {
  const { close } = useContext(ModalContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const form = useForm<ClientProfileFormValues>(clientProfileFormOptions);

  const { handleSubmit } = form;

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Client) {
      close();
      navigate(AppRoute.Root);
    }
  }, [close, authStatus, navigate]);

  const onSubmit: SubmitHandler<ClientProfileFormValues> = (data) => {
    dispatch(saveClientProfileAction(data));
  };

  return (
    <div className="popup-form popup-form--questionnaire-user">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="questionnaire-user">
                <h1 className="visually-hidden">Опросник</h1>
                <div className="questionnaire-user__wrapper">
                  <WorkoutsField form={form} />

                  <DurationButtons form={form} />

                  <SkillButtons form={form} />

                  <CaloriesTargetsInputs form={form} />
                </div>
                <button
                  className="btn questionnaire-user__button"
                  type="submit"
                >
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
