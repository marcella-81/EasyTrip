import { Controller, Get } from '@nestjs/common';
import type { StatsResponse } from '@easytrip/shared';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { StatsService } from './stats.service';

@Controller('stats')
@Roles()
export class StatsController {
  constructor(private readonly stats: StatsService) {}

  @Get('continents')
  continents(@CurrentUser() user: AuthUser): Promise<StatsResponse> {
    return this.stats.continents(user.id);
  }
}
