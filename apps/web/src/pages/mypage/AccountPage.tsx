import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { PATH } from '@/routes/path';
import { PageHeader } from '@/shared/components';
import { ArrowBackIcon, CameraIcon } from '@/shared/icons';
import { InfoSection, InfoRow } from '@/features/myPage';
import { MOCK_ACCOUNT } from '@/features/myPage/components/mockData';

export const AccountPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      // TODO: API 연결 후 업로드 로직 추가
      console.log(url);
    }
  };

  const {
    profileImageUrl,
    nickname,
    gender,
    age,
    skinTypes,
    skinConcerns,
    goodProducts,
    badProducts,
  } = MOCK_ACCOUNT;

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <PageHeader
        left={
          <button type="button" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </button>
        }
        title="내 계정"
      />
      <div className="mt-13.5 flex flex-1 flex-col px-4 pb-4">
        {/* 프로필 이미지 */}
        <div className="flex justify-center pt-7 pb-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <button
            type="button"
            className="relative"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="bg-grey02 size-20 overflow-hidden rounded-full">
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="프로필 이미지"
                  className="size-full object-cover"
                />
              ) : (
                <div className="size-full" />
              )}
            </div>
            <div className="absolute right-0 bottom-0 size-6 overflow-hidden rounded-full">
              <CameraIcon className="size-full" />
            </div>
          </button>
        </div>
        <div className="divide-grey03 flex flex-col divide-y">
          {/* 기본 정보 수정 */}
          <InfoSection title="기본 정보 수정">
            <InfoRow
              label="닉네임"
              onClick={() =>
                navigate(
                  `${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.ACCOUNT}/${PATH.MY_PAGE.NICKNAME}`
                )
              }
            >
              <span>{nickname}</span>
            </InfoRow>
            <InfoRow
              label="성별"
              onClick={() =>
                navigate(
                  `${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.ACCOUNT}/${PATH.MY_PAGE.GENDER}`
                )
              }
            >
              <span>{gender}</span>
            </InfoRow>
            <InfoRow
              label="연령"
              onClick={() =>
                navigate(
                  `${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.ACCOUNT}/${PATH.MY_PAGE.AGE}`
                )
              }
            >
              <span>{age}</span>
            </InfoRow>
          </InfoSection>
          {/* 피부 정보 수정 */}
          <InfoSection title="피부 정보 수정">
            <InfoRow
              label="피부 타입"
              onClick={() =>
                navigate(
                  `${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.ACCOUNT}/${PATH.MY_PAGE.SKIN_TYPE}`
                )
              }
            >
              <span>{skinTypes.join(', ')}</span>
            </InfoRow>
            <InfoRow
              label="피부 고민"
              onClick={() =>
                navigate(
                  `${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.ACCOUNT}/${PATH.MY_PAGE.SKIN_CONCERN}`
                )
              }
            >
              <span>{skinConcerns.join(', ')}</span>
            </InfoRow>
          </InfoSection>
          {/* 제품 적합도 */}
          <InfoSection title="제품 적합도">
            <InfoRow
              label="잘 맞았던 제품"
              variant="vertical"
              onClick={() =>
                navigate(
                  `${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.ACCOUNT}/${PATH.MY_PAGE.GOOD_PRODUCTS}`
                )
              }
            >
              {goodProducts.length > 0 && (
                <div className="scrollbar-hide flex gap-2 overflow-x-auto">
                  {goodProducts.map((product) => (
                    <div
                      key={product.productId}
                      className="flex w-20 flex-col items-center gap-2"
                    >
                      <div
                        className="bg-grey02 size-15 overflow-hidden rounded-full"
                        onClick={() =>
                          navigate(`${PATH.PRODUCT.BASE}/${product.productId}`)
                        }
                      >
                        {product.imageUrl && (
                          <img
                            src={product.imageUrl}
                            alt={product.productName}
                            className="size-full object-cover"
                          />
                        )}
                      </div>
                      <p className="caption1-m text-grey-black line-clamp-2 w-full text-center">
                        {product.productName}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </InfoRow>
            <InfoRow
              label="안 맞았던 제품"
              variant="vertical"
              onClick={() =>
                navigate(
                  `${PATH.MY_PAGE.BASE}/${PATH.MY_PAGE.ACCOUNT}/${PATH.MY_PAGE.BAD_PRODUCTS}`
                )
              }
            >
              {badProducts.length > 0 && (
                <div className="scrollbar-hide flex gap-2 overflow-x-auto">
                  {badProducts.map((product) => (
                    <div
                      key={product.productId}
                      className="flex w-20 flex-col items-center gap-2"
                    >
                      <div
                        className="bg-grey02 size-15 overflow-hidden rounded-full"
                        onClick={() =>
                          navigate(`${PATH.PRODUCT.BASE}/${product.productId}`)
                        }
                      >
                        {product.imageUrl && (
                          <img
                            src={product.imageUrl}
                            alt={product.productName}
                            className="size-full object-cover"
                          />
                        )}
                      </div>
                      <p className="caption1-m text-grey-black line-clamp-2 w-full text-center">
                        {product.productName}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </InfoRow>
          </InfoSection>
          {/* 계정 설정 */}
          <InfoSection title="계정 설정">
            <InfoRow label="로그아웃" onClick={() => {}} />
            <InfoRow label="회원탈퇴" onClick={() => {}} />
          </InfoSection>
        </div>
      </div>
    </div>
  );
};
