const { sequelize } = require('./database/models/');
const app = require('./app');

const main = () => {
  try {
    sequelize
      .sync({ logging: false })
      .then(() => {
        console.log('Database connected');
        app.listen(app.get('port'), () => {
          console.log(`Server listening at ${app.get('port')}`); // eslint-disable-line no-console
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

main();
