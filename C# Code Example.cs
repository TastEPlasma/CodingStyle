/*
This file is a solution for a problem from codewars.com
The specific link is: http://www.codewars.com/kata/559536379512a64472000053
Description pulled from page:

Everyone knows passphrases. One can choose passphrases from poems, songs, movies names and so on but frequently they can be guessed due to common cultural references. You can get your passphrases stronger by different means. One is the following:

choose a text in capital letters including or not digits and non alphabetic characters,

    shift each letter by a given number but the transformed letter must be a letter (circular shift),
    replace each digit by its complement to 9,
    keep such as non alphabetic and non digit characters,
    downcase each letter in odd position, upcase each letter in even position (the first character is in position 0),
    reverse the whole result.

Example:

your text: "BORN IN 2015!", shift 1

1 + 2 + 3 -> "CPSO JO 7984!"

4 "CpSo jO 7984!"

5 "!4897 Oj oSpC"

*/

//BEGIN SOLUTION

using System;

public class PlayPass 
{ 
  public static string playPass(string s, int n) 
  {
      char[] arrChar = s.ToCharArray();
    
      for(int i = 0; i < s.Length; i++)
      {
        //shift each letter by a given number but the transformed letter must be a letter (circular shift),
        if(Char.IsLetter(arrChar[i]))
        {
          int unicodeValue = ((int)arrChar[i]);
          
          //uppercase wrap around
          if(Char.IsUpper(arrChar[i]))
          {
            unicodeValue += n;
            if(unicodeValue > 90)
            {
              unicodeValue = (unicodeValue - 90) + 64;
            }
          }
          
          //lowercase wrap around
          if(Char.IsLower(arrChar[i]))
          {
            unicodeValue += n;
            if(unicodeValue > 122)
            {
              unicodeValue = (unicodeValue - 122) + 96;
            }
          }
          
          char newChar = ((char)unicodeValue);
          
          //downcase each letter in odd position, upcase each letter in even position (the first character is in position 0)
          int oddoreven = i%2;
          if(oddoreven == 0)
          {
            arrChar[i] = Char.ToUpper(newChar);
          }
          else
          {
            arrChar[i] = Char.ToLower(newChar);
          }
          
        }
        
        //replace each digit by its complement to 9    
        if(Char.IsNumber(arrChar[i]))
        {
          string currentchar = arrChar[i].ToString();
          
          switch(currentchar)
          {
            case "0": arrChar[i] = Convert.ToChar("9"); break;
            case "1": arrChar[i] = Convert.ToChar("8"); break;
            case "2": arrChar[i] = Convert.ToChar("7"); break;
            case "3": arrChar[i] = Convert.ToChar("6"); break;
            case "4": arrChar[i] = Convert.ToChar("5"); break;
            case "5": arrChar[i] = Convert.ToChar("4"); break;
            case "6": arrChar[i] = Convert.ToChar("3"); break;
            case "7": arrChar[i] = Convert.ToChar("2"); break;
            case "8": arrChar[i] = Convert.ToChar("1"); break;
            case "9": arrChar[i] = Convert.ToChar("0"); break;
            default: System.Console.Write("ERROR IN NUMBER CONVERSION"); break;
          }
        }   
     }
    
    //reverse the whole result.
    Array.Reverse(arrChar);
    
    string result = new string(arrChar);
    return result;
  }
}
