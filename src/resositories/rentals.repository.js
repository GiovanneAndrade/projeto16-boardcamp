import connection from "../database/db.js";

async function getRentalsRepoditory({ consult, consultWhere }) {
  console.log(consult)
  const consultAll = `SELECT rentals.*,  
    games.id as "gameId", 
    games.name as "gameName",
    games."categoryId" as "gameCategoryId",
      customers.name as "customerName", 
      customers.id as "customerId", 
      categories.id as "categoryId", 
      categories.name as "categoryName" 
    FROM rentals
    JOIN games
    ON rentals."gameId" = games.id
    JOIN customers
    ON rentals."customerId" = customers.id
    JOIN categories
    ON games."categoryId" = categories.id`;
    if(!consult){
      const result = await connection.query(` ${consultAll}`);
      return result
    }
   const result = await connection.query(` ${consultAll} where ${consultWhere} = ${consult}`);

    return result;
   
 
}
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
  getRentalsRepoditory,
  postRentalsRepoditory,
  getConsultRentalsRepoditory,
  postIdRentalsRepoditory,
  deleteIdRentalsRepoditory,
};
