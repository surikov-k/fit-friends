import { EntityInterface } from '@fit-friends/core';
import {
  Gender,
  Skill,
  TimeSpan,
  Training,
  UserInterface,
  WorkoutInterface,
} from '@fit-friends/shared-types';

export class WorkoutEntity
  implements EntityInterface<WorkoutEntity>, WorkoutInterface
{
  background: string;
  calories: number;
  coach: UserInterface;
  description: string;
  duration: TimeSpan;
  gender: Gender;
  isSpecialOffer: boolean;
  name: string;
  price: number;
  rating: number;
  skill: Skill;
  type: Training;
  video: string;

  constructor(workout: WorkoutInterface) {
    this.fillEntity(workout);
  }

  fillEntity(workout: WorkoutInterface): void {
    this.background = workout.background;
    this.calories = workout.calories;
    this.coach = workout.coach;
    this.description = workout.description;
    this.duration = workout.duration;
    this.gender = workout.gender;
    this.isSpecialOffer = workout.isSpecialOffer;
    this.name = workout.name;
    this.price = workout.price;
    this.rating = workout.rating;
    this.skill = workout.skill;
    this.type = workout.type;
    this.video = workout.video;
  }

  toObject(): WorkoutEntity {
    return { ...this };
  }
}
