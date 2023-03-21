export const Skill: {
  Beginner: 'Beginner';
  Amateur: 'Amateur';
  Professional: 'Professional';
} = {
  Beginner: 'Beginner',
  Amateur: 'Amateur',
  Professional: 'Professional',
};

export type Skill = (typeof Skill)[keyof typeof Skill];
