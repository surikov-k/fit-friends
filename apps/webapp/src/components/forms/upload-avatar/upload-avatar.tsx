import cn from 'classnames';
import { UseFormReturn } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { FormValues } from '../../modals/modal-register/register-form-options';

type UploadAvatarProps = {
  form: UseFormReturn<FormValues>;
};

export function UploadAvatar({ form }: UploadAvatarProps) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const image = useRef('');
  const upload = watch('upload');

  useEffect(() => {
    if (upload?.length) {
      image.current = URL.createObjectURL(upload[0]);
      setValue('avatar', image.current, { shouldValidate: true });
    }
  }, [upload, setValue]);

  return (
    <div className="sign-up__load-photo">
      <div className="input-load-avatar">
        <label>
          <input
            className="visually-hidden"
            type="file"
            accept="image/png, image/jpeg"
            {...register('upload')}
          />
          <span
            className="input-load-avatar__btn"
            style={{
              backgroundImage: `url(${image.current})`,
              backgroundSize: 'cover',
            }}
          >
            {!image.current && (
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
