const Kafka = require('kafkajs').Kafka;

async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['localhost:8097', 'localhost:8098', 'localhost:8099'],
      // brokers: [
      //   'kafka-broker1:8097',
      //   'kafka-broker2:8098',
      //   'kafka-broker3:8099',
      // ],
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
        {
          topic: 'Payments',
          numPartitions: 3,
        },
      ],
    });
    const res = await admin.fetchTopicMetadata({
      topics: ['Users', 'Payments'],
    });
    console.log('Created topics Users, and Payments successfully!');

    await admin.disconnect();
  } catch (error) {
    console.error('An Error has occured: ', error);
  } finally {
    process.exit(0);
  }
}
run();
