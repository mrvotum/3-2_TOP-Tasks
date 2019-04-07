const inputField = document.querySelector('[data-input=inputField]');
const form = document.querySelector('[data-form=form]');
const allTasks = document.querySelector('[data-task=allTasks]');

let elems = [];
let hideEl = 0;
let hiddenCount = 0;

function newArr(){
  elems = [];
  for(let i = 1; i < allTasks.childElementCount; i++){ // создаём массив для поиска
    elems.push(allTasks.children[i].children[0].children[0].textContent);
  }
  console.log(elems);
}

const similar = function (A, B) {
  // а - первая буква в слове
  // b - буква в сравнение
  let sameCharCount = 0;
  for (let i = 0; i < B.length; i++){
    // console.log(`i=${i} b.length=${B.length}`);
    // console.log(`A.charAt(i)=${A.charAt(i)}    B.charAt(i)=${B.charAt(i)}`);
    if (A.charAt(i) != B.charAt(i)){
      console.error(`совпадений нет!!!`);
      hideArr();
      break;
    }
    sameCharCount++;
  }
  console.log(`совпало букв ${sameCharCount}`);
  return sameCharCount;
};

form.onkeypress = function (event) {
  let key = event.which || event.keyCode;
  if (key === 13) {
    return;
  }
  newArr(); // чтобы всегда поиск шёл по актуальному массиву
  let max = 0; //совпадения
  for (let i = 0; i < elems.length; i++) {
    hideEl++;
    let A = elems[i].toLowerCase(),
    B = (inputField.value.toLowerCase() + String.fromCharCode(event.keyCode).toLowerCase());
    console.log('в слове=' + A + '   ищем=' + B);
    if (similar(A, B) > max){
      elems[i], max = similar(A, B);
      // console.log(elems[i]);
      // console.log('совпало букв: ' + max + 'в слове: ' + A);
    }
  }
  hideEl = 0;

  if(allTasks.childElementCount === 1 || max === 0 || hiddenCount === allTasks.childElementCount - 1){
    const allTitle = document.getElementById('allTitle');
    allTitle.textContent = 'All Tasks: No tasks found';
  } else {
    allTitle.textContent = 'All Tasks:';
  }
};

function hideArr(){
  allTasks.children[hideEl].style.display = 'none';
  hiddenCount++;
}
