const setColorForPalette = () => {
   document.querySelectorAll('.color__default-item').forEach(el => {
      const color = el.getAttribute('data-type')
      el.style.backgroundColor = color
   })
}

const inputColors = () => {
   const red = document.querySelector('#red').value
   const green = document.querySelector('#green').value
   const blue = document.querySelector('#blue').value

   const colors = `rgb(${red},${green},${blue})`
   document.querySelector('#result').value = colors
}

setColorForPalette()

const setEventForDefaultColor = (button) => {
   document.querySelectorAll('.color__default-item').forEach(el => {
      el.addEventListener('click', (e) => {
         const closestParent = button.closest('.ctx-text')
         if(closestParent.children[0].children[2].classList.contains('active')){
            closestParent.children[1].style.color = el.getAttribute('data-type')
            const id = Number(button.closest('.ctx-text').getAttribute('data-type'))
            ctxObj.find((_, index) => index === id).color = el.getAttribute('data-type')
         }
      })
   })
}

const setColorFromPalette = (button) => {
   const id = Number(button.closest('.ctx-text').getAttribute('data-type'))
   const closestParent = button.closest('.ctx-text')

   const setColor = () => {
      const resultInput = document.querySelector('#result').value
      if(closestParent.children[0].children[2].classList.contains('active')){
         closestParent.children[1].style.color = resultInput
         ctxObj.find((_, index) => index === id).color = resultInput
      }
   }

   document.querySelector('#red').addEventListener('input', () => {
      inputColors()
      setColor()
   })
   document.querySelector('#green').addEventListener('input', () => {
      inputColors()
      setColor()
   })
   document.querySelector('#blue').addEventListener('input', () => {
      inputColors()
      setColor()
   })
}