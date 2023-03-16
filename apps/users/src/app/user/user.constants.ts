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
  MAX = 140,
}

export enum UserError {
  CALORIES_TARGET_TOO_SMALL = 'Calories target is too small',
  CALORIES_TARGET_TOO_BIG = 'Calories target is too big',
  DAILY_CALORIES_TOO_SMALL = 'Calories per day is too small',
  DAILY_CALORIES_TOO_BIG = 'Calories per day is too big',
  ACHIEVEMENTS_TOO_SMALL = 'Coach achievements length is too small',
  ACHIEVEMENTS_TOO_BIG = 'Coach achievements length is too big',
  INCORRECT_MONGOID = 'The MongoDB ID is not valid',
}
