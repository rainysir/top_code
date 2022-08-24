/**
 * 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
示例 1：
1 2 3
4 5 6
7 8 9


输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5]
示例 2：
1  2  3  4
5  6  7  8
9  10 11 12

输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
输出：[1,2,3,4,8,12,11,10,9,5,6,7]

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/spiral-matrix
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
 var spiralOrder = function(matrix) {
  if (!matrix.length || !matrix[0].length) {
      return []
  }
  const result = []
  let left = 0, right = matrix[0].length - 1, top = 0, bottom = matrix.length - 1;
  while (left <= right && top <= bottom) {
      for (let i = left; i <= right; i++) {
          result.push(matrix[left][i])
      }
      for (let i = top + 1; i <= bottom; i++) {
          result.push(matrix[i][right])
      }
      if (left < right && top < bottom) {
        for (let i = right - 1; i > left; i--) {
          result.push(matrix[bottom][i])
        }
        for (let i = bottom; i > top; i--) {
            result.push(matrix[i][left])
        }
      }
      [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1]
  }

  return result;
};

spiralOrder([[1,2,3],[4,5,6],[7,8,9]])
// spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]])