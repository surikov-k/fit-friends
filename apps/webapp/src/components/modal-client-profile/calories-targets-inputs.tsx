import { UseFormReturn } from 'react-hook-form';
import { ClientProfileFormValues } from './client-profile-form-options';
import cn from 'classnames';

type CaloriesTargetsInputsProps = {
  form: UseFormReturn<ClientProfileFormValues>;
};

export function CaloriesTargetsInputs({ form }: CaloriesTargetsInputsProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="questionnaire-user__block">
      <div
        className={cn({
          'custom-input--error': errors?.caloriesTarget,
        })}
        style={{ position: 'relative' }}
      >
        <div className="questionnaire-user__calories-lose">
          <span className="questionnaire-user__legend">
            Сколько калорий хотите сбросить
          </span>
          <div className="custom-input custom-input--with-text-right questionnaire-user__input">
            <label>
              <span className="custom-input__wrapper">
                <input type="number" {...register('caloriesTarget')} />
                <span className="custom-input__text">ккал</span>
              </span>
            </label>
          </div>
        </div>
        <div
          className="custom-input__error"
          style={{ position: 'absolute', bottom: '-7px' }}
        >
          {errors.caloriesTarget?.message}
        </div>
      </div>
      <div
        className={cn({
          'custom-input--error': errors?.caloriesPerDay,
        })}
        style={{ position: 'relative' }}
      >
        <div className="questionnaire-user__calories-waste">
          <span className="questionnaire-user__legend">
            Сколько калорий тратить в день
          </span>
          <div className="custom-input custom-input--with-text-right questionnaire-user__input">
            <label>
              <span className="custom-input__wrapper">
                <input type="number" {...register('caloriesPerDay')} />
                <span className="custom-input__text">ккал</span>
              </span>
            </label>
          </div>
        </div>
        <div
          className="custom-input__error"
          style={{ position: 'absolute', bottom: '-7px' }}
        >
          {errors.caloriesPerDay?.message}
        </div>
      </div>
    </div>
  );
}
