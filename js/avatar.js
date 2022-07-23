const fileChooser = document.querySelector('.img-upload__form [type=file]');
const preview = document.querySelector('.img-upload__preview img');
const TYPE_FILE = ['png','jpg','jpeg'];
function changeFoto(){
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = TYPE_FILE.some((it)=>fileName.endsWith(it));

  if(matches) {
    preview.src = URL.createObjectURL(file);
  }
}
fileChooser.addEventListener('change',()=>{
  changeFoto();
});

