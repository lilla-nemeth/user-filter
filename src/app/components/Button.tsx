function Button(props: any) {
	const { type, content, className, onClick } = props;

	return (
		<button className={className} type={type} onClick={onClick}>
			{content}
		</button>
	);
}

export default Button;
