const { development, production } = require('../config/config');

const paginationUrls = async (Model, page) => {
  const route = `${Model.name}s`.toLocaleLowerCase();
  const size = 10;
  const count = await Model.count();
  return {
    count: count,
    next:
      count - 10 > page * size
        ? `${development.url || production.url}/${route}?page=${
            Number(page) + 1
          }`
        : null,
    prev:
      page > 0
        ? `${development.url || production.url}/${route}?page=${
            Number(page) - 1
          }`
        : null,
  };
};

module.exports = {
  paginationUrls,
};
