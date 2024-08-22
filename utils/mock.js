const MockUtil = (function () {
  function generateRandomName() {
    console.log('generateRandomName');
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
  const proxyGenerateRandomName = (function () {
    const names = new Set();

    return function () {
      let name = generateRandomName();

      while (names.has(name)) {
        name = generateRandomName();
      }

      names.add(name);

      return name;
    };
  })();

  function generateLowercaseChars(min = 0, max = 10) {
    const strs = [];
    for (let i = 97; i <= 122; i += 1) {
      strs.push(String.fromCharCode(i));
    }

    let result = '';
    for (
      let i = 0, len = Math.ceil(Math.floor() * (max - min)) + min;
      i < len;
      i += 1
    ) {
      result += Math.floor(Math.random() * strs.length);
    }

    return result;
  }

  // function generate({ type, count, handler }) {
  //   const types = {
  //     name: proxyGenerateRandomName,
  //   };

  //   for (let i = 0; i < count; i++) {
  //     const data = types[type]();
  //     handler(data);
  //   }
  // }

  return {
    generateRandomName: proxyGenerateRandomName,
    generateLowercaseChars,
  };
})();

module.exports = {
  ...MockUtil,
};
