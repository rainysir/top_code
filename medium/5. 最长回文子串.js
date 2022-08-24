/**
 * 
给你一个字符串 s，找到 s 中最长的回文子串。

示例 1：

输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
示例 2：

输入：s = "cbbd"
输出："bb"
 

提示：

1 <= s.length <= 1000
s 仅由数字和英文字母组成
 */

/**
 * 暴力解法 o(n^3) o(1)
 */
 var validPalindromic = function(s, left, right) {
  while(left < right) {
      if (s[left] !== s[right]) {
          return false
      }
      left++;
      right--;
  }
  return true;
}
var longestPalindrome = function(s) {
  const len = s.length;
  if (len < 2) {
      return s;
  }

  let maxLen = 1, start = 0;

  for(let i = 0; i < len; i++) {
      for (j = i + 1; j < len; j++) {
          if (j - i + 1 > maxLen && validPalindromic(s, i, j)) {
              maxLen = j - i + 1
              start = i
          }
      }
  }

  return s.substring(start, start + maxLen)
};