export default {
    name: 'product',
    title: 'Producto',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Nombre',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'image',
            title: 'Imagen Principal',
            type: 'image',
            options: {
                hotspot: true, // Permite recortar la imagen en el panel
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'price',
            title: 'Precio',
            type: 'number',
            validation: (Rule) => Rule.required().positive(),
        },
        {
            name: 'description',
            title: 'Descripción',
            type: 'text', // Área de texto multilinea
        },
        {
            name: 'category',
            title: 'Categoría',
            type: 'string',
            options: {
                list: [
                    // Base y Despensa
                    { title: 'Frutos Secos', value: 'frutos-secos' },
                    { title: 'Semillas', value: 'semillas' },
                    { title: 'Cereales y Copos', value: 'cereales-copos' },
                    { title: 'Legumbres', value: 'legumbres' },
                    { title: 'Harinas y Féculas', value: 'harinas-feculas' },
                    { title: 'Arroces y Pastas', value: 'arroces-pastas' },
                    { title: 'Aceites y Vinagres', value: 'aceites-vinagres' },
                    { title: 'Salsas y Aderezos', value: 'salsas-aderezos' },
                    { title: 'Condimentos y Especias', value: 'condimentos-especias' },
                    { title: 'Sales y Granos', value: 'sales-granos' },

                    // Desayuno y Merienda
                    { title: 'Mixes y Granolas', value: 'mixes-granolas' },
                    { title: 'Avenas y Mueslis', value: 'avenas-mueslis' },
                    { title: 'Mantequillas y Pastas', value: 'mantequillas-pastas' },
                    { title: 'Mermeladas y Dulces', value: 'mermeladas-dulces' },
                    { title: 'Endulzantes y Mieles', value: 'endulzantes-mieles' },
                    { title: 'Panadería y Tostadas', value: 'panaderia-tostadas' },
                    { title: 'Galletas y Budines', value: 'galletas-budines' },
                    { title: 'Cacaos y Chocolates', value: 'cacaos-chocolates' },
                    { title: 'Alfajores y Golosinas Saludables', value: 'alfajores-golosinas' },

                    // Bebidas
                    { title: 'Infusiones, Té y Yerba', value: 'infusiones-te-yerba' },
                    { title: 'Café de Especialidad', value: 'cafe-especialidad' },
                    { title: 'Leches Vegetales', value: 'leches-vegetales' },
                    { title: 'Jugos y Kombuchas', value: 'jugos-kombuchas' },
                    { title: 'Bebidas Deportivas', value: 'bebidas-deportivas' },

                    // Deportes y Nutrición
                    { title: 'Proteínas (Suero/Vegetales)', value: 'proteinas' },
                    { title: 'Sueros y Aminoácidos (BCAA/Glutamina)', value: 'sueros-aminoacidos' },
                    { title: 'Creatinas y Pre-Entrenos', value: 'creatinas-preentrenos' },
                    { title: 'Vitaminas y Minerales', value: 'vitaminas-minerales' },
                    { title: 'Suplementos Naturales (Maca, Espirulina, etc)', value: 'suplementos-naturales' },
                    { title: 'Barras de Cereal y Proteínas', value: 'barras-cereal-proteinas' },

                    // Especialidades
                    { title: 'Productos Sin TACC', value: 'productos-sin-tacc' },
                    { title: 'Productos Keto / Low Carb', value: 'productos-keto' },
                    { title: 'Productos Veganos', value: 'productos-veganos' },
                    { title: 'Orgánicos y Ecológicos', value: 'organicos-ecologicos' },

                    // Otros
                    { title: 'Snacks Salados', value: 'snacks-salados' },
                    { title: 'Frutas Deshidratadas', value: 'frutas-deshidratadas' },
                    { title: 'Conservas y Encurtidos', value: 'conservas-encurtidos' },
                    { title: 'Congelados Vegetales', value: 'congelados-vegetales' },
                    { title: 'Cuidado Personal y Cosmética', value: 'cuidado-personal' },
                    { title: 'Higiene del Hogar (Eco)', value: 'higiene-hogar' },
                    { title: 'Kits y Combos', value: 'kits-combos' },
                    { title: 'Otros', value: 'otros' },
                ],
            },
            validation: (Rule) => Rule.required(),
        },
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
            subtitle: 'price',
        },
        prepare(selection) {
            const { title, subtitle, media } = selection;
            return {
                title,
                subtitle: `$${subtitle}`,
                media,
            };
        },
    },
};
