// Test Data Factories
export const makeUser = (overrides = {}) => ({
    id: Math.floor(Math.random() * 1000),
    name: 'Test User',
    email: 'test@example.com',
    avatar: 'https://via.placeholder.com/150',
    ...overrides,
});
export const makeStory = (overrides = {}) => ({
    id: Math.floor(Math.random() * 1000),
    title: 'Test Story',
    content: 'This is a test story content for testing purposes.',
    author: 'Test Author',
    createdAt: new Date().toISOString(),
    ...overrides,
});
export const makeEvent = (overrides = {}) => ({
    id: Math.floor(Math.random() * 1000),
    title: 'Test Event',
    description: 'This is a test event description.',
    date: new Date().toISOString(),
    location: 'Test Location',
    ...overrides,
});
