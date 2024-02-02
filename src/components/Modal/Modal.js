/**
 * 원버튼 모달 생성하기
 * @param {{
 *   title: string
 *   desc: string
 *   buttonText: string
 * }} obj // TODO: 이렇게 선언하는 방법도 있습니다.
 * @returns {Element[]} // TODO: 타입스크립트를 사용할때는 반환값을 추론으로 남기는 것이 테크닉입니다.
 */
export const createModal1Btn = ({ title, desc, buttonText = '확인' }) => {
  const array = new Uint8Array(1);
  const id = `modal${crypto.getRandomValues(array).join('')}`;
  const template = /* html */ `
  <dialog id=${id} class="bg-white shadow-lg backdrop:bg-black backdrop:bg-opacity-40 rounded-2xl">
    <div class="w-[233px] p-[18px] flex flex-col items-center gap-5">
      <p class="text-label-md" aria-label="모달 제목">${title}</p>
      <span
        class="text-paragraph-md text-center text-gray-600"
        aria-label="모달 본문"
        >${desc}</span>
      <button class="w-full h-9 bg-secondary text-white text-label-md rounded hover:brightness-90">
        ${buttonText}
      </button>
    </div>
  </dialog>
  `;

  document.querySelector('body').insertAdjacentHTML('beforeend', template);
  const modal = document.querySelector(`#${id}`);
  const button = document.querySelector(`#${id} button`);

  modal.showing = () => {
    modal.showModal();
  };

  modal.closing = () => {
    modal.setAttribute('closing', '');
    modal.addEventListener(
      'animationend',
      () => {
        modal.removeAttribute('closing', '');
        // TODO: 무제한으로 만들어지는 문제가 있으니 스스로를 파괴하는 코드가 필요한것 같습니다.
        modal.remove();
        modal.close();
      },
      { once: true }
    );
  };

  return [modal, button];
};
/**
 * 투 버튼 모달 생성하기
 * @param {{
 *   title: string
 *   desc: string
 *   cancelText: string
 *   submitText: string
 * }} obj
 */
export const createModal2Btn = ({
  title,
  desc,
  cancelText = '취소',
  submitText = '확인',
}) => {
  const array = new Uint8Array(1);
  const id = `modal${crypto.getRandomValues(array).join('')}`;
  const template = /* html */ `
  <dialog id=${id} class="bg-white shadow-lg backdrop:bg-black backdrop:bg-opacity-40 rounded-2xl">
    <div class="w-[233px] p-[18px] flex flex-col items-center gap-5">
      <p class="text-label-md" aria-label="모달 제목">${title}</p>
      <span
        class="text-paragraph-md text-center text-gray-600"
        aria-label="모달 본문"
        >${desc}</span>      
      <div class="flex gap-2 w-full">
        <button class="grow w-full  h-9 bg-gray-100 text-contents-content-primary text-label-md rounded hover:brightness-90">
          ${cancelText}
        </button>
        <button class="grow w-full h-9 bg-secondary text-white text-label-md rounded hover:brightness-90">
          ${submitText}
        </button>
      </div>
    </div>
  </dialog>
  `;

  document.querySelector('body').insertAdjacentHTML('beforeend', template);
  const modal = document.querySelector(`#${id}`);
  const cancelButton = document.querySelector(`#${id} button`);
  const submitButton = document.querySelector(`#${id} button:last-child`);

  modal.showing = () => {
    modal.showModal();
  };

  modal.closing = () => {
    modal.setAttribute('closing', '');
    modal.addEventListener(
      'animationend',
      () => {
        modal.removeAttribute('closing', '');
        // TODO: 무제한으로 만들어지는 문제가 있으니 스스로를 파괴하는 코드가 필요한것 같습니다.
        modal.remove();
        modal.close();
      },
      { once: true }
    );
  };

  return [modal, cancelButton, submitButton];
};

/**
 * 버튼x 자동제거 모달 생성하기
 * @param {string} title 모달 제목
 * @param {number} limit 지연시간
 */
export const createAlertModal = (title, limit = 1500) => {
  const array = new Uint8Array(1);
  const id = `modal${crypto.getRandomValues(array).join('')}`;
  const template = /* html */ `
  <dialog id=${id} class="bg-white shadow-lg backdrop:bg-black backdrop:bg-opacity-40 rounded-2xl">
    <div class="w-[233px] p-[18px] flex flex-col items-center gap-5">
      <p class="text-label-md" aria-label="모달 제목">${title}</p>
      </div>
    </div>
  </dialog>
  `;

  document.querySelector('body').insertAdjacentHTML('beforeend', template);
  const modal = document.querySelector(`#${id}`);

  modal.closing = () => {
    modal.setAttribute('closing', '');
    modal.addEventListener(
      'animationend',
      () => {
        modal.removeAttribute('closing', '');
        // TODO: 무제한으로 만들어지는 문제가 있으니 스스로를 파괴하는 코드가 필요한것 같습니다.
        modal.remove();
        modal.close();
      },
      { once: true }
    );
  };

  modal.showing = () => {
    modal.showModal();
    const timer = setTimeout(() => {
      modal.closing();
      clearTimeout(timer);
    }, limit);
  };

  return [modal];
};
