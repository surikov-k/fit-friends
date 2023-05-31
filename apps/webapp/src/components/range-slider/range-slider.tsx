import ReactSlider from 'react-slider';
import './range-slider.css';

type RangeSliderProps = {
  min: number;
  max: number;
  values: {
    min: number;
    max: number;
  };
  onChange: (values: number[]) => void;
};

export function RangeSlider({ min, max, values, onChange }: RangeSliderProps) {
  return (
    <div className="filter-rating">
      <div className="filter-raiting__scale">
        <div className="filter-raiting__bar">
          <span className="visually-hidden">Полоса прокрутки</span>
        </div>
      </div>
      <ReactSlider
        className="filter-raiting__control"
        thumbClassName="filter-range__min-toggle"
        ariaLabel={['Lower thumb', 'Upper thumb']}
        value={[values.min, values.max]}
        min={min}
        max={max}
        onChange={(values) => onChange(values)}
      />
    </div>
  );
}
