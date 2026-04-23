/* eslint-disable @typescript-eslint/no-explicit-any */
export function createPrismaMock(): any {
  return {
    user: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
      upsert: jest.fn(),
    },
    searchHistory: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      createMany: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    },
    wishlist: {
      findMany: jest.fn(),
      create: jest.fn(),
      deleteMany: jest.fn(),
      upsert: jest.fn(),
    },
    visitedCountry: {
      findMany: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
      groupBy: jest.fn(),
    },
    $transaction: jest.fn((fns: unknown[]) => Promise.all(fns as Promise<unknown>[])),
  };
}
