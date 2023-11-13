const { Kafka, Partitioners } = require('kafkajs');

async function run(count) {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['localhost:8097'],
    });

    const producer = kafka.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
      allowAutoTopicCreation: false,
    });

    console.log('Connecting... ');
    await producer.connect();
    console.log('Connected!');

    // A-M go to partition 0, N-Z go to partition 1
    const partition = 65 + (count % 26) < 'N' ? 0 : 1;
    const result = await producer.send({
      topic: 'Users',
      messages: [
        {
          value: `${String.fromCharCode(65 + (count % 26))}lane${count}`,
          partition: partition,
        },
      ],
    });
    console.log('Sent Successfully!', result);

    await producer.disconnect();
  } catch (error) {
    console.error('An Error has occured: ', error);
  } finally {
  }
}
let nameCount = 0;
const intervalID = setInterval(() => {
  run(nameCount);
  nameCount++;
}, 5000);
