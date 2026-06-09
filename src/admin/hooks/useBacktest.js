import { useMemo } from 'react'

export function useBacktest(profile, config) {
  return useMemo(() => {
    const { startTier, annualSpend, activeDays, eventsAttended, contentPosts, referrals } = profile
    const { tiers, pointsAcquisition, creditsAcquisition, exchangeRate, finance } = config

    // Find starting tier info
    const startTierInfo = tiers.find((t) => t.level === startTier) || tiers[0]
    const multiplier = startTierInfo.pointsMultiplier || 1.0

    // Calculate Points from purchase
    const purchasePoints = Math.round(annualSpend * multiplier)

    // Calculate Points from behaviors
    const signinPoints = activeDays * 20 // avg 20 per day with streak
    const eventPoints = eventsAttended * 500 // avg event reward
    const contentPoints = contentPosts * 100
    const referralPoints = referrals * 500
    const behaviorPoints = signinPoints + eventPoints + contentPoints + referralPoints

    const totalPoints = purchasePoints + behaviorPoints

    // Calculate Credits
    const purchaseCredits = annualSpend // 1 yuan = 1 credit
    const signinCredits = activeDays * 50 // avg credits per day
    const eventCredits = eventsAttended * 800
    const contentCredits = contentPosts * 200
    const referralCredits = referrals * 1000
    const behaviorCredits = signinCredits + eventCredits + contentCredits + referralCredits

    const totalCredits = purchaseCredits + behaviorCredits

    // Predict end tier
    let endTier = startTier
    for (let i = tiers.length - 1; i >= 0; i--) {
      if (totalCredits >= tiers[i].credits) {
        endTier = tiers[i].level
        break
      }
    }

    // Financials
    const grossProfit = annualSpend * finance.grossMargin
    const pointsCost = (totalPoints / 100) * exchangeRate
    const costRatio = grossProfit > 0 ? (pointsCost / grossProfit) * 100 : 0

    // MBC conversion probability (simplified)
    const mbcThreshold = tiers.find((t) => t.level === 'L4')?.credits || 100000
    const mbcProgress = Math.min(100, Math.round((totalCredits / mbcThreshold) * 100))

    return {
      purchasePoints,
      behaviorPoints,
      totalPoints,
      purchaseCredits,
      behaviorCredits,
      totalCredits,
      endTier,
      grossProfit: Math.round(grossProfit),
      pointsCost: Math.round(pointsCost),
      costRatio: Math.round(costRatio * 10) / 10,
      mbcProgress,
    }
  }, [profile, config])
}
