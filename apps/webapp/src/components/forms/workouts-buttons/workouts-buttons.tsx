import { WorkoutType } from '@fit-friends/shared-types';
import { UseFormReturn } from 'react-hook-form';
import cn from 'classnames';

type WorkoutsButtonsProps = {
  styleName: string;
  form: UseFormReturn<Record<string, unknown>>;
  selected?: string[];
};

export function WorkoutsButtons({
  styleName,
  form,
  selected = [],
}: WorkoutsButtonsProps) {
  const workouts = Object.entries(WorkoutType);
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div
      className={cn({
        'custom-input--error': errors?.trainings,
      })}
    >
      <div className={`specialization-checkbox ${styleName}`}>
        {workouts.map((entry) => {
          const [key, value] = entry;
          return (
            <div key={key} className="btn-checkbox">
              <label>
                <input
                  className="visually-hidden"
                  type="checkbox"
                  value={key}
                  defaultChecked={!!selected.find((v) => v === value)}
                  {...register(`trainings`)}
                />
                <span className="btn-checkbox__btn">{value}</span>
              </label>
            </div>
          );
        })}
      </div>
      <span className="custom-input__error">{errors.trainings?.message}</span>
    </div>
  );
}
