function Card(props: any) {
	const { className, user } = props;

	return (
		<ul className={className} key={user.id} style={{ minWidth: '400px', margin: '30px', padding: '10px', display: 'flex' }}>
			<ul style={{ display: 'flex', width: '30%', flexDirection: 'column', color: 'green' }}>
				<li>Name:</li>
				<li>Email:</li>
				<li>Phone:</li>
				<li>Website:</li>
				<li>Address:</li>
			</ul>
			<ul style={{ display: 'flex', width: '70%', flexDirection: 'column', flex: '1' }}>
				<li>{user.name}</li>
				<li>{user.email}</li>
				<li>{user.phone}</li>
				<li>{user.website}</li>
				<li>{user.address.street}</li>
				<li>{user.address.suite}</li>
				<li>{user.address.city}</li>
				<li>{user.address.city}</li>
				<li>{user.address.zipcode}</li>
				<li>{user.address.geo.lat}</li>
				<li>{user.address.geo.lng}</li>
			</ul>
		</ul>
	);
}

export default Card;
