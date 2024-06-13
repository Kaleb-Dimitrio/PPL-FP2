// my-project/application/productService.js

export const productService = {
    getProducts: async function() {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        return response.json();
    },
    addProduct: async function(product) {
        const response = await fetch('http://localhost:3000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        if (!response.ok) throw new Error('Failed to add product');
        return response.json();
    },
    deleteProduct: async function(productId) {
        const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete product');
        return response.json();
    }
};

