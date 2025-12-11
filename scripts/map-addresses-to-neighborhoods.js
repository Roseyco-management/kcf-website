/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

// Get all sold house images
const housesDir = path.join(__dirname, '../public/houses-sold');
const files = fs.readdirSync(housesDir).filter(f => f.endsWith('.jpeg'));

// Extract addresses from filenames
const addresses = files.map(f => f.replace('.jpeg', ''));

// Neighborhood mapping based on ZIP codes and areas in Kansas City metro
const neighborhoodMapping = {
  // Independence, MO (64050-64058)
  'independence': ['E 18th', 'E 19th', 'E 23rd', 'S Crysler', 'Crysler'],

  // Overland Park, KS (66204-66223)
  'overland-park': ['Elmira'],

  // Lee\'s Summit, MO (64002, 64063-64086)
  'lees-summit': ['SW Cross Creek', 'S Silver Top'],

  // Brookside, Kansas City, MO (64113)
  'brookside': ['Brooklyn Ave'],

  // Liberty, MO (64068-64069)
  'liberty': ['N Jarboe'],

  // Waldo, Kansas City, MO (64114)
  'waldo': ['Wornall', 'Gregory'],

  // Blue Springs, MO (64013-64015)
  'blue-springs': ['NW'],

  // Olathe, KS (66061-66063)
  'olathe': ['W'],

  // Leawood, KS (66206-66211)
  'leawood': ['State Line'],

  // River Market, Kansas City, MO (64106)
  'river-market': ['Delaware', 'Grand'],

  // Northland, Kansas City, MO (64118, 64151-64158)
  'northland': ['N Oak', 'NE'],
};

function findNeighborhood(address) {
  // Try to match address patterns to neighborhoods
  for (const [neighborhood, patterns] of Object.entries(neighborhoodMapping)) {
    for (const pattern of patterns) {
      if (address.includes(pattern)) {
        return neighborhood;
      }
    }
  }

  // If no match, try to infer from street names
  if (address.includes('N ') || address.includes('North ')) {
    return 'northland';
  }
  if (address.includes('SW ') || address.includes('South')) {
    return 'lees-summit';
  }

  // Default fallback
  return 'overland-park'; // Most common area
}

// Generate the TypeScript data
console.log('// Analyzing addresses...\n');

const results = addresses.map(address => {
  const neighborhood = findNeighborhood(address);
  return {
    address,
    neighborhood,
    image: `/houses-sold/${address}.jpeg`,
  };
});

console.log('export const soldProperties = [');
results.forEach((prop, i) => {
  console.log(`  {`);
  console.log(`    address: "${prop.address}",`);
  console.log(`    image: "${prop.image}",`);
  console.log(`    neighborhoodSlug: "${prop.neighborhood}", // ${prop.address.split(' ')[0]} ${prop.address.includes('E ') ? 'East' : prop.address.includes('N ') ? 'North' : prop.address.includes('S ') ? 'South' : prop.address.includes('W ') ? 'West' : ''}`);
  console.log(`  }${i < results.length - 1 ? ',' : ''}`);
});
console.log('];');

console.log('\n// Manual verification needed:');
results.forEach(prop => {
  console.log(`// ${prop.address} → ${prop.neighborhood}`);
});
