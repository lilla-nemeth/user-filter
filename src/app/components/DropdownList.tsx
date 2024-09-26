import { listRequiredCategories, capitalizeString, handleCardSort } from '@/app/utils/helpers';
import { v4 as uuidv4 } from 'uuid';

function DropdownList(props: any) {
	const { dropdownListClassName, dropdownItemClassName, display, data, acceptedCategories, setSortCategoryName, setUserAPIData } = props;

	return data.map((el: any) => {
		return (
			<div key={el.id} className={dropdownListClassName} style={{ display: display }}>
				{Object.keys(el).map((item) => {
					return (
						<div
							key={uuidv4()}
							className={dropdownItemClassName}
							onClick={() => {
								// filter function to show only required categories
								const category: string = listRequiredCategories(item, acceptedCategories, capitalizeString);
								setSortCategoryName(category);
								handleCardSort(data, category, setUserAPIData);
							}}
						>
							{listRequiredCategories(item, acceptedCategories, capitalizeString)}
						</div>
					);
				})}
			</div>
		);
	});
}

export default DropdownList;
