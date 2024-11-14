export const clientPostValidation = (req, res, next) => {
  return res.status(505).json({message: `Validation function works`})  
};
