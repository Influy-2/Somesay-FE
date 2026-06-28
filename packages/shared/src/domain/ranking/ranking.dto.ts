import type { ApiPage } from '../../api/types';
import type { CreatorRankingDto } from '../creator/creator.dto';
import type { PreviewInfoDto } from '../product/product.dto';

export type CreatorRankingPageDto = ApiPage<CreatorRankingDto>;

export type ProductRankingPreviewPageDto = ApiPage<PreviewInfoDto>;
