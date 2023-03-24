export const PaymentMethod: {
  Visa: 'Visa';
  Mir: 'Mir';
  Umoney: 'Umoney';
} = {
  Visa: 'Visa',
  Mir: 'Mir',
  Umoney: 'Umoney',
};

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
