import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentController } from './payments.controller';
import { PaymentService } from './payments.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAYMENT_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'payment',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'payment-consumer',
          },
        },
      },
    ]),
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
})

export class PaymentModule {}