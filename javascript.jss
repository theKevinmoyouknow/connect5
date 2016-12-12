/*
 * A complete connect 5 widget.  Just include this script in a
 * browser page and enjoy.  A connect 5 game will be included
 * as a child element of the element with id "connect5".  If the
 * page has no such element, it will just be added at the end of
 * the body.
 */
(function () {

    var squares = [], //stores all pieces on the board
    		Xwin = [], //stores X win conditions in 2d array size of board
        Owin = [], //stores Y win conditions in 2d arraysize of board
        col, //stores latest piece col location
        row, //stores latest piece row location
        boardSize = 15, //how many cells on each side of your square board?
        winCount, //counter for consecutive pieces of same type
        EMPTY = "\xA0",//nonbreaking space
        moves,
        turn = "X",
        oldOnload,


    startNewGame = function () {
        var i;
        
        turn = "X";
        moves = 0;
        for (i = 0; i < squares.length; i += 1) {
            squares[i].firstChild.nodeValue = EMPTY; //clear td cells
        }
        
        for (var i=0; i<boardSize; i++) {
            Xwin[i] = [];
            for (var j=0; j<boardSize; j++) {
                Xwin[i][j] = 0;
            } 
        }
        for (var i=0; i<boardSize; i++) {
            Owin[i] = [];
            for (var j=0; j<boardSize; j++) {
                Owin[i][j] = 0;
            } 
        }
        
        
    },


     
    RULES = function() { //button for testing and debugging, will hold rules
      alert("Connect five X/O's in a horizontal, vertical, or diagnoal line! For questions email me at ripits@gmail.com :D");
			
    },
    
    win = function () { //assesses whether or not a player has won after the last move

        var x = col;
        var y = row;
        var b = 0;
        winCount = 0;
        if(turn=="X"){
					Xwin[col][row] = 1;
          for(x=col-4;x<col+5;x++){ //CHECKING HORIZONTAL ROW WIN CONDITION
						if(x<0){ //if out of bounds left
            	x=0;
            }
            if(x>=boardSize){ //if out of bounds right
            	break;
            }
            if(Xwin[x][row] == 1){
            	winCount=winCount+1;
              if(winCount==5){
            		return true;
            	}
            }
						if(Xwin[x][row] == 0) {
            	winCount=0;
            }
          }
          
          winCount=0; //reset win counter
          
          for(y=row-4;y<row+5;y++){ //CHECKING VERTICAL ROW WIN CONDITION
						if(y<0){ //if out of bounds left
            	y=0;
            }
            if(y>=boardSize){ //if out of bounds right
            	break;
            }
            if(Xwin[col][y] == 1){
            		winCount=winCount+1;
              if(winCount==5){
            		return true;
            	}
            }
						if(Xwin[col][y] == 0) {
              winCount=0;
            }
          }

          winCount=0; 
					for(y=row-4,x=col-4;y<row+5,x<col+5;y++,x++){ //CHECKING y=x line WIN CONDITION
						if(y<0 | x<0){ //if out of bounds left or right
            	if(y<0){
              	x=x-y;
                y=0;
              }
              if(x<0){
                y=x-y;
                x=0;
              }
            }
            if(y>=boardSize | x>=boardSize){ //if out of bounds right
            	break;
            }
            if(Xwin[x][y] == 1){
            	winCount=winCount+1;
              if(winCount==5){
            		return true;
            	}
            }
						if(Xwin[x][y] == 0) {
            	winCount=0;
            }
          }
                   
          winCount=0; 
					for(y=row-4,x=col+4;y<row+5,x<col+5;y++,x--){ //CHECKING y=-x line WIN CONDITION
						if(y<0 | x>=boardSize){ //if out of bounds top right
            	if(y<0){
              	x=x+y;
                y=0;
              }
              if(x>=boardSize){
                y=(x-(boardSize-1))+y;
                x=0;
              }
            }
            if(y>=boardSize | x<0){ //if out of bounds bottom left
            	break;
            }
            if(Xwin[x][y] == 1){
            	winCount=winCount+1;
              if(winCount==5){
            		return true;
            	}
            }
						if(Xwin[x][y] == 0) {
            	winCount=0;
            }
          }
          
        }
        
        if(turn=="O"){
					Owin[col][row] = 1;
          for(x=col-4;x<col+5;x++){ //CHECKING HORIZONTAL ROW WIN CONDITION
						if(x<0){ //if out of bounds left
            	x=0;
            }
            if(x>=boardSize){ //if out of bounds right
            	break;
            }
            if(Owin[x][row] == 1){
            	winCount=winCount+1;
              if(winCount==5){
            		return true;
            	}
            }
						if(Owin[x][row] == 0) {
            	winCount=0;
            }
          }
          
          winCount=0; //reset win counter
          
          for(y=row-4;y<row+5;y++){ //CHECKING VERTICAL ROW WIN CONDITION
						if(y<0){ //if out of bounds left
            	y=0;
            }
            if(y>=boardSize){ //if out of bounds right
            	break;
            }
            if(Owin[col][y] == 1){
            		winCount=winCount+1;
              if(winCount==5){
            		return true;
            	}
            }
						if(Owin[col][y] == 0) {
              winCount=0;
            }
          }

          winCount=0; 
					for(y=row-4,x=col-4;y<row+5,x<col+5;y++,x++){ //CHECKING y=x line WIN CONDITION
						if(y<0 | x<0){ //if out of bounds left or right
            	if(y<0){
              	x=x-y;
                y=0;
              }
              if(x<0){
                y=x-y;
                x=0;
              }
            }
            if(y>=boardSize | x>=boardSize){ //if out of bounds right
            	break;
            }
            if(Owin[x][y] == 1){
            	winCount=winCount+1;
              if(winCount==5){
            		return true;
            	}
            }
						if(Owin[x][y] == 0) {
            	winCount=0;
            }
          }
                   
          winCount=0; 
					for(y=row-4,x=col+4;y<row+5,x<col+5;y++,x--){ //CHECKING y=-x line WIN CONDITION
						if(y<0 | x>=boardSize){ //if out of bounds top right
            	if(y<0){
              	x=x+y;
                y=0;
              }
              if(x>=boardSize){
                y=(x-(boardSize-1))+y;
                x=0;
              }
            }
            if(y>=boardSize | x<0){ //if out of bounds bottom left
            	break;
            }
            if(Owin[x][y] == 1){
            	winCount=winCount+1;
              if(winCount==5){
            		return true;
            	}
            }
						if(Owin[x][y] == 0) {
            	winCount=0;
            }
          }
        }

        //need to check Y's win conditions
        
        return false;
    },

    /*
     * Sets the clicked-on square to the current player's mark,
     * then checks for a win or cats game.  Also changes the
     * current player.
     */
    set = function () {
        if (this.firstChild.nodeValue !== EMPTY) {
            return;
        }
        this.firstChild.nodeValue = turn;
        moves += 1; //set occurs for every click event

        col = this.cellIndex;
        row = this.parentNode.rowIndex;
        
        if (win()) {
            alert(turn + " wins!");
            startNewGame();
        } else if (moves === 100) {
            alert("Cat\u2019s game!");
            startNewGame();
        } else if(turn=="X"){
             Xwin[col][row] = 1;//track X win conditions in column,row format
             turn = "O"
        		 
        } else if(turn=="O"){
             Owin[col][row] = 1; //track Y win conditions in column,row format
             turn = "X";
        }
    },

    /*
     * Creates and attaches the DOM elements for the board as an
     * HTML table, assigns the indicators for each cell, and starts
     * a new game.
     */
    play = function () {
        var board = document.createElement("table"),
            i, j,
            row, cell,
            parent;
        board.border = 1;
        for (i = 0; i < boardSize; i += 1) {
            row = document.createElement("tr");
            board.appendChild(row);
            for (j = 0; j < boardSize; j += 1) {
                cell = document.createElement("td");
                cell.width = cell.height = 50;
                cell.align = cell.valign = 'center';
                cell.onclick = set;
                cell.appendChild(document.createTextNode(""));
                row.appendChild(cell);
                squares.push(cell);
            }
        }


        // Attach under tictactoe if present, otherwise to body.
        parent = document.getElementById("connect5") || document.body;
        parent.appendChild(board);
        
        var x = document.createElement("BUTTON"); 
        var t = document.createTextNode("CLEAR BOARD FOR NEW GAME");
        x.appendChild(t);
        document.body.appendChild(x);
        x.onclick = startNewGame;
        
        var x = document.createElement("BUTTON"); 
        var t = document.createTextNode("CONNECT 5 RULES");
        x.appendChild(t);
        document.body.appendChild(x);
        x.onclick = RULES;
        
        startNewGame();
        
        
    };

    /*
     * Add the play function to the (virtual) list of onload events.
     */
    if (typeof window.onload === "function") {
        oldOnLoad = window.onload;
        window.onload = function () {
            oldOnLoad(); 
            play();
        };
    } else {
        window.onload = play;
    }
}());

