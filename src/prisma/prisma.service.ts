import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // throw new Error('Method not implemented.');
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // this.$on('beforeExit', async () => {    // CORREÇÃO DE BUG
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
