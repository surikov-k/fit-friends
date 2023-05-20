import { FILES_URL } from '../../app.constants';
import { useState } from 'react';
import cn from 'classnames';

type CertificateCardProps = {
  certificate?: string;
  onDeleteClick: (certificate: string) => void;
};

export function CertificateCard({
  certificate = '',
  onDeleteClick,
}: CertificateCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const filename = certificate.substring(0, certificate.lastIndexOf('.'));
  const ext = certificate.substring(certificate.lastIndexOf('.') + 1);

  return (
    <li className="personal-account-coach__item">
      <div
        className={cn('certificate-card', {
          'certificate-card--edit': isEditing,
        })}
      >
        <div className="certificate-card__image">
          <picture>
            {/*<source*/}
            {/*  type="image/webp"*/}
            {/*  srcSet={`${FILES_URL}${filename}.webp, ${FILES_URL}${filename}@2x.webp 2x`}*/}
            {/*/>*/}
            <img
              src={`${FILES_URL}${filename}.${ext}`}
              style={{ objectFit: 'cover' }}
              // srcSet={`${FILES_URL}${filename}@2x.${ext} 2x`}
              width="294"
              height="360"
              alt="Сертификат"
            />
          </picture>
        </div>
        <div className="certificate-card__buttons">
          <button
            className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
            type="button"
            onClick={() => setIsEditing(true)}
          >
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"></use>
            </svg>
            <span>Изменить</span>
          </button>
          <button
            className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
            type="button"
            onClick={() => setIsEditing(false)}
          >
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"></use>
            </svg>
            <span>Сохранить</span>
          </button>
          <div className="certificate-card__controls">
            <button
              className="btn-icon certificate-card__control"
              type="button"
            >
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-change"></use>
              </svg>
            </button>
            <button
              className="btn-icon certificate-card__control"
              type="button"
              onClick={() => onDeleteClick(certificate)}
            >
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-trash"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
