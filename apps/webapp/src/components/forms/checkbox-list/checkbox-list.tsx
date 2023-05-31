import { UseFormReturn } from 'react-hook-form';
import { WorkoutType } from '@fit-friends/shared-types';
import { Checkbox } from '../checkbox';

type CheckboxListProps = {
  form: UseFormReturn<Record<string, unknown>>;
  values: string[];
  disabled?: boolean;
};

export function CheckboxList({
  form,
  values,
  disabled = false,
}: CheckboxListProps) {
  const workouts = Object.entries(WorkoutType);

  return (
    <div className="gym-catalog-form__block gym-catalog-form__block--type">
      <h4 className="gym-catalog-form__block-title">Тип</h4>
      <ul className="gym-catalog-form__check-list">
        {workouts.map(([key, value]) => (
          <li key={key} className="gym-catalog-form__check-list-item">
            <Checkbox
              label={value}
              value={key}
              checked={!!values.find((v) => v === value)}
              form={form}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
