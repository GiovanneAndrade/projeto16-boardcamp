import connection from "../database/db.js";

async function getRentalsRepoditory() {
  const result = await connection.query(
    `
     SELECT * FROM rentals;
   `
  );
  return result;
}
async function getConsultRentalsRepoditory({gameId}) {
  const result = await connection.query(
    `
    SELECT * FROM rentals WHERE "gameId" = ${gameId};
   `
  );
  return result;
}

export { getRentalsRepoditory, getConsultRentalsRepoditory };
