// import { IConsumer } from '../../../interfaces/kafka.interface';
// import { Consumer, ConsumerSubscribeTopics, ConsumerConfig } from 'kafkajs';
// import { KafkaManager } from '../kafka';
// import { AcceptAny } from '../../../interfaces/types';

// export class KafkaConsumer extends KafkaManager implements IConsumer {
//     private consumer: Consumer;
//     private topics: ConsumerSubscribeTopics;

//     constructor(topics: ConsumerSubscribeTopics, consumerConfig: ConsumerConfig) {
//         super();
//         this.topics = topics;
//         this.consumer = this.kafka.consumer({
//             allowAutoTopicCreation: false,
//             ...consumerConfig,
//         });
//     }

//     /**
//      * @description Consume Message From Topic
//      * @param onMessage - Function to be executed on Message
//      */
//     async consumeEachMessage(
//         onMessage: (key: string, value: AcceptAny) => Promise<void>,
//         consumerConcurrency = 1
//     ) {
//         await this.consumer.subscribe(this.topics);
//         await this.consumer.run({
//             partitionsConsumedConcurrently: consumerConcurrency || 1,
//             autoCommit: true,
//             eachMessage: async ({ message, partition }) => {
//                 console.log(`Kafka Processing message partition: ${partition}`);
//                 try {
//                     const key = message.key?.toString();
//                     const value = message.value?.toString();
//                     if (key && value) {
//                         await onMessage(key, JSON.parse(value));
//                     } else {
//                         console.log('No data Received');
//                     }
//                 } catch (err) {
//                     console.error('Kafka Error consuming message.', err);
//                 }
//             },
//         });
//     }

//     /**
//      * @description Open Connection
//      */
//     async connect() {
//         try {
//             await this.consumer.connect();
//         } catch (err) {
//             console.log('Failed to connect to Kafka.', err);
//             await this.connect();
//         }
//     }

//     /**
//      * @description Close Connection
//      */
//     async disconnect() {
//         await this.consumer.disconnect();
//     }
// }
