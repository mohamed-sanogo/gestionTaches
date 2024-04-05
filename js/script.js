const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
function addTask() { 
  if(inputBox.value ===''){
    alert('veuillez saisir quelque chose');
  }else{
    let li = document.createElement('li');
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement('span');
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value='';
  saveData();
 }

 listContainer.addEventListener('click', function(e){
  if(e.target.tagName === "Li"){
    e.target.classList.toggle("checked");
  saveData();
  }else if (e.target.tagName==="SPAN"){
    e.target.parentElement.remove();
  saveData();
  }
 },false);
function saveData(){
  localStorage.setItem("data", listContainer.innerHTML);
}
function showTask(){
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
















// init Isotope
// var $grid = $('.collection-list').isotope({
//   options
// });
// filter items on button click
// $('.filter-button-group').on( 'click', 'button', function() {
//   var filterValue = $(this).attr('data-filter');
//   resetFilterBtns();
//   $(this).addClass('active-filter-btn');
//   $grid.isotope({ filter: filterValue });
// });

// var filterBtns = $('.filter-button-group').find('button');
// function resetFilterBtns(){
//   filterBtns.each(function(){
//     $(this).removeClass('active-filter-btn');
//   });
// }