function loadStyle(url) {
  let link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = url;
  let head = document.getElementsByTagName('head')[0];
  head.appendChild(link);
}

function loadScript(url) {
  let script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);
}

function render(vnode, root) {
  const el = document.createElement(vnode.type);

  function processTextChilren(vnode) {
    if (vnode.needParse) {
      el.innerHTML = vnode.children;
    } else {
      const text = document.createTextNode(vnode.children);
      el.appendChild(text);
    }
  }

  const strategies = {
    class: function () {
      el.className = vnode.props.class;
    },
    style: function () {
      for (const key in vnode.props.style) {
        el.style[key] = vnode.props.style[key];
      }
    },
    attribute: function (key, value) {
      el.setAttribute(key, value);
    },
  };

  if (vnode.props) {
    for (const key in vnode.props) {
      const strategy = strategies[key] || strategies.attribute;
      strategy(key, vnode.props[key]);
    }
  }

  if (typeof vnode.children === 'string') {
    processTextChilren(vnode);
  } else if (vnode.children) {
    // 数组，递归调用 Render，使用 el 作为 root 参数
    vnode.children.forEach((child) => render(child, el));
  }

  // 将元素添加到 root
  root.appendChild(el);

  return el;
}

const fetchData = async (url, options = {}) => {
  try {
    // 设置默认配置
    const defaultOptions = {
      method: 'GET', // 默认使用 GET 请求
      headers: {
        'Content-Type': 'application/json', // 默认 JSON 格式
      },
      ...options, // 允许覆盖默认配置
    };

    // 发起请求
    const response = await fetch(url, defaultOptions);

    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // 返回 JSON 格式的数据
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err.message);
    throw err; // 继续向上抛出错误，方便调用者处理
  }
};
