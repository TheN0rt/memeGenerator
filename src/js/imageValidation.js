function validateFileType() {
   const files = imageFileInput.files;
   if(files.length==0){
      alert("Сначала веберите файл");
      return false;
   }else{
      const filename = files[0].name;

      /* getting file extenstion eg- .jpg,.png, etc */
      const extension = filename.substr(filename.lastIndexOf("."));

      /* define allowed file types */
      const allowedExtensionsRegx = /(.jpg|.jpeg|.png|.gif)$/i;

      /* testing extension with regular expression */
      const isAllowed = allowedExtensionsRegx.test(extension);

      if(isAllowed){
         return true
      }else{
         alert('Неправильный формат файла. Загрузите картинку в формате jpg, png, jpeg, gif');
         return false;
      }
   }
}