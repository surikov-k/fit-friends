import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  FormValues,
  caloriesTargetFormOptions,
} from './calories-target-form-options';
import { getUserInfo, updateUserProfileAction } from '../../store/user-slice';

export function CaloriesTargets() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(getUserInfo);
  const weeklyInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>(caloriesTargetFormOptions);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = form;

  useEffect(() => {
      if (weeklyInputRef.current && userInfo && userInfo.caloriesPerDay) {
        weeklyInputRef.current.value = `${userInfo.caloriesPerDay * 7}`;
      }
  }, [userInfo])

  useEffect(() => {
    const onSubmit: SubmitHandler<FormValues> = ({ caloriesPerDay = 0 }) => {
      if (weeklyInputRef.current) {
        weeklyInputRef.current.value = `${caloriesPerDay * 7}`;
      }
      dispatch(updateUserProfileAction({ caloriesPerDay }));
    };

    const subscription = watch(() => {
      handleSubmit(onSubmit, () => {
        console.log('error');

        if (weeklyInputRef.current) {
          console.log('error2');
          weeklyInputRef.current.value = '';
        }
      })();
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch, handleSubmit, watch]);

  if (!userInfo) return null;

  const { caloriesPerDay } = userInfo;

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
              <input
                ref={weeklyInputRef}
                type="number"
                readOnly={true}
                // value={caloriesPerDay ? caloriesPerDay * 7 : undefined}
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
