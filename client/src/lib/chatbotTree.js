import { getProductsByCategory } from './productCatalog'

export const chatbotQuestions = [
  {
    id: 'siteType',
    label: 'Where will you use this?',
    options: ['Factory', 'Warehouse', 'Construction site', 'Small workshop'],
  },
  {
    id: 'mainNeed',
    label: 'What do you need to do most?',
    options: [
      'Lift up and down only',
      'Move loads across a large area',
      'Move loads in one workstation',
      'Store and retrieve goods',
      'Help workers handle loads with less effort',
    ],
  },
  {
    id: 'loadBand',
    label: 'What is the heaviest load?',
    options: ['Under 1T', '1-3T', '3-5T', '5-20T', 'Over 20T'],
  },
  {
    id: 'liftHeight',
    label: 'How high do you need to lift?',
    options: ['Under 6m', '6-12m', '12-30m', 'Over 30m'],
  },
  {
    id: 'dailyUse',
    label: 'How often will you use it?',
    options: ['Few times a day', 'Many times a day', 'All day, every day'],
  },
  {
    id: 'powerType',
    label: 'What power type do you prefer?',
    options: ['Manual', 'Electric', 'Pneumatic', 'Not sure'],
  },
  {
    id: 'mountingType',
    label: 'Which setup is available at your site?',
    options: ['Existing beam or rail', 'Can install new overhead crane', 'Need movable setup', 'Not sure'],
  },
  {
    id: 'workArea',
    label: 'What is the work area like?',
    options: ['Indoor normal', 'Indoor heavy-duty', 'Outdoor', 'Hazardous area'],
  },
]

const recommendationDetails = {
  'Storage and Retrieval': 'Good for handling, stacking, and retrieving goods in warehouse operations.',
  'Overhead Cranes':
    'Good for bay-wide material movement with EOT, gantry, underslung and light-rail based overhead handling setups.',
  'Material Handling':
    'Good for end-to-end handling with hoists, crane kits and warehouse-assist products across light to heavy-duty operations.',
  'Ergonomic Handling Solutions': 'Good for reducing operator effort and making load handling safer.',
  'Manual Hoists':
    'Good for simple lifting needs without electrical power.',
  'Electric Chain Hoists':
    'Good for regular lifting with electric operation in low to mid load ranges.',
  'Wire Rope Hoists':
    'Good for heavier loads and higher lifts in demanding use.',
  'EOT Cranes':
    'Good for moving loads across larger factory bays.',
}

function createRecommendation(categoryName, primaryProductName, fallbackDescription) {
  const categoryProducts = getProductsByCategory(categoryName)
  const primaryProduct =
    categoryProducts.find((product) => product.title === primaryProductName)?.title ||
    categoryProducts[0]?.title ||
    categoryName

  return {
    category: categoryName,
    products: categoryProducts.map((product) => product.title),
    primaryProduct,
    description: fallbackDescription || recommendationDetails[categoryName] || 'Recommended based on your application inputs.',
  }
}

function isHighLift(liftHeight) {
  return ['12-30m', 'Over 30m'].includes(liftHeight)
}

function isHeavyUse(dailyUse) {
  return dailyUse === 'All day, every day'
}

export function getRecommendation(answers) {
  const siteType = answers.siteType
  const mainNeed = answers.mainNeed
  const loadBand = answers.loadBand
  const liftHeight = answers.liftHeight
  const dailyUse = answers.dailyUse
  const powerType = answers.powerType
  const mountingType = answers.mountingType
  const workArea = answers.workArea

  if (mainNeed === 'Help workers handle loads with less effort' || powerType === 'Pneumatic') {
    if (powerType === 'Pneumatic') {
      return createRecommendation('Ergonomic Handling Solutions', 'Pneumatic Balancers')
    }

    if (loadBand === 'Under 1T') {
      return createRecommendation('Ergonomic Handling Solutions', 'Parallelogram')
    }

    if (isHeavyUse(dailyUse)) {
      return createRecommendation('Ergonomic Handling Solutions', 'Z-Lifts')
    }

    return createRecommendation('Ergonomic Handling Solutions', 'Pivot Arm')
  }

  if (mainNeed === 'Store and retrieve goods' || siteType === 'Warehouse') {
    if (isHeavyUse(dailyUse)) {
      return createRecommendation('Storage and Retrieval', 'iStacker')
    }

    if (loadBand === 'Under 1T') {
      return createRecommendation('Storage and Retrieval', 'Roll Out Rack')
    }

    return createRecommendation('Storage and Retrieval', 'Roll Out Rack')
  }

  if (
    mountingType === 'Need movable setup' ||
    workArea === 'Outdoor' ||
    siteType === 'Construction site'
  ) {
    if (loadBand === 'Over 20T' || loadBand === '5-20T') {
      return createRecommendation('Overhead Cranes', 'Gantry Crane')
    }

    return createRecommendation('Overhead Cranes', 'Semi Gantry Crane')
  }

  if (mainNeed === 'Move loads across a large area') {
    if (loadBand === 'Over 20T' || isHeavyUse(dailyUse)) {
      return createRecommendation('EOT Cranes', 'Double Girder EOT Crane')
    }

    if (mountingType === 'Existing beam or rail') {
      return createRecommendation('EOT Cranes', 'Underslung EOT Crane')
    }

    if (loadBand === 'Under 1T') {
      return createRecommendation('Overhead Cranes', 'Light Rail System')
    }

    if (loadBand === '1-3T' && dailyUse === 'Few times a day') {
      return createRecommendation('EOT Cranes', 'Crane Kit')
    }

    return createRecommendation('EOT Cranes', 'Single Girder EOT Crane')
  }

  if (mainNeed === 'Move loads in one workstation') {
    if (loadBand === 'Under 1T' && !isHighLift(liftHeight) && powerType !== 'Manual') {
      return createRecommendation('Overhead Cranes', 'JIB Crane')
    }

    if (powerType === 'Manual' && dailyUse === 'Few times a day') {
      return createRecommendation('Manual Hoists', 'STIER RLH')
    }

    if (powerType === 'Manual' && mountingType === 'Existing beam or rail') {
      return createRecommendation('Manual Hoists', 'ET / PT / GT')
    }

    return createRecommendation('Electric Chain Hoists', 'HC+ Hoist')
  }

  if (workArea === 'Hazardous area') {
    if (loadBand === 'Over 20T' || loadBand === '5-20T') {
      return createRecommendation('Wire Rope Hoists', 'HW Wire Rope Hoist')
    }

    return createRecommendation(
      'Electric Chain Hoists',
      'EH II Hoist (Baby)',
      'A flameproof-safe model can be finalized by our engineering team based on your site class.'
    )
  }

  if (powerType === 'Manual') {
    if (loadBand === 'Under 1T') {
      return createRecommendation('Manual Hoists', 'STIER RLH')
    }

    if (loadBand === '1-3T') {
      return createRecommendation('Manual Hoists', 'Indef R')
    }

    if (loadBand === '3-5T') {
      return createRecommendation('Manual Hoists', 'Indef M')
    }

    return createRecommendation('Manual Hoists', 'Indef P')
  }

  if (loadBand === 'Under 1T' && dailyUse === 'Few times a day') {
    return createRecommendation('Manual Hoists', 'STIER RLH')
  }

  if (loadBand === 'Under 1T' && ['Many times a day', 'All day, every day'].includes(dailyUse)) {
    if (isHighLift(liftHeight)) {
      return createRecommendation('Electric Chain Hoists', 'CH III Hoist (Electron)')
    }

    return createRecommendation('Electric Chain Hoists', 'EH II Hoist (Baby)')
  }

  if (loadBand === '1-3T') {
    if (isHeavyUse(dailyUse) || isHighLift(liftHeight)) {
      return createRecommendation('Electric Chain Hoists', 'CH III Hoist (Electron)')
    }

    return createRecommendation('Electric Chain Hoists', 'HC+ Hoist')
  }

  if (loadBand === '3-5T') {
    if (isHeavyUse(dailyUse) || isHighLift(liftHeight)) {
      return createRecommendation('Electric Chain Hoists', 'CH III Hoist (Electron)')
    }

    return createRecommendation('Electric Chain Hoists', 'CH IV Hoist (Proton)')
  }

  if (loadBand === '5-20T') {
    if (mainNeed === 'Move loads across a large area' && isHeavyUse(dailyUse)) {
      return createRecommendation('EOT Cranes', 'Double Girder EOT Crane')
    }

    if (isHighLift(liftHeight) || workArea === 'Indoor heavy-duty') {
      return createRecommendation('Wire Rope Hoists', 'WRH N Series')
    }

    if (siteType === 'Factory' && dailyUse === 'Many times a day') {
      return createRecommendation('Wire Rope Hoists', 'WRH I-II-III')
    }

    return createRecommendation('Wire Rope Hoists', 'iR Wire Rope Hoist')
  }

  if (loadBand === 'Over 20T') {
    if (mainNeed === 'Move loads across a large area') {
      return createRecommendation('EOT Cranes', 'Double Girder EOT Crane')
    }

    if (isHighLift(liftHeight)) {
      return createRecommendation('Wire Rope Hoists', 'SMD Wire Rope Hoist')
    }

    if (workArea === 'Outdoor') {
      return createRecommendation('Wire Rope Hoists', 'UR Wire Rope Hoist')
    }

    return createRecommendation('Wire Rope Hoists', 'HW Wire Rope Hoist')
  }

  if (mainNeed === 'Lift up and down only') {
    if (loadBand === '5-20T' && dailyUse === 'Few times a day') {
      return createRecommendation('Wire Rope Hoists', 'iR Wire Rope Hoist')
    }

    if (loadBand === '5-20T' && dailyUse === 'Many times a day') {
      return createRecommendation('Wire Rope Hoists', 'WRH I-II-III')
    }

    if (loadBand === 'Over 20T' && dailyUse === 'Few times a day') {
      return createRecommendation('Wire Rope Hoists', 'UR Wire Rope Hoist')
    }
  }

  return createRecommendation('Electric Chain Hoists', 'HC+ Hoist')
}
