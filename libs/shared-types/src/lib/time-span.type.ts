export const TimeSpan: {
  Short: 'Short';
  Normal: 'Normal';
  Long: 'Long';
  Longest: 'Longest';
} = {
  Short: 'Short',
  Normal: 'Normal',
  Long: 'Long',
  Longest: 'Longest',
};

export type TimeSpan = (typeof TimeSpan)[keyof typeof TimeSpan];
