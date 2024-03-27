import { ConsumerSubscribeTopics, ConsumerConfig } from 'kafkajs';
import { AcceptAny } from './types';
interface connection {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
}
export interface IProducer extends connection {
    produce: (message: any) => Promise<void>;
}

export interface IConsumer extends connection {
    consumeEachMessage: (message: any) => Promise<void>;
}

export interface ConsumerOptions {
    topic: ConsumerSubscribeTopics;
    consumerConfig: ConsumerConfig;
    onMessage: (key: string, value: AcceptAny) => Promise<void>;
    consumerConcurrency: number;
}
