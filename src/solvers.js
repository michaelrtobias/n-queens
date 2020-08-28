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
  //debugger;
  var solution = new Board({n: n});

  // number of rooks is n
  var nRooks = n;
  // make nxn board
  var board = new Board({n: n});
  var allRows = board.rows();
  // for i = 0 to i = length of board
  for (var row = 0; row < board.get('n'); row++) {
    for (var col = 0; col < board.get('n'); col++) {
      allRows[row][col] = 1;
      if (board.hasColConflictAt(col) || board.hasRowConflictAt(row)) {
        allRows[row][col] = 0;
      }
    }
  }

  solution = board;

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  // call find N rooks solution for every space
  // if possible (somehow) don't double count solutions
  // n! possibilities
  // use hasAnyRooksConflicts
  var result = n;
  var factorial = function(num) {
    if (num === 1 || num === 0) {
      return 1;
    } else {
      return result = num * factorial(num - 1);
      // if n = 2: 2 * factorial(1) = 2 * 1 = 2
      // if n = 3: 3 * factorial(2) = 3 * 2 = 6
      // if n = 4: 3 * factorial(3) = 4 * 6 = 24
    }
  };
  factorial(n);
  solutionCount = result;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};
// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var board = new Board({n: n});
  var allRows = board.rows();
  var count = 0;
  // var row = 0;
  // var col = 0;

  // function recurse (row) {
  var recurse = function (row) {
    //  for (col)
    if (n === row) {
      return 0;
    }
    for (var i = 0; i < board.rows().length; i++) {
      // debugger;
      //    togglePiece: function(rowIndex, iIndex)
      allRows[row][i] = 1;
      //    if (valid Board) {
      if (!board.hasAnyQueensConflicts()) {
      //    recurse (row + 1)
        count++;
        recurse(row + 1);
      }
    }
    allRows[row][i] = 0;


  };
  var solution = recurse(0);
  var solution = solution || board.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;


  // var board = new board({n: n})
  // // iterate over possible decisions
  // for (var i = 0; i < n; i++) {
  //   // place a piece
  //   board.togglePiece(row, i);
  //   // recurse into remaining problem
  //   if (!board[validator]()) {
  //     var result = findSolution(row + 1, n, board, validator, callback);
  //     if (result) {
  //       return result;
  //     }
  //   }
  //   // unplace a piece
  //   board.togglePiece(row, i);
  // }
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n: n});

  var solutionCount = 0;

  var findSolution = function(row, n, board, validator, callback) {

    if (row === n) {
      return callback();
    }

    // iterate over possible decisions
    for (var i = 0; i < n; i++) {

      board.togglePiece(row, i);

      if (!board[validator]()) {
        var result = findSolution(row + 1, n, board, validator, callback);
        if (result) {
          return result;
        }
      }
      // unplace a piece
      board.togglePiece(row, i);
    }
  };

  findSolution(0, n, board, 'hasAnyQueensConflicts', function() {
    solutionCount++;
  });
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


