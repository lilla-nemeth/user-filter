export async function GET() {
	try {
		const response = await fetch('https://jsonplaceholder.typicode.com/users');

		if (!response.ok) {
			const errorData = await response.json();
			return new Response(JSON.stringify(errorData), { status: response.status });
		}

		const responseData = await response.json();
		return new Response(JSON.stringify(responseData), { status: response.status });
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
		return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
	}
}
