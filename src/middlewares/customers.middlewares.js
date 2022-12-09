import * as allCategories from "../resositories/categories.repository.js";
import { postCustomersSchema } from "../schemas/customers.schema.js";
 

const postCustomersMiddlewares = async function (req, res, next) {
 
  let { cpf  } = req.body;
 

  let consult = "customers";
  const resultCustomers = await allCategories.getCategoryRepository(consult);
  cpf = cpf.replace(/[^a-z0-9]/gi, "");
 
  const validationCpf = resultCustomers.rows.filter(
    (i) => i.cpf.replace(/[^a-z0-9]/gi, "") === cpf
  );
  if (validationCpf.length > 0) {
    return res.sendStatus(409); 
  }
  
  const valiCadastro = postCustomersSchema.validate(req.body, {
    abortEarly: false,
  });
  if (valiCadastro.error ) { 
    return res.sendStatus(400);
  }
 
  
  next();
};
export { postCustomersMiddlewares };
