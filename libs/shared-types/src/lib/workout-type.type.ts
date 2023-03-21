export const WorkoutType: {
  Yoga: 'Yoga';
  Running: 'Running';
  Boxing: 'Boxing';
  Stretching: 'Stretching';
  Crossfit: 'Crossfit';
  Aerobics: 'Aerobics';
  Pilates: 'Pilates';
} = {
  Yoga: 'Yoga',
  Running: 'Running',
  Boxing: 'Boxing',
  Stretching: 'Stretching',
  Crossfit: 'Crossfit',
  Aerobics: 'Aerobics',
  Pilates: 'Pilates',
};

export type WorkoutType = (typeof WorkoutType)[keyof typeof WorkoutType];
