export const chatbotQuestions = [
  {
    id: 'applicationType',
    label: 'What is your application type?',
    options: ['Warehouse', 'Manufacturing', 'Construction', 'Other'],
  },
  {
    id: 'loadCapacity',
    label: 'What load capacity do you need?',
    options: ['Under 1T', '1-5T', '5-20T', 'Over 20T'],
  },
  {
    id: 'liftHeight',
    label: 'What lift height is required?',
    options: ['Under 6m', '6-12m', 'Over 12m'],
  },
  {
    id: 'usageFrequency',
    label: 'How frequently will the equipment be used?',
    options: ['Occasional', 'Regular', 'Continuous'],
  },
]

const recommendationDetails = {
  'Manual Chain Pulley Blocks':
    'Best for light loads and occasional operations where manual, portable lifting is preferred.',
  'Electric Chain Hoists':
    'Ideal for frequent, controlled lifting in workshops and production environments.',
  'Wire Rope Hoists':
    'Suited for higher duty cycles and heavier repetitive lifting in industrial settings.',
  'EOT Cranes':
    'Recommended for large facilities and heavy loads requiring wide-area overhead coverage.',
  'Jib Cranes':
    'Great for focused workstation lifting and localized material movement.',
}

export function getRecommendation(answers) {
  const applicationType = answers.applicationType
  const loadCapacity = answers.loadCapacity
  const usageFrequency = answers.usageFrequency

  if (applicationType === 'Construction') {
    return {
      products: ['Jib Cranes', 'EOT Cranes'],
      primaryProduct: 'Jib Cranes',
      description: recommendationDetails['Jib Cranes'],
    }
  }

  if (loadCapacity === 'Under 1T' && usageFrequency === 'Occasional') {
    return {
      products: ['Manual Chain Pulley Blocks'],
      primaryProduct: 'Manual Chain Pulley Blocks',
      description: recommendationDetails['Manual Chain Pulley Blocks'],
    }
  }

  if (loadCapacity === 'Under 1T' && ['Regular', 'Continuous'].includes(usageFrequency)) {
    return {
      products: ['Electric Chain Hoists'],
      primaryProduct: 'Electric Chain Hoists',
      description: recommendationDetails['Electric Chain Hoists'],
    }
  }

  if (loadCapacity === '1-5T') {
    return {
      products: ['Electric Chain Hoists', 'Wire Rope Hoists'],
      primaryProduct: 'Electric Chain Hoists',
      description: recommendationDetails['Electric Chain Hoists'],
    }
  }

  if (loadCapacity === '5-20T') {
    return {
      products: ['Wire Rope Hoists', 'EOT Cranes'],
      primaryProduct: 'Wire Rope Hoists',
      description: recommendationDetails['Wire Rope Hoists'],
    }
  }

  if (loadCapacity === 'Over 20T') {
    return {
      products: ['EOT Cranes'],
      primaryProduct: 'EOT Cranes',
      description: recommendationDetails['EOT Cranes'],
    }
  }

  return {
    products: ['Electric Chain Hoists'],
    primaryProduct: 'Electric Chain Hoists',
    description: recommendationDetails['Electric Chain Hoists'],
  }
}
