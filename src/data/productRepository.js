// my-project/data/productRepository.js

const db = require('../infrastructure/db');

const productRepository = {
    getAll: function(callback) {
        db.all(`SELECT * FROM products`, [], callback);
    },
    add: function(product, callback) {
        db.run(`INSERT INTO products (id, name, price) VALUES (?, ?, ?)`, [product.id, product.name, product.price], callback);
    },
    delete: function(productId, callback) {
        db.run(`DELETE FROM products WHERE id = ?`, [productId], callback);
    }
};

module.exports = productRepository;
