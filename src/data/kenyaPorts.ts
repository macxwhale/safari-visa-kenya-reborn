
export interface KenyaPort {
  code: string;
  name: string;
  city?: string;
  type: 'airport' | 'seaport' | 'border';
}

export const KENYA_AIRPORTS: KenyaPort[] = [
  { code: 'NBO', name: 'Jomo Kenyatta International Airport', city: 'Nairobi', type: 'airport' },
  { code: 'WIL', name: 'Wilson Airport', city: 'Nairobi', type: 'airport' },
  { code: 'MBA', name: 'Moi International Airport', city: 'Mombasa', type: 'airport' },
  { code: 'KIS', name: 'Kisumu International Airport', city: 'Kisumu', type: 'airport' },
  { code: 'EDL', name: 'Eldoret International Airport', city: 'Eldoret', type: 'airport' },
  { code: 'UKA', name: 'Ukunda Airport', city: 'Diani/Ukunda', type: 'airport' },
  { code: 'LOK', name: 'Lokichoggio Airport', city: 'Lokichoggio', type: 'airport' },
  { code: 'NYK', name: 'Nanyuki Airport', city: 'Nanyuki', type: 'airport' }
];

export const KENYA_SEAPORTS: KenyaPort[] = [
  { code: 'MBA_PORT', name: 'Port of Mombasa', city: 'Mombasa', type: 'seaport' },
  { code: 'LAM_PORT', name: 'Port of Lamu', city: 'Lamu', type: 'seaport' },
  { code: 'KIS_PORT', name: 'Kisumu Port', city: 'Kisumu', type: 'seaport' }
];

export const KENYA_LAND_BORDERS: KenyaPort[] = [
  { code: 'BUS_UGA', name: 'Busia Border (Uganda)', city: 'Busia', type: 'border' },
  { code: 'MAL_UGA', name: 'Malaba Border (Uganda)', city: 'Malaba', type: 'border' },
  { code: 'NAM_TAN', name: 'Namanga Border (Tanzania)', city: 'Namanga', type: 'border' },
  { code: 'TAV_TAN', name: 'Taveta Border (Tanzania)', city: 'Taveta', type: 'border' },
  { code: 'LUN_TAN', name: 'Lunga Lunga Border (Tanzania)', city: 'Lunga Lunga', type: 'border' },
  { code: 'ISI_TAN', name: 'Isebania Border (Tanzania)', city: 'Isebania', type: 'border' },
  { code: 'MOY_ETH', name: 'Moyale Border (Ethiopia)', city: 'Moyale', type: 'border' },
  { code: 'MAN_SOM', name: 'Mandera Border (Somalia)', city: 'Mandera', type: 'border' },
  { code: 'LIB_SOM', name: 'Liboi Border (Somalia)', city: 'Liboi', type: 'border' }
];

export const getAllKenyaPorts = (type?: 'airport' | 'seaport' | 'border'): KenyaPort[] => {
  const allPorts = [...KENYA_AIRPORTS, ...KENYA_SEAPORTS, ...KENYA_LAND_BORDERS];
  
  if (type) {
    return allPorts.filter(port => port.type === type);
  }
  
  return allPorts;
};
