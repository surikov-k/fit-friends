import {
  ClientProfileInterface,
  Skill,
  TimeSpan,
  Training,
} from '@fit-friends/shared-types';
import { EntityInterface } from '@fit-friends/core';

export class ClientProfileEntity
  implements ClientProfileInterface, EntityInterface<ClientProfileInterface>
{
  skill: Skill;
  trainings: Training[];
  duration: TimeSpan;
  caloriesTarget: number;
  caloriesPerDay: number;
  readiness: boolean;

  constructor(entity: ClientProfileInterface) {
    this.fillEntity(entity);
  }

  fillEntity(entity: ClientProfileInterface): void {
    this.skill = entity.skill;
    this.trainings = entity.trainings;
    this.duration = entity.duration;
    this.caloriesTarget = entity.caloriesTarget;
    this.caloriesPerDay = entity.caloriesPerDay;
    this.readiness = entity.readiness;
  }

  toObject(): ClientProfileInterface {
    return { ...this };
  }
}
