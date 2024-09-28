import { ButtonProps } from "@/types/props";

function Button(props: ButtonProps) {
	const { type, content, className, onClick, disabled } = props;

	return (
		<button className={className} type={type} onClick={onClick} disabled={disabled}>
			{content}
		</button>
	);
}

export default Button;
