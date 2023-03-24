export const PurchaseType: {
  Membership: 'Membership';
  Workout: 'Workout';
} = {
  Membership: 'Membership',
  Workout: 'Workout',
};

export type PurchaseType = (typeof PurchaseType)[keyof typeof PurchaseType];
