// my-project/infrastructure/server.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const productRepository = require('../data/productRepository'); // Corrected path
const userRepository = require('../data/userRepository'); // Corrected path
const db = require('./db'); // Ensure the db module is imported

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../presentation')));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 60000 // Set cookie expiration time
    }
}));

// Debugging middleware
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    console.log('Session:', req.session);
    next();
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Login attempt with username: ${username}`);
    userRepository.findByUsername(username, (err, user) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Server error' });
        }
        if (!user) {
            console.error('User not found');
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                console.log('Password match');
                req.session.admin = true;
                console.log('Session set:', req.session);
                return res.json({ message: 'Login successful' });
            } else {
                console.error('Password mismatch');
                return res.status(401).json({ error: 'Invalid credentials' });
            }
        });
    });
});

app.get('/admin', (req, res) => {
    if (req.session.admin) {
        console.log('Accessing admin page with session:', req.session);
        res.sendFile(path.join(__dirname, '../presentation/admin.html'));
    } else {
        console.log('Unauthorized access attempt to admin page');
        res.status(401).send('Unauthorized');
    }
});

// Product endpoints
app.post('/api/products', (req, res) => {
    productRepository.add(req.body, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Product added successfully' });
    });
});

app.get('/api/products', (req, res) => {
    productRepository.getAll((err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.delete('/api/products/:id', (req, res) => {
    productRepository.delete(req.params.id, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Product deleted successfully' });
    });
});

app.get('/admin', (req, res) => {
    if (req.session.admin) {
        console.log('Accessing admin page with session:', req.session);
        res.sendFile(path.join(__dirname, '../presentation/admin.html'));
    } else {
        res.status(401).send('Unauthorized');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../presentation/index.html'));
});

// Function to insert initial products
function insertInitialProducts() {
    const initialProducts = [
        { id: '1', name: 'Coffee', price: 10000 },
        { id: '2', name: 'Tea', price: 8000 },
        { id: '3', name: 'Sandwich', price: 15000 }
    ];

    initialProducts.forEach(product => {
        db.run(`INSERT OR IGNORE INTO products (id, name, price) VALUES (?, ?, ?)`, 
               [product.id, product.name, product.price], 
               (err) => {
            if (err) {
                console.error('Error inserting initial product:', err.message);
            }
        });
    });
}

// Insert initial products on server startup
insertInitialProducts();

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
