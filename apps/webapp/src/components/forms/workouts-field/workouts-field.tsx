import { UseFormReturn } from 'react-hook-form';
import cn from 'classnames';
import { WorkoutsButtons } from '../workouts-buttons';

type WorkoutsFieldProps = {
  form: UseFormReturn<any>;
};

export function WorkoutsField({ form }: WorkoutsFieldProps) {
  const {
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

      <WorkoutsButtons
        styleName={'questionnaire-user__specializations'}
        form={form}
      />

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
