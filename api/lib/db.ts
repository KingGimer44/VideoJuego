import { createClient } from '@libsql/client';

// Configuración de la base de datos Turso
const client = createClient({
  url: process.env.TURSO_DATABASE_URL || '',
  authToken: process.env.TURSO_AUTH_TOKEN || '',
});

export interface Game {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  genre: string;
  rating: number;
  platform: string;
  release_date: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
}

// Inicializar las tablas
export async function initializeDatabase() {
  try {
    // Crear tabla de usuarios
    await client.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Crear tabla de juegos
    await client.execute(`
      CREATE TABLE IF NOT EXISTS games (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        price REAL NOT NULL,
        image TEXT NOT NULL,
        genre TEXT NOT NULL,
        rating REAL NOT NULL,
        platform TEXT NOT NULL,
        release_date TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insertar datos de ejemplo si no existen
    const gamesCount = await client.execute('SELECT COUNT(*) as count FROM games');
    if (gamesCount.rows[0].count === 0) {
      await insertSampleGames();
    }

    console.log('Base de datos inicializada correctamente');
  } catch (error) {
    console.error('Error inicializando la base de datos:', error);
  }
}

async function insertSampleGames() {
  const sampleGames = [
    {
      id: '1',
      title: 'Hollow Knight',
      description: 'Hollow Knight es un juego de aventuras y plataformas en 2D que tiene lugar en Hallownest, un reino subterráneo en ruinas. Explora cavernas serpenteantes, ciudades antiguas y páramos mortíferos. Lucha contra criaturas corrompidas, entabla amistad con extraños insectos y resuelve los antiguos misterios que se ocultan en el corazón del reino.',
      price: 15.99,
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rgi.jpg',
      genre: 'Aventura',
      rating: 4.8,
      platform: 'PC,Nintendo Switch,PlayStation,Xbox',
      release_date: '2017-02-24'
    },
    {
      id: '2',
      title: 'Red Dead Redemption 2',
      description: 'Red Dead Redemption 2 es un videojuego de acción-aventura western desarrollado por Rockstar Games. La historia se centra en Arthur Morgan, un forajido miembro de la banda de Dutch van der Linde en 1899.',
      price: 59.99,
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.jpg',
      genre: 'Acción',
      rating: 4.9,
      platform: 'PC,PlayStation,Xbox',
      release_date: '2018-10-26'
    },
    {
      id: '3',
      title: 'Portal 2',
      description: 'Portal 2 es un videojuego de lógica en primera persona desarrollado por Valve Corporation. Es la secuela de Portal y fue lanzado en abril de 2011.',
      price: 19.99,
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2icx.jpg',
      genre: 'Puzzle',
      rating: 4.7,
      platform: 'PC,PlayStation,Xbox',
      release_date: '2011-04-19'
    },
    {
      id: '4',
      title: 'Hades',
      description: 'Hades es un videojuego de acción roguelike desarrollado y publicado por Supergiant Games. Juegas como Zagreus, el príncipe del inframundo.',
      price: 24.99,
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2145.jpg',
      genre: 'Acción',
      rating: 4.6,
      platform: 'PC,Nintendo Switch,PlayStation,Xbox',
      release_date: '2020-09-17'
    },
    {
      id: '5',
      title: 'Super Mario Odyssey',
      description: 'Super Mario Odyssey es un videojuego de plataformas desarrollado por Nintendo EPD y publicado por Nintendo para Nintendo Switch.',
      price: 49.99,
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1nxb.jpg',
      genre: 'Plataformas',
      rating: 4.8,
      platform: 'Nintendo Switch',
      release_date: '2017-10-27'
    },
    {
      id: '6',
      title: 'The Witcher 3',
      description: 'The Witcher 3: Wild Hunt es un videojuego de rol desarrollado y publicado por CD Projekt RED.',
      price: 39.99,
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg',
      genre: 'RPG',
      rating: 4.9,
      platform: 'PC,PlayStation,Xbox,Nintendo Switch',
      release_date: '2015-05-19'
    }
  ];

  for (const game of sampleGames) {
    await client.execute({
      sql: `INSERT INTO games (id, title, description, price, image, genre, rating, platform, release_date) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        game.id,
        game.title,
        game.description,
        game.price,
        game.image,
        game.genre,
        game.rating,
        game.platform,
        game.release_date
      ]
    });
  }
}

export { client };