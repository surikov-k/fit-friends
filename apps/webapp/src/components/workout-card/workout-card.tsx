import { WorkoutInterface } from '@fit-friends/shared-types';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../app.constants';

type WorkoutCardProps = {
  workout: WorkoutInterface;
};

export function WorkoutCard({ workout }: WorkoutCardProps) {
  const { background, title, price, type, calories, description, id, rating } =
    workout;
  return (
    <li className="training-catalog__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <source
                type="image/webp"
                srcSet={`../../assets/img/content/thumbnails/${background}.webp, ../../assets/img/content/thumbnails/${background}@2x.webp 2x`}
              />
              <img
                src={`../../assets/img/content/thumbnails/${background}.jpg`}
                srcSet={`../../assets/img/content/thumbnails/${background}@2x.jpg 2x`}
                width={330}
                height={190}
                alt={background}
              />
            </picture>
          </div>
          <p className="thumbnail-training__price">
            {price ? (
              <>
                <span className="thumbnail-training__price-value">{price}</span>
                <span>₽</span>
              </>
            ) : (
              'Бесплатно'
            )}
          </p>
          <h3 className="thumbnail-training__title">{title}</h3>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag">
                  <span>#{type}</span>
                </div>
              </li>
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag">
                  <span>#{calories}ккал</span>
                </div>
              </li>
            </ul>
            <div className="thumbnail-training__rate">
              <svg width={16} height={16} aria-hidden="true">
                <use xlinkHref="#icon-star" />
              </svg>
              <span className="thumbnail-training__rate-value">{rating}</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">{description}</p>
          </div>
          <div className="thumbnail-training__button-wrapper">
            <Link
              className="btn btn--small thumbnail-training__button-catalog"
              to={AppRoute.Workout.replace(':id', `${id ? id : ''}`)}
            >
              Подробнее
            </Link>
            <Link
              className="btn btn--small btn--outlined thumbnail-training__button-catalog"
              to={AppRoute.Workout.replace(':id', `${id ? id : ''}`)}
            >
              Отзывы
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
