// UAS FINAL: AdopsiPohon Page + Search + Logging
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CheckCircle, MapPin, Leaf, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { logInfo } from '@/utils/logger';

const AdopsiPohon = () => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    logInfo('Halaman Adopsi Pohon dibuka');
  }, []);

  const trees = [
    {
      id: 1,
      name: 'Pohon Jati',
      category: 'Pencegahan Erosi',
      price: 250000,
      benefits: ['Penyerap CO₂ tinggi', 'Umur hingga 100 tahun', 'Hutan Kota Jakarta'],
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
      location: 'Jakarta Selatan'
    },
    {
      id: 2,
      name: 'Pohon Mangrove',
      category: 'Ekosistem Vital',
      price: 175000,
      benefits: ['Pencegah abrasi pantai', 'Habitat biota laut', 'Pesisir Utara Jakarta'],
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
      location: 'Pantai Utara Jakarta'
    },
    {
      id: 3,
      name: 'Pohon Buah Lokal',
      category: 'Menghasilkan Buah',
      price: 300000,
      benefits: ['Panen buah organik', 'Penyerapan air hujan'],
      image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86',
      location: 'Banda Aceh'
    }
  ];

  const filteredTrees = trees.filter((tree) =>
    tree.name.toLowerCase().includes(search.toLowerCase()) ||
    tree.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen forest-bg">
      <div className="min-h-screen bg-gradient-to-b from-black/40 via-black/20 to-black/40">
        <Navbar />

        <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              🌱 Adopsi Pohon
            </h1>
            <p className="text-gray-200">
              Cari dan adopsi pohon untuk masa depan hijau
            </p>
          </div>

          {/* SEARCH */}
          <div className="max-w-md mx-auto mb-10 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Cari nama atau lokasi pohon..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                logInfo('User mencari pohon', { keyword: e.target.value });
              }}
              className="pl-10 bg-white/10 border-white/20 text-white"
            />
          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTrees.map((tree) => (
              <Card key={tree.id} className="glass-effect border-white/20">
                <img src={tree.image} className="h-48 w-full object-cover" />
                <CardContent className="p-6">
                  <Badge className="mb-2 bg-green-600">{tree.category}</Badge>
                  <h3 className="text-xl font-bold text-white">{tree.name}</h3>

                  <div className="flex items-center text-gray-300 mt-2">
                    <MapPin size={14} className="mr-1" /> {tree.location}
                  </div>

                  <div className="mt-3 space-y-1">
                    {tree.benefits.map((b, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-200">
                        <CheckCircle size={14} className="text-green-400 mr-2" />
                        {b}
                      </div>
                    ))}
                  </div>

                  <div className="text-green-400 text-xl font-bold mt-4">
                    Rp{tree.price.toLocaleString('id-ID')}
                  </div>

                  <Link to={`/detail-pohon/${tree.id}`}>
                    <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                      <Leaf className="mr-2" size={16} /> Adopsi Sekarang
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdopsiPohon;
