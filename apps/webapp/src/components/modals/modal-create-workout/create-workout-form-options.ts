import * as Yup from 'yup';
import { InferType } from 'yup';
import {
  Calories,
  DescriptionLength,
  Price,
  REQUIRED_FILED_MESSAGE,
  TitleLength,
} from '@fit-friends/constants';
import { Gender, TimeSpan, WorkoutType } from '@fit-friends/shared-types';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = Yup.object().shape({
  calories: Yup.number()
    .typeError(REQUIRED_FILED_MESSAGE)
    .required()
    .min(Calories.MIN)
    .max(Calories.MAX),
  description: Yup.string()
    .required(REQUIRED_FILED_MESSAGE)
    .min(DescriptionLength.MIN)
    .max(DescriptionLength.MAX),
  duration: Yup.string()
    .required(REQUIRED_FILED_MESSAGE)
    .oneOf(Object.values(TimeSpan)),
  gender: Yup.string()
    .required(REQUIRED_FILED_MESSAGE)
    .oneOf(Object.values(Gender)),
  price: Yup.number()
    .typeError(REQUIRED_FILED_MESSAGE)
    .required(REQUIRED_FILED_MESSAGE)
    .min(Price.MIN),
  title: Yup.string()
    .required(REQUIRED_FILED_MESSAGE)
    .min(TitleLength.MIN)
    .max(TitleLength.MAX),
  type: Yup.string()
    .required(REQUIRED_FILED_MESSAGE)
    .oneOf(Object.values(WorkoutType)),
  video: Yup.string().required(REQUIRED_FILED_MESSAGE),
});

export type FormValues = InferType<typeof validationSchema>;
export const createWorkoutOptions = { resolver: yupResolver(validationSchema) };
