import { useState } from 'react';
import cn from 'classnames';
import { FieldErrors } from 'react-hook-form';

type SelectOption = {
  key: string;
  value: string;
};

type SelectProps = {
  options: SelectOption[];
  onChange: (value: string) => void;
  value?: SelectOption;
  label?: string;
  errors: FieldErrors;
  name: string;
};

export function Select({
  label,
  options,
  value,
  onChange,
  errors,
  name,
}: SelectProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [selected, setSelected] = useState<SelectOption>(
    value || {
      key: '',
      value: '',
    }
  );
  return (
    <div
      className={cn('custom-select custom-select--not-selected ', {
        'not-empty': selected.value,
        'is-open': isOpened,
        'custom-input--error': errors?.[name],
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
          {selected.value}
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
            key={option.key}
            className="custom-select__item"
            onClick={() => {
              setSelected(option);
              setIsOpened(false);
              onChange(option.value);
            }}
          >
            {option.key}
          </li>
        ))}
      </ul>
      <div className="custom-input__error">
        {errors?.[name]?.message as string}
      </div>
    </div>
  );
}
