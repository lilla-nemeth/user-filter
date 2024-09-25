export interface User {
	id: number;
	name: string;
	email: string;
	phone: string;
	website: string;
	address: UserAddress[];
}

export interface UserAddress {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: UserLocation[];
}

export interface UserLocation {
	lat: string;
	lng: string;
}
