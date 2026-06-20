export function checkIP(ip) {
  let safeIps = ["192.168.0.256"];

  // check if IP string on the safe ips list
  //
  if (safeIps.includes(ip)) return true;

  // see if the ip is in a specified range
  //

  // create array of values splitting on "." in IP address
  var splitIp = ip.split(".");

  // convert substrings into integers
  const parts = splitIp.map((n) => {
    return parseInt(n, 10);
  });

  // if IP starts with "142.0"
  if (parts[0] === 142 && parts[1] === 0) {
    // if third value is between 176 and 191
    if (parts[2] >= 176 && parts[2] <= 191) {
      return true;
    }
  }

  // other checks have failed, default return false
  return false;
}
