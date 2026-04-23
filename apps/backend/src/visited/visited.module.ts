import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { VisitedController } from './visited.controller';
import { VisitedService } from './visited.service';

@Module({
  imports: [AuthModule],
  controllers: [VisitedController],
  providers: [VisitedService],
  exports: [VisitedService],
})
export class VisitedModule {}
