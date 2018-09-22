module.exports = function solveSudoku(matrix) {

  // Recursive function which calculate result
  var solver = function(sol){
    var possibleValues = [];
    var resultMatrix;
    for(var rowInx = 0; rowInx < 9; rowInx++){
      for(var colInx = 0; colInx < 9; colInx++){
        // Check if current element is 0
        if(sol[rowInx][colInx] === 0) {
        // Get all possible values for current element
        possibleValues = getPossibleValues(rowInx, colInx, sol);
        for (var i = 0; i < possibleValues.length; i++) {
          // Set current element value
          sol[rowInx][colInx] = possibleValues[i];
          // Recursive call solver function with new sol matrix
          resultMatrix = solver(sol);
          // If Sudoku solved - return solved sudoku matrix
          if(resultMatrix){
            return resultMatrix
          }
        }
        // Reset the value back to 0 
        sol[rowInx][colInx] = 0;
        return false;
        }
      } 
    }
    return sol;
  }

  // Get all possible values for current element
  var getPossibleValues = function(rowInx, colInx, puzzle){
    var possibleValues = Array.apply(null, {length: 10}).map(Number.call, Number);
    possibleValues.shift();
    var rowValues = getRowPossibleValues(rowInx, puzzle);
    var colValues = getColPossibleValues(colInx, puzzle);
    var blockValues = getBlockPossibleValues(rowInx, colInx, puzzle);
    return possibleValues.filter(function(item){
      if(rowValues.indexOf(item) >= 0 || colValues.indexOf(item) >= 0 || blockValues.indexOf(item) >= 0) {
        return false;
      } else {
        return true;
      }
    }); 
  }

  // Get all row possible values for current elemen
  var getRowPossibleValues = function(rowInx, puzzle){
    return puzzle[rowInx];
  }

  // Get all col possible values for current elemen
  var getColPossibleValues = function(colInx, puzzle){
    return puzzle.map(function(item){
      return item[colInx];
    });
  }

  // Get all block possible values for current elemen  
  var getBlockPossibleValues = function(rowInx, colInx, puzzle) {
    var rowStart = Math.floor(rowInx / 3) *3;  			
    var colStart = Math.floor(colInx / 3) *3;
    var res = [];
    for(var i = rowStart; i < rowStart + 3; i++){
      for(var j = colStart; j < colStart + 3; j++)
        res.push(puzzle[i][j]);
    }
    return res;
  }

  
  return solver(matrix);
}
