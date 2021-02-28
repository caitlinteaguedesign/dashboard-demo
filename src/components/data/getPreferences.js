// cookies library
import Cookies from 'universal-cookie';

// establish cookie class
const cookies = new Cookies();

export function getPreferences(initial, callback)
{

   // -------------------------
   // themes

   // get the theme from cookie
   var theme = cookies.get('theme');

   // if empty, set to default
   if(!theme) theme = initial.activeTheme;

   // -------------------------
   // module visibility

   // set modules object
   var modules = {};

   // get module ids and visible value from cookie
   const cookieModules = cookies.get('modules');

   // if cookies exist, get the data and apply to module state
   if(cookieModules) 
   {
      // lets check through all of the modules in the state
      for(var i in initial.modules)
      {
         // use the associate key name in the cookie and state objects
         const cookieMod = cookieModules[i];
         const stateMod = initial.modules[i];

         // if the cookie exists, do the thing
         if(cookieMod) {
            modules[stateMod.id] = {
               ...stateMod,
               visible: cookieMod.visibility
            };
         }
         // if no cookie, do state module
         else {
            modules[stateMod.id] = {
               ...stateMod,
               visible: true // show by default
            };
         }
      }
   }
   // else just get the default module state
   else {
      modules = initial.modules;
   }

   // -------------------------
   // module positions

   // set columns object
   var columns = {};

   // get positions from cookies
   const cookieColumns = cookies.get('positions');

   // if cookies exist, do the thing
   if(cookieColumns) {

      // get cookies and default states
      const cookieCols = cookieColumns;
      const stateCols = initial.columns;
      const storedMods = initial.modules;

      // set newColumns object
      let newColumns = {};

      // build out newColumns with empty moduleIDs
      for(var col in stateCols){
         const thisCol = stateCols[col];
         newColumns = {
            ...newColumns,
            [thisCol.id]: {
               ...thisCol,
               moduleIDs: []
            }
         }
      }

      // loop through the modules in the default state
      for(var j in storedMods) 
      {
         // the module we're looking at
         const module = storedMods[j].id;

         // some defaults
         var exists = false;
         var columnID;
         var columnPos;

         // loop through the column object from cookies
         loopColumns: 
         for(var k in cookieCols) 
         {
            // this column's id & moduleID array
            const colID = cookieCols[k].id;
            const modArray = cookieCols[k].moduleIDs;
            
            // reset counter
            columnPos = 0;

            // loop through the moduleIDs array
            for(var l in modArray) {
               // this module in the array
               const $thisMod = modArray[l];

               // if the value in the array matches the current module
               if($thisMod === module) {
                  // set column id, column position given based on the columnPos counter
                  columnID = colID;
                  // cookie exists, will do things after break
                  exists = true;
                  // we're done, es-ca-pe!
                  break loopColumns;
               }
               // increment & check next position
               columnPos++;
            }
         }

         // do cookie if there's a cookie
         if(exists)
         {
            const newCol = newColumns[columnID];
            const addMod = Array.from(newCol.moduleIDs);
            addMod.splice(columnPos, 0, module);

            // update this new object
            newColumns = {
               // copy over everything
               ...newColumns, 
               // the piece we're changing
               [columnID]: {
                  // copy over some properties that aren't changing
                  ...newCol,
                  // update this property
                  moduleIDs: addMod
               }
            }
         }

         // else place new module in a default spot
         else 
         {
            // find module in the state column 
            // (or could just insert on any one column)
            for(var m in stateCols) {
               const storedModuleIDs = stateCols[m].moduleIDs;
               
               for(var n in storedModuleIDs) {
                  const $thisSMod = storedModuleIDs[n];

                  if($thisSMod === module) {
                     columnID = stateCols[m].id;
                     break;
                  }
               }
            }

            const newCol = newColumns[columnID];
            const addMod = Array.from(newCol.moduleIDs);
            addMod.push(module);

            newColumns = {
               ...newColumns,
               [columnID]: {
                  ...newCol,
                  moduleIDs: addMod
               }
            }
         }
      }

      // set newColumns to columns (the name of the object we're replacing in the default state)
      columns = newColumns;
   }

   // no cookies, just use the default state
   else {
      columns = initial.columns;
   }

   // set up new settings
   const preferences = {
      ...initial,
      activeTheme: theme,
      modules,
      columns
   }

   return preferences;
}