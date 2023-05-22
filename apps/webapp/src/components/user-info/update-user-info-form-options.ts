import * as Yup from 'yup';
import { InferType } from 'yup';
import {
  AuthError,
  CoachAchievements,
  UserError,
  USERNAME_PATTERN,
  UsernameLength,
  WORKOUT_MAX,
  WORKOUT_MIN,
} from '@fit-friends/constants';
import {
  Gender,
  Location,
  Skill,
  WorkoutType,
} from '@fit-friends/shared-types';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = Yup.object().shape({
  avatar: Yup.string(),
  name: Yup.string()
    .min(UsernameLength.MIN, AuthError.NAME_TOO_SHORT)
    .max(UsernameLength.MAX, AuthError.NAME_TOO_LONG)
    .matches(USERNAME_PATTERN, AuthError.INVALID_NAME),
  hasPersonalTrainings: Yup.boolean(),
  location: Yup.string().oneOf(Object.values(Location)),
  skill: Yup.string().oneOf(Object.values(Skill)),
  trainings: Yup.array(
    Yup.string().required().oneOf(Object.values(WorkoutType))
  )
    .max(WORKOUT_MAX, UserError.WORKOUTS_TOO_MANY)
    .min(WORKOUT_MIN, UserError.WORKOUTS_REQUIRED),
  gender: Yup.string().oneOf(Object.values(Gender)),
  achievements: Yup.string()
    .min(CoachAchievements.MIN, UserError.ACHIEVEMENTS_TOO_SMALL)
    .max(CoachAchievements.MAX, UserError.ACHIEVEMENTS_TOO_BIG),
});

export type FormValues = InferType<typeof validationSchema>;
export const updateUserInfoFormOptions = {
  resolver: yupResolver(validationSchema),
};
