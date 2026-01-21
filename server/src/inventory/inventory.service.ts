import { Injectable, NotFoundException } from '@nestjs/common';
// import { Prisma, Inventory } from '../generated/prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Prisma, Inventory } from '@prisma/client';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateInventoryDto): Promise<Inventory> {
    return await this.prisma.inventory.create({
      data,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.InventoryWhereUniqueInput;
    where?: Prisma.InventoryWhereInput;
    orderBy?: Prisma.InventoryOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.inventory.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      }),
      this.prisma.inventory.count({
        where,
      }),
    ]);

    return {
      data,
      total,
    };
  }

  async findOne(
    inventoryWhereUniqueInput: Prisma.InventoryWhereUniqueInput,
  ): Promise<Inventory | null> {
    const inventory = await this.prisma.inventory.findUnique({
      where: inventoryWhereUniqueInput,
    });

    if (!inventory) {
      throw new NotFoundException(`Inventory with the given ID does not exist`);
    }

    return inventory;
  }

  async update(params: {
    where: Prisma.InventoryWhereUniqueInput;
    data: UpdateInventoryDto;
  }): Promise<Inventory> {
    const { where, data } = params;

    try {
      return await this.prisma.inventory.update({
        where,
        data,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Inventory with ID ${where.id} not found`);
      }
      throw error;
    }
  }

  async remove(where: Prisma.InventoryWhereUniqueInput): Promise<void> {
    try {
      await this.prisma.inventory.delete({
        where,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Inventory with ID ${where.id} not found`);
      }
      throw error;
    }
  }
}
