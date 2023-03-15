import {
  CoachProfileInterface,
  Skill,
  Training,
} from '@fit-friends/shared-types';
import { EntityInterface } from '@fit-friends/core';

export class CoachProfileEntity
  implements CoachProfileInterface, EntityInterface<CoachProfileInterface>
{
  skill: Skill;
  trainings: Training[];
  certificate: string;
  hasPersonalTrainings: boolean;
  achievements: string;

  constructor(entity: CoachProfileInterface) {
    this.fillEntity(entity);
  }

  fillEntity(entity: CoachProfileInterface): void {
    this.skill = entity.skill;
    this.trainings = entity.trainings;
    this.certificate = entity.certificate;
    this.hasPersonalTrainings = entity.hasPersonalTrainings;
    this.achievements = entity.achievements;
  }

  toObject(): CoachProfileInterface {
    return { ...this };
  }
}
