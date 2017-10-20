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


window.countNRooksSolutions = function (n) {
  var board = new Board({'n': n});  
  var solutionNumber = 0;
  var innerFunction = function (row) {
    if (row === n) {
      solutionNumber++;  
      return;
    }
    // place piece
    for (var x = 0; x < n; x++) {
      board.togglePiece(row, x);
      
      if (!board.hasAnyRooksConflicts()) {
        innerFunction (row + 1);
      }
      
      board.togglePiece (row, x);
    }
    

  };
  
  innerFunction (0);

  return solutionNumber;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var n = 5;
  var board = new Board({'n': n});  
  var matrix = board.rows();
  var queenCount = 0
  
  var queenRowToggler = function(y, x) {
    console.log(matrix);
    //take the row in the board, then in eachone toggle x if there is notthing there
    matrix[y].forEach (function (xElement, index) {
      if (xElement !== 1) {
        matrix[y][index] = 'x';
      }
    });
  };
  
  var queenColToggler = function(y, x) {
    //take the column in the board, then in eachone toggle x if there is notthing there
    for (var y = 0; y < n; y++) {
      if (matrix[y][x] !== 1) {
        matrix[y][x] = 'x';
      }
    }
  };
  
  var queenMajorDiagToggler = function(y, x) {
    //take the row in the board, then in eachone toggle x if there is notthing there
    for (y, x; y < n, x < n; y++, x++) {
      if (y === 4 || x === 4){
        // debugger;
      }
      console.log(y, x);
      if (matrix[y][x] !== 1) {
        matrix[y][x] = 'x';
      }
    }
  };

  var queenMinorDiagToggler = function(y, x) {
    //take the row in the board, then in eachone toggle x if there is notthing there
    for (y, x; y < n, x === 0; y++, x--) {
      if (matrix[y][x] !== 1) {
        matrix[y][x] = 'x';
      }
    }
  };
  
  var toggler = function(y, x) {
    queenRowToggler(y, x);
    queenColToggler(y, x);
    queenMajorDiagToggler(y, x);
    queenMinorDiagToggler(y, x);      
  };
  
  var addNextPiece = function () {
    for (var y = 0; y < n; y++) {
      for (var x = 0; x < n; x++ ) {
        if (matrix[y][x] !== 'x' || matrix[y][x] !== 1) {
          matrix[y][x] = 1;
          toggler(y, x);
        }
      }
    }
  };
  
  
  if (n === 0 ) {
    return [[]];
  }
  // debugger;
  for (var x = 0; x < 1; x++) {
    var y = 0;
    matrix[0][x] = 1;
    toggler(y, x);

    // add additional piece
    addNextPiece();
    
    // test the board
    
    //remove all x's - change to 0's
    // return a matrix
    if (queenCount === n) {
      var output = matrix;
      }
  }
};



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  
  var board = new Board({'n': n});  
  var solutionNumber = 0;
  var innerFunction = function (row) {
    if (row === n) {
      solutionNumber++;  
      return;
    }
    // place piece
    for (var x = 0; x < n; x++) {
      board.togglePiece(row, x);
      
      if (!board.hasAnyQueensConflicts()) {
        innerFunction (row + 1);
      }
      board.togglePiece (row, x);
    }
  };
  innerFunction (0);
  return solutionNumber;
};
