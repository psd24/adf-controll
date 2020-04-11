import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from '../entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [RolesService],
  imports: [
    TypeOrmModule.forFeature([Role])
  ],
  controllers: [RolesController]
})
export class RolesModule {}
