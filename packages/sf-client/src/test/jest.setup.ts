import timemachine from 'timemachine';

beforeAll(() => {
    process.env.SF_ENV = 'development';
    timemachine.reset();
    timemachine.config({
        dateString: '2023-11-01T11:00:00.00Z',
    });
});

beforeEach(() => jest.resetAllMocks());

afterAll(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
});
