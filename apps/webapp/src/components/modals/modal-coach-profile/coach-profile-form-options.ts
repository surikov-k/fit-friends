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
  certificate: Yup.string(),
  hasPersonalTrainings: Yup.string(),
  skill: Yup.string()
    .required(REQUIRED_FILED_MESSAGE)
    .oneOf(Object.values(Skill), REQUIRED_FILED_MESSAGE),
  trainings: Yup.array()
    .typeError(REQUIRED_FILED_MESSAGE)
    .of(Yup.string().oneOf(Object.values(WorkoutType)))
    .min(1, REQUIRED_FILED_MESSAGE),
  achievements: Yup.string()
    .required(REQUIRED_FILED_MESSAGE)
    .min(CoachAchievements.MIN, UserError.ACHIEVEMENTS_TOO_SMALL)
    .max(CoachAchievements.MAX, UserError.ACHIEVEMENTS_TOO_BIG),
});

export type CoachProfileFormValues = InferType<typeof validationSchema>;
export const coachProfileFormOptions = {
  resolver: yupResolver(validationSchema),
};
