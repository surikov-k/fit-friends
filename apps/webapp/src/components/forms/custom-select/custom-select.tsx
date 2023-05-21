import { useState } from 'react';
import cn from 'classnames';
import { FieldErrors } from 'react-hook-form';

type SelectOption = {
  key: string;
  value: string;
};

type CustomSelectProps = {
  styleClass?: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  value?: string;
  label?: string;
  name?: string;
  errors: FieldErrors;
  disabled?: boolean;
};

export function CustomSelect({
  styleClass = '',
  label,
  options,
  value,
  onChange,
  errors,
  disabled = false,
  name = '',
}: CustomSelectProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(value || '');
  return (
    <div
      className={cn(`custom-select ${styleClass}`, {
        // 'not-empty': !!selected,
        'is-open': isOpened,
        'custom-input--error': errors?.[name],
      })}
    >
      <span className="custom-select__label">{label}</span>
      <div className="custom-select__placeholder">{selected}</div>
      <button
        onClick={() => {
          if (!disabled) {
            setIsOpened(!isOpened);
          }
        }}
        className="custom-select__button"
        type="button"
        aria-label="Выберите одну из опций"
      >
        <span className="custom-select__text" style={{ fontSize: 'inherit' }}>
          {selected}
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
              if (disabled === false) {
                setSelected(option.value);
                setIsOpened(false);
                onChange(option.value);
              }
            }}
          >
            {option.value}
          </li>
        ))}
      </ul>
      <div className="custom-input__error">
        {errors?.[name]?.message as string}
      </div>
    </div>
  );
}
