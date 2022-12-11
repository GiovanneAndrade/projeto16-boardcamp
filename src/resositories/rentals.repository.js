import connection from "../database/db.js";


async function getConsultRentalsRepoditory({ gameId }) {
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

async function postIdRentalsRepoditory({ date, delayFee, id }) {
  const result = await connection.query(
    ` 
      UPDATE rentals 
      SET "returnDate" = $1, "delayFee" = $2
      WHERE id = $3;
    `,
    [date, delayFee, id]
  );
  return result;
}

async function deleteIdRentalsRepoditory({ id }) {
  const result = await connection.query(
    ` 
    DELETE FROM rentals WHERE id = ${id};
    `
  );
  return result;
}

export {
  
  postRentalsRepoditory,
  getConsultRentalsRepoditory,
  postIdRentalsRepoditory,
  deleteIdRentalsRepoditory,
};
