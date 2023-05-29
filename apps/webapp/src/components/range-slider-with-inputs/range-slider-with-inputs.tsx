import { RangeSlider } from '../range-slider';
import { useState } from 'react';

type RangeSliderWithInputsProps = {
  title?: string;
  min: number;
  max: number;
};

export function RangeSliderWithInputs({
  title = 'Slider',
  min,
  max,
}: RangeSliderWithInputsProps) {
  const [values, setValues] = useState({ min, max });

  return (
    <div className="gym-catalog-form__block gym-catalog-form__block--price">
      <h4 className="gym-catalog-form__block-title">{title}</h4>
      <div className="filter-price">
        <div className="filter-price__input-text filter-price__input-text--min">
          <input
            type="number"
            id="text-min"
            name="text-min"
            value={values.min}
            onChange={(evt) => {
              setValues({ ...values, min: +evt.target.value });
            }}
          />
          <label htmlFor="text-min">от</label>
        </div>
        <div className="filter-price__input-text filter-price__input-text--max">
          <input
            type="number"
            id="text-max"
            name="text-max"
            value={values.max}
            onChange={(evt) => {
              setValues({ ...values, max: +evt.target.value });
            }}
          />
          <label htmlFor="text-max">до</label>
        </div>
      </div>
      <RangeSlider
        min={min}
        max={max}
        values={values}
        onChange={([min, max]) => setValues({ min, max })}
      />
    </div>
  );
}
