import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DestinationController } from './destination.controller';
import { DestinationService } from './destination.service';
import { CountryService } from './services/country.service';
import { WeatherService } from './services/weather.service';
import { ExchangeService } from './services/exchange.service';
import { SemanticSearchService } from '../semantic-search/semantic-search.service';

@Module({
  imports: [HttpModule],
  controllers: [DestinationController],
  providers: [
    DestinationService,
    CountryService,
    WeatherService,
    ExchangeService,
    SemanticSearchService,
  ],
})
export class DestinationModule {}
