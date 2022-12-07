import connection from "../database/db.js";

async function getCategoryRepoditory() {
  const result = await connection.query(
    `
      SELECT * FROM categories;
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
export { getCategoryRepoditory, postCategoryRepoditory };
