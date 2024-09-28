function Card(props: any) {
	const { cardClass, categoryClass, valueClass, user, cardCategoryFullName, fullNameClass } = props;

	return (
		<div className={cardClass} key={user.id}>
			<ul className={categoryClass}>
				<li className={cardCategoryFullName}>Name</li>
				<li>Email</li>
				<li>Phone</li>
				<li>Website</li>
				<li>Address</li>
			</ul>
			<ul className={valueClass}>
				<li className={fullNameClass}>{user.name}</li>
				<li>{user.email}</li>
				<li>{user.phone}</li>
				<li>{user.website}</li>
				<li>{user.address.street}</li>
				<li>{user.address.suite}</li>
				<li>{user.address.city}</li>
				<li>{user.address.city}</li>
				<li>{user.address.zipcode}</li>
				{/* I don't believe longitude and latitude should be visible */}
				{/* <li>{user.address.geo.lat}</li>
				<li>{user.address.geo.lng}</li> */}
			</ul>
		</div>
	);
}

export default Card;
