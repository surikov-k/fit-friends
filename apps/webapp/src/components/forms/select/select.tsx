import { useState } from 'react';
import cn from 'classnames';
import { FieldErrors } from 'react-hook-form';

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  options: SelectOption[];
  onChange: (value: string) => void;
  value?: SelectOption;
  label?: string;
  errors: FieldErrors;
};

export function Select({
  label,
  options,
  value,
  onChange,
  errors,
}: SelectProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [selected, setSelected] = useState<SelectOption>(
    value || {
      label: '',
      value: '',
    }
  );
  return (
    <div
      className={cn('custom-select custom-select--not-selected', {
        'not-empty': selected.value,
        'is-open': isOpened,
        'custom-input--error': errors?.location,
      })}
    >
      <span className="custom-select__label">{label}</span>
      <button
        onClick={() => setIsOpened(!isOpened)}
        className="custom-select__button"
        type="button"
        aria-label="Выберите одну из опций"
      >
        <span className="custom-select__text" style={{ fontSize: 'inherit' }}>
          {selected.label}
        </span>
        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </span>
      </button>
      <ul
        className="custom-select__list"
        onMouseLeave={() => setIsOpened(false)}
        role="listbox"
      >
        {options.map((option) => (
          <li
            key={option.value}
            className="custom-select__item"
            onClick={() => {
              setSelected(option);
              setIsOpened(false);
              onChange(option.value);
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
      <div className="custom-input__error">
        {errors?.location?.message as string}
      </div>
    </div>
  );
}
