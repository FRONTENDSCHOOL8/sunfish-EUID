/* eslint-disable no-shadow */
import { getNode, getNodes } from '../../lib';

// 각 key에 input id들을 넣어주시고 max(최대글자)값을 수정해주세요.
// const validConfig = [
//   {
//     id: 'input1',
//     min: 5,
//     max: 24,
//     placeholder: '닉네임을 입력해주세요',
//     label: '직장'
//   },
// ];

// 클로져를 사용해서 이벤트 바인딩?
/**
 * TODO: 좋은 시도입니다. 제네릭한 input을 구현하려고 하셨지만, 바닐라 자바스크립트로는 한계가 너무 명확했군요!
 * react.js 처럼 100% 자바스크립트로만 구현하거나 webcomponent 등의 표준기술을 사용했다면 가능했을지도 모릅니다.
 * 아래의 문서는 제가 요즘 연구했던 노트입니디.
 * https://cinos81.notion.site/5d6305eae048489fafab69e900c9b104?pvs=4
 * @param validConfig
 * @returns {[void,{state: boolean}]}
 */
const initInput = (validConfig) => {
  const inputboxList = getNodes('.valid-input-box');

  function inputValidation(input) {
    const index = +input.dataset.index;
    const { min, max } = validConfig[index];
    const letterCount = input.value.replace(/\s*/g, '').length;
    const result = letterCount > min && letterCount <= max;
    // eslint-disable-next-line no-param-reassign
    validConfig[index].isValid = result;
    return result;
  }

  function toggleValidStyle(input, isValid) {
    const wrapper = input.closest('.input-wrapper');
    if (isValid) wrapper.classList.remove('invalid');
    else wrapper.classList.add('invalid');
  }

  function letterCount(input) {
    const { value } = input;
    const index = +input.dataset.index;
    const letterCount = input.nextElementSibling.querySelector('.letter-count');
    letterCount.textContent = `${value.length}/${validConfig[index].max}`;
  }

  function handleInput({ target }) {
    const isValid = inputValidation(target);
    toggleValidStyle(target, isValid);
    letterCount(target);
  }

  const needUpdate = {
    state: false,
  };

  const inputList = [];
  // TODO: Array.prototype.forEach 는 undefined를 반환하니 의미가 없지 않나요?
  return [
    inputboxList.forEach((inputbox, idx) => {
      const {
        id,
        min = 0,
        max = 24,
        placeholder = '',
        label,
      } = validConfig[idx];
      const template = /* html */ `
      <label for="${id}" class="text-label-sm pb-2">${label}</label>
      <div class="input-wrapper group flex flex-col w-full">
        <input
          type="text"
          id=${id}
          data-index="${idx}"
          placeholder="${placeholder}"
          minlength="${min}"
          maxlength="${max}"
          class="group-[.invalid]:border-red-500 p-2 text-paragraph-sm w-full outline-none border border-contents-content-tertiary rounded"
          spellcheck="false"
        />
        <div class="flex justify-between">
          <span
            class="group-[&:not(.invalid)]:opacity-0 text-red-500 text-paragraph-sm opacity-1"
          >글자 수는 ${min + 1}자 이상 ${max}자 이하로 작성해주세요.</span>
          <span
            aria-live="polite"
            class="group-[.invalid]:text-red-500 letter-count text-contents-content-tertiary text-paragraph-sm"
          >0/${max}</span>
        </div>
      </div>
      `;

      inputbox.insertAdjacentHTML('beforeend', template);

      const input = getNode(`input#${id}`);
      input.addEventListener('input', handleInput);

      inputList.push(input);

      Object.defineProperty(needUpdate, 'state', {
        get() {
          // eslint-disable-next-line no-underscore-dangle
          return this._state;
        },
        set(value) {
          // eslint-disable-next-line no-underscore-dangle
          this._state = value;
          // 값이 변경될 때 원하는 이벤트를 트리거합니다.
          inputList.forEach((input) => letterCount(input));
        },
      });
    }),
    needUpdate,
  ];
};

export default initInput;
