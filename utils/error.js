const fs = require('fs');
const path = require('path');

exports.processError = function (err = new Error()) {
  function formatDateTime(date) {
    // 创建日期对象
    const d = new Date(date);

    // 获取年份、月份、日期、小时、分钟和秒
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    // 格式化为 YYYY-MM-DD HH:mm:ss
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const date = new Date();
  const str = `${formatDateTime(date)} ${err.message}\n`;

  fs.appendFileSync(
    path.resolve(__dirname, '../logs/error-log.text'),
    str,
    'utf-8'
  );
};
