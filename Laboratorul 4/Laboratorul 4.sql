-- Tabela pentru utilizatori
CREATE TABLE utilizatori (
    id_utilizator SERIAL PRIMARY KEY,
    nume VARCHAR(50),
    varsta INT,
    adresa VARCHAR(100)
);


-- Tabela pentru produse
CREATE TABLE produse (
    id_produs SERIAL PRIMARY KEY,
    nume_produs VARCHAR(50),
    pret DECIMAL(10, 2),
    stoc INT
);


-- Tabela pentru comenzi
CREATE TABLE comenzi (
    id_comanda SERIAL PRIMARY KEY,
    id_utilizator INT REFERENCES utilizatori(id_utilizator),
    data_comanda DATE
);


-- Tabela pentru detalii comanda
CREATE TABLE detalii_comanda (
    id_detaliu SERIAL PRIMARY KEY,
    id_comanda INT REFERENCES comenzi(id_comanda),
    id_produs INT REFERENCES produse(id_produs),
    cantitate INT
);


-- Tabela pentru recenzii
CREATE TABLE recenzii (
    id_recenzie SERIAL PRIMARY KEY,
    id_utilizator INT REFERENCES utilizatori(id_utilizator),
    id_produs INT REFERENCES produse(id_produs),
    nota INT,
    comentariu TEXT
);


-- Adaugare in tabela utilizatori
INSERT INTO utilizatori (nume, varsta, adresa) VALUES 
('John Doe', 30, 'Str. Principala, nr. 123'),
('Alice Smith', 25, 'Bd. Central, nr. 456'),
('Bob Johnson', 35, 'Aleea Verde, nr. 789'),
('Ray Allen', 40, 'Aleea Morilor, nr. 345'),
('Bob Parker', 25, 'Valea Merilor, nr. 219');


-- Adaugare in tabela produse
INSERT INTO produse (nume_produs, pret, stoc) VALUES 
('Laptop', 1499.99, 10),
('Telefon', 699.99, 20),
('Tableta', 299.99, 15),
('Printer', 1000, 10),
('Monitor', 359.99, 20);


-- Adaugare in tabela comenzi
INSERT INTO comenzi (id_utilizator, data_comanda) VALUES 
(1, '2023-01-05'),
(2, '2023-02-10'),
(3, '2023-05-09'),
(4, '2023-03-13'),
(5, '2023-07-25');


-- Adaugare in tabela detalii_comanda
INSERT INTO detalii_comanda (id_comanda, id_produs, cantitate) VALUES 
(1, 1, 2),
(1, 2, 1),
(2, 3, 5),
(3, 1, 3),
(3, 2, 2);


-- Adaugare in tabela recenzii
INSERT INTO recenzii (id_utilizator, id_produs, nota, comentariu) VALUES 
(1, 1, 4, 'Foarte mulțumit de laptopul cumpărat.'),
(2, 2, 5, 'Excelent telefonul!'),
(3, 3, 3, 'Tableta este ok, dar așteptam ceva mai mult.'),
(4, 4, 3, 'Printer de calitate buna'),
(5, 5, 3, 'Monitorul are o rezolutie impecabila');


-- Selectare
SELECT * FROM detalii_comanda WHERE cantitate >= 5;

SELECT nume_produs, pret FROM produse WHERE stoc > 10;

SELECT * FROM recenzii WHERE nota >= 4;

SELECT nume_produs, pret FROM produse WHERE stoc <= 15 AND pret > 500;

SELECT * FROM recenzii WHERE id_produs = 3;


-- Modificare
UPDATE comenzi SET data_comanda = '2023-05-15' WHERE id_comanda = 3;

UPDATE utilizatori SET varsta = 31 WHERE nume = 'John Doe';

UPDATE produse SET pret = 29.99 WHERE id_produs = 2;

UPDATE detalii_comanda SET cantitate = 4 WHERE id_produs = 3;

UPDATE utilizatori SET adresa = 'Str. Noua, nr. 789' WHERE nume = 'Alice Smith';


-- Stergere
DELETE FROM comenzi WHERE data_comanda < '2023-01-01';

DELETE FROM recenzii WHERE nota < 4;

DELETE FROM detalii_comanda WHERE id_produs = 1;

DELETE FROM produse WHERE nume_produs = 'Tableta';

DELETE FROM utilizatori WHERE nume = 'Ray Allen';


-- Adaugare cheie straina in tabela comenzi
ALTER TABLE comenzi ADD FOREIGN KEY (id_utilizator) REFERENCES utilizatori(id_utilizator);


-- Adaugare cheie straina in tabela detalii_comanda
ALTER TABLE detalii_comanda ADD FOREIGN KEY (id_comanda) REFERENCES comenzi(id_comanda);
ALTER TABLE detalii_comanda ADD FOREIGN KEY (id_produs) REFERENCES produse(id_produs);


-- INNER JOIN
SELECT utilizatori.nume, utilizatori.varsta, comenzi.data_comanda
FROM utilizatori
INNER JOIN comenzi ON utilizatori.id_utilizator = comenzi.id_utilizator;

SELECT utilizatori.nume, comenzi.data_comanda
FROM utilizatori
INNER JOIN comenzi ON utilizatori.id_utilizator = comenzi.id_utilizator
WHERE comenzi.data_comanda < '2023-03-01' AND utilizatori.varsta >= 30;


-- RIGHT JOIN
SELECT utilizatori.nume, comenzi.data_comanda
FROM utilizatori
RIGHT JOIN comenzi ON utilizatori.id_utilizator = comenzi.id_utilizator;

SELECT utilizatori.nume, comenzi.data_comanda
FROM utilizatori
RIGHT JOIN comenzi ON utilizatori.id_utilizator = comenzi.id_utilizator
WHERE comenzi.data_comanda > '2023-01-05' AND comenzi.data_comanda IS NOT NULL;


-- LEFT JOIN
SELECT utilizatori.nume, utilizatori.adresa, comenzi.data_comanda
FROM utilizatori
LEFT JOIN comenzi ON utilizatori.id_utilizator = comenzi.id_utilizator;

SELECT utilizatori.nume, utilizatori.adresa, comenzi.data_comanda
FROM utilizatori
LEFT JOIN comenzi ON utilizatori.id_utilizator = comenzi.id_utilizator
WHERE utilizatori.adresa LIKE '%Str.%';


-- FULL JOIN
SELECT utilizatori.nume, comenzi.data_comanda
FROM utilizatori
FULL JOIN comenzi ON utilizatori.id_utilizator = comenzi.id_utilizator;

SELECT utilizatori.nume, detalii_comanda.id_produs, comenzi.data_comanda, produse.nume_produs
FROM utilizatori
FULL JOIN detalii_comanda ON utilizatori.id_utilizator = detalii_comanda.id_detaliu
LEFT JOIN comenzi ON detalii_comanda.id_comanda = comenzi.id_comanda
LEFT JOIN produse ON detalii_comanda.id_produs = produse.id_produs
WHERE detalii_comanda.cantitate > 3 AND detalii_comanda.cantitate IS NOT NULL;

