import { getProductsByCategory } from './productCatalog'

export const chatbotQuestions = [
  {
    id: 'siteType',
    label: 'Where will you use this?',
    options: [
      'Factory',
      'Warehouse',
      'Construction site',
      'Small workshop',
      'Metals / Steel',
      'Oil & Gas / Petrochemical',
    ],
  },
  {
    id: 'mainNeed',
    label: 'What do you need to do most?',
    options: [
      'Lift up and down only',
      'Move loads across a large area',
      'Move loads in one workstation',
      'Load and unload at one bay',
      'Store and retrieve goods',
      'Help workers handle loads with less effort',
    ],
  },
  {
    id: 'loadBand',
    label: 'What is the heaviest load?',
    options: ['Under 1T', '1-3T', '3-5T', '5-20T', 'Over 20T', 'Not sure'],
  },
  {
    id: 'liftHeight',
    label: 'How high do you need to lift?',
    options: ['Under 6m', '6-12m', '12-30m', 'Over 30m', 'Not sure'],
  },
  {
    id: 'dailyUse',
    label: 'How often will you use it?',
    options: ['Occasional maintenance only', 'Few times a day', 'Many times a day', 'All day, every day'],
  },
  {
    id: 'dutyClass',
    label: 'What duty level best matches your operation?',
    options: ['Light duty', 'Medium duty', 'Heavy duty', 'Not sure'],
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
  'Storage and Retrieval': 'Best for pallet receipt, storage and retrieval in multilevel warehouse operations.',
  'Overhead Cranes':
    'Best for bay-wide movement using gantry, semi-gantry, jib, light rail and other overhead crane configurations.',
  'Material Handling':
    'Best for mixed workflows combining hoists, cranes, kits and storage movement equipment.',
  'Ergonomic Handling Solutions': 'Best for reducing repetitive handling effort using operator-assist manipulators and balancers.',
  'Manual Hoists':
    'Best for lifting where electrical power is limited or manual control is preferred.',
  'Electric Chain Hoists':
    'Best for regular electric lifting in light to heavy-duty duty classes from low to high frequency use.',
  'Wire Rope Hoists':
    'Best for higher capacities and longer lift heights in medium to heavy-duty operations.',
  'EOT Cranes':
    'Best for moving loads across larger bays with single girder, double girder or underslung configurations.',
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

function isHeavyUse(dailyUse, dutyClass) {
  return dailyUse === 'All day, every day' || dutyClass === 'Heavy duty'
}

function isLightUse(dailyUse, dutyClass) {
  return dailyUse === 'Occasional maintenance only' || dutyClass === 'Light duty'
}

export function getRecommendation(answers) {
  const siteType = answers.siteType
  const mainNeed = answers.mainNeed
  const loadBand = answers.loadBand
  const liftHeight = answers.liftHeight
  const dailyUse = answers.dailyUse
  const dutyClass = answers.dutyClass
  const powerType = answers.powerType
  const mountingType = answers.mountingType
  const workArea = answers.workArea
  const hazardousContext = workArea === 'Hazardous area' || siteType === 'Oil & Gas / Petrochemical'
  const highLift = isHighLift(liftHeight)
  const heavyUse = isHeavyUse(dailyUse, dutyClass)
  const lightUse = isLightUse(dailyUse, dutyClass)
  const loadUnknown = loadBand === 'Not sure'

  if (mainNeed === 'Help workers handle loads with less effort' || powerType === 'Pneumatic') {
    if (powerType === 'Pneumatic') {
      return createRecommendation('Ergonomic Handling Solutions', 'Pneumatic Balancers')
    }

    if (loadBand === 'Under 1T') {
      return createRecommendation('Ergonomic Handling Solutions', 'Parallelogram')
    }

    if (heavyUse) {
      return createRecommendation('Ergonomic Handling Solutions', 'Z-Lifts')
    }

    return createRecommendation('Ergonomic Handling Solutions', 'Pivot Arm')
  }

  if (hazardousContext) {
    if (powerType === 'Manual') {
      return createRecommendation(
        'Manual Hoists',
        'Indef C',
        'Manual hoists are used where electric supply is limited; spark-proof options are used for suitable hazardous applications.'
      )
    }

    if (loadBand === '5-20T' || loadBand === 'Over 20T' || heavyUse) {
      return createRecommendation(
        'Wire Rope Hoists',
        'HW Wire Rope Hoist',
        'Flame-proof hoist options are available for gas group IIA/IIB/IIC and Zone 21/22 applications. Final selection should match site classification.'
      )
    }

    return createRecommendation(
      'Electric Chain Hoists',
      'EH II Hoist (Baby)',
      'Flameproof chain hoist variants are available. Final model selection should be validated against your hazardous area class.'
    )
  }

  if (mainNeed === 'Store and retrieve goods' || siteType === 'Warehouse') {
    if (heavyUse || loadBand === '3-5T' || loadBand === '5-20T' || loadBand === 'Over 20T') {
      return createRecommendation('Storage and Retrieval', 'iStacker')
    }

    if (loadBand === 'Under 1T' && lightUse) {
      return createRecommendation('Storage and Retrieval', 'Roll Out Rack')
    }

    return createRecommendation('Storage and Retrieval', 'iStacker')
  }

  if (
    mountingType === 'Need movable setup' ||
    workArea === 'Outdoor' ||
    siteType === 'Construction site'
  ) {
    if (loadBand === 'Over 20T' || loadBand === '5-20T') {
      return createRecommendation('Overhead Cranes', 'Gantry Crane')
    }

    if (mainNeed === 'Load and unload at one bay' && loadBand === 'Under 1T') {
      return createRecommendation('Overhead Cranes', 'JIB Crane')
    }

    return createRecommendation('Overhead Cranes', 'Semi Gantry Crane')
  }

  if (mainNeed === 'Move loads across a large area') {
    if (loadBand === 'Over 20T' || heavyUse) {
      return createRecommendation('EOT Cranes', 'Double Girder EOT Crane')
    }

    if (mountingType === 'Existing beam or rail') {
      return createRecommendation('EOT Cranes', 'Underslung EOT Crane')
    }

    if (loadBand === 'Under 1T') {
      return createRecommendation('Overhead Cranes', 'Light Rail System')
    }

    if (loadBand === '1-3T' && lightUse) {
      return createRecommendation('EOT Cranes', 'Crane Kit')
    }

    if (loadUnknown) {
      return createRecommendation('EOT Cranes', 'Single Girder EOT Crane')
    }

    return createRecommendation('EOT Cranes', 'Single Girder EOT Crane')
  }

  if (mainNeed === 'Move loads in one workstation' || mainNeed === 'Load and unload at one bay') {
    if (loadBand === 'Under 1T' && !highLift && powerType !== 'Manual') {
      return createRecommendation('Overhead Cranes', 'JIB Crane')
    }

    if (powerType === 'Manual' && lightUse) {
      return createRecommendation('Manual Hoists', 'STIER RLH')
    }

    if (powerType === 'Manual' && mountingType === 'Existing beam or rail') {
      return createRecommendation('Manual Hoists', 'ET / PT / GT')
    }

    if (heavyUse || highLift) {
      return createRecommendation('Electric Chain Hoists', 'CH III Hoist (Electron)')
    }

    return createRecommendation('Electric Chain Hoists', 'HC+ Hoist')
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

  if (loadUnknown) {
    if (mainNeed === 'Lift up and down only' && powerType === 'Manual') {
      return createRecommendation('Manual Hoists', 'Indef R')
    }

    if (heavyUse || highLift) {
      return createRecommendation('Electric Chain Hoists', 'CH III Hoist (Electron)')
    }

    return createRecommendation('Electric Chain Hoists', 'HC+ Hoist')
  }

  if (mainNeed === 'Lift up and down only') {
    if (loadBand === 'Under 1T') {
      return powerType === 'Manual'
        ? createRecommendation('Manual Hoists', 'STIER RLH')
        : createRecommendation('Electric Chain Hoists', 'EH II Hoist (Baby)')
    }

    if (loadBand === '1-3T') {
      return powerType === 'Manual'
        ? createRecommendation('Manual Hoists', 'Indef R')
        : createRecommendation('Electric Chain Hoists', heavyUse || highLift ? 'CH III Hoist (Electron)' : 'HC+ Hoist')
    }

    if (loadBand === '3-5T') {
      return powerType === 'Manual'
        ? createRecommendation('Manual Hoists', 'Indef M')
        : createRecommendation('Electric Chain Hoists', heavyUse || highLift ? 'CH III Hoist (Electron)' : 'CH IV Hoist (Proton)')
    }

    if (loadBand === '5-20T') {
      return lightUse
        ? createRecommendation('Wire Rope Hoists', 'iR Wire Rope Hoist')
        : createRecommendation('Wire Rope Hoists', 'WRH I-II-III')
    }

    if (loadBand === 'Over 20T') {
      return lightUse
        ? createRecommendation('Wire Rope Hoists', 'UR Wire Rope Hoist')
        : createRecommendation('Wire Rope Hoists', 'HW Wire Rope Hoist')
    }
  }

  if (loadBand === 'Under 1T' && lightUse) {
    return createRecommendation('Manual Hoists', 'STIER RLH')
  }

  if (loadBand === 'Under 1T') {
    if (mainNeed === 'Move loads across a large area') {
      return createRecommendation('Overhead Cranes', 'Light Rail System')
    }

    if (highLift || heavyUse) {
      return createRecommendation('Electric Chain Hoists', 'EH II Hoist (Baby)')
    }

    return createRecommendation('Electric Chain Hoists', 'EH II Hoist (Baby)')
  }

  if (loadBand === '1-3T') {
    if (powerType === 'Manual') {
      return createRecommendation('Manual Hoists', 'Indef R')
    }

    if (heavyUse || highLift) {
      return createRecommendation('Electric Chain Hoists', 'CH III Hoist (Electron)')
    }

    if (mainNeed === 'Move loads across a large area' && mountingType === 'Can install new overhead crane') {
      return createRecommendation('EOT Cranes', 'Crane Kit')
    }

    return createRecommendation('Electric Chain Hoists', 'HC+ Hoist')
  }

  if (loadBand === '3-5T') {
    if (powerType === 'Manual') {
      return createRecommendation('Manual Hoists', 'Indef M')
    }

    if (heavyUse || highLift) {
      return createRecommendation('Electric Chain Hoists', 'CH III Hoist (Electron)')
    }

    return createRecommendation('Electric Chain Hoists', 'CH IV Hoist (Proton)')
  }

  if (loadBand === '5-20T') {
    if (mainNeed === 'Move loads across a large area' && heavyUse) {
      return createRecommendation('EOT Cranes', 'Double Girder EOT Crane')
    }

    if (highLift || workArea === 'Indoor heavy-duty' || dutyClass === 'Heavy duty') {
      return createRecommendation('Wire Rope Hoists', 'WRH N Series')
    }

    if ((siteType === 'Factory' || siteType === 'Metals / Steel') && ['Many times a day', 'All day, every day'].includes(dailyUse)) {
      return createRecommendation('Wire Rope Hoists', 'WRH I-II-III')
    }

    return createRecommendation('Wire Rope Hoists', 'iR Wire Rope Hoist')
  }

  if (loadBand === 'Over 20T') {
    if (mainNeed === 'Move loads across a large area') {
      return createRecommendation('EOT Cranes', 'Double Girder EOT Crane')
    }

    if (highLift) {
      return createRecommendation('Wire Rope Hoists', 'SMD Wire Rope Hoist')
    }

    if (workArea === 'Outdoor') {
      return createRecommendation('Wire Rope Hoists', 'UR Wire Rope Hoist')
    }

    return createRecommendation('Wire Rope Hoists', 'HW Wire Rope Hoist')
  }

  return createRecommendation('Electric Chain Hoists', 'HC+ Hoist')
}
