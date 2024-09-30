import { User } from '@/types/data';

// test data for filtered and API data
const mockFilteredUsers: User[] = [
	{
		id: 1,
		name: 'Jane Doe',
		username: 'Jane',
		email: 'janedoe@megacorp.com',
		address: {
			street: '916 Water St',
			suite: 'Suite 472',
			city: 'Lorain',
			zipcode: '83020-0778',
			geo: {
				lat: '27.9424',
				lng: '19.9079',
			},
		},
		phone: '+1 202-918-2132',
		website: 'janedoe.com',
		company: {
			name: 'Mega Corp',
			catchPhrase: 'Tomorrow is the future',
			bs: 'Success over everything',
		},
	},
];

const mockApiUsers: User[] = [
	{
		id: 1,
		name: 'Jane Doe',
		username: 'Jane',
		email: 'janedoe@megacorp.com',
		address: {
			street: '916 Water St',
			suite: 'Suite 472',
			city: 'Lorain',
			zipcode: '83020-0778',
			geo: {
				lat: '27.9424',
				lng: '19.9079',
			},
		},
		phone: '+1 202-918-2132',
		website: 'janedoe.com',
		company: {
			name: 'Mega Corp',
			catchPhrase: 'Tomorrow is the future',
			bs: 'Success over everything',
		},
	},
	{
		id: 2,
		name: 'John Doe',
		username: 'John',
		email: 'johndoe@solutioncorp.com',
		address: {
			street: '245 Cold Storage Rd',
			suite: 'Suite 637',
			city: 'Craig',
			zipcode: '99921',
			geo: {
				lat: '27.9424',
				lng: '19.9079',
			},
		},
		phone: '907-766-4300',
		website: 'johndoe.com',
		company: {
			name: 'Solution Corp',
			catchPhrase: 'We change your future',
			bs: 'Marketing is the new black',
		},
	},
];

export { mockApiUsers, mockFilteredUsers };
