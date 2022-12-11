import * as allRentals from "../resositories/rentals.repository.js";
import * as allCustomers from "../resositories/customers.repository.js";
import dayjs from "dayjs";
async function getRentalsController(req, res) {
  let consult = req.query.customerId;
  let consultWhere = "customers.id";
  function organizedResult(result) {
    const response = result.rows.map((rentals) => {
      return {
        id: rentals.id,
        customerId: rentals.customerId,
        gameId: rentals.gameId,
        rentDate: rentals.rentDate,
        daysRented: rentals.daysRented,
        returnDate: rentals.returnDate,
        originalPrice: rentals.originalPrice,
        delayFee: rentals.delayFee,
        customer: {
          id: rentals.customerId,
          name: rentals.customerName,
        },
        game: {
          id: rentals.gameId,
          name: rentals.gameName,
          categoryId: rentals.categoryId,
          categoryName: rentals.categoryName,
        },
      };
    });
    return res.status(200).send(response);
  }

  try {
    if (consult) {
      const result = await allRentals.getRentalsRepoditory({
        consult,
        consultWhere,
      });
      return organizedResult(result);
    } else {
      consult = req.query.gameId;
      consultWhere = "games.id";
      const result = await allRentals.getRentalsRepoditory({
        consult,
        consultWhere,
      });
      return organizedResult(result);
    }
  } catch (error) {
    return res.sendStatus(500).send(error);
  }
}


export {
  getRentalsController,
 
};
