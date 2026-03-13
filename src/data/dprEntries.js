// Mock DPR entries data
const dprEntries = [
  {
    id: 1,
    projectId: 1,
    date: '2026-03-10',
    weather: 'Sunny',
    labourCount: 45,
    activities: 'Earthwork excavation for foundation pit.',
    materialsUsed: 'Steel bars - 2 tons, Cement - 50 bags',
    equipmentUsed: 'JCB, Concrete Mixer',
    issues: 'Minor water seepage in pit area.',
  },
  {
    id: 2,
    projectId: 1,
    date: '2026-03-11',
    weather: 'Cloudy',
    labourCount: 40,
    activities: 'Rebar tying for column footings.',
    materialsUsed: 'Steel bars - 1.5 tons, Binding wire - 20 kg',
    equipmentUsed: 'Bar bending machine',
    issues: 'None',
  },
  {
    id: 3,
    projectId: 2,
    date: '2026-03-10',
    weather: 'Rainy',
    labourCount: 30,
    activities: 'Tunnel boring work - Section A.',
    materialsUsed: 'Concrete segments - 100 units',
    equipmentUsed: 'TBM Machine',
    issues: 'Work delayed by 2 hours due to rain.',
  },
];

export default dprEntries;
