export function checkIP(IP) 
{
	let safeIPs = [
		"192.168.0.256"
	];

	// check if IP string on the safe ips list
	for(var j in safeIPs)
	{
		const $this = safeIPs[j];

		if($this === IP)
		{
			return true;
		}
	}

	// check if IP exists (prevents errors), 
	// then see if in a specified range
	if(IP) 
	{
		// create array of values splitting on "." in IP address
		var parts = IP.split('.');

		// convert values from strings to integers
		for(var i = 0; i < parts.length; i++)
		{
			parts[i] = parseInt(parts[i], 10);
		}

		// if IP starts with "142.0"
		if(parts[0] === 142 && parts[1] === 0)
		{
			// if third value is between 176 and 191
			if(parts[2] >= 176 && parts[2] <= 191)
			{
				return true;
			}
		}
	}

	// other checks have failed, return false
	return false;
}