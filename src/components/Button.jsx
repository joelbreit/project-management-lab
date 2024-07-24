export default function Button({ children, ...props }) {
	const classes =
		"w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";

	return (
		<button
			{...props}
			className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone hover:text-stone-50"
		>
			{children}
		</button>
	);
}
