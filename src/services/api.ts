import axios from 'axios';
import { Game } from '../types';

// URL base de tu API en Vercel (cambiar por tu URL real)
const API_BASE_URL = 'https://tu-api.vercel.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Datos mock mientras configuras la API real
const mockGames: Game[] = [
  {
    id: '1',
    title: 'Hollow Knight',
    description: 'Hollow Knight es un juego de aventuras y plataformas en 2D que tiene lugar en Hallownest, un reino subterráneo en ruinas. Explora cavernas serpenteantes, ciudades antiguas y páramos mortíferos. Lucha contra criaturas corrompidas, entabla amistad con extraños insectos y resuelve los antiguos misterios que se ocultan en el corazón del reino.',
    price: 15.99,
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rgi.jpg',
    genre: 'Aventura',
    rating: 4.8,
    platform: ['PC', 'Nintendo Switch', 'PlayStation', 'Xbox'],
    releaseDate: '2017-02-24'
  },
  {
    id: '2',
    title: 'Red Dead Redemption 2',
    description: 'Red Dead Redemption 2 es un videojuego de acción-aventura western desarrollado por Rockstar Games. La historia se centra en Arthur Morgan, un forajido miembro de la banda de Dutch van der Linde en 1899.',
    price: 59.99,
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.jpg',
    genre: 'Acción',
    rating: 4.9,
    platform: ['PC', 'PlayStation', 'Xbox'],
    releaseDate: '2018-10-26'
  },
  {
    id: '3',
    title: 'Portal 2',
    description: 'Portal 2 es un videojuego de lógica en primera persona desarrollado por Valve Corporation. Es la secuela de Portal y fue lanzado en abril de 2011.',
    price: 19.99,
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2icx.jpg',
    genre: 'Puzzle',
    rating: 4.7,
    platform: ['PC', 'PlayStation', 'Xbox'],
    releaseDate: '2011-04-19'
  },
  {
    id: '4',
    title: 'Hades',
    description: 'Hades es un videojuego de acción roguelike desarrollado y publicado por Supergiant Games. Juegas como Zagreus, el príncipe del inframundo.',
    price: 24.99,
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2145.jpg',
    genre: 'Acción',
    rating: 4.6,
    platform: ['PC', 'Nintendo Switch', 'PlayStation', 'Xbox'],
    releaseDate: '2020-09-17'
  },
  {
    id: '5',
    title: 'Super Mario Odyssey',
    description: 'Super Mario Odyssey es un videojuego de plataformas desarrollado por Nintendo EPD y publicado por Nintendo para Nintendo Switch.',
    price: 49.99,
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1nxb.jpg',
    genre: 'Plataformas',
    rating: 4.8,
    platform: ['Nintendo Switch'],
    releaseDate: '2017-10-27'
  },
  {
    id: '6',
    title: 'The Witcher 3',
    description: 'The Witcher 3: Wild Hunt es un videojuego de rol desarrollado y publicado por CD Projekt RED.',
    price: 39.99,
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg',
    genre: 'RPG',
    rating: 4.9,
    platform: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'],
    releaseDate: '2015-05-19'
  }
];

export const gameService = {
  // Obtener todos los juegos
  getAllGames: async (): Promise<Game[]> => {
    try {
      // Comentado hasta que tengas la API real
      // const response = await api.get('/games');
      // return response.data;
      
      // Mock data por ahora
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockGames), 500);
      });
    } catch (error) {
      console.error('Error fetching games:', error);
      return mockGames; // Fallback a datos mock
    }
  },

  // Obtener juego por ID
  getGameById: async (id: string): Promise<Game | null> => {
    try {
      // const response = await api.get(`/games/${id}`);
      // return response.data;
      
      return new Promise((resolve) => {
        setTimeout(() => {
          const game = mockGames.find(g => g.id === id);
          resolve(game || null);
        }, 300);
      });
    } catch (error) {
      console.error('Error fetching game:', error);
      return null;
    }
  },

  // Buscar juegos
  searchGames: async (query: string): Promise<Game[]> => {
    try {
      // const response = await api.get(`/games/search?q=${query}`);
      // return response.data;
      
      return new Promise((resolve) => {
        setTimeout(() => {
          const filtered = mockGames.filter(game =>
            game.title.toLowerCase().includes(query.toLowerCase()) ||
            game.genre.toLowerCase().includes(query.toLowerCase())
          );
          resolve(filtered);
        }, 300);
      });
    } catch (error) {
      console.error('Error searching games:', error);
      return [];
    }
  },

  // Filtrar juegos por género
  getGamesByGenre: async (genre: string): Promise<Game[]> => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const filtered = mockGames.filter(game =>
            game.genre.toLowerCase() === genre.toLowerCase()
          );
          resolve(filtered);
        }, 300);
      });
    } catch (error) {
      console.error('Error filtering games:', error);
      return [];
    }
  }
};

export default api;