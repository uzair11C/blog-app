export default function CapitalizeFirstLetter(string) {
	return (
		(string && string[0].toUpperCase() + string.slice(1).toLowerCase()) || ""
	);
}
