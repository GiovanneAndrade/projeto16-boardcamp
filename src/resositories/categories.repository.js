import connection from "../database/db.js";


async function getCategoryRepoditory (){
  const result = await connection.query( 
    `
      SELECT * FROM categories;
    `
  )
  return result
}
export { getCategoryRepoditory}