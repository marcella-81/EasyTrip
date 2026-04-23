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
import type { SearchHistoryEntry } from '@easytrip/shared';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddHistoryDto } from './dto/add-history.dto';
import { BulkHistoryDto } from './dto/bulk-history.dto';
import { HistoryService } from './history.service';

@Controller('history')
@UseGuards(JwtAuthGuard)
export class HistoryController {
  constructor(private readonly history: HistoryService) {}

  @Get()
  list(@CurrentUser() user: AuthUser): Promise<SearchHistoryEntry[]> {
    return this.history.list(user.id);
  }

  @Post()
  add(
    @CurrentUser() user: AuthUser,
    @Body() dto: AddHistoryDto,
  ): Promise<SearchHistoryEntry> {
    return this.history.addFromQuery(user.id, dto.query);
  }

  @Post('bulk')
  bulk(
    @CurrentUser() user: AuthUser,
    @Body() dto: BulkHistoryDto,
  ): Promise<SearchHistoryEntry[]> {
    return this.history.addBulk(user.id, dto.queries);
  }

  @Delete()
  @HttpCode(200)
  async clear(@CurrentUser() user: AuthUser) {
    await this.history.deleteAll(user.id);
    return { ok: true };
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
  ) {
    await this.history.deleteById(user.id, id);
    return { ok: true };
  }
}
