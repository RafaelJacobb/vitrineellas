import { useState, useEffect } from 'react';
import { MapPin, Info } from 'lucide-react';
import { countryStats, getInitiativesByCountry, initiatives } from '@/data/initiatives';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Lazy load map to avoid SSR issues
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const purpleIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
}

export function MapSection() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const maxInitiatives = Math.max(...countryStats.map(c => c.initiatives));

  const selectedInitiatives = selectedCountry
    ? getInitiativesByCountry(selectedCountry)
    : [];

  const mapCenter: [number, number] = selectedCountry
    ? (() => {
        const country = countryStats.find(c => c.country === selectedCountry);
        return country ? [country.latitude, country.longitude] : [-15, -60];
      })()
    : [-15, -60];

  const mapZoom = selectedCountry ? 5 : 3;

  const displayedInitiatives = selectedCountry
    ? initiatives.filter(i => i.country === selectedCountry)
    : initiatives;

  return (
    <section id="mapa" className="py-16 md:py-24 bg-gradient-map">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Mapa de Iniciativas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visualize a distribuição de iniciativas STEM para mulheres na América Latina.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
              <div className="h-[400px] md:h-[500px]">
                <MapContainer
                  center={mapCenter}
                  zoom={mapZoom}
                  className="h-full w-full z-0"
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapUpdater center={mapCenter} zoom={mapZoom} />
                  {displayedInitiatives.map((initiative) => (
                    <Marker
                      key={initiative.id}
                      position={[initiative.latitude, initiative.longitude]}
                      icon={purpleIcon}
                    >
                      <Popup>
                        <div className="min-w-[200px]">
                          <h3 className="font-semibold text-sm mb-1">{initiative.name}</h3>
                          <p className="text-xs text-gray-600 mb-2">{initiative.organization}</p>
                          <p className="text-xs mb-2 line-clamp-2">{initiative.description}</p>
                          <div className="flex flex-wrap gap-1">
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-[10px] font-medium">
                              {initiative.type}
                            </span>
                            {initiative.city && (
                              <span className="text-[10px] text-gray-500">
                                📍 {initiative.city}, {initiative.state}
                              </span>
                            )}
                          </div>
                          {initiative.website && (
                            <a
                              href={initiative.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-purple-600 underline mt-1 block"
                            >
                              Visitar site →
                            </a>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Country selector */}
            <div className="bg-card rounded-xl border border-border p-4 shadow-md">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Selecionar País
              </label>
              <Select value={selectedCountry || 'all'} onValueChange={(val) => setSelectedCountry(val === 'all' ? null : val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os países" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os países</SelectItem>
                  {countryStats.map((country) => (
                    <SelectItem key={country.code} value={country.country}>
                      {country.country} ({country.initiatives})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Country stats */}
            <div className="bg-card rounded-xl border border-border p-4 shadow-md">
              <h3 className="font-display font-semibold text-lg mb-4">
                {selectedCountry || 'Todos os Países'}
              </h3>

              {selectedCountry ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Iniciativas</span>
                    <span className="font-semibold text-foreground">{selectedInitiatives.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Beneficiárias</span>
                    <span className="font-semibold text-foreground">
                      {selectedInitiatives.reduce((sum, i) => sum + (i.beneficiaries || 0), 0)}
                    </span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <p className="text-sm font-medium mb-2">Tipos de Iniciativas:</p>
                    <div className="flex flex-wrap gap-2">
                      {[...new Set(selectedInitiatives.map(i => i.type))].map(type => (
                        <span key={type} className="px-2 py-1 bg-secondary rounded-full text-xs">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {countryStats
                    .sort((a, b) => b.initiatives - a.initiatives)
                    .map((country) => (
                      <div
                        key={country.code}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => setSelectedCountry(country.country)}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">{country.country}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 bg-muted rounded-full w-20">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${(country.initiatives / maxInitiatives) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-6 text-right">
                            {country.initiatives}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Info card */}
            <div className="bg-secondary/50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Dados da Rede ELLAS</p>
                  <p className="text-xs text-muted-foreground">
                    As informações são atualizadas regularmente a partir da plataforma ELLAS
                    e do cadastro colaborativo da comunidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
