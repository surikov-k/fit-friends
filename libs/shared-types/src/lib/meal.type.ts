export const Meal: {
  Breakfast: 'Breakfast';
  Launch: 'Launch';
  Dinner: 'Dinner';
  Snack: 'Snack';
} = {
  Breakfast: 'Breakfast',
  Launch: 'Launch',
  Dinner: 'Dinner',
  Snack: 'Snack',
};

export type Meal = (typeof Meal)[keyof typeof Meal];
