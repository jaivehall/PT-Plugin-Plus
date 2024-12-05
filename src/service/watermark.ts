'use strict'
  
//const watermark_id = 'watermark-1.23452384164.123412415';
const watermark_id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
})
/**
 *
 * @param {要设置的水印的内容} str
 * @param {需要设置水印的容器} container
 */
const setWatermark = (str:string, container:any) => {
  
  if (container === undefined) {
    return
  }
  
  // 查看页面上有没有，如果有则删除
  const childelement:any = document.getElementById(watermark_id)
  if (childelement !== null) {
      childelement.parentNode.removeChild(childelement)
      //document.removeChild(childelement)
  }
  
  var containerWidth = container.offsetWidth // 获取父容器宽
  var containerHeight = container.offsetHeight // 获取父容器高
  container.style.position = 'relative' // 设置布局为相对布局
  
  // 创建canvas元素(先制作一块背景图)
  const can = document.createElement('canvas')
  can.width = 390 // 设置每一块的宽度
  can.height = 200 // 高度
  const cans:any = can.getContext('2d') // 获取canvas画布
  if(cans){
    cans.rotate(-20 * Math.PI / 180) // 逆时针旋转π/9
    cans.font = '20px Vedana' // 设置字体
    cans.fillStyle = 'rgba(200, 200, 200, 0.20)' // 设置字体的颜色
    cans.textAlign = 'left' // 文本对齐方式
    cans.textBaseline = 'Middle' // 文本基线
    cans.fillText(str, 0, 4 * can.height / 5) // 绘制文字  
  }
  
  // 创建一个div元素
  const div = document.createElement('div')
  div.id = watermark_id // 设置id
  div.style.pointerEvents = 'none' // 取消所有事件
  div.style.top = '0px'
  div.style.left = '0px'
  div.style.position = 'absolute'
  div.style.zIndex = '100000'
  div.style.width = containerWidth + 'px'
  div.style.height = containerHeight + 'px'
  div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
  container.appendChild(div) // 追加到页面
  
  return watermark_id
}

var resizeObserver:any = null
var watermark = {
  set: (str:string, container:any) => {

      if(resizeObserver){
        resizeObserver.disconnect()
        resizeObserver = null
      }

      setWatermark(str, container)

      resizeObserver = new ResizeObserver((entries) => {
        console.log("watermark container size changed")
        setWatermark(str, container)
      });

      resizeObserver.observe(container);
  },
}
  
export default watermark