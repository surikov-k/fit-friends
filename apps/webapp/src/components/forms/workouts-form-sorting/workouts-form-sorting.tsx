import { UseFormReturn } from 'react-hook-form';

type WorkoutsFormSortingProps = {
  form: UseFormReturn<Record<string, unknown>>;
  value?: string;
};
export function WorkoutsFormSorting({
  form,
  value = 'asc',
}: WorkoutsFormSortingProps) {
  const sorting = {
    asc: 'Дешевле',
    desc: 'Дороже',
    free: 'Бесплатные',
  };
  const { register } = form;

  return (
    <div className="gym-catalog-form__block gym-catalog-form__block--sort">
      <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">
        Сортировка
      </h4>
      <div className="btn-radio-sort gym-catalog-form__radio">
        {Object.entries(sorting).map(([key, label]) => (
          <label key={key}>
            <input
              type="radio"
              defaultChecked={key === value}
              defaultValue={key}
              {...register('sort')}
            />
            <span className="btn-radio-sort__label">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
