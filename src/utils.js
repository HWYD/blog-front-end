export function convertDate(dateString) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function formatCount(num) {
  if (num >= 1000) {
    // 转换为千单位并保留1位小数
    const converted = (num / 1000).toFixed(1)
    // 去除冗余的 .0 后缀
    return `${converted.replace(/\.0$/, '')}k`
  }
  return num.toString()
}
