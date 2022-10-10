import Joi = require('joi');

export const idAccidentJOI = Joi.object({
  accidentId: Joi.number()
    .required(),
});
