import { useState, useCallback, useEffect } from 'react'
import { pointsAcquisition as defaultPointsAcquisition, creditsAcquisition as defaultCreditsAcquisition, pointsRedemption as defaultPointsRedemption } from '../../data/points'
import { tiers as defaultTiers } from '../../data/tiers'

const KEYS = {
  pointsAcquisition: 'admin:pointsAcquisition',
  creditsAcquisition: 'admin:creditsAcquisition',
  pointsRedemption: 'admin:pointsRedemption',
  tiers: 'admin:tiers',
  finance: 'admin:finance',
  exchangeRate: 'admin:exchangeRate',
}

const DEFAULTS = {
  pointsAcquisition: defaultPointsAcquisition,
  creditsAcquisition: defaultCreditsAcquisition,
  pointsRedemption: defaultPointsRedemption,
  tiers: defaultTiers,
  finance: { avgPrice: 2000, grossMargin: 0.3, giftCost: 7000, annualFee: 30000 },
  exchangeRate: 3, // 100 Points = ¥3
}

function load(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : defaultValue
  } catch {
    return defaultValue
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function useAdminConfig() {
  const [pointsAcquisition, setPointsAcquisition] = useState(() => load(KEYS.pointsAcquisition, DEFAULTS.pointsAcquisition))
  const [creditsAcquisition, setCreditsAcquisition] = useState(() => load(KEYS.creditsAcquisition, DEFAULTS.creditsAcquisition))
  const [pointsRedemption, setPointsRedemption] = useState(() => load(KEYS.pointsRedemption, DEFAULTS.pointsRedemption))
  const [tiers, setTiers] = useState(() => load(KEYS.tiers, DEFAULTS.tiers))
  const [finance, setFinance] = useState(() => load(KEYS.finance, DEFAULTS.finance))
  const [exchangeRate, setExchangeRate] = useState(() => load(KEYS.exchangeRate, DEFAULTS.exchangeRate))

  const persist = useCallback(() => {
    save(KEYS.pointsAcquisition, pointsAcquisition)
    save(KEYS.creditsAcquisition, creditsAcquisition)
    save(KEYS.pointsRedemption, pointsRedemption)
    save(KEYS.tiers, tiers)
    save(KEYS.finance, finance)
    save(KEYS.exchangeRate, exchangeRate)
  }, [pointsAcquisition, creditsAcquisition, pointsRedemption, tiers, finance, exchangeRate])

  const reset = useCallback(() => {
    setPointsAcquisition(DEFAULTS.pointsAcquisition)
    setCreditsAcquisition(DEFAULTS.creditsAcquisition)
    setPointsRedemption(DEFAULTS.pointsRedemption)
    setTiers(DEFAULTS.tiers)
    setFinance(DEFAULTS.finance)
    setExchangeRate(DEFAULTS.exchangeRate)
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k))
  }, [])

  useEffect(() => {
    persist()
  }, [persist])

  return {
    pointsAcquisition, setPointsAcquisition,
    creditsAcquisition, setCreditsAcquisition,
    pointsRedemption, setPointsRedemption,
    tiers, setTiers,
    finance, setFinance,
    exchangeRate, setExchangeRate,
    persist, reset,
  }
}
