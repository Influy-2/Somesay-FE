import type { ApiPage } from '../../api/types';
import type { CreatorRankingResponseDto } from '../creator/creator.dto';
import type { ProductDto } from '../product/product.dto';

export type CreatorRankingPageDto = ApiPage<CreatorRankingResponseDto>;

export type ProductRankingPreviewPageDto = ApiPage<ProductDto>;
