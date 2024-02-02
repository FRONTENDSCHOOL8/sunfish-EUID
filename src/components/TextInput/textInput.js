const textValue = document.querySelector('#contentName');
const span = document.querySelector('#letterCount');

/**
 * TODO: 제네릭한(=범용적인) 무언가가 되려다 말았군요. 좋은 시도입니다.
 */
function getValue() {
  const { value } = textValue;
  span.textContent = `${value.length}/24`;
}

textValue.addEventListener('input', getValue);
