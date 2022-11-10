const { url } = require('../config/config');

const paginationUrls = async (Model, page, filter) => {
  const route = `${Model.name}s`.toLocaleLowerCase();
  const size = 10;
  const count = await Model.count({ where: { ...filter } });
  return {
    count: count,
    next:
      count - 10 > page * size
        ? `${url}/${route}?page=${Number(page) + 1}`
        : null,
    prev: page > 0 ? `${url}/${route}?page=${Number(page) - 1}` : null,
  };
};

module.exports = {
  paginationUrls,
};
