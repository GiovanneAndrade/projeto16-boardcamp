import connection from "../database/db.js";

async function getGamesRepoditory() {
  const result = await connection.query(
    `
      SELECT games.*, 
      categories.name as "categoryName" FROM games
      JOIN categories ON games."categoryId" = categories.id;
   `
  );

  return result;
}
async function getQueryGamesRepoditory({toValue, toQuery, toWhere}) {
  const result = await connection.query(
    `
      SELECT * FROM ${toQuery} WHERE ${toWhere} ILIKE '${toValue}%'
   `
  );

  return result;
}

async function postGamesRepository({
  name,
  image,
  stockTotal,
  categoryId,
  pricePerDay,
}) {
  const result = await connection.query(
    `
      INSERT INTO games ( name, image, "stockTotal", "categoryId", "pricePerDay" )
      VALUES ($1, $2, $3, $4, $5)
   `,
    [name, image, stockTotal, categoryId, pricePerDay]
  );

  return result;
}
export { getGamesRepoditory, postGamesRepository, getQueryGamesRepoditory };
