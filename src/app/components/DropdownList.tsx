import { listRequiredCategories } from '@/app/utils/helpers';

function DropdownList(props: any) {
	const { dropdownListClassName, dropdownItemClassName, display, data, acceptedCategories, setSortCategory } = props;

	return data.map((el: any) => {
		return (
			<div className={dropdownListClassName} style={{ display: display }}>
				{Object.keys(el).map((item) => {
					return (
						<div className={dropdownItemClassName} onClick={() => setSortCategory(listRequiredCategories(item, acceptedCategories))}>
							{listRequiredCategories(item, acceptedCategories)}
						</div>
					);
				})}
			</div>
		);
	});
}

export default DropdownList;
