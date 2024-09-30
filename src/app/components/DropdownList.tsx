import { listRequiredCategories, capitalizeString, sortUserCards, handleCardSorting } from '@/app/utils/helperFunctions';
import { DropdownListProps } from '@/types/props';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@/types/data';

const DropdownList: React.FC<DropdownListProps> = (props) => {
	const {
		dropdownListClass,
		dropdownItemClass,
		data,
		acceptedCategories,
		setSortCategoryName,
		setUserApiData,
		isAscending,
		setIsAscending,
		style,
	} = props;

	return data.map((el: User) => {
		return (
			<div key={el.id} className={dropdownListClass} style={style}>
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
								handleCardSorting(sortUserCards, data, category, isAscending, setUserApiData);
							}}
						>
							{listRequiredCategories(item, acceptedCategories, capitalizeString)}
						</div>
					);
				})}
			</div>
		);
	});
};

export default DropdownList;
