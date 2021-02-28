// minimize or maximize modules
export function setModules(minimized)
{
   const contents = document.getElementsByClassName('content');
   const dividers = document.getElementsByClassName('divider');
   const timestamps = document.getElementsByClassName('timestamp');

   if(minimized) {
      for(var i = 0; i < contents.length; i++)
      {  
         const $this = contents[i];
         $this.style.display = "none";
      }
      for(var j = 0; j < dividers.length; j++)
      {  
         const $this = dividers[j];
         $this.style.display = "none";
      }
      for(var k = 0; k < timestamps.length; k++)
      {  
         const $this = timestamps[k];
         $this.style.display = "none";
      }
   }
   else {
      for(var a = 0; a < contents.length; a++)
      {  
         const $this = contents[a];
         $this.style.display = "block";
      }
      for(var b = 0; b < dividers.length; b++)
      {  
         const $this = dividers[b];
         $this.style.display = "block";
      }
      for(var c = 0; c < timestamps.length; c++)
      {  
         const $this = timestamps[c];
         $this.style.display = "block";
      }
   }
}