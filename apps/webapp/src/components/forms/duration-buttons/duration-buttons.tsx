import { UseFormReturn } from 'react-hook-form';
import { TimeSpan } from '@fit-friends/shared-types';
import cn from 'classnames';

import { ClientProfileFormValues } from '../../modals';

type DurationButtonsProps = {
  form: UseFormReturn<ClientProfileFormValues>;
};

export function DurationButtons({ form }: DurationButtonsProps) {
  const durations = {
    [TimeSpan.Short]: '10-30 мин',
    [TimeSpan.Normal]: '30-50 мин',
    [TimeSpan.Long]: '50-80 мин',
    [TimeSpan.Longest]: 'больше 80 мин',
  };
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <div
      className={cn('questionnaire-user__block', {
        'custom-input--error': errors?.duration,
      })}
      style={{ position: 'relative' }}
    >
      <span className="questionnaire-user__legend">
        Сколько времени вы готовы уделять на тренировку в день
      </span>

      <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
        {Object.entries(durations).map((duration) => {
          const [value, label] = duration;

          return (
            <div key={value} className="custom-toggle-radio__block">
              <label>
                <input type="radio" value={value} {...register('duration')} />
                <span className="custom-toggle-radio__icon"></span>
                <span className="custom-toggle-radio__label"> {label}</span>
              </label>
            </div>
          );
        })}
      </div>

      <div className="custom-input__error" style={{ position: 'absolute' }}>
        {errors.duration?.message}
      </div>
    </div>
  );
}
