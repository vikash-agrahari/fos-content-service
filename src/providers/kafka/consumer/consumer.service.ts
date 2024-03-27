// import { ConsumerOptions, IConsumer } from '../../../interfaces/kafka.interface';
// import { KafkaConsumer } from './consumer.kafka';
// import { KAFKA_CONFIG } from './../../../common/constants';
// import { AcceptAny } from '../../../interfaces/types';

// class ConsumerService {
//     private readonly consumers: IConsumer[] = [];

//     /**
//      * @description Start Consumer for Topic
//      * @param {ConsumerOptions} payload
//      */
//     async consume({ topic, consumerConfig, onMessage, consumerConcurrency }: ConsumerOptions) {
//         try {
//             const consumer = new KafkaConsumer(topic, consumerConfig);
//             await consumer.connect();
//             await consumer.consumeEachMessage(onMessage, consumerConcurrency);
//             this.consumers.push(consumer);
//         } catch (error) {
//             console.log('Kafka Consumer Error :: ', error);
//         }
//     }

//     /**
//      * @description Initiate Consumer for Kafka Topics
//      */
//     async initiateConsumer() {
//         try {
//             await this.consumePdfEvent();
//         } catch (error) {
//             console.log('Kafka Initiate Consumer Error :: ', error);
//         }
//     }

//     /**
//      * @description Consumer for Specific Kafka Topic
//      */
//     async consumePdfEvent() {
//         const topicPartition = KAFKA_CONFIG.TOPICS.PDF_EVENTS.numPartitions;
//         const data: ConsumerOptions = {
//             topic: {
//                 topics: [KAFKA_CONFIG.TOPICS.PDF_EVENTS.topic],
//                 fromBeginning: false,
//             },
//             consumerConfig: {
//                 groupId: `group_${KAFKA_CONFIG.TOPICS.PDF_EVENTS.topic}`,
//             },
//             onMessage: this.callbackForPdfEvent,
//             consumerConcurrency: topicPartition,
//         };
//         await this.consume(data);
//     }

//     async callbackForPdfEvent(key: string, value: AcceptAny) {
//         console.log('Kafka Consume Key:: ', key);
//         console.log('Kafka Consume Value ::', value);
//     }

//     async disconnectConsumers() {
//         for (const consumer of this.consumers) {
//             await consumer.disconnect();
//         }
//     }
// }

// export const consumer = new ConsumerService();
