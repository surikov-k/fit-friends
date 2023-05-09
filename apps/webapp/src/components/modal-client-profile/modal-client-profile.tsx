import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ModalContext } from '../../contexts';
import {
  clientProfileFormOptions,
  ClientProfileFormValues,
} from './client-profile-form-options';

import { CaloriesTargetsInputs } from './calories-targets-inputs';
import { WorkoutsButtons } from '../workout-buttons';
import { DurationButtons } from '../duration-buttons';
import { SkillButtons } from '../skill-buttons';

export function ModalClientProfile() {
  const { close } = useContext(ModalContext);
  const form = useForm<ClientProfileFormValues>(clientProfileFormOptions);

  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<ClientProfileFormValues> = (data) => {
    console.log(data);
    close();
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
                  <WorkoutsButtons form={form} />

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
