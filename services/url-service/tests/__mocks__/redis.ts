let store: Record<string, string> = {};

export const createClient = jest.fn(() => ({
  connect: jest.fn(),
  disconnect: jest.fn(),

  exists: jest.fn(async (key: string) => (store[key] ? 1 : 0)),

  get: jest.fn(async (key: string) => store[key] ?? null),

  set: jest.fn(async (key: string, value: string) => {
    store[key] = value;
    return "OK";
  }),

  __resetStore: () => {
    store = {};
  },
}));
