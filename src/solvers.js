/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({'n': n});

  for (var i = 0; i < n; i++ ) {
    board.togglePiece(i, i);
  }
  
  var solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutionsStoreForNow = function(n) {
  var board = new Board({'n': n});
  var boardMap = board.rows();
  //helper function provides solution for position provided
    // recieve back solution array for that position
  
  //we will be iterating through all spots in the matrix
  
  for (var y = 0; y < boardMap.length; y++) {
    for (var x = 0; x < boardMap[0].length; x++) {
      board.togglePiece(y, x);
      var potentialSolution = findRookSolutionAtPosition(x, y, board);
      //is a solution then recursing into the iteration of boards
        //push iteration return to output
      //else not a solution then remove piece to next spot
      //
    }
  }
  //if at end of the board then return current board as a solution
  
  var solutionCount = undefined; //fixme
  //return the number of unique solutions
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.countNRooksSolutions = function (n) {
  var board = new Board({'n': n});  
  console.log (n);
  
  var boardMap = board.rows();
  var evaluatedSolutions = [];
  //build board
  //then set first piece
    // recursive into the next iterations, where it finds the next valid peice
    // recursion into the board to find the next piece
    // pushed output into an output array
  // then go to next piece 
    //repete the recursion
  //still going to have problems when we get past a certain point in the board
  // maybe have a check for previes spot and if it finds a valid point at a previous point cancel the recusion as it would have found that already.
  
  
  var innerfunction = function (board) {
    var output = [];
    var boardMap = board.rows();
    console.log (boardMap);
    //also need to calculate the next spot in the grid
    for (var y = 0; y < boardMap.length; y++) {
      for (var x = 0; x < boardMap[0].length; x++) {
        
        var currentPositionValue = boardMap[y][x];
        if (currentPositionValue !== 0) {
          continue;
        }
        board.togglePiece(y, x);
        console.log(board.rows());
        //if hasAnyRooksConflicts is true
        if (board.hasAnyRooksConflicts()) {
          board.togglePiece(y, x);          
          continue;
        } else {
          output.concat(innerfunction(board));
          ////NOTE DON"T FORGET TO DO SOMETHINBG WITH OUTPUT
        }
      }
    }  
    output.push(board);
    return output;
  };
  
  
  for (var y = 0; y < boardMap.length; y++) {
    for (var x = 0; x < boardMap[0].length; x++) {
      board.togglePiece(y, x);
      
      /// check for previous possible solution spots here
      //if valid 
      console.log ('board', board);
      var tempSolution = innerfunction(board);
      tempSolution.forEach (function (individualBoard) {
        if (!individualBoard.hasAnyRooksConflicts()) {
          evaluatedSolutions.concat(individualBoard);
        } 
      });
      
      board.togglePiece(x, y);
    }
  }
  console.log ('total Solution: ', evaluatedSolutions.length);
  return evaluatedSolutions.length;
};

window.findRookSolutionAtPosition = function (y, x, currentBoard) {
  
  
  // magicly return the solutions  
  return solutionMatrix;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
