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
async function postRentalsRepoditory({
  customerId,
  gameId,
  rentDate,
  daysRented,
  returnDate,
  originalPrice,
  delayFee,
}) {
  const result = await connection.query(
    `INSERT INTO rentals 
    (
      "customerId",
      "gameId",
      "rentDate",
      "daysRented",
      "returnDate",
      "originalPrice",
      "delayFee"
    ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      customerId,
      gameId,
      rentDate,
      daysRented,
      returnDate,
      originalPrice,
      delayFee,
    ]
  );

  return result;
}
export { getRentalsRepoditory, postRentalsRepoditory, getConsultRentalsRepoditory };
