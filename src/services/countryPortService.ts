
// Enhanced country-port service with real data
export interface Port {
  code: string;
  name: string;
  type: 'airport' | 'seaport' | 'border';
  city?: string;
  iata?: string;
  icao?: string;
}

export interface CountryPortData {
  airports: Port[];
  seaPorts: Port[];
  landBorders: Port[];
}

// Comprehensive port data for major countries
const COUNTRY_PORT_DATA: Record<string, CountryPortData> = {
  'United States': {
    airports: [
      { code: 'JFK', name: 'John F. Kennedy International Airport', type: 'airport', city: 'New York', iata: 'JFK', icao: 'KJFK' },
      { code: 'LAX', name: 'Los Angeles International Airport', type: 'airport', city: 'Los Angeles', iata: 'LAX', icao: 'KLAX' },
      { code: 'ORD', name: 'Chicago O\'Hare International Airport', type: 'airport', city: 'Chicago', iata: 'ORD', icao: 'KORD' },
      { code: 'MIA', name: 'Miami International Airport', type: 'airport', city: 'Miami', iata: 'MIA', icao: 'KMIA' },
      { code: 'SFO', name: 'San Francisco International Airport', type: 'airport', city: 'San Francisco', iata: 'SFO', icao: 'KSFO' },
      { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport', type: 'airport', city: 'Atlanta', iata: 'ATL', icao: 'KATL' }
    ],
    seaPorts: [
      { code: 'LAX-PORT', name: 'Port of Los Angeles', type: 'seaport', city: 'Los Angeles' },
      { code: 'NYC-PORT', name: 'Port of New York and New Jersey', type: 'seaport', city: 'New York' },
      { code: 'MIA-PORT', name: 'Port of Miami', type: 'seaport', city: 'Miami' },
      { code: 'LBC-PORT', name: 'Port of Long Beach', type: 'seaport', city: 'Long Beach' }
    ],
    landBorders: [
      { code: 'TIJ-USD', name: 'San Diego-Tijuana Border', type: 'border', city: 'San Diego' },
      { code: 'ELP-JRZ', name: 'El Paso-Ciudad Juárez Border', type: 'border', city: 'El Paso' }
    ]
  },
  'United Kingdom': {
    airports: [
      { code: 'LHR', name: 'London Heathrow Airport', type: 'airport', city: 'London', iata: 'LHR', icao: 'EGLL' },
      { code: 'LGW', name: 'London Gatwick Airport', type: 'airport', city: 'London', iata: 'LGW', icao: 'EGKK' },
      { code: 'MAN', name: 'Manchester Airport', type: 'airport', city: 'Manchester', iata: 'MAN', icao: 'EGCC' },
      { code: 'EDI', name: 'Edinburgh Airport', type: 'airport', city: 'Edinburgh', iata: 'EDI', icao: 'EGPH' },
      { code: 'BHX', name: 'Birmingham Airport', type: 'airport', city: 'Birmingham', iata: 'BHX', icao: 'EGBB' }
    ],
    seaPorts: [
      { code: 'LON-PORT', name: 'Port of London', type: 'seaport', city: 'London' },
      { code: 'DVR-PORT', name: 'Port of Dover', type: 'seaport', city: 'Dover' },
      { code: 'LIV-PORT', name: 'Port of Liverpool', type: 'seaport', city: 'Liverpool' },
      { code: 'SOU-PORT', name: 'Port of Southampton', type: 'seaport', city: 'Southampton' }
    ],
    landBorders: [
      { code: 'DVR-CAL', name: 'Dover-Calais Channel Tunnel', type: 'border', city: 'Dover' }
    ]
  },
  'Germany': {
    airports: [
      { code: 'FRA', name: 'Frankfurt Airport', type: 'airport', city: 'Frankfurt', iata: 'FRA', icao: 'EDDF' },
      { code: 'MUC', name: 'Munich Airport', type: 'airport', city: 'Munich', iata: 'MUC', icao: 'EDDM' },
      { code: 'BER', name: 'Berlin Brandenburg Airport', type: 'airport', city: 'Berlin', iata: 'BER', icao: 'EDDB' },
      { code: 'DUS', name: 'Düsseldorf Airport', type: 'airport', city: 'Düsseldorf', iata: 'DUS', icao: 'EDDL' }
    ],
    seaPorts: [
      { code: 'HAM-PORT', name: 'Port of Hamburg', type: 'seaport', city: 'Hamburg' },
      { code: 'BRE-PORT', name: 'Port of Bremen', type: 'seaport', city: 'Bremen' }
    ],
    landBorders: [
      { code: 'FRA-AUT', name: 'Frankfurt-Austria Border', type: 'border', city: 'Frankfurt' },
      { code: 'BER-POL', name: 'Berlin-Poland Border', type: 'border', city: 'Berlin' }
    ]
  },
  'Canada': {
    airports: [
      { code: 'YYZ', name: 'Toronto Pearson International Airport', type: 'airport', city: 'Toronto', iata: 'YYZ', icao: 'CYYZ' },
      { code: 'YVR', name: 'Vancouver International Airport', type: 'airport', city: 'Vancouver', iata: 'YVR', icao: 'CYVR' },
      { code: 'YUL', name: 'Montreal-Pierre Elliott Trudeau International Airport', type: 'airport', city: 'Montreal', iata: 'YUL', icao: 'CYUL' }
    ],
    seaPorts: [
      { code: 'VAN-PORT', name: 'Port of Vancouver', type: 'seaport', city: 'Vancouver' },
      { code: 'MON-PORT', name: 'Port of Montreal', type: 'seaport', city: 'Montreal' }
    ],
    landBorders: [
      { code: 'TOR-USA', name: 'Toronto-USA Border', type: 'border', city: 'Toronto' },
      { code: 'VAN-USA', name: 'Vancouver-USA Border', type: 'border', city: 'Vancouver' }
    ]
  }
};

export const getCountryPortData = async (country: string): Promise<CountryPortData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return COUNTRY_PORT_DATA[country] || {
    airports: [],
    seaPorts: [],
    landBorders: []
  };
};

export const searchPorts = async (country: string, query: string): Promise<Port[]> => {
  const data = await getCountryPortData(country);
  const allPorts = [...data.airports, ...data.seaPorts, ...data.landBorders];
  
  if (!query) return allPorts;
  
  return allPorts.filter(port => 
    port.name.toLowerCase().includes(query.toLowerCase()) ||
    port.code.toLowerCase().includes(query.toLowerCase()) ||
    port.city?.toLowerCase().includes(query.toLowerCase())
  );
};
