import { useState, useCallback, useMemo } from 'react'
import { generateMockMembers } from './memberData'

const STORAGE_KEY = 'admin:members'

const DEFAULT_PROFILE = {
  photo: '',
  height: 175,
  weight: 70,
  fitPreference: '标准',
  colorPreference: [],
  coursePreference: '',
  region: '',
  tags: [],
}

function migrateMember(member) {
  if (!member.profile) {
    return { ...member, profile: { ...DEFAULT_PROFILE } }
  }
  return {
    ...member,
    profile: { ...DEFAULT_PROFILE, ...member.profile },
  }
}

function loadMembers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return parsed.map(migrateMember)
    }
  } catch {
    // ignore
  }
  const mock = generateMockMembers(20)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mock))
  return mock
}

function saveMembers(members) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members))
}

export function useMembers() {
  const [members, setMembers] = useState(loadMembers)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterTier, setFilterTier] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10

  const filtered = useMemo(() => {
    let result = members
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter((m) =>
        m.name.toLowerCase().includes(q) ||
        m.phone.includes(q) ||
        (m.profile?.region && m.profile.region.includes(q)) ||
        (m.profile?.tags && m.profile.tags.some((t) => t.includes(q)))
      )
    }
    if (filterTier !== 'all') {
      result = result.filter((m) => m.tier === filterTier)
    }
    if (filterStatus !== 'all') {
      result = result.filter((m) => m.status === filterStatus)
    }
    return result
  }, [members, searchQuery, filterTier, filterStatus])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const addMember = useCallback((member) => {
    const newMember = {
      ...member,
      id: `member_${Date.now()}`,
      joinDate: new Date().toISOString().split('T')[0],
      profile: member.profile || { ...DEFAULT_PROFILE },
    }
    setMembers((prev) => {
      const next = [newMember, ...prev]
      saveMembers(next)
      return next
    })
  }, [])

  const updateMember = useCallback((id, updates) => {
    setMembers((prev) => {
      const next = prev.map((m) => {
        if (m.id !== id) return m
        const updated = { ...m, ...updates }
        if (updates.profile) {
          updated.profile = { ...m.profile, ...updates.profile }
        }
        return updated
      })
      saveMembers(next)
      return next
    })
  }, [])

  const deleteMember = useCallback((id) => {
    setMembers((prev) => {
      const next = prev.filter((m) => m.id !== id)
      saveMembers(next)
      return next
    })
  }, [])

  const adjustPoints = useCallback((id, type, amount, reason) => {
    setMembers((prev) => {
      const next = prev.map((m) => {
        if (m.id !== id) return m
        const isPoints = type.includes('Points')
        const isAdd = type.includes('增加')
        const delta = isAdd ? amount : -amount
        const newBalance = isPoints ? m.pointsBalance + delta : m.pointsBalance
        const newCredits = !isPoints ? m.creditsTotal + delta : m.creditsTotal
        return {
          ...m,
          pointsBalance: Math.max(0, newBalance),
          creditsTotal: Math.max(0, newCredits),
          transactions: [
            {
              type: isAdd ? 'earn' : 'spend',
              amount: delta,
              source: 'manual',
              reason,
              date: new Date().toISOString().split('T')[0],
            },
            ...m.transactions,
          ],
        }
      })
      saveMembers(next)
      return next
    })
  }, [])

  const resetData = useCallback(() => {
    const mock = generateMockMembers(20)
    setMembers(mock)
    saveMembers(mock)
    setPage(1)
  }, [])

  return {
    members,
    filtered,
    paginated,
    totalPages,
    page,
    setPage,
    searchQuery,
    setSearchQuery,
    filterTier,
    setFilterTier,
    filterStatus,
    setFilterStatus,
    addMember,
    updateMember,
    deleteMember,
    adjustPoints,
    resetData,
  }
}
