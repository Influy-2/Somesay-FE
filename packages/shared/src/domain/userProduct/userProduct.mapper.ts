import type {
  UserProductRequestDto,
  UserProductResponseDto,
} from './userProduct.dto';
import type {
  UserProductRequestType,
  UserProductResponseType,
} from './userProduct.types';

// 프론트엔드의 상품 적합 상태를 백엔드 DTO 상태로 변환합니다.
export const mapUserProductRequestToDto = ({
  status,
  productIds,
}: UserProductRequestType): UserProductRequestDto => ({
  status: status === 'MISMATCHED' ? 'UNMATCHED' : status,
  productIds,
});

// 백엔드 DTO의 상품 적합 상태를 프론트엔드 상태로 변환합니다.
export const mapUserProductResponseDto = ({
  status,
  details,
}: UserProductResponseDto): UserProductResponseType => ({
  status: status === 'UNMATCHED' ? 'MISMATCHED' : status,
  details,
});
