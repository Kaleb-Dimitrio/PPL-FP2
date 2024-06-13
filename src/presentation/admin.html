<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="admin-container">
        <h3>Admin Dashboard</h3>
        <div class="add-product-form">
            <h4>Add New Product</h4>
            <form id="add-product-form">
                <input type="text" id="product-name" placeholder="Product Name" required>
                <input type="text" id="product-id" placeholder="Product ID" required>
                <input type="number" id="product-price" placeholder="Product Price" required>
                <button type="submit">Add Product</button>
            </form>
        </div>
        <div class="product-list">
            <h4>Product List</h4>
            <table>
                <thead>
                    <tr>
                        <th>PRODUCT NAME</th>
                        <th>PRODUCT ID</th>
                        <th>PRICE</th>
                        <th>DELETE</th>
                    </tr>
                </thead>
                <tbody id="product-list">
                    <!-- Product items will be dynamically generated here -->
                </tbody>
            </table>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script type="module">
        import { productService } from '../application/productService.js';

        $(document).ready(function() {
            async function loadProducts() {
                try {
                    const products = await productService.getProducts();
                    updateProductList(products);
                } catch (error) {
                    console.error('Error loading products:', error);
                }
            }

            function updateProductList(products) {
                const productList = $('#product-list');
                productList.empty();
                products.forEach(product => {
                    productList.append(`
                        <tr data-id="${product.id}">
                            <td>${product.name}</td>
                            <td>${product.id}</td>
                            <td>Rp. ${product.price}</td>
                            <td><button class="delete-product">Delete</button></td>
                        </tr>
                    `);
                });
            }

            $('#add-product-form').submit(async function(e) {
                e.preventDefault();
                const name = $('#product-name').val();
                const id = $('#product-id').val();
                const price = parseInt($('#product-price').val());

                try {
                    await productService.addProduct({ name, id, price });
                    loadProducts();
                    $('#product-name').val('');
                    $('#product-id').val('');
                    $('#product-price').val('');
                } catch (error) {
                    console.error('Error adding product:', error);
                }
            });

            $('#product-list').on('click', '.delete-product', async function() {
                const productId = $(this).closest('tr').data('id');
                try {
                    await productService.deleteProduct(productId);
                    loadProducts();
                } catch (error) {
                    console.error('Error deleting product:', error);
                }
            });

            loadProducts();
        });
    </script>
</body>
</html>
