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

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'ID de juego requerido' });
  }

  try {
    await initializeDatabase();

    if (req.method === 'GET') {
      const result = await client.execute({
        sql: 'SELECT * FROM games WHERE id = ?',
        args: [id]
      });

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Juego no encontrado' });
      }

      const row = result.rows[0];
      const game = {
        id: row.id,
        title: row.title,
        description: row.description,
        price: row.price,
        image: row.image,
        genre: row.genre,
        rating: row.rating,
        platform: typeof row.platform === 'string' ? row.platform.split(',') : [],
        releaseDate: row.release_date
      };

      return res.status(200).json(game);
    }

    if (req.method === 'PUT') {
      const { title, description, price, image, genre, rating, platform, releaseDate } = req.body;

      if (!title || !description || !price || !image || !genre || !rating || !platform || !releaseDate) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }

      const platformString = Array.isArray(platform) ? platform.join(',') : platform;

      await client.execute({
        sql: `UPDATE games SET title = ?, description = ?, price = ?, image = ?, genre = ?, 
              rating = ?, platform = ?, release_date = ?, updated_at = CURRENT_TIMESTAMP 
              WHERE id = ?`,
        args: [title, description, price, image, genre, rating, platformString, releaseDate, id]
      });

      return res.status(200).json({ 
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

    if (req.method === 'DELETE') {
      await client.execute({
        sql: 'DELETE FROM games WHERE id = ?',
        args: [id]
      });

      return res.status(200).json({ message: 'Juego eliminado correctamente' });
    }

    return res.status(405).json({ error: 'Método no permitido' });
  } catch (error) {
    console.error('Error en la API de juego específico:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}