import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Trophy, Medal, Award, Star, Instagram, Linkedin, Youtube, Facebook, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("Spain");
  const [selectedCity, setSelectedCity] = useState("all");

  // Generate 150 diverse foodie influencers with at least 10 per city
  const generateLeaderboardData = () => {
    const names = [
      'Alex Chen', 'Maya Patel', 'Jordan Smith', 'Zoe Williams', 'Kai Nakamura',
      'Luna Rodriguez', 'Finn O\'Connor', 'Nova Kim', 'River Thompson', 'Sage Davis',
      'Phoenix Lee', 'Aria Johnson', 'Atlas Brown', 'Ivy Martinez', 'Orion Taylor',
      'Hazel Wilson', 'Leo Garcia', 'Ruby Anderson', 'Jasper Moore', 'Stella Jackson',
      'Owen White', 'Cora Lewis', 'Milo Clark', 'Luna Walker', 'Felix Hall',
      'Iris Allen', 'Theo Young', 'Jade King', 'Ezra Wright', 'Rose Lopez',
      'Asher Hill', 'Wren Scott', 'Kai Green', 'Lyra Adams', 'Cruz Baker',
      'Ember Gonzalez', 'Ryder Nelson', 'Sage Carter', 'Nova Mitchell', 'River Perez',
      'Atlas Roberts', 'Ivy Turner', 'Phoenix Phillips', 'Hazel Campbell', 'Leo Parker',
      'Ruby Evans', 'Jasper Edwards', 'Stella Collins', 'Owen Stewart', 'Cora Sanchez',
      'Milo Morris', 'Luna Rogers', 'Felix Reed', 'Iris Cook', 'Theo Bailey',
      'Jade Rivera', 'Ezra Cooper', 'Rose Richardson', 'Asher Cox', 'Wren Howard',
      'Kai Ward', 'Lyra Torres', 'Cruz Peterson', 'Ember Gray', 'Ryder Ramirez',
      'Sage James', 'Nova Watson', 'River Brooks', 'Atlas Kelly', 'Ivy Sanders',
      'Phoenix Price', 'Hazel Bennett', 'Leo Wood', 'Ruby Barnes', 'Jasper Ross',
      'Stella Henderson', 'Owen Coleman', 'Cora Jenkins', 'Milo Perry', 'Luna Powell',
      'Felix Long', 'Iris Patterson', 'Theo Hughes', 'Jade Flores', 'Ezra Washington',
      'Rose Butler', 'Asher Simmons', 'Wren Foster', 'Kai Gonzales', 'Lyra Bryant',
      'Cruz Alexander', 'Ember Russell', 'Ryder Griffin', 'Sage Diaz', 'Nova Hayes',
      'River Myers', 'Atlas Ford', 'Ivy Hamilton', 'Phoenix Graham', 'Hazel Sullivan',
      'Blake Torres', 'Quinn Martinez', 'Rowan Lee', 'Skye Anderson', 'Dante Wilson',
      'Aria Thompson', 'Zara Johnson', 'Luca Brown', 'Nora Garcia', 'Elias Davis',
      'Cleo Rodriguez', 'Jaxon Smith', 'Vera Williams', 'Enzo Chen', 'Tessa Patel',
      'Miles Taylor', 'Delia Moore', 'Cyrus Jackson', 'Isla White', 'Roman Clark',
      'Nyx Lewis', 'Kael Walker', 'Zola Hall', 'Orion Allen', 'Lyric Young',
      'Vale King', 'Knox Wright', 'Echo Lopez', 'Sage Hill', 'Rain Scott',
      'Blaze Green', 'Story Adams', 'River Baker', 'Nova Gonzalez', 'Sky Nelson',
      'Luna Carter', 'Fox Mitchell', 'Star Perez', 'Wolf Roberts', 'Dawn Turner',
      'Storm Phillips', 'Cloud Campbell', 'Ocean Parker', 'Wind Evans', 'Fire Edwards',
      'Earth Collins', 'Moon Stewart'
    ];

    const locations = [
      { country: 'Spain', city: 'Barcelona' },
      { country: 'Spain', city: 'Madrid' },
      { country: 'Spain', city: 'Valencia' },
      { country: 'Spain', city: 'Seville' },
      { country: 'Spain', city: 'Bilbao' },
      { country: 'Spain', city: 'Malaga' }
    ];

    const data = [];
    
    // Ensure at least 10 entries per city
    locations.forEach((location, locationIndex) => {
      for (let i = 0; i < 10; i++) {
        const nameIndex = (locationIndex * 10 + i) % names.length;
        const currentIndex = data.length;
        data.push({
          id: currentIndex + 1,
          name: names[nameIndex],
          ...location,
          rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 to 5.0 stars
          verified: Math.random() > 0.3, // 70% verified
          icon: currentIndex === 0 ? Trophy : currentIndex === 1 ? Medal : Award,
          iconColor: currentIndex === 0 ? "text-yellow-500" : currentIndex === 1 ? "text-gray-400" : currentIndex === 2 ? "text-amber-600" : "text-orange-500"
        });
      }
    });

    // Shuffle the data to randomize order
    return data.sort(() => Math.random() - 0.5);
  };

  const leaderboardData = generateLeaderboardData();

  const countries = [
    "Spain"
  ];
  
  const getCitiesForCountry = (country: string) => {
    const cities = leaderboardData
      .filter(player => player.country === country)
      .map(player => player.city);
    return ["all", ...Array.from(new Set(cities))];
  };

  const availableCities = getCitiesForCountry(selectedCountry);
  
  // Reset city when country changes
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setSelectedCity("all");
  };
  
  const filteredData = leaderboardData
    .filter(player => {
      const countryMatch = player.country === selectedCountry;
      const cityMatch = selectedCity === "all" || player.city === selectedCity;
      return countryMatch && cityMatch;
    })
    .sort((a, b) => b.rating - a.rating) // Sort by rating descending (highest first)
    .slice(0, 10); // Show only top 10

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500">
      {/* Top Navigation Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <div className="flex items-center space-x-2 flex-1">
            <img 
              src="/lovable-uploads/88ae0b13-76e2-4716-b285-0a1b8aeabd49.png" 
              alt="Solofoodies Logo" 
              className="h-10 md:h-12 w-auto"
            />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 flex-1 text-center">Leaderboard</h1>
          <div className="flex-1 flex justify-end">
            <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50 px-3 md:px-4 py-2 text-sm">
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">



        {/* Leaderboard */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Top Foodies
              </CardTitle>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <SlidersHorizontal className="w-5 h-5 text-gray-600" />
                <div className="flex gap-2 md:gap-4">
                  <Select value={selectedCountry} onValueChange={handleCountryChange}>
                    <SelectTrigger className="w-28 md:w-40 bg-white backdrop-blur-sm border shadow-sm">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="w-28 md:w-40 bg-white backdrop-blur-sm border shadow-sm">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      {availableCities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city === "all" ? "All Cities" : city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredData.map((player, index) => {
                const IconComponent = player.icon;
                return (
                  <div 
                    key={player.id}
                    className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-2 md:space-x-4 min-w-0 flex-1">
                      <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-orange-100 to-red-100 flex-shrink-0">
                        <span className="font-bold text-xs md:text-sm text-gray-700">#{index + 1}</span>
                      </div>
                      <IconComponent className={`w-4 h-4 md:w-6 md:h-6 ${player.iconColor} flex-shrink-0`} />
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm md:text-base text-gray-800 truncate">{player.name}</h3>
                        <p className="text-xs md:text-sm text-gray-500 truncate">{player.city}, {player.country}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
                      <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50 text-xs md:text-sm px-2 md:px-4 py-1 md:py-2">
                        Colab
                      </Button>
                      <div className="text-right">
                        <div className="flex items-center justify-end space-x-1 font-bold text-base md:text-xl text-gray-800">
                          <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                          <span>{player.rating}</span>
                        </div>
                        <div className="text-xs md:text-sm text-gray-500">out of 5</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Empieza tu primera colaboración hoy
          </h2>
          <p className="text-lg md:text-xl text-white mb-6 md:mb-8 max-w-3xl mx-auto">
            Únete a miles de restaurantes y creadores gastronómicos que ya están 
            formando alianzas increíbles.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Button 
              variant="outline" 
              className="bg-white text-red-500 border-white hover:bg-gray-50 w-full md:w-auto px-6 md:px-8 py-3 text-sm md:text-lg font-semibold"
            >
              <span className="md:hidden">COLABORAR COMO FOODIE</span>
              <span className="hidden md:inline">QUIERO COLABORAR COMO FOODIE</span>
            </Button>
            <Button 
              variant="outline" 
              className="bg-white text-red-500 border-white hover:bg-gray-50 w-full md:w-auto px-6 md:px-8 py-3 text-sm md:text-lg font-semibold"
            >
              <span className="md:hidden">SOY RESTAURANTE</span>
              <span className="hidden md:inline">SOY UN RESTAURANTE, QUIERO RECIBIR CREADORES</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Section */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="/lovable-uploads/242ceeaa-b81d-4feb-85f2-c58f71fd9f62.png" 
                  alt="Solofoodies Logo" 
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-gray-600 mb-6 max-w-md">
                Conectando restaurantes y creadores de contenido gastronómico en todo el mundo a través de colaboraciones significativas.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Instagram className="w-6 h-6 text-white" />
                </a>
                <a href="#" className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Linkedin className="w-6 h-6 text-white" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                  <img 
                    src="/lovable-uploads/b2ed06af-9f9d-40c2-9a59-6f64bce7ab42.png" 
                    alt="TikTok" 
                    className="w-12 h-12 rounded-full"
                  />
                </a>
                <a href="#" className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Youtube className="w-6 h-6 text-white" />
                </a>
                <a href="#" className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Facebook className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>

            {/* Right Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Plataforma</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">¿Por qué Solofoodies?</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">¿Cómo funciona Solofoodies?</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Historias de éxito</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">¿Para quién es Solofoodies?</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Planes y Precios</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © 2025 SoloFoodies. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-800 text-sm transition-colors">Política de Privacidad</a>
              <a href="#" className="text-gray-600 hover:text-gray-800 text-sm transition-colors">Términos de Servicio</a>
              <a href="#" className="text-gray-600 hover:text-gray-800 text-sm transition-colors">Política de Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LeaderboardPage;