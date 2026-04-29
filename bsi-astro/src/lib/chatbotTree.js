import { getProductsByCategory } from './productCatalog'

const ENTRY_QUESTION = {
  id: 'solutionTrack',
  label: 'What are you interested in?',
  options: ['Cranes / Hoists', 'Generators'],
}

const CRANE_HOIST_QUESTIONS = [
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
    id: 'exactCapacity',
    label: 'What is your maximum required capacity?',
    options: [
      'Up to 0.5T',
      '0.5T to 1T',
      '1T to 2T',
      '2T to 5T',
      '5T to 10T',
      '10T to 20T',
      '20T to 40T',
      'Above 40T',
      'Not sure',
    ],
  },
  {
    id: 'liftHeight',
    label: 'How high do you need to lift?',
    options: ['Up to 6m', '6m to 12m', '12m to 24m', '24m to 40m', 'Above 40m', 'Not sure'],
  },
  {
    id: 'spanRequirement',
    label: 'What span or travel range do you need?',
    options: ['Not applicable (Hoist only)', 'Up to 12m', '12m to 25m', '25m to 35m', 'Above 35m', 'Not sure'],
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
    id: 'cyclesPerHour',
    label: 'What is your expected cycle rate?',
    options: ['Up to 10 cycles/hour', '10 to 20 cycles/hour', '20 to 40 cycles/hour', 'Above 40 cycles/hour', 'Not sure'],
  },
  {
    id: 'powerRequirement',
    label: 'Power requirement for operation?',
    options: ['Manual only', 'Electric only', 'Pneumatic only', 'Any / Not sure'],
  },
  {
    id: 'mountingType',
    label: 'Which installation condition matches your site?',
    options: [
      'Existing beam or monorail',
      'Existing runway for EOT crane',
      'Can install new overhead runway',
      'Need floor-supported movable setup',
      'Low headroom or limited structure',
      'Not sure',
    ],
  },
  {
    id: 'hazardClass',
    label: 'Hazardous area classification?',
    options: ['Non-hazardous', 'Zone 21/22 (Dust)', 'Zone 1/2 Gas IIA/IIB', 'Zone 1/2 Gas IIC', 'Not sure'],
  },
]

const GENERATOR_DISCOVERY_QUESTIONS = [
  {
    id: 'generatorUseCase',
    label: 'What best describes your application?',
    options: [
      'Small business, retail or office backup',
      'Commercial complex, hospital or institutional backup',
      'Large industry or data center backup',
      'Heavy industrial or infrastructure power',
      'Temporary event or construction power',
      'Not sure',
    ],
  },
  {
    id: 'generatorPowerBand',
    label: 'What power band best matches your need?',
    options: ['15 to 62.5 kVA', '75 to 160 kVA', '180 to 250 kVA', '320 to 625 kVA', '750 to 3750 kVA', 'Not sure'],
  },
  {
    id: 'generatorProcurement',
    label: 'Do you want to purchase or rent?',
    options: ['Purchase new generator', 'Rental generator only', 'Open to either purchase or rental'],
  },
  {
    id: 'generatorNoisePreference',
    label: 'Preferred generator configuration?',
    options: ['Silent preferred', 'Open acceptable', 'Either / Not sure'],
  },
  {
    id: 'generatorRuntimeNeed',
    label: 'Expected operating pattern?',
    options: ['Up to 8 hours per day', 'More than 8 hours per day', 'Continuous heavy load operation', 'Not sure'],
  },
]

export function getChatbotQuestions(answers = {}) {
  const flow = [ENTRY_QUESTION]

  if (answers.solutionTrack === 'Generators') {
    flow.push(...GENERATOR_DISCOVERY_QUESTIONS)
    return flow
  }

  if (answers.solutionTrack === 'Cranes / Hoists') {
    flow.push(...CRANE_HOIST_QUESTIONS)
  }

  return flow
}

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
    'Best for regular electric lifting in light to heavy-duty operation classes.',
  'Wire Rope Hoists':
    'Best for higher capacities and longer lift heights in medium to heavy-duty operations.',
  'EOT Cranes':
    'Best for moving loads across larger bays with single girder, double girder or underslung configurations.',
  'Small Range Gensets': 'Best for compact standby power in small commercial and office environments.',
  'Medium Range Gensets': 'Best for medium duty backup in commercial complexes, hospitals and process utilities.',
  'Large Range Gensets': 'Best for higher demand industrial and data center backup applications.',
  'Industrial Range Gensets': 'Best for critical heavy-duty and infrastructure-scale power continuity.',
  'Rental Generators': 'Best for temporary and project-based power where flexible deployment is required.',
  'Generator Rentals': 'Best for temporary and project-based power where flexible deployment is required.',
}

const CAPACITY_UPPER_TON = {
  'Up to 0.5T': 0.5,
  '0.5T to 1T': 1,
  '1T to 2T': 2,
  '2T to 5T': 5,
  '5T to 10T': 10,
  '10T to 20T': 20,
  '20T to 40T': 40,
  'Above 40T': 999,
}

const LIFT_UPPER_M = {
  'Up to 6m': 6,
  '6m to 12m': 12,
  '12m to 24m': 24,
  '24m to 40m': 40,
  'Above 40m': 999,
}

const SPAN_UPPER_M = {
  'Not applicable (Hoist only)': 0,
  'Up to 12m': 12,
  '12m to 25m': 25,
  '25m to 35m': 35,
  'Above 35m': 999,
}

const CYCLES_PER_HOUR = {
  'Up to 10 cycles/hour': 10,
  '10 to 20 cycles/hour': 20,
  '20 to 40 cycles/hour': 40,
  'Above 40 cycles/hour': 999,
}

function parseCapacity(answers) {
  const upper = CAPACITY_UPPER_TON[answers.exactCapacity]
  return typeof upper === 'number' ? upper : null
}

function parseLift(answers) {
  const upper = LIFT_UPPER_M[answers.liftHeight]
  return typeof upper === 'number' ? upper : null
}

function parseSpan(answers) {
  const upper = SPAN_UPPER_M[answers.spanRequirement]
  return typeof upper === 'number' ? upper : null
}

function parseCycles(answers) {
  const upper = CYCLES_PER_HOUR[answers.cyclesPerHour]
  return typeof upper === 'number' ? upper : null
}

function isHazardous(answers) {
  return ['Zone 21/22 (Dust)', 'Zone 1/2 Gas IIA/IIB', 'Zone 1/2 Gas IIC'].includes(answers.hazardClass)
}

function isHeavyDuty(answers, cyclesPerHour) {
  return (
    answers.dailyUse === 'All day, every day' ||
    answers.dutyClass === 'Heavy duty' ||
    (typeof cyclesPerHour === 'number' && cyclesPerHour > 20)
  )
}

function isLightDuty(answers, cyclesPerHour) {
  return (
    answers.dailyUse === 'Occasional maintenance only' ||
    answers.dutyClass === 'Light duty' ||
    (typeof cyclesPerHour === 'number' && cyclesPerHour <= 10)
  )
}

function createRecommendation(categoryName, primaryProductName, options = {}) {
  const categoryProducts = getProductsByCategory(categoryName)
  const primaryProduct =
    categoryProducts.find((product) => product.title === primaryProductName)?.title ||
    categoryProducts[0]?.title ||
    categoryName

  const shortlist = (options.shortlist || []).filter((title) =>
    categoryProducts.some((product) => product.title === title && product.title !== primaryProduct)
  )

  return {
    category: categoryName,
    products: categoryProducts.map((product) => product.title),
    primaryProduct,
    description: options.description || recommendationDetails[categoryName] || 'Recommended based on your application inputs.',
    confidence: options.confidence || (shortlist.length > 0 ? 'medium' : 'high'),
    shortlist,
    requiresConfirmation: options.requiresConfirmation ?? shortlist.length > 0,
  }
}

function recommendGeneratorRental(answers) {
  const powerBand = answers.generatorPowerBand

  if (powerBand === '15 to 62.5 kVA') {
    return createRecommendation('Rental Generators', '15 - 62.5 kVA Rental Generator', {
      confidence: 'high',
      requiresConfirmation: false,
    })
  }

  if (powerBand === '75 to 160 kVA') {
    return createRecommendation('Rental Generators', '75 - 125 kVA Rental Generator', {
      confidence: 'high',
      requiresConfirmation: false,
    })
  }

  if (powerBand === '180 to 250 kVA') {
    return createRecommendation('Rental Generators', '160 - 250 kVA Rental Generator', {
      confidence: 'high',
      requiresConfirmation: false,
    })
  }

  if (powerBand === '320 to 625 kVA') {
    return createRecommendation('Rental Generators', '320 - 500 kVA Rental Generator', {
      confidence: 'high',
      requiresConfirmation: false,
    })
  }

  if (powerBand === '750 to 3750 kVA') {
    return createRecommendation('Rental Generators', '625 - 1010 kVA Rental Generator', {
      confidence: 'high',
      requiresConfirmation: false,
    })
  }

  if (answers.generatorUseCase === 'Temporary event or construction power') {
    return createRecommendation('Rental Generators', '75 - 125 kVA Rental Generator', {
      confidence: 'high',
      shortlist: ['160 - 250 kVA Rental Generator', '320 - 500 kVA Rental Generator'],
      description: 'Rental options shortlisted for temporary power. Final rating depends on connected load and start-up surge profile.',
    })
  }

  return createRecommendation('Rental Generators', '160 - 250 kVA Rental Generator', {
    confidence: 'medium',
    shortlist: ['75 - 125 kVA Rental Generator', '320 - 500 kVA Rental Generator'],
    description: 'Rental options are shortlisted. Final generator sizing should be confirmed from site load and duty cycle.',
  })
}

function recommendGeneratorPurchase(answers) {
  const powerBand = answers.generatorPowerBand
  const runtimeNeed = answers.generatorRuntimeNeed
  const noisePreference = answers.generatorNoisePreference
  const useCase = answers.generatorUseCase

  if (powerBand === '15 to 62.5 kVA') {
    if (runtimeNeed === 'Up to 8 hours per day') {
      return createRecommendation('Small Range Gensets', '15 kVA Genset', { confidence: 'high', requiresConfirmation: false })
    }

    if (runtimeNeed === 'More than 8 hours per day') {
      return createRecommendation('Small Range Gensets', '30 kVA Genset', { confidence: 'high', requiresConfirmation: false })
    }

    if (runtimeNeed === 'Continuous heavy load operation') {
      return createRecommendation('Small Range Gensets', '50 kVA Genset', { confidence: 'high', requiresConfirmation: false })
    }

    if (noisePreference === 'Silent preferred') {
      return createRecommendation('Small Range Gensets', '20 kVA Genset', { confidence: 'high', requiresConfirmation: false })
    }

    return createRecommendation('Small Range Gensets', '40 kVA Genset', {
      confidence: 'medium',
      shortlist: ['25 kVA Genset', '62.5 kVA Genset', '10 kVA Genset', '7.5 kVA Genset'],
      description: 'Small-range gensets are shortlisted. Final rating should match the connected and surge load profile.',
    })
  }

  if (powerBand === '75 to 160 kVA') {
    if (runtimeNeed === 'Continuous heavy load operation') {
      return createRecommendation('Medium Range Gensets', '160 kVA Genset', { confidence: 'high', requiresConfirmation: false })
    }

    if (noisePreference === 'Silent preferred') {
      return createRecommendation('Medium Range Gensets', '125 kVA Genset', { confidence: 'high', requiresConfirmation: false })
    }

    if (runtimeNeed === 'Up to 8 hours per day') {
      return createRecommendation('Medium Range Gensets', '100 kVA Genset', { confidence: 'high', requiresConfirmation: false })
    }

    return createRecommendation('Medium Range Gensets', '140 kVA Genset', {
      confidence: 'medium',
      shortlist: ['75 kVA Genset'],
      description: 'Medium-range gensets are shortlisted. Final selection should be confirmed from load profile and duty pattern.',
    })
  }

  if (powerBand === '180 to 250 kVA') {
    if (runtimeNeed === 'Continuous heavy load operation') {
      return createRecommendation('Medium Range Gensets', '250 kVA Genset', { confidence: 'high', requiresConfirmation: false })
    }

    if (noisePreference === 'Silent preferred') {
      return createRecommendation('Medium Range Gensets', '200 kVA Genset', { confidence: 'high', requiresConfirmation: false })
    }

    return createRecommendation('Medium Range Gensets', '180 kVA Genset', { confidence: 'high', requiresConfirmation: false })
  }

  if (powerBand === '320 to 625 kVA') {
    if (runtimeNeed === 'Continuous heavy load operation') {
      return createRecommendation('Large Range Gensets', '625 kVA Genset', { confidence: 'high', requiresConfirmation: false })
    }

    if (noisePreference === 'Open acceptable') {
      return createRecommendation('Large Range Gensets', '400 kVA Genset', { confidence: 'high', requiresConfirmation: false })
    }

    if (runtimeNeed === 'Up to 8 hours per day') {
      return createRecommendation('Large Range Gensets', '320 kVA Genset', { confidence: 'high', requiresConfirmation: false })
    }

    return createRecommendation('Large Range Gensets', '500 kVA Genset', {
      confidence: 'medium',
      shortlist: ['380 kVA Genset'],
      description: 'Large-range gensets are shortlisted. Final rating should be confirmed against block load and future expansion.',
    })
  }

  if (powerBand === '750 to 3750 kVA') {
    if (runtimeNeed === 'Continuous heavy load operation' && useCase === 'Heavy industrial or infrastructure power') {
      return createRecommendation('Industrial Range Gensets', '3750 kVA Genset', {
        confidence: 'high',
        requiresConfirmation: false,
      })
    }

    if (runtimeNeed === 'More than 8 hours per day') {
      return createRecommendation('Industrial Range Gensets', '2000 kVA Genset', {
        confidence: 'high',
        shortlist: ['2500 kVA Genset', '3000 kVA Genset'],
        description: 'Industrial options are shortlisted for long-duration operation. Final rating depends on critical and future loads.',
      })
    }

    if (useCase === 'Large industry or data center backup') {
      return createRecommendation('Industrial Range Gensets', '1250 kVA Genset', {
        confidence: 'high',
        requiresConfirmation: false,
      })
    }

    return createRecommendation('Industrial Range Gensets', '1500 kVA Genset', {
      confidence: 'medium',
      shortlist: ['1010 kVA Genset', '750 kVA Genset'],
      description: 'Industrial gensets are shortlisted. Final model should be selected after critical load and redundancy review.',
    })
  }

  if (useCase === 'Small business, retail or office backup') {
    return createRecommendation('Small Range Gensets', '25 kVA Genset', {
      confidence: 'medium',
      shortlist: ['15 kVA Genset', '40 kVA Genset'],
      description: 'Small-range gensets are shortlisted. Final rating should be validated from actual connected load.',
    })
  }

  if (useCase === 'Commercial complex, hospital or institutional backup') {
    return createRecommendation('Medium Range Gensets', '125 kVA Genset', {
      confidence: 'medium',
      shortlist: ['100 kVA Genset', '160 kVA Genset'],
      description: 'Medium-range gensets are shortlisted for commercial and institutional backup duty.',
    })
  }

  if (useCase === 'Large industry or data center backup') {
    return createRecommendation('Large Range Gensets', '500 kVA Genset', {
      confidence: 'medium',
      shortlist: ['400 kVA Genset', '625 kVA Genset'],
      description: 'Large-range gensets are shortlisted. Final sizing should be validated against load growth and redundancy plan.',
    })
  }

  return createRecommendation('Industrial Range Gensets', '750 kVA Genset', {
    confidence: 'medium',
    shortlist: ['1010 kVA Genset', '1250 kVA Genset'],
    description: 'Generator options are shortlisted. Final model should be confirmed with connected load, surge and runtime profile.',
  })
}

function recommendGenerators(answers) {
  if (answers.generatorProcurement === 'Rental generator only') {
    return recommendGeneratorRental(answers)
  }

  if (
    answers.generatorUseCase === 'Temporary event or construction power' &&
    answers.generatorProcurement !== 'Purchase new generator'
  ) {
    return recommendGeneratorRental(answers)
  }

  return recommendGeneratorPurchase(answers)
}

function recommendErgonomic(answers, capacityUpper, heavyDuty) {
  if (answers.powerRequirement === 'Pneumatic only') {
    return createRecommendation('Ergonomic Handling Solutions', 'Pneumatic Balancers', {
      confidence: 'high',
      requiresConfirmation: false,
    })
  }

  if (capacityUpper !== null && capacityUpper <= 1) {
    return createRecommendation('Ergonomic Handling Solutions', 'Parallelogram', {
      confidence: 'high',
      requiresConfirmation: false,
    })
  }

  if (heavyDuty) {
    return createRecommendation('Ergonomic Handling Solutions', 'Z-Lifts', {
      confidence: 'high',
      requiresConfirmation: false,
    })
  }

  if (capacityUpper === null) {
    return createRecommendation('Ergonomic Handling Solutions', 'Pivot Arm', {
      confidence: 'medium',
      shortlist: ['Parallelogram', 'Pneumatic Balancers', 'Z-Lifts'],
      description: 'Ergonomic solutions are shortlisted. Final model depends on exact payload and workstation motion requirements.',
    })
  }

  return createRecommendation('Ergonomic Handling Solutions', 'Pivot Arm', {
    confidence: 'high',
    requiresConfirmation: false,
  })
}

function recommendHazardous(answers, capacityUpper, heavyDuty) {
  if (answers.powerRequirement === 'Manual only') {
    return createRecommendation('Manual Hoists', 'Indef C', {
      confidence: 'medium',
      description: 'Manual hoists are used where electric supply is limited. Confirm spark-proof configuration against your hazardous area class.',
      shortlist: ['Indef R', 'Indef P'],
    })
  }

  if (capacityUpper !== null && capacityUpper <= 2 && !heavyDuty) {
    return createRecommendation('Electric Chain Hoists', 'EH II Hoist (Baby)', {
      confidence: 'medium',
      shortlist: ['HC+ Hoist'],
      description: 'Flameproof chain hoist variants are available. Final model selection should match site zone and gas group.',
    })
  }

  return createRecommendation('Wire Rope Hoists', 'HW Wire Rope Hoist', {
    confidence: 'medium',
    shortlist: ['WRH N Series', 'SMD Wire Rope Hoist'],
    description:
      'Flame-proof hoist options are available for gas group IIA/IIB/IIC and Zone 21/22 applications. Final selection should match site classification.',
  })
}

function recommendStorage(capacityUpper, lightDuty, heavyDuty) {
  if (capacityUpper !== null && capacityUpper <= 1 && lightDuty) {
    return createRecommendation('Storage and Retrieval', 'Roll Out Rack', {
      confidence: 'high',
      requiresConfirmation: false,
    })
  }

  if (capacityUpper === null) {
    return createRecommendation('Storage and Retrieval', 'iStacker', {
      confidence: 'medium',
      shortlist: ['Roll Out Rack'],
      description: 'Storage solutions are shortlisted. Final model depends on payload, throughput and aisle constraints.',
    })
  }

  if (heavyDuty || capacityUpper > 1) {
    return createRecommendation('Storage and Retrieval', 'iStacker', {
      confidence: 'high',
      requiresConfirmation: false,
    })
  }

  return createRecommendation('Storage and Retrieval', 'iStacker', {
    confidence: 'high',
    requiresConfirmation: false,
  })
}

function recommendAcrossArea(answers, capacityUpper, spanUpper, heavyDuty) {
  const lowHeadroom = answers.mountingType === 'Low headroom or limited structure'
  const existingBeam = answers.mountingType === 'Existing beam or monorail'

  if (answers.mountingType === 'Need floor-supported movable setup') {
    if (capacityUpper !== null && capacityUpper > 5) {
      return createRecommendation('Overhead Cranes', 'Gantry Crane', {
        confidence: 'high',
        requiresConfirmation: false,
      })
    }

    return createRecommendation('Overhead Cranes', 'Semi Gantry Crane', {
      confidence: 'high',
      requiresConfirmation: false,
    })
  }

  if ((existingBeam || lowHeadroom) && (capacityUpper === null || capacityUpper <= 12.5)) {
    return createRecommendation('EOT Cranes', 'Underslung EOT Crane', {
      confidence: 'high',
      requiresConfirmation: false,
    })
  }

  if (capacityUpper !== null && (capacityUpper > 10 || heavyDuty || (spanUpper !== null && spanUpper > 25))) {
    return createRecommendation('EOT Cranes', 'Double Girder EOT Crane', {
      confidence: 'high',
      requiresConfirmation: false,
    })
  }

  if (capacityUpper !== null && capacityUpper <= 10 && spanUpper !== null && spanUpper <= 25) {
    if (answers.mountingType === 'Can install new overhead runway') {
      return createRecommendation('EOT Cranes', 'Crane Kit', {
        confidence: 'high',
        requiresConfirmation: false,
      })
    }

    return createRecommendation('EOT Cranes', 'Single Girder EOT Crane', {
      confidence: 'high',
      requiresConfirmation: false,
    })
  }

  return createRecommendation('EOT Cranes', 'Single Girder EOT Crane', {
    confidence: 'medium',
    shortlist: ['Crane Kit', 'Underslung EOT Crane'],
    description: 'Across-bay crane options are shortlisted. Final model depends on runway condition, span and structural constraints.',
  })
}

function recommendWorkstation(answers, capacityUpper, liftUpper, heavyDuty, lightDuty) {
  if (answers.powerRequirement === 'Manual only') {
    if (answers.mountingType === 'Existing beam or monorail') {
      return createRecommendation('Manual Hoists', 'ET / PT / GT', {
        confidence: 'high',
        requiresConfirmation: false,
      })
    }

    if (capacityUpper !== null && capacityUpper <= 1 && lightDuty) {
      return createRecommendation('Manual Hoists', 'STIER RLH', {
        confidence: 'high',
        requiresConfirmation: false,
      })
    }

    if (capacityUpper !== null && capacityUpper <= 3) {
      return createRecommendation('Manual Hoists', 'Indef R', {
        confidence: 'high',
        requiresConfirmation: false,
      })
    }

    return createRecommendation('Manual Hoists', 'Indef M', {
      confidence: 'high',
      requiresConfirmation: false,
    })
  }

  if (capacityUpper !== null && capacityUpper <= 1 && (liftUpper === null || liftUpper <= 12)) {
    return createRecommendation('Overhead Cranes', 'JIB Crane', {
      confidence: 'high',
      requiresConfirmation: false,
    })
  }

  if (capacityUpper !== null && capacityUpper <= 5) {
    if (heavyDuty || (liftUpper !== null && liftUpper > 12)) {
      return createRecommendation('Electric Chain Hoists', 'CH III Hoist (Electron)', {
        confidence: 'high',
        requiresConfirmation: false,
      })
    }

    return createRecommendation('Electric Chain Hoists', 'HC+ Hoist', {
      confidence: 'high',
      requiresConfirmation: false,
    })
  }

  return createRecommendation('Electric Chain Hoists', 'HC+ Hoist', {
    confidence: 'medium',
    shortlist: ['CH III Hoist (Electron)'],
    description: 'Workstation options are shortlisted. Final model depends on exact load profile and cycle severity.',
  })
}

function recommendLiftOnly(answers, capacityUpper, liftUpper, heavyDuty, lightDuty) {
  if (answers.powerRequirement === 'Pneumatic only') {
    return createRecommendation('Ergonomic Handling Solutions', 'Pneumatic Balancers', {
      confidence: 'medium',
      description: 'Pneumatic-only selection mapped to balancer solutions. Confirm if this is lifting assist or full hoisting duty.',
    })
  }

  if (answers.powerRequirement === 'Manual only') {
    if (capacityUpper !== null && capacityUpper <= 1) {
      return createRecommendation('Manual Hoists', 'STIER RLH', {
        confidence: 'high',
        requiresConfirmation: false,
      })
    }

    if (capacityUpper !== null && capacityUpper <= 3) {
      return createRecommendation('Manual Hoists', 'Indef R', {
        confidence: 'high',
        requiresConfirmation: false,
      })
    }

    if (capacityUpper !== null && capacityUpper <= 5) {
      return createRecommendation('Manual Hoists', 'Indef M', {
        confidence: 'high',
        requiresConfirmation: false,
      })
    }

    return createRecommendation('Manual Hoists', 'Indef P', {
      confidence: 'high',
      requiresConfirmation: false,
    })
  }

  if (capacityUpper === null) {
    return createRecommendation('Electric Chain Hoists', 'HC+ Hoist', {
      confidence: 'medium',
      shortlist: ['CH III Hoist (Electron)', 'EH II Hoist (Baby)'],
      description: 'Capacity is not fixed, so multiple hoist models are shortlisted for confirmation.',
    })
  }

  if (capacityUpper <= 2) {
    return createRecommendation('Electric Chain Hoists', 'EH II Hoist (Baby)', {
      confidence: 'high',
      requiresConfirmation: false,
    })
  }

  if (capacityUpper <= 5) {
    if (heavyDuty || (liftUpper !== null && liftUpper > 12)) {
      return createRecommendation('Electric Chain Hoists', 'CH III Hoist (Electron)', {
        confidence: 'high',
        requiresConfirmation: false,
      })
    }

    return createRecommendation('Electric Chain Hoists', 'CH IV Hoist (Proton)', {
      confidence: 'high',
      requiresConfirmation: false,
    })
  }

  if (capacityUpper <= 20) {
    if (lightDuty) {
      return createRecommendation('Wire Rope Hoists', 'iR Wire Rope Hoist', {
        confidence: 'high',
        requiresConfirmation: false,
      })
    }

    if (heavyDuty || (liftUpper !== null && liftUpper > 24)) {
      return createRecommendation('Wire Rope Hoists', 'WRH N Series', {
        confidence: 'high',
        requiresConfirmation: false,
      })
    }

    return createRecommendation('Wire Rope Hoists', 'WRH I-II-III', {
      confidence: 'high',
      requiresConfirmation: false,
    })
  }

  if (capacityUpper <= 40) {
    if (liftUpper !== null && liftUpper > 24) {
      return createRecommendation('Wire Rope Hoists', 'SMD Wire Rope Hoist', {
        confidence: 'high',
        requiresConfirmation: false,
      })
    }

    return createRecommendation('Wire Rope Hoists', 'HW Wire Rope Hoist', {
      confidence: 'high',
      requiresConfirmation: false,
    })
  }

  return createRecommendation('Wire Rope Hoists', 'SMD Wire Rope Hoist', {
    confidence: 'medium',
    shortlist: ['HW Wire Rope Hoist'],
    description: 'High-capacity hoists are shortlisted. Final model depends on exact duty cycle and site integration constraints.',
  })
}

const RULE_MATRIX = [
  {
    id: 'ergonomic-assist',
    when: (ctx) =>
      ctx.answers.mainNeed === 'Help workers handle loads with less effort' ||
      ctx.answers.powerRequirement === 'Pneumatic only',
    resolve: (ctx) => recommendErgonomic(ctx.answers, ctx.capacityUpper, ctx.heavyDuty),
  },
  {
    id: 'hazardous-priority',
    when: (ctx) => ctx.hazardous,
    resolve: (ctx) => recommendHazardous(ctx.answers, ctx.capacityUpper, ctx.heavyDuty),
  },
  {
    id: 'storage-retrieval',
    when: (ctx) =>
      ctx.answers.mainNeed === 'Store and retrieve goods' ||
      ctx.answers.siteType === 'Warehouse',
    resolve: (ctx) => recommendStorage(ctx.capacityUpper, ctx.lightDuty, ctx.heavyDuty),
  },
  {
    id: 'across-area-crane',
    when: (ctx) =>
      ctx.answers.mainNeed === 'Move loads across a large area' ||
      ctx.answers.mountingType === 'Need floor-supported movable setup',
    resolve: (ctx) => recommendAcrossArea(ctx.answers, ctx.capacityUpper, ctx.spanUpper, ctx.heavyDuty),
  },
  {
    id: 'workstation',
    when: (ctx) =>
      ctx.answers.mainNeed === 'Move loads in one workstation' ||
      ctx.answers.mainNeed === 'Load and unload at one bay',
    resolve: (ctx) => recommendWorkstation(ctx.answers, ctx.capacityUpper, ctx.liftUpper, ctx.heavyDuty, ctx.lightDuty),
  },
  {
    id: 'lift-only',
    when: (ctx) => ctx.answers.mainNeed === 'Lift up and down only',
    resolve: (ctx) => recommendLiftOnly(ctx.answers, ctx.capacityUpper, ctx.liftUpper, ctx.heavyDuty, ctx.lightDuty),
  },
]

export function getRecommendation(answers) {
  if (answers.solutionTrack === 'Generators') {
    return recommendGenerators(answers)
  }

  if (answers.solutionTrack !== 'Cranes / Hoists') {
    return createRecommendation('Material Handling', 'HW Series', {
      confidence: 'medium',
      shortlist: ['Gantry Crane', 'Electric Chain Hoist EH II (Baby)'],
      description: 'Start by selecting whether you need cranes/hoists or generators for a more precise recommendation.',
    })
  }

  const capacityUpper = parseCapacity(answers)
  const liftUpper = parseLift(answers)
  const spanUpper = parseSpan(answers)
  const cyclesPerHour = parseCycles(answers)
  const hazardous = isHazardous(answers) || answers.siteType === 'Oil & Gas / Petrochemical'
  const heavyDuty = isHeavyDuty(answers, cyclesPerHour)
  const lightDuty = isLightDuty(answers, cyclesPerHour)

  const context = {
    answers,
    capacityUpper,
    liftUpper,
    spanUpper,
    cyclesPerHour,
    hazardous,
    heavyDuty,
    lightDuty,
  }

  for (const rule of RULE_MATRIX) {
    if (rule.when(context)) {
      return rule.resolve(context)
    }
  }

  if (answers.powerRequirement === 'Manual only') {
    return createRecommendation('Manual Hoists', 'Indef R', {
      confidence: 'medium',
      shortlist: ['Indef C', 'Indef M'],
      description: 'Manual hoist options are shortlisted. Final model depends on exact load and required lift.',
    })
  }

  if (capacityUpper !== null && capacityUpper > 5) {
    return createRecommendation('Wire Rope Hoists', 'iR Wire Rope Hoist', {
      confidence: 'medium',
      shortlist: ['WRH I-II-III', 'WRH N Series'],
      description: 'Wire rope options are shortlisted. Final model should be selected after confirming duty class and travel speed needs.',
    })
  }

  return createRecommendation('Electric Chain Hoists', 'HC+ Hoist', {
    confidence: 'medium',
    shortlist: ['EH II Hoist (Baby)', 'CH III Hoist (Electron)'],
    description: 'Core lifting options are shortlisted. Final model depends on exact capacity and cycle profile.',
  })
}
