function Input(props: any) {
	const { className, htmlFor, type, name, text, onChange, value } = props;

	return (
		<>
			<label htmlFor={htmlFor}>{text}</label>
			<input className={className} type={type} name={name} onChange={onChange} value={value} />
		</>
	);
}

export default Input;
