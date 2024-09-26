import { listRequiredCategories } from '@/app/utils/helpers';
import { v4 as uuidv4 } from 'uuid';

function DropdownList(props: any) {
	const { dropdownListClassName, dropdownItemClassName, display, data, acceptedCategories, setSortCategory } = props;

	return data.map((el: any) => {
		return (
			<div key={el.id} className={dropdownListClassName} style={{ display: display }}>
				{Object.keys(el).map((item) => {
					return (
						<div
							key={uuidv4()}
							className={dropdownItemClassName}
							onClick={() => setSortCategory(listRequiredCategories(item, acceptedCategories))}
						>
							{listRequiredCategories(item, acceptedCategories)}
						</div>
					);
				})}
			</div>
		);
	});
}

export default DropdownList;
