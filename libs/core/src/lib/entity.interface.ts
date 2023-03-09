export interface EntityInterface<E> {
  toObject(): E;
  fillEntity(entity: E): void;
}
