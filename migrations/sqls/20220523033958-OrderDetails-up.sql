CREATE TABLE OrderDetails (
    id SERIAL PRIMARY KEY, 
    order_id INTEGER REFERENCES Orders, 
    product_id INTEGER REFERENCES Products, 
    quantity INTEGER
)