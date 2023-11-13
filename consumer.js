const { Kafka } = require('kafkajs');

async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['localhost:8097'],
    });

    const consumer = kafka.consumer({ groupId: 'test' });

    console.log('Connecting... ');
    await consumer.connect();
    console.log('Connected!');

    await consumer.subscribe({
      topic: 'Users',
      fromBeginning: true,
    });
    console.log('Subscribed!');

    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `Received Message ${result.message.value} on partition ${result.partition}`
        );
      },
    });
  } catch (error) {
    console.error('An Error has occured: ', error);
  } finally {
  }
}
run();
