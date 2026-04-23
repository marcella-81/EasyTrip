import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import type { PublicProfile } from '@easytrip/shared';
import { Roles } from '../auth/decorators/roles.decorator';
import { StatsService } from '../stats/stats.service';
import { VisitedService } from '../visited/visited.service';
import { WishlistService } from '../wishlist/wishlist.service';
import { UsersService } from './users.service';

@Controller('users')
@Roles()
export class UsersController {
  constructor(
    private readonly users: UsersService,
    private readonly wishlist: WishlistService,
    private readonly visited: VisitedService,
    private readonly stats: StatsService,
  ) {}

  @Get(':id/profile')
  async publicProfile(@Param('id') id: string): Promise<PublicProfile> {
    const user = await this.users.findById(id);
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const [wishlist, visited, statsRes] = await Promise.all([
      this.wishlist.list(user.id),
      this.visited.list(user.id),
      this.stats.continents(user.id),
    ]);

    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
      totalVisited: statsRes.totalVisited,
      totalWishlist: wishlist.length,
      perContinent: statsRes.perContinent,
      wishlist,
      visited,
    };
  }
}
