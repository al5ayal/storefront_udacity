/* Create products Table */
CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INTEGER NOT NULL REFERENCES product_categories(id) ON DELETE CASCADE,
    price decimal(10,2) NOT NULL,
    description VARCHAR(255) NOT NULL
)