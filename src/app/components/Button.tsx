function Button(props: any) {
	const { type, text, className, onClick } = props;

	return (
		<button className={className} type={type} onClick={onClick}>
			{text}
		</button>
	);
}

export default Button;
