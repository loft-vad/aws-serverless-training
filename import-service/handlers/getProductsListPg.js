'use strict';

import { Client } from 'pg';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000
};

export default async function invoke(event) {
  const client = new Client(dbOptions);
  await client.connect();

  try {
    // const initResult = await client.query(`
    // create extension if not exists "uuid-ossp"`);
    // const ddlResult = await client.query(`
    //   create table if not exists products (
    //     id uuid default uuid_generate_v4() primary key,
    //     title text not null,
    //     description text,
    //     price integer
    // )`);
    // const ddlResult2 = await client.query(`
    //   create table if not exists stocks (
    //     products_id uuid primary key,
    //     count integer,
    //     foreign key ("products_id") references "products" ("id")
    // )`);
    // const dmlResult = await client.query(`
    //   insert into products (title, description, price) values ('Product 1', 'Description product 1', 90), ('Product 2', 'Description product 2', 190), ('Product 3', 'Description product 3', 95), ('Product 4', 'Description product 4', 82), ('Product 5', 'Description product 5', 13), ('Product 6', 'Description product 6', 20), ('Product 7', 'Description product 7', 31);
    // `);
    // const dmlResult2 = await client.query(`
    //   insert into stocks (products_id, count) values ('9506c0fc-5b46-494e-b355-9bc50e4af7de', 90), 
    //   ('7e030e39-8a8f-4b28-a37d-f459d241261b', 90), 
    //   ('7b6e7056-5341-4350-a699-f49c86d3090f', 90), 
    //   ('c681363e-2c61-4165-897d-10f8cbe8388a', 90), 
    //   ('8e0c800d-3cf7-44d2-94c1-a306f8a2cdfe', 90), 
    //   ('161a4076-baad-41f6-98b6-fcfe8f9697f4', 90), 
    //   ('7dfdb61c-8b6e-4a77-a6e4-25ad0fc0b4fb', 90);
    // `);
    // console.log('ddlResult: ', ddlResult);
    // console.log('ddlResult2: ', ddlResult2);
    // console.log('dmlResult: ', dmlResult);
    // console.log('dmlResult2: ', dmlResult2);
    // const { rows: products_items } = await client.query("select * from products");
    const { rows: products_items_stock } = await client.query("SELECT p.id, s.count, p.price, p.title, p.description from products as p, stocks as s where p.id = s.products_id");

    console.log('products_items_stock: ', products_items_stock);
    return products_items_stock;
  } catch (error) {
    console.error('Error during DB request execution: ', error);
  } finally {
    client.end();
  }
}