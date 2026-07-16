import type { UserProductRequestType } from '@somesay/shared';
import { productFitPayloadSchema } from '../schemas/onboarding.schema';
import type { OnboardingDraft } from '../types/onboarding.types';

export const buildProductFitPayloads = (
  draft: OnboardingDraft
): UserProductRequestType[] => {
  const payloads: UserProductRequestType[] = [];

  if (draft.matchedProductIds.length > 0) {
    payloads.push(
      productFitPayloadSchema.parse({
        status: 'MATCHED',
        productIds: draft.matchedProductIds,
      })
    );
  }

  if (draft.mismatchedProductIds.length > 0) {
    payloads.push(
      productFitPayloadSchema.parse({
        status: 'MISMATCHED',
        productIds: draft.mismatchedProductIds,
      })
    );
  }

  return payloads;
};
