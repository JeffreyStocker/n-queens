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

window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  
  

  return solutionCount;
};


// window.countNRooksSolutions = function(n) {
//   // Make a board
//   var board = new Board({'n': 3});
//   var boardMap = board.rows();
//   // Make an array to store every solution board
//   var possibleSolutions = [];

//     // board.togglePiece(0, 0);
//     // board.togglePiece(0, 0);
//     console.log ('piece', board.rows());

//   // Drop piece onto the board
//   for (var y = 0; y < boardMap.length; y++) {
//     for (var x = 0; x < boardMap[0].length; x++) {
//       // Drop first piece onto the board in outer loop
//       console.log('My first piece :', y, x);
//       console.log('before place first piece', board);

//       console.log('after place first piece', board);
//       // Drop second piece onto board in inner loop
//       for (var i = 0; i < boardMap.length; i++) {
//         for (var j = 0; j < boardMap[0].length; j++) {
//           board.togglePiece(i, j);
//           possibleSolutions.push(board);
//           console.log('After push', board);
//           board.togglePiece(i, j); // reverse dropping the 2nd piece
//         }
//       }
//       board.togglePiece(y, x); // remove the first piece
//     }
//   }
  
// // console.log('Solution total:', possibleSolutions.length);
// // debugger;
//   var totalSolutions = possibleSolutions.reduce(function(accumulator, solution) {
//       console.log(!solution.hasAnyRooksConflicts());
//     if (!solution.hasAnyRooksConflicts()) {
//       accumulator = accumulator + 1;
//       return accumulator;
//     }
//   }, 0);
  
//   console.log('DONE!!!');
//   return totalSolutions;
// };




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
  var board = new Board({'n': 5});  
  console.log ('Board size: ', n);
  
  var boardMap = board.rows();
  var evaluatedSolutions = [];

  console.log ('This', board.rows())
    debugger;
  //build board
  //then set first piece
    // recursive into the next iterations, where it finds the next valid peice
    // recursion into the board to find the next piece
    // pushed output into an output array
  // then go to next piece 
    //repete the recursion
  //still going to have problems when we get past a certain point in the board
  // maybe have a check for previes spot and if it finds a valid point at a previous point cancel the recusion as it would have found that already.
  
  
  var innerFunction = function (board, counter = 0) {
    counter++;
    console.log('Loop #', counter);
    var output = [];
    var boardMap = board.rows();

    // Begin placing pieces on the grid
    for (var y = 0; y < boardMap.length; y++) {
      for (var x = 0; x < boardMap[0].length; x++) {
        // console.log('"My Y & X: ', y, x);
        var currentPositionValue = boardMap[y][x];
        if (currentPositionValue !== 0) {
          continue;
        }
        // console.log('I am in the loop');
        console.log('I am placing the second piece at :', y, x );
        // board.togglePiece(y, x);
        // board.togglePiece(1,1);
        console.log(board.rows());
        
        // console.log(board.rows());
        //if hasAnyRooksConflicts is true
        console.log(board.hasAnyRooksConflicts());
        
        console.log(board.rows());
        // DONE PLACING PIECES
        // Check if the grid has Rook Conflicts:        
        if (board.hasAnyRooksConflicts()) {
          // board.togglePiece(y, x);   //untoggles the piece        
          continue;
        } else if (!board.hasAnyRooksConflicts()) {
        // } else if (y === boardMap.length - 1 && x === boardMap[0].length - 1) {
          output.push(board);        
        } else {
          var temp = innerFunction(board, counter);
          console.log('Board before push ', temp);
          output.push(board);
          // output.push(innerFunction(board));
          ////NOTE DON"T FORGET TO DO SOMETHINBG WITH OUTPUT
        }
      }
    }
        
    // output.push(board);
    output = _.flatten(output);  
    return output;
  };  
  
  for (var y = 0; y < boardMap.length; y++) {
    for (var x = 1; x < boardMap[0].length; x++) {
      console.log('I am in the main body');
      console.log('I am placing the first piece');
      board.togglePiece(y, x);
      
      /// check for previous possible solution spots here
      var tempSolution = innerFunction(board);

      tempSolution.forEach (function (individualBoard) {
        console.log ('Board At test Time: ', board);
        if (!individualBoard.hasAnyRooksConflicts()) {
          
          evaluatedSolutions.push(individualBoard);
        } 
      });
      
      // board.togglePiece(y, x);
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
