/* 模态框 */
function createModalLayer() {
  const vnode = {
    type: 'div',
    props: {
      style: {
        display: 'none',
      },
    },
    children: [
      {
        type: 'div',
        props: {
          class: 'g-mask',
        },
      },
      {
        type: 'div',
        props: {
          class: 'g-modal',
        },
        children: [
          {
            type: 'div',
            props: {
              class: 'modal-content',
            },
            children: [
              {
                type: 'div',
                props: {
                  class: 'close',
                  'data-handler': 'closeModal',
                },
                needParse: true,
                children: '&times;',
              },
              {
                type: 'h2',
                props: {
                  class: 'modal-title',
                },
              },
              {
                type: 'p',
                props: {
                  class: 'modal-description',
                },
              },
            ],
          },
        ],
      },
    ],
  };

  const rootEl = render(vnode, document.body);

  rootEl.offsetWidth;
  const closeEl = document.querySelector('.close');
  closeEl.addEventListener('click', closeModal);

  return rootEl;
}

function showModal(
  title = '操作失败',
  description = '请稍后重试，或联系客户支持以获取帮助。'
) {
  modalLayer.style.display = 'block';

  const modalTitleEl = document.querySelector('.modal-title');
  modalTitleEl.textContent = title;

  const modalDescriptionEl = document.querySelector('.modal-description');
  modalDescriptionEl.textContent = description;
}

function closeModal() {
  modalLayer.style.display = 'none';
}

const modalLayer = createModalLayer();
