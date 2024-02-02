import PocketBase from 'pocketbase';
import { getNode, getNodes, getPbImageURL, checkAuth } from '/src/lib';

const pb = new PocketBase(import.meta.env.VITE_PB_URL);
const prev = getNode('#prev');
const idParam = new URL(window.location.href).searchParams.get('id');
const contentName = getNode('#contentName');
const finish = getNode('#finish');
const checkBox = getNode('#checkBox');

const data = await pb.collection('selling').getOne(idParam);

async function methodInfo() {
  if (!checkAuth()) return;

  const previewImg = getNode('#previewImg');
  const productTitle = getNode('#productTitle');
  const letterCount = getNode('#letterCount');
  const tradeButton = getNodes('#tradeMethod > button');
  const descriptionCount = getNode('#descriptionCount');
  const desc = getNode('#description');

  const { description, title, tradingType, isPriceOffer } = data;

  letterCount.textContent = title.length + '/24';
  descriptionCount.textContent = title.length + '/500';

  if (tradingType === 'sell') {
    tradeButton[0].style.backgroundColor = '#373F67';
    tradeButton[0].style.color = 'white';
  } else {
    tradeButton[1].style.backgroundColor = '#373F67';
    tradeButton[1].style.color = 'white';
  }

  if (isPriceOffer === true) {
    checkBox.checked = true;
  }

  previewImg.src = getPbImageURL(data, 'productImages');
  productTitle.value = title;
  desc.value = description;
}

let warningMessage = null;
const spell = getNode('#spell');

/**
 * TODO: 이럴 때는 폼 전체를 스키마 기반 벨리데이션 도구를 이용해서 검증하는 방식을 많이 사용합니다.
 * 폼의 필드에서 blur, change 이벤트가 발생했을 때 폼 전체를 검증하는 식입니다.
 * 폼은 보고서, 스키마 기반 벨리데이터는 보고서를 검토하는 역활을 맡습니다.
 * 이 방식은 거의 루틴이 되어 있고, 다른 라이브러리들도 거의 같은 방식을 이용합니다.
 * zod + react-hook-form 조합이 유명한데, 기술이 많이 성숙한 상태라 배울 가치가 있습니다.
 * zod는 러닝커브가 좀 있습니다. 어려우면 yup을 사용해도 좋습니다.
 * @param target
 */
function validation({ target }) {
  if (!checkAuth()) return;
  const { value } = target;
  const regExp = /^[0-9]*$/;
  const isValid = regExp.test(value);

  if (isValid) {
    contentName.value = contentName.value.replace(/[^0-9]/g, '');
    if (warningMessage) {
      warningMessage.remove();
      warningMessage = null;
    }
    if (contentName.value.length > 12) {
      contentName.value = contentName.value.slice(0, 12);
      warningMessage = document.createElement('span');
      warningMessage.textContent = `숫자는 12이하로 입력해주세요`;
      warningMessage.classList.add(
        'text-label-sm',
        'text-red-500',
        'text-right',
        'block'
      );
      spell.insertAdjacentElement('afterbegin', warningMessage);
    }
  } else if (!warningMessage) {
    warningMessage = document.createElement('span');
    warningMessage.classList.add(
      'text-label-sm',
      'text-red-500',
      'text-right',
      'block'
    );
    warningMessage.textContent = `숫자만 입력해주세요`;
    spell.insertAdjacentElement('afterbegin', warningMessage);
  }
}

async function change(value) {
  if (!checkAuth()) return;
  if (!pb || !pb.authStore || !pb.authStore.model) {
    console.log('pb.authStore.model is undefined');
    return;
  }

  const dataList = {
    price: Number(value),
    user: pb.authStore.model.id,
  };

  try {
    await pb.collection('selling').update(idParam, dataList);
    window.location.href = `/src/pages/exchange/exchangeDetail.html?id=${idParam}`;
  } catch (error) {
    console.log('Update failed', error);
  }
}

contentName.addEventListener('input', validation);
prev.addEventListener('click', () => history.back());
finish.addEventListener('click', () => {
  if (
    parseInt(contentName.value.length) > 12 ||
    contentName.value[0] === '0' ||
    isNaN(contentName.value) ||
    contentName.value === ''
  ) {
    return;
  }
  change(contentName.value);
});

methodInfo();
