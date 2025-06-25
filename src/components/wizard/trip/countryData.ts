
// Country-specific data - Updated to be more comprehensive
export const getCountrySpecificData = (country: string) => {
  const countryData: Record<string, any> = {
    'Kenya': {
      airports: [
        { code: 'NBO', name: 'Jomo Kenyatta International Airport' },
        { code: 'MBA', name: 'Moi International Airport' },
        { code: 'WIL', name: 'Wilson Airport' },
        { code: 'KIS', name: 'Kisumu International Airport' },
        { code: 'UKA', name: 'Ukunda Airport' },
        { code: 'LOK', name: 'Lokichoggio Airport' },
      ],
      seaPorts: [
        { code: 'MBA', name: 'Port of Mombasa' },
        { code: 'LAM', name: 'Port of Lamu' },
        { code: 'KIS', name: 'Port of Kisumu' },
      ],
      landBorders: [
        { code: 'NAM', name: 'Namanga Border (Tanzania)' },
        { code: 'MAL', name: 'Malaba Border (Uganda)' },
        { code: 'BUS', name: 'Busia Border (Uganda)' },
        { code: 'MOY', name: 'Moyale Border (Ethiopia)' },
        { code: 'ISE', name: 'Isebania Border (Tanzania)' },
        { code: 'LUG', name: 'Lunga Lunga Border (Tanzania)' },
      ]
    },
    'Tanzania': {
      airports: [
        { code: 'DAR', name: 'Julius Nyerere International Airport' },
        { code: 'JRO', name: 'Kilimanjaro International Airport' },
        { code: 'ZNZ', name: 'Abeid Amani Karume International Airport' },
        { code: 'MWZ', name: 'Mwanza Airport' },
      ],
      seaPorts: [
        { code: 'DAR', name: 'Port of Dar es Salaam' },
        { code: 'TNG', name: 'Port of Tanga' },
        { code: 'ZNZ', name: 'Port of Zanzibar' },
      ],
      landBorders: [
        { code: 'NAM', name: 'Namanga Border (Kenya)' },
        { code: 'ISE', name: 'Isebania Border (Kenya)' },
        { code: 'SIR', name: 'Sirari Border (Kenya)' },
      ]
    },
    'Uganda': {
      airports: [
        { code: 'EBB', name: 'Entebbe International Airport' },
        { code: 'KTL', name: 'Kitale Airport' },
        { code: 'GSU', name: 'Gulu Airport' },
      ],
      seaPorts: [
        { code: 'ENT', name: 'Port Bell (Lake Victoria)' },
        { code: 'JIN', name: 'Jinja Port' },
      ],
      landBorders: [
        { code: 'MAL', name: 'Malaba Border (Kenya)' },
        { code: 'BUS', name: 'Busia Border (Kenya)' },
        { code: 'KAS', name: 'Kasese Border (DRC)' },
      ]
    }
  };
  
  return countryData[country] || countryData['Kenya']; // Default to Kenya if country not found
};
