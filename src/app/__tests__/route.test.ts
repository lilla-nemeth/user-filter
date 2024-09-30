class MockResponse {
	body: string | null;
	status: number;
	statusText: string;
	headers: Headers;

	constructor(body: BodyInit | null, init?: ResponseInit) {
		this.body = body ? JSON.stringify(body) : null;
		this.status = init?.status || 200;
		this.statusText = init?.statusText || 'OK';
		this.headers = new Headers(init?.headers);
	}

	async json() {
		return this.body ? JSON.parse(this.body) : null;
	}

	static error() {
		return new MockResponse(null, { status: 500, statusText: 'Internal Server Error' });
	}

	static redirect(url: string | URL, status?: number) {
		return new MockResponse(null, { status: status || 302, headers: { Location: String(url) } });
	}
}

global.Response = MockResponse as any;

import { mockApiUsers } from '../__mocks__/testUsers';
import { GET } from '../api/users/route';

describe('GET function', () => {
	beforeEach(() => {
		global.fetch = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('should return a successful response with user data', async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			status: 200,
			json: jest.fn().mockResolvedValueOnce(mockApiUsers),
		});

		const response = await GET();
		const responseData = await response.json();

		expect(response.status).toBe(200);
		expect(responseData).toEqual(JSON.stringify(mockApiUsers));
	});

	test('should return an error response when fetch fails', async () => {
		const mockErrorResponse = { error: 'Not Found' };

		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			status: 404,
			json: jest.fn().mockResolvedValueOnce(mockErrorResponse),
		});

		const response = await GET();
		const responseData = await response.json();

		expect(response.status).toBe(404);
		expect(responseData).toEqual(JSON.stringify(mockErrorResponse));
	});

	test('should return an error response on network error', async () => {
		const errorMessage = 'Network error';

		(global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

		const response = await GET();
		const responseData = await response.json();

		expect(response.status).toBe(500);
		expect(responseData).toEqual(JSON.stringify({ error: errorMessage }));
	});
});
