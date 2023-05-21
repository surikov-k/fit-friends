import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import cn from 'classnames';

import { Gender, TimeSpan, WorkoutType } from '@fit-friends/shared-types';
import { ModalContext } from '../../../contexts';
import { CustomSelect } from '../../forms';
import {
  createWorkoutOptions,
  FormValues,
} from './create-workout-form-options';
import { APIRoute } from '../../../app.constants';
import { apiUpload } from '../../../store';

export function ModalCreateWorkout() {
  const [video, setVideo] = useState('');
  const form = useForm<FormValues>(createWorkoutOptions);
  const { close } = useContext(ModalContext);
  const onSubmit = (d: FormValues) => {
    console.log(d);
    close();
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = form;

  useEffect(() => {
    setValue('video', video ? video : '');
  }, [setValue, video]);

  const workoutTypeOptions = Object.entries(WorkoutType).map(
    ([key, value]) => ({ key, value })
  );

  const durationOptions = Object.entries(TimeSpan).map(([key, value]) => ({
    key,
    value,
  }));

  const {
    field: { onChange: onWorkoutTypeChange },
  } = useController({ name: 'type', control });

  const {
    field: { onChange: onDurationChange },
  } = useController({ name: 'duration', control });

  const onVideoUploadChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    console.log(evt.target.files[0]);
    const formData = new FormData();
    formData.append('videofile', evt.target.files[0]);
    const { data: uploadedVideo } = await apiUpload.post(
      APIRoute.UploadVideo,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    setVideo(uploadedVideo.filename);
  };

  return (
    <div
      className="popup-form popup-form--create-training"
      style={{ position: 'fixed' }}
    >
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__title-wrapper">
            <h1 className="popup-form__title">Создание тренировки</h1>
          </div>
          <div className="popup-form__form">
            <form onSubmit={handleSubmit(onSubmit, (d) => console.log(d))}>
              <div className="create-training">
                <div className="create-training__wrapper">
                  <div className="create-training__block">
                    <h2 className="create-training__legend">
                      Название тренировки
                    </h2>
                    <div
                      className={cn('custom-input create-training__input', {
                        'custom-input--error': errors?.title,
                      })}
                    >
                      <label>
                        <span className="custom-input__wrapper">
                          <input type="text" {...register('title')} />
                        </span>
                        <span className="custom-input__error">
                          {errors.title?.message}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="create-training__block">
                    <h2 className="create-training__legend">
                      Характеристики тренировки
                    </h2>
                    <div className="create-training__info">
                      <CustomSelect
                        styleClass={'custom-select custom-select--not-selected'}
                        label={'Выберите тип тренировки'}
                        options={workoutTypeOptions}
                        onChange={onWorkoutTypeChange}
                        errors={errors}
                        name="type"
                      />

                      <div
                        className={cn(
                          'custom-input custom-input--with-text-right',
                          {
                            'custom-input--error': errors?.calories,
                          }
                        )}
                      >
                        <label>
                          <span className="custom-input__label">
                            Сколько калорий потратим
                          </span>
                          <span className="custom-input__wrapper">
                            <input type="number" {...register('calories')} />
                            <span className="custom-input__text">ккал</span>
                          </span>
                          <span className="custom-input__error">
                            {errors.calories?.message}
                          </span>
                        </label>
                      </div>

                      <CustomSelect
                        styleClass={'custom-select custom-select--not-selected'}
                        label={'Сколько времени потратим'}
                        options={durationOptions}
                        onChange={onDurationChange}
                        errors={errors}
                        name="duration"
                      />
                      <div
                        className={cn(
                          'custom-input custom-input--with-text-right',
                          {
                            'custom-input--error': errors?.title,
                          }
                        )}
                      >
                        <label>
                          <span className="custom-input__label">
                            Стоимость тренировки
                          </span>
                          <span className="custom-input__wrapper">
                            <input type="number" {...register('price')} />
                            <span className="custom-input__text">₽</span>
                          </span>{' '}
                          <span className="custom-input__error">
                            {errors.price?.message}
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="create-training__radio-wrapper">
                      <span className="create-training__label">
                        Кому подойдет тренировка
                      </span>
                      <div
                        className={cn(
                          'custom-toggle-radio create-training__radio',
                          {
                            'custom-input--error': errors?.gender,
                          }
                        )}
                      >
                        <div className="custom-toggle-radio__block">
                          <label>
                            <input
                              type="radio"
                              {...register('gender')}
                              value={Gender.Male}
                            />
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">
                              Мужчинам
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
                              Женщинам
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
                              Всем
                            </span>
                          </label>
                        </div>
                        <div className="custom-input__error">
                          {errors.gender?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="create-training__block">
                    <h2 className="create-training__legend">
                      Описание тренировки
                    </h2>
                    <div
                      className={cn(
                        'custom-textarea create-training__textarea',
                        {
                          'custom-input--error': errors?.description,
                        }
                      )}
                    >
                      <label>
                        <textarea {...register('description')}></textarea>
                        <span className="custom-input__error">
                          {errors.description?.message}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="create-training__block">
                    <h2 className="create-training__legend">
                      Загрузите видео-тренировку
                    </h2>

                    <div
                      className={cn(
                        'drag-and-drop create-training__drag-and-drop',
                        {
                          'custom-input--error': errors?.video,
                        }
                      )}
                    >
                      <label>
                        <span className="drag-and-drop__label" tabIndex={0}>
                          {video
                            ? video
                            : 'Загрузите сюда файлы формата MOV, AVI или MP4'}
                          <svg width="20" height="20" aria-hidden="true">
                            <use xlinkHref="#icon-import-video"></use>
                          </svg>
                        </span>
                        <input
                          type="file"
                          name={'videofile'}
                          tabIndex={-1}
                          accept=".mov, .avi, .mp4"
                          onChange={onVideoUploadChange}
                        />
                        <span className="custom-input__error">
                          {errors.video?.message}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <button className="btn create-training__button" type="submit">
                  Опубликовать
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
