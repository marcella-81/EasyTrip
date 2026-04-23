import { Controller, Get } from '@nestjs/common';
import type { RecommendationItem } from '@easytrip/shared';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { RecommendationsService } from './recommendations.service';

@Controller('recommendations')
@Roles()
export class RecommendationsController {
  constructor(private readonly service: RecommendationsService) {}

  @Get()
  list(@CurrentUser() user: AuthUser): Promise<RecommendationItem[]> {
    return this.service.forUser(user.id);
  }
}
