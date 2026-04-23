import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import type { VisitedCountry as SharedVisitedCountry } from '@easytrip/shared';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddVisitedDto } from './dto/add-visited.dto';
import { VisitedService } from './visited.service';

@Controller('visited')
@UseGuards(JwtAuthGuard)
export class VisitedController {
  constructor(private readonly visited: VisitedService) {}

  @Get()
  list(@CurrentUser() user: AuthUser): Promise<SharedVisitedCountry[]> {
    return this.visited.list(user.id);
  }

  @Post()
  add(
    @CurrentUser() user: AuthUser,
    @Body() dto: AddVisitedDto,
  ): Promise<SharedVisitedCountry> {
    return this.visited.add(user.id, dto);
  }

  @Delete(':cca2')
  @HttpCode(200)
  async remove(
    @CurrentUser() user: AuthUser,
    @Param('cca2') cca2: string,
  ) {
    await this.visited.remove(user.id, cca2);
    return { ok: true };
  }
}
