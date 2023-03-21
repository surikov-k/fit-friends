export const Gender: {
  Male: 'Male';
  Female: 'Female';
  Common: 'Common';
} = {
  Male: 'Male',
  Female: 'Female',
  Common: 'Common',
};

export type Gender = (typeof Gender)[keyof typeof Gender];
