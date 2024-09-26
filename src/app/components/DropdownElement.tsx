function DropdownElement(props: any) {
	const { dropdownElementClassName, display, onClick, data } = props;
	return data.map((el: any) => {
		return (
			<div className={dropdownElementClassName} style={{ display: display }} onClick={onClick}>
				<div>
					{Object.keys(el).map((item) => {
						return <div>{item}</div>;
					})}
				</div>
			</div>
		);
	});
}

export default DropdownElement;
