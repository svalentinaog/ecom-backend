const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  // Nombres e Idiomas
  name_es: { type: DataTypes.STRING, allowNull: false },
  name_en: { type: DataTypes.STRING, allowNull: false },
  description_es: { type: DataTypes.TEXT },
  description_en: { type: DataTypes.TEXT },

  // Precios y Descuentos
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  old_price: { type: DataTypes.DECIMAL(10, 2) },
  discount: { type: DataTypes.INTEGER },

  // Categorización
  category_es: { type: DataTypes.STRING },
  category_en: { type: DataTypes.STRING },
  subcategory_es: { type: DataTypes.STRING },
  subcategory_en: { type: DataTypes.STRING },

  // Media y Rating
  main_image: { type: DataTypes.TEXT, allowNull: false },
  images: { type: DataTypes.ARRAY(DataTypes.STRING) },
  rating: { type: DataTypes.DECIMAL(3, 1) }
}, {
  tableName: 'products',
  timestamps: false
});

module.exports = Product;