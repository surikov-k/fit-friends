import { UseFormReturn } from 'react-hook-form';

import { Skill } from '@fit-friends/shared-types';
import cn from 'classnames';

type SkillButtonsProps = {
  form: UseFormReturn<any>;
};

export function SkillButtons({ form }: SkillButtonsProps) {
  const skills = {
    [Skill.Beginner]: 'Новичок',
    [Skill.Amateur]: 'Любитель',
    [Skill.Professional]: 'Профессионал',
  };

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div
      className={cn('questionnaire-user__block', {
        'custom-input--error': errors?.skill,
      })}
      style={{ position: 'relative' }}
    >
      <span className="questionnaire-user__legend">Ваш уровень</span>

      <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
        {Object.entries(skills).map((skill) => {
          const [value, label] = skill;
          return (
            <div key={value} className="custom-toggle-radio__block">
              <label>
                <input type="radio" value={value} {...register('skill')} />
                <span className="custom-toggle-radio__icon"></span>
                <span className="custom-toggle-radio__label">{label}</span>
              </label>
            </div>
          );
        })}
      </div>

      <div className="custom-input__error" style={{ position: 'absolute' }}>
        {errors.skill?.message as string}
      </div>
    </div>
  );
}
