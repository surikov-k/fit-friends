import { RangeSlider } from '../range-slider';
import { UseFormReturn } from 'react-hook-form';
import { useState } from 'react';

type RangeSliderWithInputsProps = {
  title?: string;
  name: string;
  min: number;
  max: number;
  hiddenInputs?: boolean;
  values: { min: number; max: number };
  form: UseFormReturn<Record<string, any>>;
};

export function RangeSliderWithInputs({
  title = '',
  min,
  max,
  hiddenInputs = false,
  values: currentValues,
  form,
  name,
}: RangeSliderWithInputsProps) {
  const [values, setValues] = useState(currentValues);
  const { register, setValue } = form;

  return (
    <div className="gym-catalog-form__block gym-catalog-form__block--price">
      <h4 className="gym-catalog-form__block-title">{title}</h4>
      {!hiddenInputs && (
        <div className="filter-price">
          <div className="filter-price__input-text filter-price__input-text--min">
            <input
              type="number"
              id="text-min"
              // value={values.min}
              {...register(`${name}Min`, {
                onChange: (e) => {
                  setValue(`${name}Min`, +e.target.value, {
                    shouldDirty: true,
                  });
                  setValues({ max: values.max, min: +e.target.value });
                },
              })}
            />
            <label htmlFor="text-min">от</label>
          </div>
          <div className="filter-price__input-text filter-price__input-text--max">
            <input
              type="number"
              id="text-max"
              // defaultValue={values.max}
              {...register(`${name}Max`, {
                onChange: (e) => {
                  setValue(`${name}Max`, +e.target.value, {
                    shouldDirty: true,
                  });
                  setValues({ min: values.min, max: +e.target.value });
                },
              })}
            />
            <label htmlFor="text-max">до</label>
          </div>
        </div>
      )}
      <RangeSlider
        min={min}
        max={max}
        values={values}
        onChange={([min, max]) => {
          setValues({ min, max });
          setValue(`${name}Min`, min, { shouldDirty: true });
          setValue(`${name}Max`, max, { shouldDirty: true });
        }}
      />
      {hiddenInputs && (
        <div className="filter-raiting__control">
          <span>{values.min}</span>
          <span>{values.max}</span>
        </div>
      )}
    </div>
  );
}
