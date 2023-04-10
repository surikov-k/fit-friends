import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { OrdersEvent, WorkoutsEvent } from '@fit-friends/shared-types';

@Injectable()
export class WorkoutsService {
  constructor(
    @Inject('WORKOUTS_SERVICE') private readonly workoutsService: ClientProxy,
    @Inject('ORDERS_SERVICE') private readonly ordersService: ClientProxy
  ) {}

  public async get(id) {
    return lastValueFrom(
      this.workoutsService.send({ cmd: WorkoutsEvent.Get }, { id })
    );
  }

  public async create(coachId, dto) {
    return firstValueFrom(
      this.workoutsService.send(
        { cmd: WorkoutsEvent.Create },
        {
          coachId,
          dto,
        }
      )
    );
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
      this.workoutsService.send({ cmd: WorkoutsEvent.Log }, { clientId })
    );
  }
}
