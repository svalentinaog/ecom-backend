const Product = require('../models/productModel');

// 1. OBTENER TODOS LOS PRODUCTOS
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

// 2. OBTENER UN PRODUCTO POR ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params; // Captura el ID de la URL
    const p = await Product.findByPk(id);

    if (!p) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const formattedProduct = {
      id: p.id,
      name: { es: p.name_es, en: p.name_en },
      description: { es: p.description_es, en: p.description_en },
      price: parseFloat(p.price),
      oldPrice: p.oldPrice ? parseFloat(p.oldPrice) : null,
      discount: p.discount,
      category: { es: p.category_es, en: p.category_en },
      mainImage: p.main_image,
      gallery: p.images || [],
      rating: parseFloat(p.rating)
    };

    res.json(formattedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

// 3. CREAR UN PRODUCTO
const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear producto', error });
  }
};

// 4. ACTUALIZAR UN PRODUCTO
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Product.update(req.body, { where: { id } });
    if (updated) {
      const updatedProduct = await Product.findByPk(id);
      return res.json(updatedProduct);
    }
    throw new Error('Producto no encontrado');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. ELIMINAR UN PRODUCTO
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.destroy({ where: { id } });
    if (deleted) {
      return res.json({ message: 'Producto eliminado correctamente' });
    }
    throw new Error('Producto no encontrado');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };