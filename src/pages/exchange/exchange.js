import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

const plusButtonIcon = document.querySelector('#plusButton');
const body = document.querySelector('body');
const exchangeList = document.querySelector('#exchangeList');
const heartContainer = document.querySelectorAll('.heartContainer');
const greatNum = document.querySelectorAll('.greatCount');
let plusClickCount = 0;
let isClick = false;
let createCategory;

function show(){
  plusClickCount++;

  if(plusClickCount % 2 !== 0 ){
    body.style.background='rgba(0, 0, 0, 0.5)';
    plusButton.insertAdjacentHTML('beforebegin', /*html */
    `
    <div id='span-tag' class="flex flex-col absolute left-[-78px] w-full min-w-screen max-w-screen">
      <div class="fixed bottom-36 flex flex-col w-[133px] items-center gap-1">
        <a href="/src/pages/exchange/index.html" class="bg-exchange-icon h-10 px-[20px] py-[10px] self-stretch rounded-[60px]"></a>
        <span class="bg-project-icon h-10 px-[20px] py-[10px] self-stretch rounded-[60px]"></span>
        <span class="bg-study-icon h-10 px-[20px] py-[10px] self-stretch rounded-[60px]"></span>
      </div>
    </div>
    `);

    createCategory = document.querySelector('#span-tag');
  }else {
    body.style.background='';
    if(createCategory) {
      createCategory.remove();
    }
  }
}

function toggle(){
  isClick != isClick
  this.classList.toggle('bg-plus-icon');
  this.classList.toggle('bg-exchange-close-icon');
  this.classList.toggle('bg-white');
  this.classList.toggle('bg-secondary');
}

function move(){
  window.location.href='/src/pages/exchange/exchangeDetail.html';
}

function great(e){
  let greatCount = 0;
  e.stopPropagation();
  isClick = !isClick; 

  if(!isClick){
    greatNum.forEach(element => {
      element.innerText = greatCount; 
    });
    e.currentTarget.classList.remove('bg-heart-full-icon');
    e.currentTarget.classList.add('bg-heart-icon');
  } else {
    greatCount += 1; 
    greatNum.forEach(element => {
      element.innerText = greatCount; 
    });
    e.currentTarget.classList.add('bg-heart-full-icon');
    e.currentTarget.classList.remove('bg-heart-icon');
  }
}

heartContainer.forEach((item) => {
  item.addEventListener('click', great);
})
plusButton.addEventListener('click', show);
plusButtonIcon.addEventListener('click', toggle);
exchangeList.addEventListener('click', move)