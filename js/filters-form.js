const imgFiltersForm = document.querySelector('.img-filters__form');
const imgFiltersButtons = imgFiltersForm.querySelectorAll('.img-filters__button');

imgFiltersForm.addEventListener('click',(evt)=>{
  const filterTarget = evt.target;
  for(const imgFiltersButton of imgFiltersButtons){
    imgFiltersButton.classList.remove('img-filters__button--active');
  }
  filterTarget.classList.add('img-filters__button--active');
});


