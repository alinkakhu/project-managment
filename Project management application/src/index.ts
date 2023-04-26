import mongoose from 'mongoose';
import { PORT } from './constants';

import * as serverService from './services/server.service';


(async () => {
  try {
    await mongoose.connect('mongodb+srv://alinakhu9:ioA6PZmFgxhx44Ra@cluster0.qcim9tk.mongodb.net/managerApp');
    serverService.server.listen(process.env.PORT || PORT, function () {
      console.log('Сервер ожидает подключения...');
    })
  } catch (error) {
    console.log(error);
  }
})();



process.on('SIGINT', async () => {
  await mongoose.disconnect();
  process.exit();
});
localhost:27017
// mongodb+srv://alinakhu9:ioA6PZmFgxhx44Ra@cluster0.qcim9tk.mongodb.net/managerApp