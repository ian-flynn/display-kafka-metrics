const Kafka = require('kafkajs').Kafka;
const msg = process.argv[2];
async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      // multiple brokers can go in this array
      brokers: ['Ians-MacBook-Pro.local:9092'],
    });

    const producer = kafka.producer();
    console.log('Connecting... ');
    await producer.connect();
    console.log('Connected!');

    const partition = msg[0] < 'N' ? 0 : 1;
    producer.send({
      topic: 'Users',
      messages: [
        {
          value: msg,
          partition: partition,
        },
      ],
    });
    console.log('Sent Successfully!');

    await producer.disconnect();
  } catch (error) {
    console.error('An Error has occured: ', error);
  } finally {
    process.exit(0);
  }
}
run();
