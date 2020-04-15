import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { Organization } from '../entities/organization.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [OrganizationsService],
  imports: [
    TypeOrmModule.forFeature([Organization])
  ],
  controllers: [OrganizationsController]
})
export class OrganizationsModule {}
