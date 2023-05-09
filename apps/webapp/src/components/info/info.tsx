import { UseFormReturn } from 'react-hook-form';
import cn from 'classnames';

type InfoProps = {
  form: UseFormReturn<any>;
  title: string;
};

export function Info({ form, title = 'Info' }: InfoProps) {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <>
      <span className="questionnaire-coach__legend">{title}</span>
      <div
        className={cn('custom-textarea questionnaire-coach__textarea', {
          'custom-input--error': errors?.achievements,
        })}
        style={{ position: 'relative' }}
      >
        <label>
          <textarea {...register('achievements')}></textarea>
        </label>
        <div
          className="custom-input__error"
          style={{ position: 'absolute', bottom: '-22px' }}
        >
          {errors.achievements?.message as string}
        </div>
      </div>
    </>
  );
}
