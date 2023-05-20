import 'swiper/css';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CertificateCard } from '../certificate-card';
import { ChangeEvent } from 'react';
import { apiUpload } from '../../store';
import { updateUserProfileAction } from '../../store/user-slice';
import { useAppDispatch } from '../../hooks';
import { APIRoute } from '../../app.constants';

type CoachCertificatesProps = {
  certificates?: string[];
};

export function CoachCertificates({
  certificates = [],
}: CoachCertificatesProps) {
  const dispatch = useAppDispatch();

  const onCertificateInputChange = async (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    if (!evt.target.files) {
      return;
    }

    const formData = new FormData();
    formData.append('certificate', evt.target.files[0]);

    const { data: newCertificate } = await apiUpload.post(
      APIRoute.UploadCertificate,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    dispatch(
      updateUserProfileAction({
        certificates: [newCertificate.filename].concat(certificates),
      })
    );
  };

  const onCertificateDeleteClick = (deletedCertificate: string) => {
    dispatch(
      updateUserProfileAction({
        certificates: certificates.filter(
          (certificate) => certificate !== deletedCertificate
        ),
      })
    );
  };

  return (
    <div className="personal-account-coach__additional-info">
      <div className="personal-account-coach__label-wrapper">
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
        <label className="btn-flat btn-flat--underlined personal-account-coach__button">
          <input
            className="visually-hidden"
            type="file"
            accept="image/png, image/jpeg"
            onChange={onCertificateInputChange}
          />
          <svg width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-import"></use>
          </svg>
          <span>Загрузить</span>
        </label>
        <div className="personal-account-coach__controls">
          <button
            className="btn-icon personal-account-coach__control"
            type="button"
            aria-label="previous"
          >
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-left"></use>
            </svg>
          </button>
          <button
            className="btn-icon personal-account-coach__control"
            type="button"
            aria-label="next"
          >
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
      <Swiper
        className={'personal-account-coach__list'}
        tag={'ul'}
        modules={[Navigation]}
        slidesPerView={3}
        navigation={{
          prevEl: 'button[aria-label="previous"]',
          nextEl: 'button[aria-label="next"]',
        }}
      >
        {certificates.map((certificate) => (
          <SwiperSlide key={certificate}>
            <CertificateCard
              certificate={certificate}
              onDeleteClick={onCertificateDeleteClick}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
