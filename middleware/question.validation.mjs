export const clientPostValidation = (req, res, next) => {
  const { title, description, category } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({ message: "Invalid request data." });
  }

  if (
    typeof title !== `string` ||
    typeof description !== `string` ||
    typeof category !== `string`
  ) {
    return res.status(400).json({ message: "Invalid request data." });
  }
  next();
};

export const queryParamsValidation = (req, res, next) => {
  const { category, keyword } = req.query;
  if (category && keyword) {
    if (typeof category !== `string` || typeof keyword !== `string`) {
      return res.status(400).json({
        message: `Invalid search parameters.`,
        category: category,
        keyword: keyword,
      });
    }
  } else if (category) {
    if (typeof category !== `string`) {
      return res.status(400).json({
        message: `Invalid search parameters.`,
        category: category,
        keyword: keyword,
      });
    }
  } else if (keyword) {
    if (typeof keyword !== `string`) {
      return res.status(400).json({
        message: `Invalid search parameters.`,
        category: category,
        keyword: keyword,
      });
    }
  }

  next();
};
