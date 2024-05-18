let notes = [];

export const getNotes = (req, res) => {
  res.status(200).json({
    success: true,
    message: notes,
  });
};
