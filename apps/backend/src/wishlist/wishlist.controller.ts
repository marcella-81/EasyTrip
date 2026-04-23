import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import type { WishlistItem } from '@easytrip/shared';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { AddWishlistDto } from './dto/add-wishlist.dto';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
@Roles()
export class WishlistController {
  constructor(private readonly wishlist: WishlistService) {}

  @Get()
  list(@CurrentUser() user: AuthUser): Promise<WishlistItem[]> {
    return this.wishlist.list(user.id);
  }

  @Post()
  add(
    @CurrentUser() user: AuthUser,
    @Body() dto: AddWishlistDto,
  ): Promise<WishlistItem> {
    return this.wishlist.add(user.id, dto);
  }

  @Delete(':cca2')
  @HttpCode(200)
  async remove(@CurrentUser() user: AuthUser, @Param('cca2') cca2: string) {
    await this.wishlist.remove(user.id, cca2);
    return { ok: true };
  }
}
