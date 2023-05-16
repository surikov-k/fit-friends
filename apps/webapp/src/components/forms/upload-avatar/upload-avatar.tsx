import cn from 'classnames';
import { UseFormReturn } from 'react-hook-form';
import { ChangeEvent, useEffect } from 'react';

import { FormValues } from '../../modals/modal-register/register-form-options';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getUserAvatar, uploadAvatarAction } from '../../../store/user-slice';
import { FILES_URL } from '../../../app.constants';

type UploadAvatarProps = {
  form: UseFormReturn<FormValues>;
};

export function UploadAvatar({ form }: UploadAvatarProps) {
  const dispatch = useAppDispatch();
  const avatar = useAppSelector(getUserAvatar);

  const {
    register,
    formState: { errors },
    setValue,
  } = form;

  useEffect(() => {
    setValue('avatar', avatar ? avatar : '', { shouldValidate: true });
  }, [avatar, setValue]);

  const avatarInputChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) return;

    const formData = new FormData();
    formData.append('avatar', evt.target.files[0]);
    dispatch(uploadAvatarAction(formData));
  };

  return (
    <div className="sign-up__load-photo">
      <div className="input-load-avatar">
        <label>
          <input
            className="visually-hidden"
            type="file"
            accept="image/png, image/jpeg"
            {...register('upload', {
              onChange: avatarInputChangeHandler,
            })}
          />
          <span
            className="input-load-avatar__btn"
            style={{
              backgroundImage: `url(${avatar ? FILES_URL + avatar : ''})`,
              backgroundSize: 'cover',
            }}
          >
            {!avatar && (
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-import"></use>
              </svg>
            )}
          </span>
        </label>
      </div>
      <input type="hidden" {...register('avatar')} />
      <div
        className={cn('sign-up__description', {
          'custom-input--error': errors?.upload || errors?.avatar,
        })}
      >
        <h2 className="sign-up__legend">Загрузите фото профиля</h2>
        <span className="sign-up__text">
          JPG, PNG, оптимальный размер 100&times;100&nbsp;px
        </span>
        <span className="custom-input__error">
          {errors.upload?.message}
          {errors.avatar?.message}
        </span>
      </div>
    </div>
  );
}
