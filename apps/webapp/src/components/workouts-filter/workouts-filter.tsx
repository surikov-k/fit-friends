import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { NavigateBackButton, RangeSliderWithInputs } from '../../components';
import { Calories, Price, Rating } from '@fit-friends/constants';
import { CheckboxList, WorkoutsFormSorting } from '../forms';
import { FormValues, workoutsFilterOptions } from './workouts-filter-options';
import { dirtyValues } from '../../utils';
import { WorkoutType } from '@fit-friends/shared-types';

export function WorkoutsFilter() {
  const form = useForm<FormValues>(workoutsFilterOptions);
  const {
    reset,
    handleSubmit,
    watch,
    formState: { dirtyFields },
    setValue,
  } = form;

  const [queryParams, setQueryParams] = useSearchParams();
  useEffect(() => {
    reset({
      caloriesMax: Calories.MAX,
      caloriesMin: Calories.MIN,
      sort: 'asc',
      type: [],
      priceMin: Price.MIN,
      priceMax: Price.MAX,
      ratingMin: Rating.MIN,
      ratingMax: Rating.MAX,
    });
  }, [reset]);

  useEffect(() => {
    const priceMin = queryParams.get('priceMin');
    const priceMax = queryParams.get('priceMax');
    const caloriesMax = queryParams.get('caloriesMax');
    const caloriesMin = queryParams.get('caloriesMin');
    const ratingMin = queryParams.get('ratingMin');
    const ratingMax = queryParams.get('ratingMax');
    const type = queryParams.get('type');
    const sort = queryParams.get('sort');

    if (priceMin) {
      setValue('priceMin', +priceMin, { shouldDirty: true });
    }
    if (priceMax) {
      setValue('priceMax', +priceMax, { shouldDirty: true });
    }
    if (caloriesMax) {
      setValue('caloriesMax', +caloriesMax, { shouldDirty: true });
    }
    if (caloriesMin) {
      setValue('caloriesMin', +caloriesMin, { shouldDirty: true });
    }
    if (ratingMin) {
      setValue('ratingMin', +ratingMin, { shouldDirty: true });
    }
    if (ratingMax) {
      setValue('ratingMax', +ratingMax, { shouldDirty: true });
    }
    if (type) {
      const typeArray = type.split(',') as unknown as WorkoutType[];
      setValue('type', typeArray, { shouldDirty: true });
    } else {
      setValue('type', [], { shouldDirty: true });
    }
    if (sort) {
      setValue('sort', sort, { shouldDirty: true });
    }
  }, [queryParams, setValue]);

  useEffect(() => {
    const onSubmit: SubmitHandler<FormValues> = (data) => {
      const query = new URLSearchParams(
        dirtyValues(dirtyFields, data) as Record<string, string>
      );
      setQueryParams(query);
      console.log(query, query.toString());
    };

    const subscription = watch(() => {
      handleSubmit(onSubmit, (e) => console.log('err:', e))();
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [dirtyFields, handleSubmit, setQueryParams, watch]);

  return (
    <div className="gym-catalog-form">
      <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
      <div className="gym-catalog-form__wrapper">
        <NavigateBackButton />
        <h3 className="gym-catalog-form__title">Фильтры</h3>
        <form className="gym-catalog-form__form">
          <RangeSliderWithInputs
            min={Price.MIN}
            max={3200}
            title={'Цена, ₽'}
            values={{
              min: +(queryParams.get('priceMin') || '') || Price.MIN,
              max: +(queryParams.get('priceMax') || '') || Price.MAX,
            }}
            form={form}
            name={'price'}
          />

          <RangeSliderWithInputs
            min={Calories.MIN}
            max={Calories.MAX}
            title={'Калории'}
            values={{
              min: +(queryParams.get('caloriesMin') || '') || Calories.MIN,
              max: +(queryParams.get('caloriesMax') || '') || Calories.MAX,
            }}
            form={form}
            name={'calories'}
          />

          <RangeSliderWithInputs
            min={Rating.MIN}
            max={Rating.MAX}
            title={'Рейтинг'}
            hiddenInputs={true}
            values={{
              min: +(queryParams.get('ratingMin') || '') || Rating.MIN,
              max: +(queryParams.get('ratingMax') || '') || Rating.MAX,
            }}
            form={form}
            name={'rating'}
          />

          <CheckboxList
            form={form}
            values={(queryParams.get('type') || '').split(',')}
          />

          <WorkoutsFormSorting
            form={form}
            value={queryParams.get('sort') || ''}
          />
        </form>
      </div>
    </div>
  );
}
