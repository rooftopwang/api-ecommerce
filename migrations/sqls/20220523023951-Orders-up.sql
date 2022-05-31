CREATE TABLE Orders (
    id SERIAL PRIMARY KEY, 
    product_id INTEGER REFERENCES Products, 
    quantity INTEGER, 
    user_id INTEGER REFERENCES Users, 
    status INTEGER
);
-- product_id and quantity are included in Table OrderDetails