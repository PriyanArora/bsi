import { getProductsByCategory } from './productCatalog'

export const chatbotQuestions = [
  {
    id: 'applicationType',
    label: 'What is your application type?',
    options: ['Warehouse', 'Manufacturing', 'Construction', 'Packaging', 'Other'],
  },
  {
    id: 'movementScope',
    label: 'What movement do you need?',
    options: [
      'Localized workstation movement',
      'Bay-wide overhead coverage',
      'Vertical lift only',
      'Storage and retrieval handling',
      'Ergonomic operator-assist movement',
    ],
  },
  {
    id: 'loadCapacity',
    label: 'What load capacity do you need?',
    options: ['Under 1T', '1-3T', '3-5T', '5-20T', 'Over 20T'],
  },
  {
    id: 'liftHeight',
    label: 'What lift height is required?',
    options: ['Under 6m', '6-12m', '12-30m', 'Over 30m'],
  },
  {
    id: 'dutyCycle',
    label: 'What is your expected duty cycle?',
    options: ['Occasional (few lifts/day)', 'Regular (hourly operation)', 'Continuous (multi-shift)'],
  },
  {
    id: 'powerPreference',
    label: 'Do you have a power preference?',
    options: ['Manual', 'Electric', 'Pneumatic', 'No preference'],
  },
  {
    id: 'installationPreference',
    label: 'Which installation setup fits your site?',
    options: ['Existing beam/monorail available', 'New crane structure can be installed', 'Need relocatable setup', 'No preference'],
  },
  {
    id: 'environmentType',
    label: 'What is your operating environment?',
    options: ['Indoor clean', 'Indoor heavy-duty', 'Outdoor weather exposure', 'Hazardous/flameproof zone'],
  },
]

const recommendationDetails = {
  'Manual Hoists':
    'Best for lighter loads and occasional duty where simple, robust, manual lifting is preferred.',
  'Electric Chain Hoists':
    'Ideal for light to medium capacities with regular use and controlled lifting precision.',
  'Wire Rope Hoists':
    'Suited for heavier repetitive lifting and higher lift heights in demanding industrial operations.',
  'EOT Cranes':
    'Recommended for wide-bay coverage and heavy loads across production lines and industrial facilities.',
  'Gantry Cranes':
    'Suitable for construction yards and relocatable outdoor lifting where independent support is required.',
  'Jib Cranes':
    'Great for localized workstation lifting with quick handling around a fixed area.',
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

function isContinuousDuty(dutyCycle) {
  return dutyCycle === 'Continuous (multi-shift)'
}

export function getRecommendation(answers) {
  const applicationType = answers.applicationType
  const movementScope = answers.movementScope
  const loadCapacity = answers.loadCapacity
  const liftHeight = answers.liftHeight
  const dutyCycle = answers.dutyCycle
  const powerPreference = answers.powerPreference
  const installationPreference = answers.installationPreference
  const environmentType = answers.environmentType

  if (movementScope === 'Ergonomic operator-assist movement' || powerPreference === 'Pneumatic') {
    if (powerPreference === 'Pneumatic') {
      return createRecommendation('Ergonomic Handling Solutions', 'Pneumatic Balancers')
    }

    if (loadCapacity === 'Under 1T') {
      return createRecommendation('Ergonomic Handling Solutions', 'Parallelogram')
    }

    return createRecommendation('Ergonomic Handling Solutions', 'Pivot Arm')
  }

  if (movementScope === 'Storage and retrieval handling' || applicationType === 'Warehouse') {
    if (isContinuousDuty(dutyCycle)) {
      return createRecommendation('Storage and Retrieval', 'iStacker')
    }

    if (loadCapacity === 'Under 1T') {
      return createRecommendation('Storage and Retrieval', 'Floor Operated Stacker')
    }

    return createRecommendation('Storage and Retrieval', 'Roll Out Rack')
  }

  if (
    installationPreference === 'Need relocatable setup' ||
    environmentType === 'Outdoor weather exposure' ||
    applicationType === 'Construction'
  ) {
    if (loadCapacity === 'Over 20T' || loadCapacity === '5-20T') {
      return createRecommendation('Gantry Cranes', 'Gantry Crane')
    }

    return createRecommendation('Gantry Cranes', 'Semi-Gantry Crane')
  }

  if (movementScope === 'Bay-wide overhead coverage') {
    if (loadCapacity === 'Over 20T' || isContinuousDuty(dutyCycle)) {
      return createRecommendation('EOT Cranes', 'Double Girder EOT Crane')
    }

    if (installationPreference === 'Existing beam/monorail available') {
      return createRecommendation('EOT Cranes', 'Underslung EOT Crane')
    }

    if (loadCapacity === 'Under 1T' || loadCapacity === '1-3T') {
      return createRecommendation('EOT Cranes', 'Crane Kit')
    }

    return createRecommendation('EOT Cranes', 'Single Girder EOT Crane')
  }

  if (movementScope === 'Localized workstation movement') {
    if (loadCapacity === 'Under 1T' && !isHighLift(liftHeight)) {
      return createRecommendation('Jib Cranes', 'Jib Crane')
    }

    if (powerPreference === 'Manual' && !isContinuousDuty(dutyCycle)) {
      return createRecommendation('Manual Hoists', 'Ratchet Lever Hoist')
    }

    return createRecommendation('Electric Chain Hoists', 'HC+ Hoist')
  }

  if (environmentType === 'Hazardous/flameproof zone') {
    if (loadCapacity === 'Over 20T' || loadCapacity === '5-20T') {
      return createRecommendation('Wire Rope Hoists', 'SMD Wire Rope Hoist')
    }

    return createRecommendation(
      'Electric Chain Hoists',
      'EH II Hoist (Baby)',
      'Flameproof variants are considered for this recommendation. Our engineering team can confirm exact ATEX/flameproof configuration.'
    )
  }

  if (powerPreference === 'Manual') {
    if (loadCapacity === 'Under 1T') {
      return createRecommendation('Manual Hoists', 'Ratchet Lever Hoist')
    }

    if (loadCapacity === '1-3T' || loadCapacity === '3-5T') {
      return createRecommendation('Manual Hoists', 'Chain Pulley Block')
    }

    return createRecommendation('Manual Hoists', 'Pulling Lifting Machine')
  }

  if (loadCapacity === 'Under 1T' && dutyCycle === 'Occasional (few lifts/day)') {
    return createRecommendation('Manual Hoists', 'Chain Pulley Block')
  }

  if (loadCapacity === 'Under 1T' && ['Regular (hourly operation)', 'Continuous (multi-shift)'].includes(dutyCycle)) {
    if (isHighLift(liftHeight)) {
      return createRecommendation('Electric Chain Hoists', 'CH III Hoist (Electron)')
    }

    return createRecommendation('Electric Chain Hoists', 'EH II Hoist (Baby)')
  }

  if (loadCapacity === '1-3T') {
    if (isContinuousDuty(dutyCycle) || isHighLift(liftHeight)) {
      return createRecommendation('Electric Chain Hoists', 'CH III Hoist (Electron)')
    }

    return createRecommendation('Electric Chain Hoists', 'HC+ Hoist')
  }

  if (loadCapacity === '3-5T') {
    if (isContinuousDuty(dutyCycle) || isHighLift(liftHeight)) {
      return createRecommendation('Electric Chain Hoists', 'CH III Hoist (Electron)')
    }

    return createRecommendation('Electric Chain Hoists', 'CH IV Hoist (Proton)')
  }

  if (loadCapacity === '5-20T') {
    if (movementScope === 'Bay-wide overhead coverage' && isContinuousDuty(dutyCycle)) {
      return createRecommendation('EOT Cranes', 'Double Girder EOT Crane')
    }

    if (isHighLift(liftHeight) || environmentType === 'Indoor heavy-duty') {
      return createRecommendation('Wire Rope Hoists', 'WRH N Series')
    }

    return createRecommendation('Wire Rope Hoists', 'iR Wire Rope Hoist')
  }

  if (loadCapacity === 'Over 20T') {
    if (movementScope === 'Bay-wide overhead coverage') {
      return createRecommendation('EOT Cranes', 'Double Girder EOT Crane')
    }

    if (isHighLift(liftHeight)) {
      return createRecommendation('Wire Rope Hoists', 'SMD Wire Rope Hoist')
    }

    return createRecommendation('Wire Rope Hoists', 'UR Wire Rope Hoist')
  }

  return createRecommendation('Electric Chain Hoists', 'HC+ Hoist')
}
