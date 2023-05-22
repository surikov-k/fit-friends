import { useEffect, useState } from 'react';
import cn from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '../../hooks';
import {
  FormValues,
  caloriesTargetFormOptions,
} from './calories-target-form-options';
import { updateUserProfileAction } from '../../store/user-slice';

type CaloriesTargetsProps = {
  caloriesPerDay: number;
};

export function CaloriesTargets({ caloriesPerDay = 0 }: CaloriesTargetsProps) {
  const dispatch = useAppDispatch();
  const [weeklyTarget, setWeeklyTarget] = useState<number | undefined>(
    undefined
  );
  const form = useForm<FormValues>(caloriesTargetFormOptions);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = form;

  useEffect(() => {
    const onSubmit: SubmitHandler<FormValues> = ({ caloriesPerDay }) => {
      dispatch(updateUserProfileAction({ caloriesPerDay }));
    };

    const calories = watch('caloriesPerDay');

    if (calories) {
      setWeeklyTarget(calories * 7);
    }

    const subscription = watch(() => {
      handleSubmit(onSubmit)();
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch, handleSubmit, watch]);

  return (
    <div className="personal-account-user__schedule">
      <form>
        <div className="personal-account-user__form">
          <div
            className={cn('personal-account-user__input', {
              'custom-input--error': errors?.caloriesPerDay,
            })}
          >
            <label>
              <span className="personal-account-user__label">
                План на день, ккал
              </span>
              <input
                type="number"
                {...register('caloriesPerDay')}
                defaultValue={caloriesPerDay}
              />
              <div className="custom-input__error">
                {errors.caloriesPerDay?.message as string}
              </div>
            </label>
          </div>
          <div className="personal-account-user__input">
            <label>
              <span className="personal-account-user__label">
                План на неделю, ккал
              </span>
              <input type="number" readOnly={true} value={weeklyTarget} />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
