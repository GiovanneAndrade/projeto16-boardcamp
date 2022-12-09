import connection from "../database/db.js";

async function getCustomersRepository() {
  const result = await connection.query(
    `
      SELECT * FROM customers;
   `
  );

  return result;
}



export { getCustomersRepository };
