
import joi from "joi";
 

 
const postCustomersSchema = joi.object({
  name: joi.string().required().min(1).trim(),
  phone: joi.string().required().min(10).max(11).trim(),
  cpf: joi.string().required().min(11).max(11).trim(),
  birthday: joi.string().required().trim() 
});

  

 

export { postCustomersSchema };