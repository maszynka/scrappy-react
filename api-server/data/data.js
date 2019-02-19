const resolveSample = sampleFile => require(`./samples/${sampleFile}`);

files = {
  getoffer: 'getoffer-reference2018-40.json',
  metadata: 'metadata.json',
  offertsummaries: 'offersummaries.json',
  contractType: 'contractType.json',
  country: 'country.json',
  'application-form-url': 'application-form-url-reference2018-40.json',
  contact: 'contact-uid1.html',
  'get-token': 'get-token.json',
  hero: 'hero-uid1.html',
  location: 'location-uid1.html',
  otodom1: 'otodom_1.html',
  otodom2: 'otodom_2.html'
};

data = {};

for (let file in files) {
  data[file] = {
    type: files[file].endsWith('.json') ? 'application/json': 'text/html',
    fileName: files[file]
  }
};

module.exports = data;


