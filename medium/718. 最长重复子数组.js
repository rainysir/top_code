/**
 * 抖音
 * 给两个整数数组 nums1 和 nums2 ，返回 两个数组中 公共的 、长度最长的子数组的长度 。

 

示例 1：

输入：nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
输出：3
解释：长度最长的公共子数组是 [3,2,1] 。
示例 2：

输入：nums1 = [0,0,0,0,0], nums2 = [0,0,0,0,0]
输出：5
 

提示：

1 <= nums1.length, nums2.length <= 1000
0 <= nums1[i], nums2[i] <= 100

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/maximum-length-of-repeated-subarray
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 * 暴力解法
 * O(n^3) O(1)
 */
 var findLength = function(nums1, nums2) {
  let len1 = nums1.length, len2 = nums2.length, maxLen = 0;

  for (let i = 0; i < len1; i++) {
      for (let j = 0; j < len2; j++) {
          if (nums1[i] === nums2[j]) {
              let len = 1
              while (i + len < len1 && j + len < len2 && nums1[i + len] === nums2[j + len]) {
                  len++
              }
              maxLen = Math.max(len, maxLen);
          }
      }
  }

  return maxLen;
};