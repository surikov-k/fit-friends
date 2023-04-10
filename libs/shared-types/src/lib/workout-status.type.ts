export const WorkoutStatus: {
  Active: 'Active';
  Completed: 'Completed';
} = {
  Active: 'Active',
  Completed: 'Completed',
};

export type WorkoutStatus = (typeof WorkoutStatus)[keyof typeof WorkoutStatus];
