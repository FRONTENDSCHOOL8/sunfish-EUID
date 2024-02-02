/* eslint-disable no-shadow */

/**
 * TODO: 좋은 지점까지 도달하셨습니다. 스키마 기반 벨리데이션의 초안 같은 느낌이군요.
 * 스키마 기반 벨리데이션은 폼 전체의 벨리데이션을 말합니다.
 * 이 벨리데이션 설정은 1개의 필드에 집중하고 있지만, 실무의 벨리데이션은 필드와 필드가 상호작용을 해야 하는 경우가 많아서 한계가 있습니다.
 * 최근에는 zod 라는 스키마 기반 벨리데이션 도구를 많이 사용합니다.
 * 아마 파이널 프로젝트에도 응용하실 수 있을거에요.
 * https://www.daleseo.com/zod/
 */
// 각 key에 input id들을 넣어주시고 max(최대글자)값을 수정해주세요.
const validConfig = {
  label1: {
    min: 0,
    max: 24,
    isValid: false,
  },
  label2: {
    min: 0,
    max: 100,
    isValid: false,
  },
};

(function inputInit() {
  const inputs = document.querySelectorAll('.input');
  inputs.forEach((input) => {
    const { min, max } = validConfig[input.id];
    const letterCount = input.nextElementSibling.querySelector('.letter-count');
    const errorMsg = input.nextElementSibling.querySelector('.error-msg');
    letterCount.textContent = `0/${max}`;
    errorMsg.textContent = `글자 수는 ${
      min + 1
    }자 이상 ${max}자 이하로 작성해주세요.`;
  });
})();

const inputs = document.querySelectorAll('.input');
function inputValidation(node) {
  const MIN = validConfig[node.id].min;
  const MAX = validConfig[node.id].max;
  const letterCount = node.value.replace(/\s*/g, '').length;
  const result = letterCount > MIN && letterCount <= MAX;
  validConfig[node.id].isValid = result;
  return result;
}
function toggleValidStyle(target) {
  const { isValid } = validConfig[target.id];
  const errorMsg = target.nextElementSibling.querySelector('.error-msg');
  const letterCount = target.nextElementSibling.querySelector('.letter-count');

  if (isValid) {
    target.classList.replace(
      'border-red-500',
      'border-contents-content-tertiary'
    );
    errorMsg.classList.replace('opacity-100', 'opacity-0');
    letterCount.classList.replace(
      'text-red-500',
      'text-contents-content-tertiary'
    );
  } else {
    target.classList.replace(
      'border-contents-content-tertiary',
      'border-red-500'
    );
    errorMsg.classList.replace('opacity-0', 'opacity-100');
    letterCount.classList.replace(
      'text-contents-content-tertiary',
      'text-red-500'
    );
  }
}
function letterCount(target) {
  const { value } = target;
  const letterCount = target.nextElementSibling.querySelector('.letter-count');
  const countArray = letterCount.textContent.split('/');
  countArray[0] = value.length;
  letterCount.textContent = `${countArray[0]}/${countArray[1]}`;
}
function handleInput(e) {
  inputValidation(e.target);
  toggleValidStyle(e.target);
  letterCount(e.target);
}
inputs.forEach((input) => {
  input.addEventListener('input', handleInput);
});
