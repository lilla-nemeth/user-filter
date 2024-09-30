import { GET } from '../api';
import { mockApiUsers } from '../__mocks__/testUsers';

describe('Fetch data', () => {
	beforeEach(() => {
		global.fetch = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('should return a successful response with user data', async () => {
		(global.fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: jest.fn().mockRejectedValueOnce(mockApiUsers),
		});

		const response = await GET();
		const responseData = await response.json();

		expect(response.status).toBe(200);
		expect(responseData).toEqual(mockApiUsers);
	});
});
