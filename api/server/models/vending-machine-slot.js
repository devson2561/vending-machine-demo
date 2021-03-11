'use strict';
const axios = require('axios');
const FormData = require('form-data');

const app = require('../server');

const LINE_NOTIFY_ACCESS_TOKEN = 'eseimXnH8RbchEBwdFeLkPd9VW5nyS7MPP9HzExHQyN';

module.exports = (MachineSlot) => {
  const sendLineNotify = async ({ machine, product, available }) => {
    try {
      const message = `
        Low product stock
        machine id: ${machine.id}
        machine name: ${machine.name}
        product id: ${product.id}
        product name: ${product.name}
        product stock available: ${available}
      `;
      const form = new FormData();
      form.append('message', message);
      await axios.post('https://notify-api.line.me/api/notify', form, {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${LINE_NOTIFY_ACCESS_TOKEN}`,
        },
      });
    } catch (error) {
      console.log(error, 'error.');
    }
  };
  MachineSlot.buyProduct = (ctx, id, cb) => {
    return new Promise(async (resolve, reject) => {
      try {
        const slot = await MachineSlot.findById(id);
        const { stock, capacity } = slot;
        if (stock === 0) {
          var error = new Error('Out of stock');
          error.status = 400;
          return cb(error);
        }
        const newStock = stock - 1;
        await slot.updateAttributes({
          stock: newStock,
        });

        cb(null, slot);

        const isLowStock = newStock <= capacity * 0.1;
        if (isLowStock) {
          const product = await app.models.Product.findById(slot.productId);
          const machine = await app.models.VendingMachine.findById(
            slot.vendingMachineId
          );
          sendLineNotify({
            machine,
            product,
            available: newStock,
          });
        }
      } catch (err) {
        console.error(err, 'fuck error');
        cb(err);
      }
    });
  };

  MachineSlot.remoteMethod('buyProduct', {
    http: { verb: 'post', path: '/buy' },
    accepts: [
      { arg: 'ctx', type: 'object', http: { source: 'context' } },
      {
        arg: 'id',
        type: 'string',
        required: true,
      },
    ],
    returns: { arg: 'data', type: 'object', root: true },
  });
};
