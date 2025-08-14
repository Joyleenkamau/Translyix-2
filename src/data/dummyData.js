export const reports = [
  {
    id: 'r1001',
    region: 'Greater Accra',
    coords: { lat: 5.63, lng: -0.22 },
    severity: 'medium',
    timestamp: Date.now() - 1000 * 60 * 3
  },
  {
    id: 'r1002',
    region: 'Ashanti',
    coords: { lat: 6.69, lng: -1.62 },
    severity: 'low',
    timestamp: Date.now() - 1000 * 60 * 5
  }
]

export const predictiveAlerts = [
  { id: 'a1', region: 'Greater Accra', message: 'Likely pothole cluster forming within 24h.' },
  { id: 'a2', region: 'Northern', message: 'Bridge inspection recommended this week.' }
]