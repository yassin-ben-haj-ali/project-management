import { BadRequestError } from "../utils/appErrors.js";
import validator from "../utils/validator/index.js";

const validate=(schema)=>{
   const validate = validator(schema);
   return (req,_,next)=>{
      validate(req.body)
         .then(()=>next())
         .catch((error)=>next(new BadRequestError(error.errors, error.errors)));
   }

}

export default validate;