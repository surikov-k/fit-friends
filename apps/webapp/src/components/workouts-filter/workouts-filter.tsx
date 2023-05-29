import { NavigateBackButton, RangeSliderWithInputs } from '../../components';
import { Calories, Price } from '@fit-friends/constants';

export function WorkoutsFilter() {
  return (
    <div className="gym-catalog-form">
      <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
      <div className="gym-catalog-form__wrapper">
        <NavigateBackButton />
        <h3 className="gym-catalog-form__title">Фильтры</h3>
        <form className="gym-catalog-form__form">
          <RangeSliderWithInputs min={Price.MIN} max={3200} title={'Цена, ₽'} />
          <RangeSliderWithInputs
            min={Calories.MIN}
            max={Calories.MAX}
            title={'Калории'}
          />

          <div className="gym-catalog-form__block gym-catalog-form__block--rating">
            <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
            <div className="filter-raiting">
              <div className="filter-raiting__scale">
                <div className="filter-raiting__bar">
                  <span className="visually-hidden">Полоса прокрутки</span>
                </div>
              </div>
              <div className="filter-raiting__control">
                <button className="filter-raiting__min-toggle">
                  <span className="visually-hidden">Минимальное значение</span>
                </button>
                <span>1</span>
                <button className="filter-raiting__max-toggle">
                  <span className="visually-hidden">Максимальное значение</span>
                </button>
                <span>5</span>
              </div>
            </div>
          </div>
          <div className="gym-catalog-form__block gym-catalog-form__block--type">
            <h4 className="gym-catalog-form__block-title">Тип</h4>
            <ul className="gym-catalog-form__check-list">
              <li className="gym-catalog-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input type="checkbox" defaultValue="type-1" name="type" />
                    <span className="custom-toggle__icon">
                      <svg width={9} height={6} aria-hidden="true">
                        <use xlinkHref="#arrow-check" />
                      </svg>
                    </span>
                    <span className="custom-toggle__label">йога</span>
                  </label>
                </div>
              </li>
              <li className="gym-catalog-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input type="checkbox" defaultValue="type-1" name="type" />
                    <span className="custom-toggle__icon">
                      <svg width={9} height={6} aria-hidden="true">
                        <use xlinkHref="#arrow-check" />
                      </svg>
                    </span>
                    <span className="custom-toggle__label">силовые</span>
                  </label>
                </div>
              </li>
              <li className="gym-catalog-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input
                      type="checkbox"
                      defaultValue="type"
                      name="type"
                      defaultChecked
                    />
                    <span className="custom-toggle__icon">
                      <svg width={9} height={6} aria-hidden="true">
                        <use xlinkHref="#arrow-check" />
                      </svg>
                    </span>
                    <span className="custom-toggle__label">кроссфит</span>
                  </label>
                </div>
              </li>
              <li className="gym-catalog-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input
                      type="checkbox"
                      defaultValue="type-1"
                      name="type"
                      defaultChecked
                    />
                    <span className="custom-toggle__icon">
                      <svg width={9} height={6} aria-hidden="true">
                        <use xlinkHref="#arrow-check" />
                      </svg>
                    </span>
                    <span className="custom-toggle__label">бокс</span>
                  </label>
                </div>
              </li>
              <li className="gym-catalog-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input type="checkbox" defaultValue="type-1" name="type" />
                    <span className="custom-toggle__icon">
                      <svg width={9} height={6} aria-hidden="true">
                        <use xlinkHref="#arrow-check" />
                      </svg>
                    </span>
                    <span className="custom-toggle__label">бег</span>
                  </label>
                </div>
              </li>
              <li className="gym-catalog-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input type="checkbox" defaultValue="type-1" name="type" />
                    <span className="custom-toggle__icon">
                      <svg width={9} height={6} aria-hidden="true">
                        <use xlinkHref="#arrow-check" />
                      </svg>
                    </span>
                    <span className="custom-toggle__label">аэробика</span>
                  </label>
                </div>
              </li>
              <li className="gym-catalog-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input type="checkbox" defaultValue="type-1" name="type" />
                    <span className="custom-toggle__icon">
                      <svg width={9} height={6} aria-hidden="true">
                        <use xlinkHref="#arrow-check" />
                      </svg>
                    </span>
                    <span className="custom-toggle__label">пилатес</span>
                  </label>
                </div>
              </li>
              <li className="gym-catalog-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input type="checkbox" defaultValue="type-1" name="type" />
                    <span className="custom-toggle__icon">
                      <svg width={9} height={6} aria-hidden="true">
                        <use xlinkHref="#arrow-check" />
                      </svg>
                    </span>
                    <span className="custom-toggle__label">стрейчинг</span>
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div className="gym-catalog-form__block gym-catalog-form__block--sort">
            <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">
              Сортировка
            </h4>
            <div className="btn-radio-sort gym-catalog-form__radio">
              <label>
                <input type="radio" name="sort" defaultChecked />
                <span className="btn-radio-sort__label">Дешевле</span>
              </label>
              <label>
                <input type="radio" name="sort" />
                <span className="btn-radio-sort__label">Дороже</span>
              </label>
              <label>
                <input type="radio" name="sort" />
                <span className="btn-radio-sort__label">Бесплатные</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
