const garbage = document.getElementById("garbage");
const rep = document.querySelectorAll(".copyMe"); //Used for replicating the elements, making copies using javaScript//
//console.log(rep); //This means that we put all the elements in a node list//
let holder = {} //Creates a global object.
rep.forEach(function(ele, ind) { //Select all elements and loop through them.  This function gets the element, the index value of each element//
	//console.log(ele);
	//console.log(ind);
	ele.addEventListener("click",function(e){ //This makes all the selected elements clickable//
		console.log(ind);
		holder.obj = ele.cloneNode(true);  //Here we use that global object as we clone aditional elements so I create an object called obj within the holder object equal to the element that we select as we iterate through it.
		//The cloneNode method duplicates a node when the method is called.
		//This method duplicates a node from one list to another list.
		//console.log(holder.obj); //This shows that we actually cloned the object.

		//The next part updates some of the properties
		holder.obj.style.cursor = "move"; //This updates the cursor.
		holder.obj.classList.add("newb"); //This adds a new class.
		holder.obj.style.backgroundColor = 'transparent'; //This calls a function called random color.
		holder.obj.style.left = ele.offsetLeft + "px"; //This updates the position of this particular element.  offsetLeft represents the same position of the parent element.
		holder.obj.style.top = ele.offsetTop + 200 + "px"; //Updates the top position as well.

		//The next part adds the ability of having movement.

		holder.obj.startX = ele.offsetLeft + 500; //These are going to be numeric values, we don't need to parse them as integers.
		holder.obj.startY = ele.offsetTop + 300;

		holder.obj.moves = Math.floor(Math.random()*25); //Math.floor Rounds a number downward to its nearest integer. Math.random, 
		//randomizes the amout of movements to 25

		holder.obj.int = setInterval(mover,25); //Calls the mover function and the function is going to run every 25 ms.
		//setInterval method is called timing event.  This method repeats the execution of a function constantly.

		function mover() {
			if(holder.obj.moves <= 0) { //Implementation of function mover.  
				clearInterval(holder.obj.int);
			}else{
				holder.obj.moves--; //Decreases the value of the move of the object.
				holder.obj.startY += 10; //Updates the startY position by 10.
				holder.obj.startX += 1;

				//The next two lines of code style the position
				holder.obj.style.top = holder.obj.startY + "px";
				holder.obj.style.left = holder.obj.startX + "px";
			}
		}

		document.body.appendChild(holder.obj); //This is going to append the child (holder.obj) to the document body.
		console.log(holder.obj);

		drager(holder.obj); //Using this function is goint to create draggable elements.
	})
	ele.style.left = (ind+0.7)*50 + "px"; //This allows to position the boxes in the screen with a separation that depends of the index//
	ele.style.top = 28 + "px";
})

function ranColor(){
	function c(){
		let hex = Math.floor(Math.random()*256).toString(16);
		//The next line of code avoids the generation of invalid colors (transparent)
		hex = ("0" + String(hex)).substr(-2); //String(hex) makes sure that hex is a string.  It returns a specific number of characters
		//and we choose to iterate from the end of the location.  Now hex is going always being at least 2 characters long.
		return hex;
	}
	return "#" + c() + c() + c(); //Retorna un valor hexadecimal.
}

function drager(el) {
let pos = {} //Default position.
el.onmousedown = dragMouse; //The onmousedown event occurs when a user presses a mouse button over an element.

 
function dragMouse(e){
	pos.nx = e.clientX; //The clientX read-only property of the MouseEvent interface provides the horizontal coordinate within 
	//the application's client area at which the event occurred (as opposed to the coordinate within the page).
	//For example, clicking on the left edge of the client area will always result in a mouse event with a clientX value of 0,
	//regardless of whether the page is scrolled horizontally.    //Setting the position of the new x value.
	pos.ny = e.clientY;    //Setting the position of the new y value.
	console.log(pos.nx, pos.ny);

	//The next function is going to check if a collision is there

	//The next part activates the function only when the mouse is down.
	document.onmouseup = function(){
		document.onmouseup = null; //Nothing happens for these event listeners.
		document.onmousemove = null;
	}

	//The next function moves the element alongside the movement of the mouse
	document.onmousemove = function(e) {
		pos.ox = pos.nx - e.clientX;   //Setting the old position of x.
		pos.oy = pos.ny - e.clientY;   //Setting the old position of y.
		pos.nx = e.clientX;
		pos.ny = e.clientY;

		if(isCollide(el)){
			el.onmousedown = null; //This doesn't happen anymore
			el.parentElement.removeChild(el); //Goes to the parent element and removes the child element with the properties of el.
		}


		//The next lines update the element using style
		el.style.top = (el.offsetTop - pos.oy) + "px";
		el.style.left = (el.offsetLeft - pos.ox) + "px";
	}
}
}

function isCollide(a){
	let aRect = a.getBoundingClientRect();
	let bRect = garbage.getBoundingClientRect();
	console.log(aRect); //Prints out the boundaries)
	return !(
	(aRect.bottom < bRect.top)||
	(aRect.top > bRect.bottom)||
	(aRect.right < bRect.left)||
	(aRect.left > bRect.right)
	)
}
