/**
描述
给定一个只包含三种类型字符的字符串：'（'，'）'和 '*'， 编写一个函数来检查该字符串是否有效。 我们通过以下规则定义字符串的有效性：

1.任何左括号 '('必须有一个相应的右括号')'。
2.任何右括号 ')' 必须有一个相应的左括号'('。
3.左括号'(' 必须在相应的右括号 ')' 之前。
4.*可以被视为单个右括号'）'或单个左括号'（'或空字符串。
5.空字符串也有效。

样例
样例 1:
	输入:  "()"
	输出:  true

	
样例 2:
	输入: "(*)"
	输出:  true
	
	解释:
	'*' 看作是空串.
	
样例 3:
	输入: "(*))"
	输出: true
	
	解释:
	'*' 当作'('
 */
// 栈
function checkValidString(s) {
  const left = []
  const asterisk = []

  for (let i = 0; i < s.length; i++) {
		const cur = s[i]
		if (cur === '(') {
			left.push(i)
		} else if (cur === '*') {
			asterisk.push(i)
		} else {
			if (left.length) {
				left.pop()
			} else if (asterisk.length) {
				asterisk.pop()
			} else {
				return false
			}
		}
	}

	return !left.length || left.length <= asterisk.length
}

console.log(checkValidString('(******))))())'))