export function getAverage(values, callback) 
{
	// length of the data
	const length = values.length-1;

	// some maths
	var sum = 0;
	var avg = 0;

	// for each entry
	for(var i = 0; i <= length; i++)
	{
		// update running total
		sum = sum + values[i];

		// once we've reached the end
		if(i === length) 
		{
			// calculate average ping time
			avg = sum/length;
		}
	};

 	callback(avg);
}