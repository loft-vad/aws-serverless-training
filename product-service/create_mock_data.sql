select * from pg_extension;

create extension if not exists "uuid-ossp";

create table products (
	id uuid not null default uuid_generate_v4() primary key,
	title text not null,
	description text,
	price integer
);

create table stocks (
	products_id uuid,
	count integer,
	foreign key (products_id) references products(id)
);

insert into products (title, description, price) values ('Product 1', 'Description product 1', 90);
insert into products (title, description, price) values ('Product 2', 'Description product 2', 190);
insert into products (title, description, price) values ('Product 3', 'Description product 3', 95);
insert into products (title, description, price) values ('Product 4', 'Description product 4', 82);
insert into products (title, description, price) values ('Product 5', 'Description product 5', 13);
insert into products (title, description, price) values ('Product 6', 'Description product 6', 20);
insert into products (title, description, price) values ('Product 7', 'Description product 7', 31);

insert into stocks (products_id, count) values ('90bb7def-0b19-49de-b6cd-8abffbe1b99f', 90);
insert into stocks (products_id, count) values ('b953312b-29bd-444a-b916-351f955155da', 90);
insert into stocks (products_id, count) values ('2f533d42-62dd-4932-ae08-d8713fd0ae8c', 90);
insert into stocks (products_id, count) values ('e03d0754-fe5e-4cb6-801b-111adfd9489e', 90);
insert into stocks (products_id, count) values ('9a337e89-c8ee-45f3-bcd3-11000bdfab90', 90);
insert into stocks (products_id, count) values ('66a19eb7-9526-45b5-80f6-662510a0587d', 90);
insert into stocks (products_id, count) values ('e6fad05e-bbcf-40fc-a7dc-af4c341b3665', 90);