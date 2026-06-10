const FIRST_NAMES = ['George', 'Jason', 'Kevin', 'Ryan', 'Alex', 'Chris', 'Mike', 'David', 'Tom', 'Jack', 'Leo', 'Ben', 'Eric', 'Sam', 'Tony', 'Nick', 'Max', 'John', 'Luke', 'Mark']
const LAST_NAMES = ['G.', 'L.', 'W.', 'C.', 'H.', 'M.', 'K.', 'Z.', 'F.', 'Y.', 'P.', 'S.', 'R.', 'T.', 'B.', 'N.', 'D.', 'J.', 'Q.', 'V.']
const TIERS = ['L1', 'L2', 'L3', 'L4', 'L5']

const REGIONS = ['上海', '北京', '深圳', '广州', '杭州', '成都']
const FITS = ['修身', '标准', '宽松']
const COLORS = ['绿色', '藏青', '白色', '黑色', '卡其', '酒红', '橙色', '灰色']
const COURSES = ['林克斯球场', '公园式球场', '山地球场', '沙漠球场']
const TAGS = ['穿搭达人', '周末球友', '装备控', '社交蝴蝶', '技术流', '颜值党', '新手入门', '铁杆粉丝']

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function shuffle(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function formatDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function generateTransactions() {
  const txs = []
  const count = randomInt(5, 20)
  for (let i = 0; i < count; i++) {
    const isEarn = Math.random() > 0.3
    const sources = ['purchase', 'signin', 'event', 'content', 'referral', 'tournament']
    const amounts = isEarn ? [100, 200, 300, 500, 1000, 2000] : [-500, -1000, -2500, -5000, -10000]
    txs.push({
      type: isEarn ? 'earn' : 'spend',
      amount: amounts[randomInt(0, amounts.length - 1)],
      source: sources[randomInt(0, sources.length - 1)],
      date: formatDate(randomDate(new Date('2025-06-01'), new Date())),
    })
  }
  return txs.sort((a, b) => new Date(b.date) - new Date(a.date))
}

function generateActivities() {
  const acts = []
  const count = randomInt(3, 12)
  for (let i = 0; i < count; i++) {
    const types = ['login', 'purchase', 'event', 'content', 'share']
    acts.push({
      type: types[randomInt(0, types.length - 1)],
      amount: types[randomInt(0, types.length - 1)] === 'purchase' ? randomInt(1, 5) * 2000 : undefined,
      date: formatDate(randomDate(new Date('2025-06-01'), new Date())),
    })
  }
  return acts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

function generateProfile() {
  return {
    photo: '',
    height: randomInt(160, 190),
    weight: randomInt(55, 95),
    fitPreference: FITS[randomInt(0, 2)],
    colorPreference: shuffle(COLORS).slice(0, randomInt(2, 4)),
    coursePreference: COURSES[randomInt(0, 3)],
    region: REGIONS[randomInt(0, 5)],
    tags: shuffle(TAGS).slice(0, randomInt(2, 4)),
  }
}

function getStatus(lastActive) {
  const days = Math.floor((Date.now() - new Date(lastActive).getTime()) / (1000 * 60 * 60 * 24))
  if (days <= 30) return 'active'
  if (days <= 90) return 'dormant'
  return 'churned'
}

export function generateMockMembers(count = 20) {
  return Array.from({ length: count }, (_, i) => {
    const first = FIRST_NAMES[i % FIRST_NAMES.length]
    const last = LAST_NAMES[Math.floor(i / FIRST_NAMES.length) % LAST_NAMES.length]
    const name = `${first} ${last}`
    const tier = TIERS[randomInt(0, TIERS.length - 1)]
    const totalSpend = randomInt(2000, 200000)
    const pointsBalance = randomInt(0, 80000)
    const creditsTotal = randomInt(0, 500000)
    const lastActive = formatDate(randomDate(new Date('2025-06-01'), new Date()))
    const joinDate = formatDate(randomDate(new Date('2024-01-01'), new Date('2025-05-01')))

    return {
      id: `member_${Date.now()}_${i}`,
      name,
      email: `${first.toLowerCase()}.${last.toLowerCase().replace('.', '')}@example.com`,
      phone: `138****${String(randomInt(1000, 9999)).padStart(4, '0')}`,
      avatar: first[0],
      tier,
      status: getStatus(lastActive),
      joinDate,
      totalSpend,
      pointsBalance,
      creditsTotal,
      lastActive,
      profile: generateProfile(),
      transactions: generateTransactions(),
      activities: generateActivities(),
    }
  })
}
