import type {
  UserProductRequestDto,
  UserProductResponseDto,
  UserProductStatusDto,
} from './userProduct.dto';
import type {
  UserProductRequestType,
  UserProductResponseType,
  UserProductStatusType,
} from './userProduct.types';

const USER_PRODUCT_STATUS_TO_DTO: Record<
  UserProductStatusType,
  UserProductStatusDto
> = {
  MATCHED: 'MATCHED',
  MISMATCHED: 'UNMATCHED',
};

const USER_PRODUCT_STATUS_FROM_DTO: Record<
  UserProductStatusDto,
  UserProductStatusType
> = {
  MATCHED: 'MATCHED',
  UNMATCHED: 'MISMATCHED',
};

// 프론트엔드의 상품 적합 상태를 백엔드 DTO 상태로 변환합니다.
export const mapUserProductRequestToDto = ({
  status,
  productIds,
}: UserProductRequestType): UserProductRequestDto => ({
  status: USER_PRODUCT_STATUS_TO_DTO[status],
  productIds,
});

// 백엔드 DTO의 상품 적합 상태를 프론트엔드 상태로 변환합니다.
export const mapUserProductResponseDto = ({
  status,
  details,
}: UserProductResponseDto): UserProductResponseType => ({
  status: USER_PRODUCT_STATUS_FROM_DTO[status],
  details,
});
