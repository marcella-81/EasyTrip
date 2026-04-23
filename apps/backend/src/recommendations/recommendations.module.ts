import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CountriesModule } from '../countries/countries.module';
import { RecommendationsController } from './recommendations.controller';
import { RecommendationsService } from './recommendations.service';

@Module({
  imports: [AuthModule, CountriesModule],
  controllers: [RecommendationsController],
  providers: [RecommendationsService],
})
export class RecommendationsModule {}
