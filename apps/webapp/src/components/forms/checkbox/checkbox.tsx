import { UseFormReturn } from 'react-hook-form';

type CheckboxProps = {
  value: string;
  label: string;
  disabled?: boolean;
  checked: boolean;
  form: UseFormReturn<Record<string, unknown>>;
};
export function Checkbox({
  value,
  label,
  disabled = false,
  checked = false,
  form,
}: CheckboxProps) {
  const { register } = form;
  return (
    <div className="custom-toggle custom-toggle--checkbox">
      <label>
        <input
          type="checkbox"
          value={value}
          defaultChecked={checked}
          {...register('type')}
        />
        <span className="custom-toggle__icon">
          <svg width={9} height={6} aria-hidden="true">
            <use xlinkHref="#arrow-check" />
          </svg>
        </span>
        <span className="custom-toggle__label">{label}</span>
      </label>
    </div>
  );
}
