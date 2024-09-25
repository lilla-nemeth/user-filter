function Button(props: any) {
	const { type, text } = props;

	return <button type={type}>{text}</button>;
}

export default Button;
