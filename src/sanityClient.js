import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: 'vflz8pbt', // Obtenido de sanity.cli.js
    dataset: 'production',
    useCdn: true, // Use CDN para respuestas rápidas
    apiVersion: '2024-02-25', // Fecha actual o la de la API de Sanity
});

const builder = imageUrlBuilder(client);

// Función helper para generar las URLs de las imágenes de Sanity
export const urlFor = (source) => builder.image(source);
