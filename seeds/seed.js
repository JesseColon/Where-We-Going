 const sequelize = require('../Config/connection');
 const { User, Event } = require('../models');

const userData = require('..controllers/api/userRoutes.js');
const eventData = require('..controllers/api/eventRoutes.js');

 const seedDatabase = async () => {
     await sequelize.sync({ force: true });
  
     const users = await User.bulkCreate(userData, {
       individualHooks: true,
       returning: true,
     });
  
     for (const event of eventData) {
       await Event.create({
         ...event,
         user_id: users[Math.floor(Math.random() * users.length)].id,
       });
     }
  
     process.exit(0);
   };
  
   seedDatabase();