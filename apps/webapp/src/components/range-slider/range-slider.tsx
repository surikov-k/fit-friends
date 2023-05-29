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
    <div className="filter-range__scale">
      <ReactSlider
        className="filter-range"
        thumbClassName="filter-range__min-toggle"
        value={[values.min, values.max]}
        min={min}
        max={max}
        onChange={(values) => onChange(values)}
      />
    </div>
  );
}
