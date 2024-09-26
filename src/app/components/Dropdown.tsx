function Dropdown(props: any) {
	const { className, text } = props;

	return (
		<div className={className}>
			{text}
			{props.children}
		</div>
	);
}

export default Dropdown;
