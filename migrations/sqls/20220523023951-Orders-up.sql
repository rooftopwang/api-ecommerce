CREATE TABLE Orders (
    id SERIAL PRIMARY KEY, 
    product_id INTEGER REFERENCES Products(id), 
    quantity INTEGER, 
    user_id INTEGER REFERENCES Users(id), 
    status INTEGER
);
-- product_id and quantity are included in Table OrderDetails