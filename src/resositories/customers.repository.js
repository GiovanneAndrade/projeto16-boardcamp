import connection from "../database/db.js";

async function getCustomersRepository() {
  const result = await connection.query(
    `
      SELECT * FROM customers;
   `
  );

  return result;
}
async function getIdCustomersRepository({id, consult}) {

  const result = await connection.query(
    `
      SELECT * FROM ${consult} WHERE id = ${id};
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
async function putCustomersRepository({ name, phone, cpf, birthday, id }) {
  const result = await connection.query(
    `
    UPDATE customers 
    SET name = $1, phone = $2, cpf = $3, birthday = $4
    WHERE id = $5;
   `,
    [name, phone, cpf, birthday, id]
  );

  return result;
}

export {
  getCustomersRepository,
  postCustomersRepository,
  putCustomersRepository,
  getIdCustomersRepository,
};
