/** Gap-priority formula documented in PolicyGap, sections 9.4 and 12.3. */
export function computePolicyGapPriority(
  statusScore: number | null,
  confidence: number,
  weight = 1,
  businessImpact = 1,
): number {
  if (statusScore === null || statusScore >= 1) return 0;
  return Number((businessImpact * weight * (1 - statusScore) * (0.5 + 0.5 * confidence)).toFixed(4));
}
