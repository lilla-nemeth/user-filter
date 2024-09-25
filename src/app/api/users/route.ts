export async function GET() {
	try {
		const response = await fetch('https://jsonplaceholder.typicode.com/users');

		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}

		const responseData = await response.json();
		return new Response(JSON.stringify(responseData), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error }), { status: 500 });
	}
}
