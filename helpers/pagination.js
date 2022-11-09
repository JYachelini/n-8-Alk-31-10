require('dotenv').config();
const HOST = process.env.HOST;
const PORT = process.env.PORT || 3000;

const paginationUrls = async (Model, page) => {
  const route = `${Model.name}s`.toLocaleLowerCase();
  const size = 10;
  const count = await Model.count();
  return {
    count: count,
    next:
      count - 10 > page * size
        ? `${HOST}:${PORT}/${route}?page=${Number(page) + 1}`
        : null,
    prev: page > 0 ? `${HOST}:${PORT}/${route}?page=${Number(page) - 1}` : null,
  };
};

module.exports = {
  paginationUrls,
};
