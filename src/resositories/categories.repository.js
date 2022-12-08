import connection from "../database/db.js";

async function getCategoryRepository(consult) {
  const result = await connection.query(
    `
      SELECT * FROM ${consult};
    `
  );
  return result;
}
async function postCategoryRepoditory(name) {
  const result = await connection.query(
    `
      INSERT INTO categories ( name ) VALUES ($1)
   `,
    [name]
  );

  return result;
}
export { getCategoryRepository, postCategoryRepoditory };
