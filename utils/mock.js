const MockUtil = (function () {
  function generateLowercaseChars(min = 0, max = 10) {
    const strs = [];
    for (let i = 97; i <= 122; i += 1) {
      strs.push(String.fromCharCode(i));
    }

    let result = '';
    for (
      let i = 0, len = Math.ceil(Math.random() * (max - min)) + min;
      i < len;
      i += 1
    ) {
      result += strs[Math.floor(Math.random() * strs.length)];
    }

    return result;
  }

  function getFullName() {
    const firstNames = [
      '赵',
      '钱',
      '孙',
      '李',
      '周',
      '吴',
      '郑',
      '王',
      '冯',
      '陈',
      '褚',
      '卫',
      '蒋',
      '沈',
      '韩',
      '杨',
      '朱',
      '秦',
      '尤',
      '许',
      '何',
      '吕',
      '施',
      '张',
      '孔',
      '曹',
      '严',
      '华',
      '金',
      '魏',
    ];
    const lastNames = [
      '伟',
      '娜',
      '强',
      '洋',
      '静',
      '磊',
      '丽',
      '杰',
      '梅',
      '敏',
    ];

    // 随机选择一个姓和一个名
    const randomFirstName =
      firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName =
      lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomFullName = `${randomFirstName}${randomLastName}`;

    // 生成完整的人名
    return randomFullName;
  }

  function getEmail() {
    const charts = generateLowercaseChars(6, 10);

    return `${charts}@163.com`;
  }

  const proxyGenerateUnique = function (fn) {
    const set = new Set();

    return function () {
      let result;

      do {
        result = fn();
      } while (set.has(result));

      set.add(result);

      return result;
    };
  };

  // function generate({ type, count, handler }) {
  //   const types = {
  //     name: proxygetFullName,
  //   };

  //   for (let i = 0; i < count; i++) {
  //     const data = types[type]();
  //     handler(data);
  //   }
  // }

  return {
    getFullName: proxyGenerateUnique(getFullName),
    getEmail: proxyGenerateUnique(getEmail),
  };
})();

module.exports = {
  ...MockUtil,
};
