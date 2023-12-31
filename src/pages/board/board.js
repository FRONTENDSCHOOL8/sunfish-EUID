import gsap from 'gsap';

/**
 * @type {{ together: {id:number, title: string, age: string, datetime:string, local: string, createdAt: number, maxMember: number, currentMember: string[] }; qna: {}; }}
 */
const dummyData = {
  together: [
    {
      id: 0,
      title: 'youtube 클론 프젝 같이하실분~',
      age: '누구나 참여가능',
      datetime: '내일, 오후 7:00',
      local: '응암동',
      createdAt: new Date().getTime(),
      maxMember: 3,
      currentMember: ['kim', 'lee'],
    },
    {
      id: 1,
      title: '멋사플레이스 클론스터디 하실분',
      age: '20대',
      datetime: '오늘, 오후 8:00',
      local: '비전동',
      createdAt: new Date().getTime(),
      maxMember: 4,
      currentMember: ['jo'],
    },
    {
      id: 2,
      title: '알고리즘 매일 아침마다 인증할 분',
      age: '누구나 참여 가능',
      datetime: '5월 1일, 오전 10:00',
      local: '통복동',
      createdAt: new Date().getTime(),
      maxMember: 5,
      currentMember: ['jo', 'kang', 'choi'],
    },
  ],
  qna: [
    {
      id: 0,
      title:
        '코딩 입문한지 얼마안된 초보입니다. (자바스크립트 클로저에 대한 질문)',
      description:
        '안녕하세요. 디자인 전공으로 종사하다가 코딩쪽으로 스펙업을 하고 싶어서 입문하게된 코린이입니다. 독학으로 자바스크립트 공부중인데요. chtatGPT라는 정말 좋은 선생님이 생겨서 공부하기 정말 좋은 시대라고 생각하고 공부 하고 있습니다. 입문한지는 며칠안되어서 너무 기본적인 것일 수도 있겠지만',
      local: '연희동',
      createdAt: new Date().getTime(),
      views: 12,
      imgUrl: [
        '/src/assets/boardIcon/sampleImg.png',
        '/src/assets/boardIcon/sampleImg.png',
      ],
    },
    {
      id: 1,
      title: '자바스크립트 마우스 이벤트 질문',
      description:
        '자바스크립트로 아날로그 타이머를 만들고 있었는데 이해가 잘안되는 부분이 생겼습니다.',
      local: '연희동',
      createdAt: new Date().getTime(),
      views: 181,
      imgUrl: [
        '/src/assets/boardIcon/sampleImg.png',
        '/src/assets/boardIcon/sampleImg.png',
      ],
    },
    {
      id: 2,
      title: '유효성 인식 문제 (자바스크립트 )',
      description:
        '안녕하세요 우편번호 찾기 버튼 없이 숫자를 직접 넣었을 때는 아래 이미지와 같이 잘 됩니다. 그런데 [우편번호 찾기] 버튼으로 우편 번호 검색을 한 후 우편번호 필드에 출력은 되는데 바로 유효성 인식을 하지 못하는 상황 입니다.',
      local: '중앙동',
      createdAt: new Date().getTime(),
      views: 11,
      imgUrl: [
        '/src/assets/boardIcon/sampleImg.png',
        '/src/assets/boardIcon/sampleImg.png',
      ],
    },
  ],
};

function createTemplate(data) {
  const { together, qna } = data;
  const togetherTemplateArray = [];
  const qnaTemplateArray = [];
  together.forEach((item) => {
    const { title, age, datetime, local, createdAt, maxMember, currentMember } =
      item;
    const template = /* html */ `
    <li  class="hover:bg-gray-100 transition-all">
    <a
      class="p-3 flex flex-col justify-center items-start gap-1 border-b border-contents-content-secondary"
      href=""
    >
      <span
        class="text-label-sm px-1 bg-bluegray-600 text-white rounded"
        >같이해요</span
      >
      <p
        class="w-full flex-auto text-paragraph-md font-normal text-contents-content-primary overflow-hidden whitespace-nowrap text-ellipsis"
      >
        ${title}
      </p>
      <span
        class="pl-4 text-paragraph-sm font-normal text-gray-600 bg-people_full-icon bg-no-repeat bg-left"
        >${age}</span
      >
      <span
        class="pl-4 text-paragraph-sm font-normal text-gray-600 bg-calender-icon bg-no-repeat bg-left"
        >${datetime}</span
      >
      <div class="w-full flex justify-between">
        <span class="text-paragraph-sm font-normal text-gray-600"
          >${local} · 9분 전</span
        >
        <span
          class="pl-4 text-paragraph-sm font-normal text-gray-600 bg-people-icon bg-no-repeat bg-left"
          >${currentMember.length}/${maxMember}명</span
        >
      </div>
    </a>
    </li>
    `;
    togetherTemplateArray.push(template);
  });
  qna.forEach((item) => {
    const { title, description, local, createdAt, views, imgUrl } = item;
    const template = /* html */ `
<li class="hover:bg-gray-100 transition-all">
<a
  class="p-3 border-b flex flex-row justify-between gap-1 border-contents-content-secondary"
  href=""
>
  <div
    class="w-[calc(100%-70px)] flex flex-col flex-shrink-1 justify-center items-start gap-1"
  >
    <div class="flex items-center gap-1">
      <span
        class="text-label-sm px-1 bg-bluegray-600 text-white rounded"
        >질의응답</span
      >
      <span
        class="text-label-sm px-1 bg-tertiary text-white rounded"
        >인기</span
      >
    </div>
    <p
      class="w-full flex-auto text-paragraph-md font-normal text-contents-content-primary overflow-hidden whitespace-nowrap text-ellipsis"
    >
      ${title}
    </p>
    <span
      class="w-full text-paragraph-sm font-normal text-gray-600 overflow-hidden whitespace-nowrap text-ellipsis"
      >${description.slice(0, 50)}...</span
    >
    <span class="text-paragraph-sm font-normal text-gray-600"
      >${local} · 9분 전 · 조회 ${views}</span
    >
  </div>
  <div
    class="w-[70px] min-w-[70px] flex justify-center items-center"
  >
    <div
      class="w-[60px] h-[60px] overflow-hidden border border-gray-300 rounded"
    >
      <img
        src="${imgUrl[0]}"
        alt="이미지"
      />
    </div>
  </div>
</a>
</li>
`;
    qnaTemplateArray.push(template);
  });
  const resultTemplate = [...togetherTemplateArray, ...qnaTemplateArray].sort(
    (a, b) => a.createdAt - b.createdAt
  );
  return resultTemplate.join('');
}

const boardList = document.querySelector('#board-list');

boardList.insertAdjacentHTML('beforeend', createTemplate(dummyData));

const $modalDimmed = document.querySelector('#modalDimmed');
const $openModalButton = document.querySelector('#openModal');
const $closeModalButton = document.querySelector('#closeModal');

function showModal() {
  const tl = gsap.timeline();
  tl.to('#modalDimmed', {
    opacity: 1,
    display: 'block',
    duration: 0.3,
  }).to(
    '#modal',
    {
      bottom: 0,
      duration: 0.3,
      onComplete() {
        this.targets()[0].focus();
      },
    },
    '<'
  );
}

function closeModal(e) {
  if (this === e.target) {
    gsap.to('#modalDimmed', {
      opacity: 0,
      duration: 0.3,
      onComplete() {
        gsap.set('#modalDimmed', { clearProps: 'all' });
        gsap.set('#modal', { clearProps: 'all' });
      },
    });
  }
}

$openModalButton.addEventListener('click', showModal);
$closeModalButton.addEventListener('click', closeModal);
$modalDimmed.addEventListener('click', closeModal);

/*
  TODO : 모달창 focus trap 기능 구현해야함
*/
