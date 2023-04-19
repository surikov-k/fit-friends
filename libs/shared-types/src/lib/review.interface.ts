export interface ReviewInterface {
  id?: number;
  clientId: string;
  rating: number;
  text: string;
  createdAt?: Date;
  workoutId?: number;
}
