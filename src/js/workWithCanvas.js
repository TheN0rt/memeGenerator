function updateMemeCanvas(canvas, image) {
   const ctx = canvas.getContext("2d");
   const width = image.width;
   const height = image.height;
   // const fontSize = Math.floor(width / 10);
   // const yOffset = height / 25;

   // Update canvas background
   canvas.width = width > 700 ? width : 700;
   canvas.height = height;
   ctx.drawImage(image, 0, 0);
}

const updateTextInCanvas = () => {
   for(let el of ctxObj){
      ctx.font = `${el.fontSize} Roboto`
      console.log(ctx.font)
      ctx.fillStyle = `${el.color}`
      ctx.shadowOffsetX = el?.textShadow?.shadowOffsetX
      ctx.shadowOffsetY = el?.textShadow?.shadowOffsetY
      ctx.shadowBlur = el?.textShadow?.shadowBlur
      ctx.shadowColor = el?.textShadow?.shadowColor
      ctx.fillText(`${el.value}`, el?.position.positionX, el?.position.positionY)
   }
}

const createActionBlock = (parent) => {
   const div = document.createElement('div')
   div.classList.add('action-block')
   div.innerHTML = `
   <div class="action__item shadow">
      Sh
   </div>
   <div class="action__item text__transform">
      aA
   </div>
   <div class="action__item text__color">
      <img src="./src/img/icons/palette.png" alt="color">
   </div>
   <div class="action__item text__write">
      <img src="./src/img/icons/pencil.png" alt="write">
   </div>
   <div class="action__item text__size">
      <input type="number" placeholder="размер текста">
   </div>
   <div class="action__item delete">
      <img src="./src/img/icons/delete.png" alt="delete">
   </div>
   `

   parent.appendChild(div)
   
   div.children[0].addEventListener('click', (e) => {
      const id = Number(e.target.closest('.ctx-text').getAttribute('data-type'))
      e.target.classList.toggle('active')
      e.target.closest('.ctx-text').style.textShadow = e.target.classList.contains('active') ? '1px 1px 2px black' : ''
      let textShadow = {
         shadowColor: 'black',
         shadowOffsetX: 1,
         shadowOffsetY: 1,
         shadowBlur: 2,
      }
      ctxObj.find((_, index) => index === id).textShadow = e.target.classList.contains('active') ? textShadow : {}
   })
   
   div.children[1].addEventListener('click', (e) => {
      e.target.classList.toggle('active')
      e.target.closest('.ctx-text').children[e.target.closest('.ctx-text').children.length - 1].style.textTransform = e.target.classList.contains('active') ? 'uppercase' : 'lowercase'
      const id = Number(e.target.closest('.ctx-text').getAttribute('data-type'))
      ctxObj.find((_, index) => index === id).value = e.target.closest('.ctx-text').children[e.target.closest('.ctx-text').children.length - 1].innerText
      // console.log(ctxObj.find((_, index) => index === id).textTransform)
   }, {capture:true})
   
   div.children[2].addEventListener('click', (e) => {
      if(e.target.classList.contains('text__color')){
         e.target.classList.toggle('active')
      } else{
         e.target.closest('.text__color').classList.toggle('active')
      }
      setEventForDefaultColor(e.target)
      setColorFromPalette(e.target)
   }, {capture:true})

   div.children[3].addEventListener('click', (e) => {
      let value = e.target.closest('.ctx-text').children[e.target.closest('.ctx-text').children.length - 1].innerText
      e.target.closest('.ctx-text').children[e.target.closest('.ctx-text').children.length - 1].remove()
      const input = document.createElement('input')
      input.setAttribute('type', 'text')
      input.value = value
      e.target.closest('.ctx-text').appendChild(input)

      input.addEventListener('blur', (e) => {
         const text = document.createElement('p')
         text.innerText = e.target.value
         e.target.closest('.ctx-text').appendChild(text)
         const id = Number(e.target.closest('.ctx-text').getAttribute('data-type'))
         ctxObj.find((_, index) => index === id).value = text.innerText
         // console.log(ctxObj.find((_, index) => index === id).value)
         e.target.remove()
      })
   })

   div.children[4].addEventListener('input', (e) => {
      e.target.closest('.ctx-text').style.fontSize = e.target.value + 'px'
      const id = Number(e.target.closest('.ctx-text').getAttribute('data-type'))
      ctxObj.find((_, index) => index === id).fontSize = e.target.value + 'px'
   })

   div.children[5].addEventListener('click', (e) => {
      const id = Number(e.target.closest('.ctx-text').getAttribute('data-type'))
      ctxObj = ctxObj.filter((_, index) => index === id)
      e.target.closest('.ctx-text').remove()
   })
}