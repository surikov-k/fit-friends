import { Test } from '@nestjs/testing';

import {
  CoachWorkoutsListQueryInterface,
  WorkoutInterface,
  WorkoutsListQueryInterface,
} from '@fit-friends/shared-types';
import { WorkoutRepository } from './workout.repository';
import { WorkoutService } from './workout.service';
import { WorkoutEntity } from './workout.entity';

describe('WorkoutService', () => {
  let service: WorkoutService;
  let fakeWorkoutRepository: Partial<WorkoutRepository>;
  const workout: WorkoutInterface = {
    background: '',
    calories: 0,
    coachId: '',
    description: '',
    duration: undefined,
    gender: undefined,
    isSpecialOffer: false,
    price: 0,
    rating: 0,
    reviews: [],
    skill: undefined,
    title: '',
    type: undefined,
    video: '',
  };

  beforeEach(async () => {
    fakeWorkoutRepository = {
      async create(item: WorkoutEntity): Promise<WorkoutInterface> {
        return Promise.resolve({ ...item, id: 1 });
      },
      async findAll(
        query: WorkoutsListQueryInterface
      ): Promise<WorkoutInterface[]> {
        return Promise.resolve([]);
      },
      async findByCoach(
        coachId: string,
        query: CoachWorkoutsListQueryInterface
      ): Promise<any> {
        return Promise.resolve(undefined);
      },
      async findById(id: number): Promise<WorkoutInterface | null> {
        return Promise.resolve({ ...workout, id: 1 });
      },
      async update(
        id: number,
        entity: WorkoutEntity
      ): Promise<WorkoutInterface> {
        return Promise.resolve({ ...entity, id });
      },
      async updateRating(workoutId: number): Promise<WorkoutInterface> {
        return Promise.resolve(undefined);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        WorkoutService,
        {
          provide: WorkoutRepository,
          useValue: fakeWorkoutRepository,
        },
      ],
    }).compile();

    service = module.get(WorkoutService);
  });

  it('can create an instance of order service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a workout', async () => {
    const result = await service.create('coachId', workout);
    expect(result.coachId).toEqual('coachId');
  });

  it('gets a workout by id', async () => {
    const result = await service.get(1);
    expect(result.id).toEqual(1);
  });

  it('updates a workout', async () => {
    const result = await service.update(1, { title: 'New title' });
    expect(result.title).toEqual('New title');
  });
});
