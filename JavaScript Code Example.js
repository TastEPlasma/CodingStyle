/*
This file is a solution to a problem from codewars.com
The direct link is here: http://www.codewars.com/kata/5326ef17b7320ee2e00001df
The description as copied from the linked page:
A poor miner is trapped in a mine and you have to help him to get out !

Only, the mine is all dark so you have to tell him where to go.

In this kata, you will have to implement a method solve(map, miner, exit) that has to return the path the miner must take to reach the exit as an array of moves, such as : ['up', 'down', 'right', 'left']. There are 4 possible moves, up, down, left and right, no diagonal.

map is a 2-dimensional array of boolean values, representing squares. false for walls, true for open squares (where the miner can walk). It will never be larger than 5 x 5. It is laid out as an array of columns. All columns will always be the same size, though not necessarily the same size as rows (in other words, maps can be rectangular). The map will never contain any loop, so there will always be only one possible path. The map may contain dead-ends though.

miner is the position of the miner at the start, as an object made of two zero-based integer properties, x and y. For example {x:0, y:0} would be the top-left corner.

exit is the position of the exit, in the same format as miner.

Note that the miner can't go outside the map, as it is a tunnel.

*/


//BEGIN SOLUTION

function solve(map, miner, exit) {
  var solution = [];
  var arrDeadEnds = [[]];
  
  solution = runTheMaze(map, miner, exit, solution, "NA", arrDeadEnds);
  solution.shift();
  
  return solution;
}

function runTheMaze(map, location, exit, solution, previous, arrDeadEnds)
{
  var arrSolution = solution;
  var lastMove = previous;
  //check current location
  if(checkForExitCondition(location, exit))
  {
    arrSolution.unshift("exit");
    return arrSolution;
  }
  
  var temploc = {};
  temploc["x"] = location.x;
  temploc["y"] = location.y - 1;
  
  if(North(map, location) && lastMove != "down" && CheckForUntraversed(temploc, arrDeadEnds))
  {
    //push valid move to array
    arrSolution.push("up");
    
    //increment integer location
    location.y--;
    
    //look for next move
    arrSolution = runTheMaze(map, location, exit, arrSolution, "up", arrDeadEnds);
    
    //special cases for exits and deadends
    if(arrSolution[0] == "exit")
    {
      return arrSolution;
    }
    else if(arrSolution[0] == "deadend")
    {
      //add current location to list of dead ends 
      arrDeadEnds[arrDeadEnds.length] = ([location.x, location.y]);
      location.y++;
      arrSolution.shift();      
      arrSolution.pop();
    }
  }
  
  temploc.x = location.x + 1;
  temploc.y = location.y;
  if(East(map, location) && lastMove != "left" && CheckForUntraversed(temploc, arrDeadEnds))
  {
    //push valid move to array
    arrSolution.push("right");
    
    //increment integer location
    location.x++;
    
    //look for next move
    arrSolution = runTheMaze(map, location, exit, arrSolution, "right", arrDeadEnds);
    
    //special cases for exits and deadends
    if(arrSolution[0] == "exit")
    {
      return arrSolution;
    }
    else if(arrSolution[0] == "deadend")
    {
      //add current location to list of dead ends
      arrDeadEnds[arrDeadEnds.length] = ([location.x, location.y]);
      location.x--;
      arrSolution.shift();      
      arrSolution.pop();
    }
  }
  
  temploc.x = location.x;
  temploc.y = location.y + 1;
  if(South(map, location) && lastMove != "up" && CheckForUntraversed(temploc, arrDeadEnds))
  {
    //push valid move to array
    arrSolution.push("down");
    
    //increment integer location
    location.y++;
    
    //look for next move
    arrSolution = runTheMaze(map, location, exit, arrSolution, "down", arrDeadEnds);
    
    //special cases for exits and deadends
    if(arrSolution[0] == "exit")
    {
      return arrSolution;
    }
    else if(arrSolution[0] == "deadend")
    {
      //add current location to list of dead ends
      arrDeadEnds[arrDeadEnds.length] = ([location.x, location.y]);
      location.y--;
      arrSolution.shift();      
      arrSolution.pop();
    }
  }
  
  temploc.x = location.x - 1;
  temploc.y = location.y;
  if(West(map, location) && lastMove != "right" && CheckForUntraversed(temploc, arrDeadEnds))
  {
    //push valid move to array
    arrSolution.push("left");
    
    //increment integer location
    location.x--;
    
    //look for next move
    arrSolution = runTheMaze(map, location, exit, arrSolution, "left", arrDeadEnds);
    
    //special cases for exits and deadends
    if(arrSolution[0] == "exit")
    {
      return arrSolution;
    }
    else if(arrSolution[0] == "deadend")
    {
      //add current location to list of dead ends
      arrDeadEnds[arrDeadEnds.length] = ([location.x, location.y]);
      location.x++;
      arrSolution.shift();      
      arrSolution.pop();
    }
  }
  
  arrSolution.unshift("deadend");
  return arrSolution;
}


function CheckForUntraversed(location, arrDeadEnds)
{
  for(var index = 0; index < arrDeadEnds.length; index++)
  {
    if(location.x == arrDeadEnds[index][0] && location.y == arrDeadEnds[index][1])
    {
      return false;
    }
  }
  return true;
}

function North(map, location)
{
  if(location.y - 1 >= 0)
  {
  return (map[location.x][location.y-1]);
  }
}

function South(map, location)
{
  if(location.y + 1 < map[0].length)
  {
    return (map[location.x][location.y+1]);
  }
}

function East(map, location)
{
  if(location.x + 1 < map.length)
  {
    return (map[location.x + 1][location.y]);
  } 
}

function West(map, location)
{
  if(location.x - 1 >= 0)
  {
    return (map[location.x - 1][location.y]);
  }
}

function checkForExitCondition(location, exit)
{
  if(location.x == exit.x && location.y == exit.y)
  {
    return true;
  }
  return false;
}
