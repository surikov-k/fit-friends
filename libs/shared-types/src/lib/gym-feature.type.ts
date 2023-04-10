export const GymFeature: {
  SwimmingPool: 'SwimmingPool';
  FreeParking: 'FreeParking';
  KidsRoom: 'KidsRoom';
  Massage: 'Massage';
} = {
  SwimmingPool: 'SwimmingPool',
  FreeParking: 'FreeParking',
  KidsRoom: 'KidsRoom',
  Massage: 'Massage',
};

export type GymFeature = (typeof GymFeature)[keyof typeof GymFeature];
