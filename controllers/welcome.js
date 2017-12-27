define(function() {
   'use strict';


  	/**
  	* WELCOME
  	*	A simple example controller for PL.js
  	*/
	return {

        index: function(){
            //PLjs.load.view( [CONTAINER], [VIEW FILE], [VARIABLES] );
            var varsData = {
                title: "PL.js"
            }
            PLjs.load.view('view-container', 'welcome_message', varsData);
        }

    }

});