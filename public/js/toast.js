/* 轻提示 */
function createToastLayer() {
  const vnode = {
    type: 'div',
    props: {
      style: {
        display: 'none',
      },
      class: 'g-toast',
    },
    children: [
      {
        type: 'div',
        props: {
          class: 'toast',
        },
      },
    ],
  };

  return render(vnode, document.body);
}

function showToast(message = '操作成功', duration = 2000) {
  const toastLayer = document.querySelector('.g-toast');
  toastLayer.style.display = 'block';

  const toastEl = document.querySelector('.toast');
  toastEl.textContent = message;
  toastEl.offsetWidth; // 强制更新页面
  toastEl.classList.add('show');

  setTimeout(() => {
    toastEl.classList.remove('show');
  }, duration);
}

createToastLayer();
