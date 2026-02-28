export default {
    name: 'homePage',
    title: 'Página de Inicio',
    type: 'document',
    fields: [
        {
            name: 'heroTitle',
            title: 'Título Principal (Hero)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'heroSubtitle',
            title: 'Subtítulo (Hero)',
            type: 'text',
        },
        {
            name: 'aboutTitle',
            title: 'Título Sección "Nuestra Misión"',
            type: 'string',
        },
        {
            name: 'aboutText',
            title: 'Texto Sección "Nuestra Misión"',
            type: 'text',
        },
        {
            name: 'aboutImage',
            title: 'Imagen de "Nuestra Misión"',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
    ],
    preview: {
        prepare() {
            return {
                title: 'Contenido de la Página de Inicio (Solo editar este)',
            };
        },
    },
};
