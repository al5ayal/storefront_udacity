/* Create product_categories Table */
CREATE TABLE IF NOT EXISTS product_categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255) NOT NULL
)