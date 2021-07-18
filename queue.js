const amqplib = require("amqplib");

const connect = () =>
  amqplib.connect("amqp://localhost").then((conn) => conn.createChannel());

const createQueue = (channel, queue) => {
  channel.assertQueue(queue, { durable: true });
  return channel;
};

const sendToQueue = (queue, message) =>
  connect()
    .then((channel) => createQueue(channel, queue))
    .then((channel) =>
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
    )
    .catch((err) => console.log(err));

const consume = (queue, callback) =>
  connect()
    .then((channel) => createQueue(channel, queue))
    .then((channel) => channel.consume(queue, callback, { noAck: true }))
    .catch((err) => console.log(err));

module.exports = {
  consume,
  sendToQueue,
};
