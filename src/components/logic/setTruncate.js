// set the truncate width parameter
export function setTruncate() {
   // get array of all elements with class "truncate"
   var truncates = document.getElementsByClassName('truncate');

   // loop through array and modify max-with
   for(var j = 0; j < truncates.length; j++)
   {  
      var $this =  truncates[j];
      // get parent width
      var parWidth = $this.parentElement.offsetWidth;
      // apply max width
      $this.style.maxWidth = parWidth+"px";
   }
}