import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DestinationController } from './destination.controller';
import { DestinationService } from './destination.service';
import { CountryService } from './services/country.service';
import { WeatherService } from './services/weather.service';
import { ExchangeService } from './services/exchange.service';

@Module({
  imports: [HttpModule],
  controllers: [DestinationController],
  providers: [DestinationService, CountryService, WeatherService, ExchangeService],
})
export class DestinationModule {}
