import { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  coachProfileFormOptions,
  CoachProfileFormValues,
} from './coach-profile-form-options';
import { ModalContext } from '../../../contexts';
import { Info, SkillButtons, WorkoutsField } from '../../forms';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getAuthStatus,
  saveCoachProfileAction,
} from '../../../store/user-slice';
import { AppRoute, AuthorizationStatus } from '../../../app.constants';

export function ModalCoachProfile() {
  const { close } = useContext(ModalContext);
  const form = useForm<CoachProfileFormValues>(coachProfileFormOptions);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { handleSubmit } = form;

  const authStatus = useAppSelector(getAuthStatus);

  const onSubmit: SubmitHandler<CoachProfileFormValues> = (data) => {
    dispatch(saveCoachProfileAction(data));
  };

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Coach) {
      close();
      navigate(AppRoute.Profile);
    }
  }, [close, authStatus, navigate]);

  return (
    <div className="popup-form popup-form--questionnaire-coach">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="questionnaire-coach">
                <h1 className="visually-hidden">Опросник</h1>
                <div className="questionnaire-coach__wrapper">
                  <WorkoutsField form={form} />

                  <SkillButtons form={form} />

                  <div className="questionnaire-coach__block">
                    <span className="questionnaire-coach__legend">
                      Ваши дипломы и сертификаты
                    </span>
                    <div className="drag-and-drop questionnaire-coach__drag-and-drop">
                      <label>
                        <span className="drag-and-drop__label" tabIndex={0}>
                          Загрузите сюда файлы формата PDF, JPG или PNG
                          <svg width="20" height="20" aria-hidden="true">
                            <use xlinkHref="#icon-import"></use>
                          </svg>
                        </span>
                        <input
                          type="file"
                          name="import"
                          tabIndex={-1}
                          accept=".pdf, .jpg, .png"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="questionnaire-coach__block">
                    <Info
                      title={
                        'Расскажите о своём опыте, который мы сможем проверить'
                      }
                      form={form}
                    />
                    <div className="questionnaire-coach__checkbox">
                      <label>
                        <input
                          type="checkbox"
                          {...form.register('hasPersonalTrainings')}
                        />
                        <span className="questionnaire-coach__checkbox-icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                        </span>
                        <span className="questionnaire-coach__checkbox-label">
                          Хочу дополнительно индивидуально тренировать
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  className="btn questionnaire-coach__button"
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
