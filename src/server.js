const app = require('./app');
const sequelize = require('./utils/connection');
require('./models');


const PORT = process.env.PORT || 8080;

const main = async () => {
    try {
        await sequelize.sync({logging: false}); //{force: true} {alter: true}
        console.log("DB connected");
        app.listen(PORT);
        console.log(`Server running on port ${PORT}`)
    } catch (error) {
        console.log(error)
    }
}

main();
