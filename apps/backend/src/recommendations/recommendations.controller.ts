import { Controller, Get, UseGuards } from '@nestjs/common';
import type { RecommendationItem } from '@easytrip/shared';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RecommendationsService } from './recommendations.service';

@Controller('recommendations')
@UseGuards(JwtAuthGuard)
export class RecommendationsController {
  constructor(private readonly service: RecommendationsService) {}

  @Get()
  list(@CurrentUser() user: AuthUser): Promise<RecommendationItem[]> {
    return this.service.forUser(user.id);
  }
}
