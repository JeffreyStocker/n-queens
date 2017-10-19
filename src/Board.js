// This file is a Backbone Model (don't worry about what that means) // It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {      
      var currentRow = this.rows()[rowIndex];
      var numberOnRowThatDefinesAConflict = 2;
      var totalFound = 0;
           
      for (var i = 0; i < currentRow.length; i++) {
        
        if (currentRow[i] > 0) {
          totalFound++;
        }
      }
      return (totalFound >= numberOnRowThatDefinesAConflict) ? true : false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var board = this.rows();
      var result = [];
      
      // loop through the rows with hasRowConflictAt
      for (var i = 0; i < board.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      } 

      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var board = this.rows();
      var numberOnColThatDefinesAConflict = 2;
      var totalFound = 0;
           
      for (var i = 0; i < board.length; i++) {
        
        if (board[i][colIndex] > 0) {
          totalFound++;
        }
      }
      return (totalFound >= numberOnColThatDefinesAConflict) ? true : false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var board = this.rows();
      var result = [];
      var numberOfCol = board[0].length;
      
      // loop through the rows with hasRowConflictAt
      for (var i = 0; i < numberOfCol; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      } 

      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //use helper function at the first row at columnIndex      
      return checkMajorDiagonalAtPosition(0, majorDiagonalColumnIndexAtFirstRow);
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function(foundCount = 0) {
            //note this is in the bottom right direction
      // or southeast direction
      var board = this.rows();
      var output = false;
      // var coordPosition = board[0][0];  //board[y][x]
      // var checkPosition = board[1][1];
      
      //var next check position is board[2][2]
      
      //psudocode //SP!!!!!  /////////////////////
       // for loop throught Y for each row
        // for loop through x for each coloumn 
          //start at posit [0][0]
          //look to major diangol ie [1,1]
            // is the there a conflict directly 
              //true
            //if there is previous value recorded
              //return true
            // else 
              //recoursion into the next spot with check to make it valid
              // else return false/
      ////////////////////////////////////
      
      
      for (var y = 0; y < board.length; y++) {
        for (var x = 0; x < board[0].length; x++) {
          if (this.checkMajorDiagonalAtPosition (y, x) === true) {
            return true;
          }
        }
      }

      return false; // fixme
    },
    
    checkMajorDiagonalAtPosition (columnIndex, rowIndex) {
      //inspect first cell, if value there, then add to found
        //while next position is not undefined
          //inspect next cell,
            // if value there then add to found//
          //set next x, y for next cell ++
          //nextCell = board [y, x];
          
      //compare found 
        // greater than 1, then return true is conflict
        //else return false no conflict
      
      var board = this.rows();
      var found = 0;
      var nextCell = board[columnIndex][rowIndex];
      while (nextCell !== undefined) {
        if (nextCell > 0) {
          found++;
        }
        if (found > 1) {
          return true;
        }
        columnIndex++;
        rowIndex++;
        if (board[columnIndex] === undefined) {
          break;
        }
        nextCell = board[columnIndex][rowIndex];
        
      }
      return false; 
    },


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return checkMinorDiagonalAtPosition(0, minorDiagonalColumnIndexAtFirstRow);
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      /// note this is a refactor of hasAnyMajorDiagonalConflicts
      var board = this.rows();
      var output = false;
      
      for (var y = 0; y < board.length; y++) {
        for (var x = 0; x < board[0].length; x++) {
          if (this.checkMinorDiagonalAtPosition (y, x) === true) {
            return true;
          }
        }
      }

      return false;
    },

    checkMinorDiagonalAtPosition (columnIndex, rowIndex) {
      //inspect first cell, if value there, then add to found
        //while next position is not undefined
          //inspect next cell,
            // if value there then add to found//
          //set next x, y for next cell ++
          //nextCell = board [y, x];
          
      //compare found 
        // greater than 1, then return true is conflict
        //else return false no conflict
      
      var board = this.rows();
      var found = 0;
      var nextCell = board[columnIndex][rowIndex];
      while (nextCell !== undefined) {
        if (nextCell > 0) {
          found++;
        }
        if (found > 1) {
          return true;
        }
        columnIndex++;
        rowIndex--;
        if (board[columnIndex] === undefined) {
          break;
        }
        nextCell = board[columnIndex][rowIndex];
        
      }
      return false; 
    },


    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
