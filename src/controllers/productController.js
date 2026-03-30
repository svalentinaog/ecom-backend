const Product = require('../models/productModel');

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    const formattedResponse = products.map(p => ({
      // Identificador único
      id: p.id,

      // Nombres e Idiomas
      name: { es: p.name_es, en: p.name_en },
      description: { es: p.description_es, en: p.description_en },

      // Precios y Descuentos
      price: parseFloat(p.price),
      oldPrice: p.oldPrice ? parseFloat(p.oldPrice) : null,
      discount: p.discount,

      // Categorización
      category: { es: p.category_es, en: p.category_en },
      subCategory: { es: p.subcategory_es, en: p.subcategory_en },

      // Media y Rating
      mainImage: p.main_image,
      gallery: p.images || [],
      rating: parseFloat(p.rating)
    }));

    res.json(formattedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

module.exports = { getProducts };