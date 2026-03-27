const ASSET_IMAGES = import.meta.glob('../assets/*/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
})

const CATEGORY_FOLDER_BY_SLUG = {
  'electric-chain-hoists': 'ElectricChainHoists',
  'manual-hoists': 'ManualHoists',
  'wire-rope-hoists': 'WireRopeHoists',
  'eot-cranes': 'EOTCranes',
  'overhead-cranes': 'OverheadCrane',
  'material-handling': 'MaterialHandling',
  'storage-and-retrieval': 'StorageRetrival',
  'ergonomic-handling-solutions': 'ErgonomicHandling',
}

const SHARED_FOLDER = 'shared'

const CATEGORY_TITLE_SHARED_IMAGE_BY_SLUG = {
  'electric-chain-hoists': 'hc-plus',
  'manual-hoists': 'indef-c',
}

const SHARED_IMAGE_BY_PRODUCT_ID = {
  'electric-chain-hoist-eh-ii-baby': 'eh-ii-baby',
  'material-handling-electric-chain-hoist-eh-ii-baby': 'eh-ii-baby',
  'electric-chain-hoist-hc-plus': 'hc-plus',
  'material-handling-electric-chain-hoist-hc-plus': 'hc-plus',
  'eot-crane-kit': 'crane-kit',
  'overhead-cranes-crane-kit': 'crane-kit',
  'material-handling-crane-kit': 'crane-kit',
  'eot-crane-double-girder': 'dgeot-crane',
  'overhead-cranes-dgeot-crane': 'dgeot-crane',
  'material-handling-dgeot-crane': 'dgeot-crane',
  'eot-crane-single-girder': 'sgeot-crane',
  'overhead-cranes-sgeot-crane': 'sgeot-crane',
  'material-handling-sgeot-crane': 'sgeot-crane',
  'eot-crane-underslung': 'underslung-eot',
  'overhead-cranes-useot-crane': 'underslung-eot',
  'manual-hoists-indef-p': 'indef-p',
  'material-handling-indef-p': 'indef-p',
  'manual-hoists-indef-r': 'indef-r',
  'material-handling-indef-r': 'indef-r',
  'manual-hoists-indef-c': 'indef-c',
  'wire-rope-hoist-hw': 'hw-wire-rope-hoist',
  'material-handling-hw-series': 'hw-wire-rope-hoist',
  'wire-rope-hoist-ir': 'ir-hoist',
  'material-handling-ir-series': 'ir-hoist',
  'wire-rope-hoist-wrh-i-ii-iii': 'wrh-i-ii-iii',
  'material-handling-wrh-i-ii-iii-hoist': 'wrh-i-ii-iii',
  'overhead-cranes-istacker': 'istacker',
  'material-handling-istacker': 'istacker',
  'storage-retrieval-istacker': 'istacker',
  'overhead-cranes-jib-crane': 'jib-crane',
  'material-handling-jib-crane': 'jib-crane',
  'overhead-cranes-gantry-crane': 'semi-gantry-ur-5t',
  'material-handling-gantry-crane': 'semi-gantry-ur-5t',
}

const PRODUCT_IMAGE_HINT_BY_ID = {
  'electric-chain-hoist-eh-ii-baby': 'EH-II-Baby',
  'electric-chain-hoist-hc-plus': 'HC+ electric chain',
  'electric-chain-hoist-ch-iii-electron': 'CH-III',
  'electric-chain-hoist-ch-iv-proton': 'CH-IV-1',
  'manual-hoists-et-pt-gt': 'ETPTGT',
  'manual-hoists-stier-rlh': 'StierRLH',
  'wire-rope-hoist-wrh-n-series': 'WRH-N-Series',
  'wire-rope-hoist-ur': 'UR-Series',
  'wire-rope-hoist-smd': 'SMD-HOIST',
  'eot-crane-single-girder': 'sgeot',
  'eot-crane-double-girder': 'DGEOT',
  'eot-crane-underslung': 'UNDERSLUNG',
  'overhead-cranes-useot-crane': 'UNDERSLUNG',
  'overhead-cranes-light-rail-system': 'LR',
  'overhead-cranes-semi-gantry-crane': 'SG-SEMI-GANTRY',
  'material-handling-electric-chain-hoist-hc-plus': 'HC-PNG',
  'material-handling-dgeot-crane': 'DG-EOT',
  'material-handling-sgeot-crane': 'sgeot',
  'material-handling-jib-crane': 'JIB-Crane',
  'material-handling-gantry-crane': 'UR-5T-SINGLE-GIRDER-SEMI-GANTRY',
  'storage-retrieval-roll-out-rack': 'Rollout-Rack',
}

const STOP_TOKENS = new Set(['png', 'jpg', 'jpeg', 'webp', 'svg', 'and', 'the'])

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/\b\d+x\d+\b/g, ' ')
    .replace(/\b\d+\b/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}

function toTokens(value) {
  return normalize(value)
    .split(' ')
    .filter((token) => token && !STOP_TOKENS.has(token))
}

function buildImageIndex() {
  const byFolder = new Map()

  Object.entries(ASSET_IMAGES).forEach(([relativePath, src]) => {
    const parts = relativePath.split('/')
    const fileName = parts[parts.length - 1] || ''
    const folder = parts[parts.length - 2] || ''
    const baseName = fileName.replace(/\.[^.]+$/, '')

    const record = {
      src,
      folder,
      baseName,
      normalizedBase: normalize(baseName),
      isTitle: /title$/i.test(baseName),
    }

    if (!byFolder.has(folder)) {
      byFolder.set(folder, [])
    }

    byFolder.get(folder).push(record)
  })

  return byFolder
}

const IMAGE_INDEX = buildImageIndex()

function getCategoryFolder(category) {
  const slug = category?.slug
  if (slug && CATEGORY_FOLDER_BY_SLUG[slug]) {
    return CATEGORY_FOLDER_BY_SLUG[slug]
  }

  const normalizedName = normalize(category?.categoryName)
  const fallback = Array.from(IMAGE_INDEX.keys()).find((folder) => normalize(folder) === normalizedName)
  return fallback || ''
}

function getBestMatch(candidates, query) {
  if (!candidates.length || !query) return ''

  const normalizedQuery = normalize(query)
  const queryTokens = new Set(toTokens(query))

  let best = null
  let bestScore = -1

  candidates.forEach((candidate) => {
    const normalizedCandidate = candidate.normalizedBase
    const candidateTokens = new Set(toTokens(candidate.baseName))

    let score = 0

    if (normalizedCandidate === normalizedQuery) score += 1000
    if (normalizedCandidate.includes(normalizedQuery)) score += 400
    if (normalizedQuery.includes(normalizedCandidate)) score += 250

    queryTokens.forEach((token) => {
      if (candidateTokens.has(token)) score += 60
    })

    score -= Math.abs(normalizedCandidate.length - normalizedQuery.length)

    if (score > bestScore) {
      bestScore = score
      best = candidate
    }
  })

  return best?.src || ''
}

function getSharedImageByName(baseName) {
  const sharedImages = IMAGE_INDEX.get(SHARED_FOLDER) || []
  if (!sharedImages.length || !baseName) return ''

  const normalizedBaseName = normalize(baseName)
  const exactSharedImage = sharedImages.find((image) => image.normalizedBase === normalizedBaseName)
  if (exactSharedImage) return exactSharedImage.src

  return getBestMatch(sharedImages, baseName)
}

export function getCategoryTitleImage(category) {
  const folder = getCategoryFolder(category)
  const categoryTitleSharedImage = CATEGORY_TITLE_SHARED_IMAGE_BY_SLUG[category?.slug]
  if (categoryTitleSharedImage) {
    const sharedImage = getSharedImageByName(categoryTitleSharedImage)
    if (sharedImage) return sharedImage
  }

  const images = IMAGE_INDEX.get(folder) || []

  const titleImage = images.find((image) => image.isTitle)
  if (titleImage) return titleImage.src

  return images[0]?.src || ''
}

export function getProductImage(category, product) {
  const sharedProductImage = getSharedImageByName(SHARED_IMAGE_BY_PRODUCT_ID[product?.id])
  if (sharedProductImage) return sharedProductImage

  const folder = getCategoryFolder(category)
  const images = (IMAGE_INDEX.get(folder) || []).filter((image) => !image.isTitle)

  const hintedQuery = PRODUCT_IMAGE_HINT_BY_ID[product?.id] || product?.title || ''
  const hintedMatch = getBestMatch(images, hintedQuery)
  if (hintedMatch) return hintedMatch

  return getBestMatch(images, product?.title || '')
}
