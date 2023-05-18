import cn from 'classnames';
import { UseFormReturn } from 'react-hook-form';
import { ChangeEvent, useEffect, useState } from 'react';

import { FormValues } from '../../modals/modal-register/register-form-options';
import { APIRoute, FILES_URL } from '../../../app.constants';
import { apiUpload } from '../../../store';

type UploadAvatarProps = {
  form: UseFormReturn<FormValues>;
};

export function UploadAvatar({ form }: UploadAvatarProps) {
  const [avatar, setAvatar] = useState('');

  const {
    register,
    formState: { errors },
    setValue,
  } = form;

  useEffect(() => {
    setValue('avatar', avatar ? avatar : '');
  }, [avatar, setValue]);

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
    setAvatar(newAvatar.filename);
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
              onChange: onAvatarInputChange,
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
          'custom-input--error': errors?.upload,
        })}
      >
        <h2 className="sign-up__legend">Загрузите фото профиля</h2>
        <span className="sign-up__text">
          JPG, PNG, оптимальный размер 100&times;100&nbsp;px
        </span>
        <span className="custom-input__error">{errors.upload?.message}</span>
      </div>
    </div>
  );
}
