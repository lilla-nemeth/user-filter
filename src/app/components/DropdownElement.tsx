function DropdownElement(props: any) {
	const { dropdownElementClassName, text, display, onClick } = props;
	return (
		<div className={dropdownElementClassName} style={{ display: display }} onClick={onClick}>
			{text}
		</div>
	);
}

export default DropdownElement;
