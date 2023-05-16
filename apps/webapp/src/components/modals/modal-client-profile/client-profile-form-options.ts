import * as Yup from 'yup';
import { InferType } from 'yup';

import {
  Calories,
  CaloriesPerDay,
  REQUIRED_FILED_MESSAGE,
  UserError,
} from '@fit-friends/constants';
import { Skill, TimeSpan, WorkoutType } from '@fit-friends/shared-types';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = Yup.object().shape({
  duration: Yup.string()
    .required(REQUIRED_FILED_MESSAGE)
    .oneOf(Object.values(TimeSpan), REQUIRED_FILED_MESSAGE),
  caloriesTarget: Yup.number()
    .typeError(REQUIRED_FILED_MESSAGE)
    .integer()
    .min(Calories.MIN, UserError.CALORIES_TARGET_TOO_SMALL)
    .max(Calories.MAX, UserError.CALORIES_TARGET_TOO_BIG)
    .required(),
  caloriesPerDay: Yup.number()
    .typeError(REQUIRED_FILED_MESSAGE)
    .min(CaloriesPerDay.MIN, UserError.DAILY_CALORIES_TOO_SMALL)
    .max(CaloriesPerDay.MAX, UserError.DAILY_CALORIES_TOO_BIG)
    .required(),
  skill: Yup.string()
    .required(REQUIRED_FILED_MESSAGE)
    .oneOf(Object.values(Skill), REQUIRED_FILED_MESSAGE),
  trainings: Yup.array(
    Yup.string().required().oneOf(Object.values(WorkoutType)).required()
  ).required(),
  // info: Yup.string()
  //   .min(ClientInfo.MIN, UserError.CLIENT_INGO_TOO_SMALL)
  //   .max(ClientInfo.MAX, UserError.CLIENT_INGO_TOO_BIG),
});

export type ClientProfileFormValues = InferType<typeof validationSchema>;
export const clientProfileFormOptions = {
  resolver: yupResolver(validationSchema),
};
