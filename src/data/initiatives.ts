export type STEMCategory = 'Ciência' | 'Tecnologia' | 'Engenharia' | 'Matemática';
export type InitiativeType = 'Bolsa' | 'Mentoria' | 'Evento' | 'Programa' | 'Curso' | 'Liderança';

export interface Initiative {
  id: string;
  name: string;
  description: string;
  type: InitiativeType;
  categories: STEMCategory[];
  country: string;
  state: string;
  city?: string;
  latitude: number;
  longitude: number;
  website?: string;
  foundedYear?: number;
  organization: string;
  beneficiaries?: number;
  isVerified: boolean;
  createdAt: Date;
}

export interface CountryStats {
  country: string;
  code: string;
  initiatives: number;
  latitude: number;
  longitude: number;
}

// Sample data based on ELLAS platform focus countries
export const initiatives: Initiative[] = [
  {
    id: '1',
    name: 'Meninas na Ciência',
    description: 'Programa de mentoria para jovens mulheres interessadas em carreiras científicas, conectando estudantes com pesquisadoras experientes.',
    type: 'Mentoria',
    categories: ['Ciência', 'Tecnologia'],
    country: 'Brasil',
    state: 'Mato Grosso',
    city: 'Cuiabá',
    latitude: -15.5989,
    longitude: -56.0949,
    website: 'https://meninas.ufmt.br',
    foundedYear: 2018,
    organization: 'UFMT',
    beneficiaries: 500,
    isVerified: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Mulheres na Tecnologia',
    description: 'Bolsas de estudo integrais para mulheres em cursos de TI com foco em desenvolvimento de software e ciência de dados.',
    type: 'Bolsa',
    categories: ['Tecnologia'],
    country: 'Brasil',
    state: 'São Paulo',
    city: 'São Paulo',
    latitude: -23.5505,
    longitude: -46.6333,
    website: 'https://mulheresnatech.org.br',
    foundedYear: 2019,
    organization: 'Instituto de Tecnologia',
    beneficiaries: 1200,
    isVerified: true,
    createdAt: new Date('2024-02-10'),
  },
  {
    id: '3',
    name: 'Engenheiras do Futuro',
    description: 'Evento anual que reúne engenheiras de todo o Peru para networking, workshops e palestras inspiradoras.',
    type: 'Evento',
    categories: ['Engenharia'],
    country: 'Peru',
    state: 'Lima',
    city: 'Lima',
    latitude: -12.0464,
    longitude: -77.0428,
    website: 'https://engenheiras.pe',
    foundedYear: 2020,
    organization: 'Universidad Nacional de Ingeniería',
    beneficiaries: 800,
    isVerified: true,
    createdAt: new Date('2024-03-05'),
  },
  {
    id: '4',
    name: 'Matemática Para Todas',
    description: 'Programa de capacitação em matemática avançada para professoras do ensino fundamental e médio.',
    type: 'Curso',
    categories: ['Matemática'],
    country: 'Bolívia',
    state: 'La Paz',
    city: 'La Paz',
    latitude: -16.5000,
    longitude: -68.1500,
    website: 'https://matematicaparatodas.bo',
    foundedYear: 2021,
    organization: 'Universidad Mayor de San Andrés',
    beneficiaries: 350,
    isVerified: true,
    createdAt: new Date('2024-04-20'),
  },
  {
    id: '5',
    name: 'Líderes STEM Argentina',
    description: 'Programa de desenvolvimento de liderança feminina em empresas de tecnologia e startups.',
    type: 'Liderança',
    categories: ['Tecnologia', 'Engenharia'],
    country: 'Argentina',
    state: 'Buenos Aires',
    city: 'Buenos Aires',
    latitude: -34.6037,
    longitude: -58.3816,
    website: 'https://lideresstem.ar',
    foundedYear: 2019,
    organization: 'Fundación Sadosky',
    beneficiaries: 200,
    isVerified: true,
    createdAt: new Date('2024-05-15'),
  },
  {
    id: '6',
    name: 'Cientistas Colombianas',
    description: 'Rede de apoio e mentoria para mulheres cientistas em universidades colombianas.',
    type: 'Mentoria',
    categories: ['Ciência'],
    country: 'Colômbia',
    state: 'Bogotá',
    city: 'Bogotá',
    latitude: 4.7110,
    longitude: -74.0721,
    website: 'https://cientistascol.org',
    foundedYear: 2020,
    organization: 'Universidad Nacional de Colombia',
    beneficiaries: 450,
    isVerified: true,
    createdAt: new Date('2024-06-10'),
  },
  {
    id: '7',
    name: 'Tech Girls Chile',
    description: 'Bootcamp intensivo de programação para adolescentes com aulas práticas e projetos reais.',
    type: 'Programa',
    categories: ['Tecnologia'],
    country: 'Chile',
    state: 'Santiago',
    city: 'Santiago',
    latitude: -33.4489,
    longitude: -70.6693,
    website: 'https://techgirls.cl',
    foundedYear: 2022,
    organization: 'Fundación Chile',
    beneficiaries: 300,
    isVerified: true,
    createdAt: new Date('2024-07-01'),
  },
  {
    id: '8',
    name: 'Mulheres na Engenharia',
    description: 'Programa de estágio e mentoria em grandes empresas de engenharia civil e mecânica.',
    type: 'Programa',
    categories: ['Engenharia'],
    country: 'Brasil',
    state: 'Rio de Janeiro',
    city: 'Rio de Janeiro',
    latitude: -22.9068,
    longitude: -43.1729,
    website: 'https://mulheresengenharia.org.br',
    foundedYear: 2017,
    organization: 'COPPE/UFRJ',
    beneficiaries: 600,
    isVerified: true,
    createdAt: new Date('2024-08-12'),
  },
  {
    id: '9',
    name: 'Cientistas do Amanhã',
    description: 'Feira de ciências exclusiva para projetos desenvolvidos por meninas do ensino médio.',
    type: 'Evento',
    categories: ['Ciência', 'Tecnologia', 'Engenharia', 'Matemática'],
    country: 'Brasil',
    state: 'Minas Gerais',
    city: 'Belo Horizonte',
    latitude: -19.9167,
    longitude: -43.9345,
    foundedYear: 2021,
    organization: 'UFMG',
    beneficiaries: 250,
    isVerified: true,
    createdAt: new Date('2024-09-05'),
  },
  {
    id: '10',
    name: 'Coding Amazonas',
    description: 'Iniciativa de inclusão digital para mulheres indígenas com cursos de programação adaptados.',
    type: 'Curso',
    categories: ['Tecnologia'],
    country: 'Brasil',
    state: 'Amazonas',
    city: 'Manaus',
    latitude: -3.1190,
    longitude: -60.0217,
    website: 'https://codingamazonas.org',
    foundedYear: 2023,
    organization: 'UFAM',
    beneficiaries: 80,
    isVerified: true,
    createdAt: new Date('2024-10-01'),
  },
  {
    id: '11',
    name: 'Mujeres en Ingeniería Ecuador',
    description: 'Conferência anual reunindo engenheiras equatorianas para compartilhar pesquisas e experiências.',
    type: 'Evento',
    categories: ['Engenharia'],
    country: 'Equador',
    state: 'Pichincha',
    city: 'Quito',
    latitude: -0.1807,
    longitude: -78.4678,
    website: 'https://mujeresingenieria.ec',
    foundedYear: 2020,
    organization: 'Escuela Politécnica Nacional',
    beneficiaries: 400,
    isVerified: true,
    createdAt: new Date('2024-11-15'),
  },
  {
    id: '12',
    name: 'Científicas Uruguayas',
    description: 'Programa de bolsas de pesquisa para mulheres em pós-graduação nas áreas de ciências exatas.',
    type: 'Bolsa',
    categories: ['Ciência', 'Matemática'],
    country: 'Uruguai',
    state: 'Montevideo',
    city: 'Montevideo',
    latitude: -34.9011,
    longitude: -56.1645,
    website: 'https://cientificasuruguayas.uy',
    foundedYear: 2019,
    organization: 'Universidad de la República',
    beneficiaries: 150,
    isVerified: true,
    createdAt: new Date('2024-12-01'),
  },
];

export const countryStats: CountryStats[] = [
  { country: 'Brasil', code: 'BR', initiatives: 5, latitude: -14.235, longitude: -51.9253 },
  { country: 'Peru', code: 'PE', initiatives: 1, latitude: -9.19, longitude: -75.0152 },
  { country: 'Bolívia', code: 'BO', initiatives: 1, latitude: -16.2902, longitude: -63.5887 },
  { country: 'Argentina', code: 'AR', initiatives: 1, latitude: -38.4161, longitude: -63.6167 },
  { country: 'Colômbia', code: 'CO', initiatives: 1, latitude: 4.5709, longitude: -74.2973 },
  { country: 'Chile', code: 'CL', initiatives: 1, latitude: -35.6751, longitude: -71.543 },
  { country: 'Equador', code: 'EC', initiatives: 1, latitude: -1.8312, longitude: -78.1834 },
  { country: 'Uruguai', code: 'UY', initiatives: 1, latitude: -32.5228, longitude: -55.7658 },
];

// Get daily highlight based on date
export function getDailyHighlight(): Initiative {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const index = dayOfYear % initiatives.length;
  return initiatives[index];
}

// Get initiatives by category
export function getInitiativesByCategory(category: STEMCategory): Initiative[] {
  return initiatives.filter(init => init.categories.includes(category));
}

// Get initiatives by country
export function getInitiativesByCountry(country: string): Initiative[] {
  return initiatives.filter(init => init.country === country);
}

// Get total statistics
export function getStatistics() {
  const totalInitiatives = initiatives.length;
  const totalBeneficiaries = initiatives.reduce((sum, init) => sum + (init.beneficiaries || 0), 0);
  const totalCountries = [...new Set(initiatives.map(init => init.country))].length;
  const verifiedCount = initiatives.filter(init => init.isVerified).length;
  
  return {
    totalInitiatives,
    totalBeneficiaries,
    totalCountries,
    verifiedCount,
  };
}
