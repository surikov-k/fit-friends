import * as Yup from 'yup';
import { InferType } from 'yup';
import {
  CoachAchievements,
  REQUIRED_FILED_MESSAGE,
  UserError,
} from '@fit-friends/constants';
import { Skill, WorkoutType } from '@fit-friends/shared-types';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = Yup.object().shape({
  certificate: Yup.array(Yup.string()),
  hasPersonalTrainings: Yup.boolean(),
  skill: Yup.string()
    .required(REQUIRED_FILED_MESSAGE)
    .oneOf(Object.values(Skill), REQUIRED_FILED_MESSAGE),
  trainings: Yup.array(
    Yup.string().required().oneOf(Object.values(WorkoutType))
  ).required(),
  achievements: Yup.string()
    .required(REQUIRED_FILED_MESSAGE)
    .min(CoachAchievements.MIN, UserError.ACHIEVEMENTS_TOO_SMALL)
    .max(CoachAchievements.MAX, UserError.ACHIEVEMENTS_TOO_BIG),
});

export type CoachProfileFormValues = InferType<typeof validationSchema>;
export const coachProfileFormOptions = {
  resolver: yupResolver(validationSchema),
};
