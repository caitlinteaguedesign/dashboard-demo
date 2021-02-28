export function getDayLabel()
{
	const d = new Date();
	const n = d.getDay();

	if(n>5) return "weekend";
	else return "today";
}