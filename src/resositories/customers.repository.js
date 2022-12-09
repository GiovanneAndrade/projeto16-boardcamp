import connection from "../database/db.js";

async function getCustomersRepository() {
  const result = await connection.query(
    `
      SELECT * FROM customers;
   `
  );

  return result;
}

async function postCustomersRepository({ name, phone, cpf, birthday }) {
  const result = await connection.query(
    `
      INSERT INTO customers ( name, phone, cpf, birthday )
      VALUES ($1, $2, $3, $4)
   `,
    [name, phone, cpf, birthday]
  );

  return result;
}

export { getCustomersRepository, postCustomersRepository };
