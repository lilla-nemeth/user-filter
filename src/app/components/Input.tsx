function Input(props: any) {
	const { htmlFor, type, id, name, text } = props;

	return (
		<div>
			<label htmlFor={htmlFor}>{text}</label>
			<input type={type} id={id} name={name} />
		</div>
	);
}

export default Input;
