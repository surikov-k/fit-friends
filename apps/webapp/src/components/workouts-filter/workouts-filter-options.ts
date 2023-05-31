import * as Yup from 'yup';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { WorkoutType } from '@fit-friends/shared-types';
import { Calories, Price, Rating } from '@fit-friends/constants';

const validationSchema = Yup.object().shape({
  priceMin: Yup.number().min(Price.MIN),
  priceMax: Yup.number(),
  caloriesMin: Yup.number().min(Calories.MIN),
  caloriesMax: Yup.number().max(Calories.MAX),
  ratingMin: Yup.number().min(Rating.MIN),
  ratingMax: Yup.number().min(Rating.MAX),
  type: Yup.array(Yup.string().oneOf(Object.values(WorkoutType))),
  sort: Yup.string(),
});

export type FormValues = InferType<typeof validationSchema>;
export const workoutsFilterOptions = {
  resolver: yupResolver(validationSchema),
};
