import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DestinationModule } from './destination/destination.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DestinationModule,
  ],
})
export class AppModule {}
