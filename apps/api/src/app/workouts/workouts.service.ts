import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  MailEvent,
  OrdersEvent,
  ReviewInterface,
  UserEvent,
  WorkoutInterface,
  WorkoutsEvent,
  WorkoutsListQueryInterface,
} from '@fit-friends/shared-types';

@Injectable()
export class WorkoutsService {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE')
    private readonly notificationsService: ClientProxy,
    @Inject('ORDERS_SERVICE') private readonly ordersService: ClientProxy,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    @Inject('WORKOUTS_SERVICE') private readonly workoutsService: ClientProxy
  ) {}

  public async getAll(query: WorkoutsListQueryInterface) {
    return firstValueFrom<WorkoutInterface[]>(
      this.workoutsService.send({ cmd: WorkoutsEvent.GetAll }, { query })
    );
  }

  public async get(id) {
    return firstValueFrom(
      this.workoutsService.send({ cmd: WorkoutsEvent.Get }, { id })
    );
  }

  public async create(coachId, dto) {
    const workout = await firstValueFrom(
      this.workoutsService.send(
        { cmd: WorkoutsEvent.Create },
        {
          coachId,
          dto,
        }
      )
    );

    this.notificationsService.send(
      { cmd: MailEvent.CreateDelivery },
      { workout }
    );

    return workout;
  }

  public async update(id, dto) {
    return firstValueFrom(
      this.workoutsService.send({ cmd: WorkoutsEvent.Update }, { id, dto })
    );
  }

  public async startWorkout(clientId: string, workoutId: number) {
    return Promise.all([
      firstValueFrom(
        this.ordersService.send(
          { cmd: OrdersEvent.DecreaseAvailableWorkouts },
          { clientId, serviceId: workoutId }
        )
      ),
      firstValueFrom(
        this.workoutsService.send(
          { cmd: WorkoutsEvent.Start },
          { clientId, workoutId }
        )
      ),
    ]);
  }

  public async completeWorkout(clientId: string, workoutId: number) {
    return this.workoutsService.send(
      { cmd: WorkoutsEvent.Complete },
      { clientId, workoutId }
    );
  }

  public async getLog(clientId: string) {
    return firstValueFrom(
      this.workoutsService.send({ cmd: WorkoutsEvent.GetLog }, { clientId })
    );
  }

  public async createReview(dto: ReviewInterface) {
    const review = await firstValueFrom(
      this.workoutsService.send({ cmd: WorkoutsEvent.CreateReview }, { dto })
    );

    review.user = await firstValueFrom(
      this.userService.send(
        { cmd: UserEvent.GetUser },
        { userId: dto.clientId }
      )
    );

    return review;
  }

  public async getReviews(workoutId: number) {
    const reviews = await firstValueFrom(
      this.workoutsService.send(
        { cmd: WorkoutsEvent.GetReviews },
        { workoutId }
      )
    );
    return Promise.all(
      reviews.map(async (review) => {
        review.user = await firstValueFrom(
          this.userService.send(
            { cmd: UserEvent.GetUser },
            { userId: review.clientId }
          )
        );
        return review;
      })
    );
  }
}
