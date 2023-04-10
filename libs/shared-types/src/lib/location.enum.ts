export const Location: {
  Pionerskaya: 'Pionerskaya';
  Petrogradskaya: 'Petrogradskaya';
  Udelnaya: 'Udelnaya';
  Zvezdnaya: 'Zvezdnaya';
  Sportivnaya: 'Sportivnaya';
} = {
  Pionerskaya: 'Pionerskaya',
  Petrogradskaya: 'Petrogradskaya',
  Udelnaya: 'Udelnaya',
  Zvezdnaya: 'Zvezdnaya',
  Sportivnaya: 'Sportivnaya',
};

export type Location = (typeof Location)[keyof typeof Location];
