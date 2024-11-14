export const answerPostValidation = (req, res, next) => {
  const { content } = req.body;
  if (!content || content.trim() === "") {
    return res.status(400).json({
      message: `Invalid request data: content is require`,
    });
  }
  if (content.length > 300) {
    return res.status(400).json({
      message: `Invalid request data: content must not exceed 300 character`,
    });
  }
  next();
};
