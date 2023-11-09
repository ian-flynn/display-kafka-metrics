const Kafka = require('kafkajs').Kafka;

async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      // multiple brokers can go in this array
      brokers: ['Ians-MacBook-Pro.local:9092'],
    });

    const admin = kafka.admin();
    console.log('Connecting... ');
    await admin.connect();
    console.log('Connected!');

    await admin.createTopics({
      topics: [
        {
          topic: 'Users',
          numPartitions: 2,
        },
      ],
    });
    console.log('Created Successfully!');

    await admin.disconnect();
  } catch (error) {
    console.error('An Error has occured: ', error);
  } finally {
    process.exit(0);
  }
}
run();
