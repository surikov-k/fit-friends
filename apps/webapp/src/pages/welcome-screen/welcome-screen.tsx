import { useContext } from 'react';
import { ModalContext } from '../../contexts';
import { ModalLogin } from '../../components/modal-login';
import { ModalRegister } from '../../components/modal-register';

export function WelcomeScreen(): JSX.Element {
  const { open } = useContext(ModalContext);

  const loginClickHandler = () => {
    open(<ModalLogin />);
  };

  const registerClickHandler = () => {
    open(<ModalRegister />);
  };

  return (
    <main>
      <div className="intro">
        <div className="intro__background">
          <picture>
            <source
              type="image/webp"
              srcSet="../../assets/img/content/sitemap/background.webp, ../../assets/img/content/sitemap/background@2x.webp 2x"
            />
            <img
              src="../../assets/img/content/sitemap/background.jpg"
              srcSet="../../assets/img/content/sitemap/background@2x.jpg 2x"
              width="1440"
              height="1024"
              alt="Фон с бегущей девушкой"
            />
          </picture>
        </div>
        <div className="intro__wrapper">
          <svg
            className="intro__icon"
            width="60"
            height="60"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-logotype"></use>
          </svg>
          <div className="intro__title-logo">
            <picture>
              <source
                type="image/webp"
                srcSet="../../assets/img/content/sitemap/title-logo.webp, ../../assets/img/content/sitemap/title-logo@2x.webp 2x"
              />
              <img
                src="../../assets/img/content/sitemap/title-logo.png"
                srcSet="../../assets/img/content/sitemap/title-logo@2x.png 2x"
                width="934"
                height="455"
                alt="Логотип Fit Friends"
              />
            </picture>
          </div>
          <div className="intro__buttons">
            <button
              className="btn intro__button"
              type="button"
              onClick={registerClickHandler}
            >
              Регистрация
            </button>
            <p className="intro__text">
              Есть аккаунт?{' '}
              <button
                className="intro__link"
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
                onClick={loginClickHandler}
              >
                Вход
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
