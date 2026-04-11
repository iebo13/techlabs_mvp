export const sanityClient = {
  fetch: jest.fn(),
}

export const urlFor = jest.fn(() => ({
  width: jest.fn().mockReturnThis(),
  height: jest.fn().mockReturnThis(),
  auto: jest.fn().mockReturnThis(),
  url: jest.fn(() => ''),
}))
