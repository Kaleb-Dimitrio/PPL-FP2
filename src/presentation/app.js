// my-project/presentation/app.js

import { productService } from '../application/productService.js';
import { calculateBill } from '../business/billCalculator.js';

$(document).ready(function() {
    const menuList = $('#menu-list');
    const billList = $('#bill-list');
    const subtotalElem = $('#subtotal');
    const ppnElem = $('#ppn');
    const totalElem = $('#total');

    async function fetchProducts() {
        try {
            const products = await productService.getProducts();
            updateMenu(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    function updateMenu(products) {
        menuList.empty();
        products.forEach(product => {
            menuList.append(`
                <tr data-id="${product.id}">
                    <td>${product.name}</td>
                    <td>${product.id}</td>
                    <td>Rp. ${product.price}</td>
                    <td><button class="delete-product">Delete</button></td>
                </tr>
            `);
        });
    }

    function updateBill() {
        const billItems = [];
        billList.find('tr').each(function() {
            const qty = parseInt($(this).find('.qty').text());
            const price = parseInt($(this).find('.price').text().replace('Rp. ', ''));
            billItems.push({ qty, price });
        });

        const { subtotal, ppn, total } = calculateBill(billItems);
        subtotalElem.text(subtotal);
        ppnElem.text(ppn);
        totalElem.text(total);
    }

    $('.add-button').click(function() {
        const selectedRow = menuList.find('tr.selected');
        if (selectedRow.length === 0) {
            alert('Please select a product first.');
            return;
        }
        const productId = selectedRow.data('id');
        const productName = selectedRow.find('td:first-child').text();
        const productPrice = parseInt(selectedRow.find('td:nth-child(3)').text().replace('Rp. ', ''));
        const qty = parseInt($('.quantity-selector input').val());

        if (productId) {
            billList.append(`
                <tr>
                    <td>${productName}</td>
                    <td class="qty">${qty}</td>
                    <td class="price">Rp. ${productPrice}</td>
                </tr>
            `);
            updateBill();
        }
    });

    menuList.on('click', 'tr', function() {
        menuList.find('tr').removeClass('selected');
        $(this).addClass('selected');
    });

    menuList.on('click', '.delete-product', async function(e) {
        e.stopPropagation();
        const productId = $(this).closest('tr').data('id');

        try {
            await productService.deleteProduct(productId);
            fetchProducts();
        } catch (error) {
            alert('Error deleting product: ' + error.message);
        }
    });

    $('.quantity-selector .decrease').click(function() {
        const input = $('.quantity-selector input');
        let value = parseInt(input.val());
        if (value > 1) {
            value--;
            input.val(value);
        }
    });

    $('.quantity-selector .increase').click(function() {
        const input = $('.quantity-selector input');
        let value = parseInt(input.val());
        value++;
        input.val(value);
    });

    $('.order-type').click(function() {
        $('.order-type').removeClass('active');
        $(this).addClass('active');
    });

    $('#close-admin').click(function() {
        $('#admin-panel').hide();
    });

    $('#add-product-form').submit(async function(e) {
        e.preventDefault();
        const name = $('#product-name').val();
        const id = $('#product-id').val();
        const price = parseInt($('#product-price').val());

        try {
            await productService.addProduct({ name, id, price });
            $('#admin-panel').hide();
            fetchProducts();
        } catch (error) {
            alert('Error adding product: ' + error.message);
        }
    });

    fetchProducts();
});


