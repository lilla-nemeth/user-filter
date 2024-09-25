function Button(props: any) {
	const { type, text, className } = props;

	return (
		<button className={className} type={type}>
			{text}
		</button>
	);
}

export default Button;
