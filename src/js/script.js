let ctxObj = []

const imageFileInput = document.querySelector('#file-input')
const canvas = document.querySelector('#canvas')
const canvasBlock = document.querySelector('.canvas-block')
const ctx = canvas.getContext("2d")
const generateBtn = document.querySelector('#generate') 

imageFileInput.addEventListener("change",(e)=>{
   // const type = e.target.files[0]?.type
   if (!validateFileType()) {
      imageFileInput.value = '';
      return false
   } else{
      const imageDataUrl = URL.createObjectURL(e.target.files[0]);
      // console.log(imageDataUrl);
   
      image = new Image();
      image.src = imageDataUrl;
      image.addEventListener(
         "load",
         () => {
           updateMemeCanvas(
            canvas,
            image,
           );
         },
         { once: true }
      );
   }

})

canvas.addEventListener('dblclick', (e) => {
   const textBlock = document.createElement('input')
   textBlock.setAttribute('type', 'text')
   textBlock.focus() // Не работает
   const positionX = e.offsetX
   const positionY = e.offsetY
   textBlock.style.position = 'absolute'
   textBlock.style.top = positionY + 'px'
   textBlock.style.left = positionX + 'px'
   canvasBlock.appendChild(textBlock)

   textBlock.addEventListener('blur', (e) => {
      if(e.target.value === ''){
         canvasBlock.removeChild(textBlock)
      } else{

         const ctxBlockWithText = document.createElement('div')
         ctxBlockWithText.classList.add('ctx-text')
         const text = document.createElement('p')
         text.innerText = e.target.value
         text.style.color = 'red'
         canvasBlock.removeChild(textBlock)
         canvasBlock.appendChild(ctxBlockWithText)
         ctxBlockWithText.setAttribute('data-type', document.querySelectorAll('.ctx-text').length - 1)
         setDragEvent(ctxBlockWithText)
         createActionBlock(ctxBlockWithText)
         ctxBlockWithText.appendChild(text)
         ctxBlockWithText.style.position = 'absolute'
         ctxBlockWithText.style.top = positionY + 'px'
         ctxBlockWithText.style.left = positionX + 'px'
         ctxBlockWithText.style.color = 'white'
         ctxBlockWithText.style.fontSize = '50px'

         const obj = {
            value: text.innerText,
            position: {
               positionY,
               positionX
            },
            color: text.style.color,
            fontSize: ctxBlockWithText.style.fontSize,
            // textTransform: 'auto',
            textShadow: {}
         }

         ctxObj.push(obj)
      }
   })
})

const setDragEvent = (elem) => {
   let moveElement = false

   let initialX
   let initialY

   elem.addEventListener('mousedown', (e) => {
      if(elem.classList.contains('ctx-text')){
         // e.preventDefault()
         
         moveElement = true
         
         document.onmousemove = (e) => {
            if(moveElement){
               e.preventDefault()
               initialX = e.pageX
               initialY = e.pageY
               if((initialX <= canvas.width + 40 && initialX >= 130) && (initialY <= canvas.height + 200 && initialY >= 250)){
                  elem.style.top = initialY - 250 + 'px'
                  elem.style.left = initialX - 130 + 'px'
                  const id = Number(elem.getAttribute('data-type'))
                  ctxObj.find((_, index) => index === id).position.positionY = (initialY - 230)
                  ctxObj.find((_, index) => index === id).position.positionX = (initialX - 120)
               }
            }
         }
   
         document.onmouseup = (e) => {
            e.preventDefault()
            moveElement = false
         }
      }
   })

   elem.addEventListener('click', () => {
      if(!elem.classList.contains('active')){
         elem.classList.add('active')
      }
   })
   
   // elem.addEventListener('dragstart', (event) => {
   //    if(!elem.classList.contains('active')){
   //       elem.classList.add('active')
   //    }
   //    event.preventDefault()
   //    initialX = event.offsetX
   //    initialY = event.offsetY
   // }, {capture: true})

   // elem.addEventListener('dragend', (event) => {
   //    elem.classList.remove('active')
   //    if(offsetX < canvas.width && offsetY < canvas.height){
   //       event.preventDefault()
   //       // let newX = event.positionX
   //       // let newY = event.positionY
   //       elem.style.top = elem.offsetTop - (initialY - elem) + 'px'
   //       elem.style.left = elem.offsetLeft - (initialX - newX) + 'px'
   //       // elem.style.top = top + 'px'
   //       // elem.style.left = left + 'px'
   //       const id = Number(elem.getAttribute('data-type'))
   //       ctxObj.find((_, index) => index === id).position.positionY = elem.offsetTop - (initialY - newY)
   //       ctxObj.find((_, index) => index === id).position.positionX = elem.offsetLeft - (initialX - newX)
   //    }
   // }, {capture: true})
}

document.body.addEventListener('click', (e) => {
   if(!e.target.classList.contains('ctx-text')){
      // if(e.target.classList.contains('active'))
      document.querySelectorAll('.ctx-text').forEach(e => {
         if(e.classList.contains('active')){
            e.classList.remove('active')
         }
      })
   }
}, {capture:true})

generateBtn.addEventListener('click', (e) => {
   if(validateFileType()){
      updateTextInCanvas()
      document.querySelectorAll('.ctx-text').forEach(el => {
         el.remove()
      })
      ctxObj = []
      const dataURI = canvas.toDataURL("image/png")
      if(window.navigator.msSaveBlob){
         window.navigator.msSaveBlob(canvas.msToBlob(), "canvas.png")
      } else{
         const a = document.createElement('a')
   
         document.body.appendChild(a)
         a.href = dataURI
         a.download = "canvas.png"
         a.click()
         document.body.removeChild(a)
      }
   }
})