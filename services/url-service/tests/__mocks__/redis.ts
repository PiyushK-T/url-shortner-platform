const store = new Map<string, string>();

export const createClient = jest.fn(() => ({
  isOpen: true,
  connect: jest.fn(),
  on: jest.fn(),
  exists: jest.fn(async (key: string) => (store.has(key) ? 1 : 0)),
  set: jest.fn(async (key: string, value: string) => {
    store.set(key, value);
  }),
  get: jest.fn(async (key: string) => store.get(key) ?? null)
}));
