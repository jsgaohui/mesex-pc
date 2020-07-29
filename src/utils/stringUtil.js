export function strString(str) {
  if (str) {
    if (str.length == 11) {
      return str.substr(0, 3) + "****" + str.substr(7);
    } else if (str.indexOf('@') > 0) {
      return str.substr(0, 3) + "****" + str.substr(str.indexOf('@')+1,str.length);
    }else if (str.length > 11) {
      return str.substr(0, 3) + "****" + str.substr(str.length - 4);
    } else {
      return str.substr(0, 3) + "****"
    }
  }
}

/**
 *
 * @param arr 待排序数组
 * @param name
 * @param snum
 * @returns {*}
 */
export function quickSort(arr,name,snum){
//如果数组<=1,则直接返回
  if(arr.length<=1){return arr;}
  var pivotIndex=Math.floor(arr.length/2);
//找基准，并把基准从原数组删除
  var pivot=arr.splice(pivotIndex,1)[0];
  var middleNum=pivot[name];
// 定义左右数组
  var left=[];
  var right=[];
//比基准小的放在left，比基准大的放在right
  if(snum){
    for(var i=0;i<arr.length;i++){
      if(Number(arr[i][name])<=Number(middleNum) ){
        left.push(arr[i]);
      }else{
        right.push(arr[i]);
      }
    }
  }else{
    for(var i=0;i<arr.length;i++){
      if(arr[i][name]<=middleNum){
        left.push(arr[i]);
      }else{
        right.push(arr[i]);
      }
    }
  }
//递归,返回所需数组
  return quickSort(left,name,snum).concat([pivot],quickSort(right,name,snum));

}

export function escape2Html(str) {
  if (str) {
    var arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'};
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
      return arrEntities[t];
    });
  }
  return ""
}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

/*科学计数法转换数值*/
export function scientificToNumber(num) {
  var str = num;
  var reg = /^(\d+)(e)([\-]?\d+)$/;
  var arr, len,
    zero = '';

  /*6e7或6e+7 都会自动转换数值*/
  if (!reg.test(str)) {
    return num;
  } else {
    /*6e-7 需要手动转换*/
    arr = reg.exec(str);
    len = Math.abs(arr[3]) - 1;
    for (var i = 0; i < len; i++) {
      zero += '0';
    }

    return '0.' + zero + arr[1];
  }
}

/*显示法币位数*/
export function formatAmount(num) {
  if(!(typeof num==='Number')){
    num=Number.parseFloat(num)
  }
  if(num>0.5){
    num= num.toFixed(2)
  }else if(num<0.5&&num>0.01){
    num= num.toFixed(3)
  }else if(num<0.01&&num>0.001){
    num= num.toFixed(4)
  }else if(num<0.001&&num>0.0001){
    num= num.toFixed(5)
  }else{
    num=num.toFixed(2)
  }
  let numStrs=num.toString().split('.')
  return numStrs[0].replace(/\B(?=(\d{3})+(?!\d))/g,',')+'.'+numStrs[1]
}

function unitConvert(num) {
  var moneyUnits = ["个", "万", "亿"]
  var dividend = 10000
  var curentNum = num //转换数字
  var curentUnit = moneyUnits[0] //转换单位
  for (var i = 0; i <4; i++) {
    curentUnit = moneyUnits[i]
    if(strNumSize(curentNum)<5){
      break;
    }
    curentNum = curentNum / dividend
  }
  var m = {num: 0, unit: ""}
  m.num = curentNum.toFixed(2)
  m.unit = curentUnit
  return m
}

function strNumSize(tempNum){
  var stringNum = tempNum.toString()
  var index = stringNum.indexOf(".")
  var newNum = stringNum
  if(index!=-1){
    newNum = stringNum.substring(0,index)
  }
  return newNum.length
}

  /**
 * 格式化数字  把最后多余的0去掉
 * @param data  数据
 * @param precision  精度
 * @returns {string}
 */
export function format (data, precision) {
  return Number.parseFloat(data).toFixed(precision).replace(/[.]?0+$/g, '')
}
/**
 * 截取几位小数,向下取整
 */
export function floor (data, precision) {
  let temp = Math.pow(10, precision)
  return Math.floor(Number.parseFloat(data) * temp) / temp
}
/**
 * 限制只允许输入数字和小数点
 * @param len
 * @param e
 */
export function checkCode(len = 2, e) {
  let keyCode = e.keyCode
  // get the cursor position dynamic, because some event like click, will change the position unexpected, not only the input event
  let getCursorPos = (ctrl) => {
    var CaretPos = 0
    if (document.selection) {
      ctrl.focus()
      var Sel = document.selection.createRange()
      Sel.moveStart('character', -ctrl.value.length)
      CaretPos = Sel.text.length
    } else if (ctrl.selectionStart || ctrl.selectionStart === '0') {
      CaretPos = ctrl.selectionStart
    }
    return CaretPos
  }
  let cursorPosition = getCursorPos(e.target)
  let inputVal = e.key
  if ([37, 39, 8, 190, 110, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59].indexOf(keyCode) !== -1||(keyCode>=96&&keyCode<=105)) {
    let valArr = e.target.value.split('')
    // remove useless input [ArrowLeft, ArrowRight]
    if ([37, 39].indexOf(keyCode) === -1) {
      if (keyCode === 8) {  // if delete
        valArr.splice(cursorPosition, 1)
      } else {
        valArr.splice(cursorPosition, 0, inputVal)
      }
    }
    let dummyVal = valArr.join('')
    let reg
    if (len > 0) {
      reg = new RegExp(`^(([1-9]+[0-9]*.?[0-9]{0,${len}})|(0.?[0-9]{0,${len}}))$`)
    } else {
      reg = /^(([1-9]+[0-9]*)|0)$/
    }
    if (!reg.test(dummyVal) && [37, 39, 8].indexOf(keyCode) === -1) e.preventDefault()
  } else {
    e.preventDefault()
  }

}

/**
 * 格式化字符串
 * @param txt
 * @param args
 * @returns {*}
 */
export  function formatStr(args,txt) {
  var values = arguments;
  return txt.replace(/\{(\d+)\}/g, function (match, index) {
    if (values.length > index) {
      return values[index];
    } else {
      return "";
    }
  });
}
