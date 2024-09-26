function Card(props: any) {
	const { cardClassName, categoryClassName, valueClassName, user } = props;

	return (
		<ul className={cardClassName} key={user.id}>
			<ul className={categoryClassName}>
				<li>Name:</li>
				<li>Email:</li>
				<li>Phone:</li>
				<li>Website:</li>
				<li>Address:</li>
			</ul>
			<ul className={valueClassName}>
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
