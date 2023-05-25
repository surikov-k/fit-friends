import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchWorkouts,
  getWorkoutsList,
  getWorkoutsLoading,
} from '../../store/workouts-slice';
import { Loading, WorkoutCard, WorkoutsFilter } from '../../components';

export function WorkoutsCatalog() {
  const dispatch = useAppDispatch();
  const workouts = useAppSelector(getWorkoutsList);
  const isLoading = useAppSelector(getWorkoutsLoading);

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [dispatch]);

  return (
    <main>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Каталог тренировок</h1>
            <WorkoutsFilter />
            <div className="training-catalog">
              {isLoading && <Loading />}
              <ul className="training-catalog__list">
                {workouts.length &&
                  workouts.map((workout) => <WorkoutCard workout={workout} />)}
              </ul>
              <div className="show-more training-catalog__show-more">
                <button
                  className="btn show-more__button show-more__button--more"
                  type="button"
                >
                  Показать еще
                </button>
                <button
                  className="btn show-more__button show-more__button--to-top"
                  type="button"
                >
                  Вернуться в начало
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
