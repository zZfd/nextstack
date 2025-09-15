import type { Prisma, PrismaClient } from '@nextstack/database';

export type PrismaTransaction = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>;

export interface FindManyOptions<WhereInput, OrderByInput> {
  where?: WhereInput;
  orderBy?: OrderByInput | OrderByInput[];
  take?: number;
  skip?: number;
  cursor?: Record<string, unknown>;
  include?: Record<string, unknown>;
  select?: Record<string, unknown>;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

export abstract class BaseRepository<
  Model,
  CreateInput,
  UpdateInput,
  WhereInput,
  WhereUniqueInput,
  OrderByInput
> {
  constructor(protected readonly db: PrismaClient | PrismaTransaction) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected abstract get model(): any;

  async findById(id: string, include?: Record<string, unknown>): Promise<Model | null> {
    return await this.model.findUnique({
      where: { id } as WhereUniqueInput,
      include,
    });
  }

  async findOne(where: WhereInput, include?: Record<string, unknown>): Promise<Model | null> {
    return await this.model.findFirst({
      where,
      include,
    });
  }

  async findMany(options: FindManyOptions<WhereInput, OrderByInput>): Promise<Model[]> {
    return await this.model.findMany(options);
  }

  async findManyPaginated(
    options: FindManyOptions<WhereInput, OrderByInput> & {
      page?: number;
      pageSize?: number;
    }
  ): Promise<PaginatedResult<Model>> {
    const page = options.page ?? 1;
    const pageSize = options.pageSize ?? 10;
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      this.model.findMany({
        ...options,
        take: pageSize,
        skip,
      }),
      this.model.count({ where: options.where }),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages,
      hasMore: page < totalPages,
    };
  }

  async create(data: CreateInput, include?: Record<string, unknown>): Promise<Model> {
    return await this.model.create({
      data,
      include,
    });
  }

  async createMany(data: CreateInput[]): Promise<Prisma.BatchPayload> {
    return await this.model.createMany({
      data,
    });
  }

  async update(id: string, data: UpdateInput, include?: Record<string, unknown>): Promise<Model> {
    return await this.model.update({
      where: { id } as WhereUniqueInput,
      data,
      include,
    });
  }

  async updateMany(where: WhereInput, data: UpdateInput): Promise<Prisma.BatchPayload> {
    return await this.model.updateMany({
      where,
      data,
    });
  }

  async delete(id: string): Promise<Model> {
    return await this.model.delete({
      where: { id } as WhereUniqueInput,
    });
  }

  async deleteMany(where: WhereInput): Promise<Prisma.BatchPayload> {
    return await this.model.deleteMany({
      where,
    });
  }

  async count(where?: WhereInput): Promise<number> {
    return await this.model.count({ where });
  }

  async exists(where: WhereInput): Promise<boolean> {
    const count = await this.count(where);
    return count > 0;
  }

  async transaction<T>(
    fn: (tx: PrismaTransaction) => Promise<T>
  ): Promise<T> {
    if ('$transaction' in this.db) {
      return await (this.db as PrismaClient).$transaction(fn);
    }
    // Already in a transaction
    return await fn(this.db as PrismaTransaction);
  }
}