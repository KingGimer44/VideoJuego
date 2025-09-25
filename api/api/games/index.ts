import { VercelRequest, VercelResponse } from '@vercel/node';
import { client, initializeDatabase } from '../../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Inicializar la base de datos si es necesario
    await initializeDatabase();

    if (req.method === 'GET') {
      const { search, genre, sort } = req.query;

      let sql = 'SELECT * FROM games WHERE 1=1';
      const args: any[] = [];

      // Filtrar por búsqueda
      if (search) {
        sql += ' AND (title LIKE ? OR genre LIKE ?)';
        args.push(`%${search}%`, `%${search}%`);
      }

      // Filtrar por género
      if (genre && genre !== 'Todos') {
        sql += ' AND genre = ?';
        args.push(genre);
      }

      // Ordenar
      if (sort === 'title') {
        sql += ' ORDER BY title ASC';
      } else if (sort === 'rating') {
        sql += ' ORDER BY rating DESC';
      } else if (sort === 'price') {
        sql += ' ORDER BY price ASC';
      } else {
        sql += ' ORDER BY title ASC';
      }

      const result = await client.execute({ sql, args });
      
      // Transformar los datos para que coincidan con el formato esperado
      const games = result.rows.map(row => ({
        id: row.id,
        title: row.title,
        description: row.description,
        price: row.price,
        image: row.image,
        genre: row.genre,
        rating: row.rating,
        platform: typeof row.platform === 'string' ? row.platform.split(',') : [],
        releaseDate: row.release_date
      }));

      return res.status(200).json(games);
    }

    if (req.method === 'POST') {
      const { title, description, price, image, genre, rating, platform, releaseDate } = req.body;

      if (!title || !description || !price || !image || !genre || !rating || !platform || !releaseDate) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }

      const id = Date.now().toString();
      const platformString = Array.isArray(platform) ? platform.join(',') : platform;

      await client.execute({
        sql: `INSERT INTO games (id, title, description, price, image, genre, rating, platform, release_date) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [id, title, description, price, image, genre, rating, platformString, releaseDate]
      });

      return res.status(201).json({ 
        id, 
        title, 
        description, 
        price, 
        image, 
        genre, 
        rating, 
        platform: Array.isArray(platform) ? platform : platform.split(','), 
        releaseDate 
      });
    }

    return res.status(405).json({ error: 'Método no permitido' });
  } catch (error) {
    console.error('Error en la API de juegos:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}