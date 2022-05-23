CREATE TABLE Orders (
    id SERIAL PRIMARY KEY, 
    user_id INTEGER REFERENCES Users, 
    status INTEGER
);
-- product_id and quantity are included in Table OrderDetails