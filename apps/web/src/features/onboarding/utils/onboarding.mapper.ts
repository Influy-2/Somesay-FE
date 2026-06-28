import {
  productFitPayloadSchema,
  signupPayloadSchema,
  type ProductFitPayload,
  type SignupPayload,
} from '../schemas/onboarding.schema';
import type { OnboardingDraft } from '../types/onboarding.types';

export const buildSignupPayload = (draft: OnboardingDraft): SignupPayload => {
  return signupPayloadSchema.parse({
    nickname: draft.nickname,
    gender: draft.gender,
    age: draft.age,
    concerns: draft.concerns,
    skinTypeNames: draft.skinTypeNames,
  });
};

export const buildProductFitPayloads = (
  draft: OnboardingDraft
): ProductFitPayload[] => {
  const payloads: ProductFitPayload[] = [];

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
