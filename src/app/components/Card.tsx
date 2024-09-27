function Card(props: any) {
	const { cardClass, categoryClass, valueClass, user, cardCategoryFullName, fullNameClass } = props;

	return (
		<table className={cardClass} key={user.id}>
			<tr className={categoryClass}>
				<td className={cardCategoryFullName}>Name</td>
				<td>Email</td>
				<td>Phone</td>
				<td>Website</td>
				<td>Address</td>
			</tr>
			<tr className={valueClass}>
				<td className={fullNameClass}>{user.name}</td>
				<td>{user.email}</td>
				<td>{user.phone}</td>
				<td>{user.website}</td>
				<td>{user.address.street}</td>
				<td>{user.address.suite}</td>
				<td>{user.address.city}</td>
				<td>{user.address.city}</td>
				<td>{user.address.zipcode}</td>
				{/* I don't believe longitude and latitude should be visible */}
				{/* <td>{user.address.geo.lat}</td>
				<td>{user.address.geo.lng}</td> */}
			</tr>
		</table>
	);
}

export default Card;
