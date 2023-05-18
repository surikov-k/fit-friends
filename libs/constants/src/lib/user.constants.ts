export const SALT_ROUNDS = 10;

export const MAX_TRAININGS_FOR_CLIENT = 3;
export const MAX_TRAININGS_FOR_COACH = 3;

export enum CaloriesTarget {
  MIN = 1000,
  MAX = 5000,
}

export enum CaloriesPerDay {
  MIN = 1000,
  MAX = 5000,
}

export enum CoachAchievements {
  MIN = 10,
  MAX = 350, // В ТЗ 140, в Фигме текст длиннее
}

export enum ClientInfo {
  MIN = 10,
  MAX = 350,
}
export const WORKOUT_MIN = 1;
export const WORKOUT_MAX = 3;

export enum UserError {
  CALORIES_TARGET_TOO_SMALL = 'Calories target is too small',
  CALORIES_TARGET_TOO_BIG = 'Calories target is too big',
  DAILY_CALORIES_TOO_SMALL = 'Calories per day is too small',
  DAILY_CALORIES_TOO_BIG = 'Calories per day is too big',
  ACHIEVEMENTS_TOO_SMALL = 'Coach achievements length is too small',
  ACHIEVEMENTS_TOO_BIG = 'Coach achievements length is too big',
  CLIENT_INGO_TOO_SMALL = 'Client info length is too small',
  CLIENT_INGO_TOO_BIG = 'Client info length is too big',
  WORKOUTS_TOO_MANY = 'Too many workouts',
  WORKOUTS_REQUIRED = 'At least one workout',
  INCORRECT_MONGOID = 'The MongoDB ID is not valid',
}
