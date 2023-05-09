import { WorkoutType } from '@fit-friends/shared-types';
import { UseFormReturn } from 'react-hook-form';
import cn from 'classnames';

type WorkoutsButtonsProps = {
  form: UseFormReturn<any>;
};

export function WorkoutsButtons({ form }: WorkoutsButtonsProps) {
  const workouts = Object.entries(WorkoutType);
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <div
      className={cn('questionnaire-user__block', {
        'custom-input--error': errors?.trainings,
      })}
      style={{ position: 'relative' }}
    >
      <span className="questionnaire-user__legend">
        Ваша специализация (тип) тренировок
      </span>

      <div className="specialization-checkbox questionnaire-user__specializations">
        {workouts.map((workout) => {
          const [key, value] = workout;
          return (
            <div key={key} className="btn-checkbox">
              <label>
                <input
                  className="visually-hidden"
                  type="checkbox"
                  value={key}
                  {...register('trainings')}
                />
                <span className="btn-checkbox__btn">{value}</span>
              </label>
            </div>
          );
        })}
      </div>

      <div className="custom-input__error" style={{ position: 'absolute' }}>
        {errors.trainings?.message as string}
      </div>
    </div>
  );
}

/*
Йога
Бег
Силовые
Аэробика
Кроссфит
Бокс
Пилатес
Стрейчинг*/
