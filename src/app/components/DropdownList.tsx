import { listRequiredCategories, capitalizeString, sortUserCards, handleCardSort } from '@/app/utils/helpers';
import { v4 as uuidv4 } from 'uuid';

function DropdownList(props: any) {
	const {
		dropdownListClass,
		dropdownItemClass,
		data,
		acceptedCategories,
		setSortCategoryName,
		setUserAPIData,
		isAscending,
		setIsAscending,
	} = props;

	return data.map((el: any) => {
		return (
			<div key={el.id} className={dropdownListClass}>
				{Object.keys(el).map((item) => {
					return (
						<div
							key={uuidv4()}
							className={dropdownItemClass}
							onClick={() => {
								// filter categories to show only required ones
								const category: string = listRequiredCategories(item, acceptedCategories, capitalizeString);
								setSortCategoryName(category);
								setIsAscending(isAscending);
								handleCardSort(sortUserCards, data, category, isAscending, setUserAPIData);
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
