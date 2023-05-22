import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { REQUIRED_FILED_MESSAGE, UserError, CaloriesPerDay } from '@fit-friends/constants';

const validationSchema = Yup.object().shape({
  caloriesPerDay: Yup.number()
    .typeError(REQUIRED_FILED_MESSAGE)
    .min(CaloriesPerDay.MIN, UserError.DAILY_CALORIES_TOO_SMALL)
    .max(CaloriesPerDay.MAX, UserError.DAILY_CALORIES_TOO_BIG)
});

export type FormValues = Yup.InferType<typeof validationSchema>;
export const caloriesTargetFormOptions = {
  resolver: yupResolver(validationSchema)
};
