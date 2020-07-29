// 处理二进制流
const onWsMessage = (params) => {
  let {data, callback} = params;

  let initFileReader = function () {
    let reader = new FileReader();
    reader.onloadend = (e) => {
      let text = e.srcElement.result;
      callback(text)
    }
    return reader;
  }

  let reader = initFileReader();

  if (reader) {
    reader.readAsText(data);
  }

}

// 处理历史数据
const dealWebsocket = (bar) => {
  let data = bar;
  let localStorageKey = "TradeViewDataHistory_"+data.period+"_"+data.symbol;
  let hisdata = localStorage.getItem(localStorageKey);
  let lastDataTime = 0;
  if(!hisdata){
    hisdata=new Array();
  }else{
    hisdata=JSON.parse(hisdata);
    if(hisdata&&hisdata.length>0){
      lastDataTime=hisdata[hisdata.length-1]["time"];
    }
  }
  let newDataTime = data.time;

  // 判断当前时间 + 时间间隔 和 最新时间的大小
  if (lastDataTime=== newDataTime) {
    // 替换最后一个
    hisdata[hisdata.length-1]["open"] = data.open;
    hisdata[hisdata.length-1]["close"] = data.close;
    hisdata[hisdata.length-1]["high"] = data.high;
    hisdata[hisdata.length-1]["low"] = data.low;
    hisdata[hisdata.length-1]["volume"] = data.volume;
  } else {
    // 放入最新的
    hisdata.push(data);
  }
  localStorage.setItem(localStorageKey, JSON.stringify(hisdata));
}


const filteringTime = (time) => {
  let minuteTime = 60;
  let dayTime = 60 * 60 * 24;
  let longTime = 0;
  switch (time) {
    case "1D":
      longTime = dayTime * 1;
      break;
    case "D":
      longTime = dayTime * 7;
      break;
    default:
      longTime = parseInt(time) * minuteTime;
      break;
  }
  return longTime;
}

const transformTime = (time) => {
  let period = "";
  if (time.toString().indexOf('D') !== -1) {
    if (time === "D") {
      period = "1W";
    } else {
      let dayNumber = parseInt(time.split('W')[0]);
      period = `${dayNumber}D`;
    }
  } else {
    if (parseInt(time) < 60) {
      period = `${time}min`;
    } else {
      let hourNumber = Math.floor(parseInt(time) / 60);
      period = `${hourNumber}hour`;
    }
  }

  return period;
}


export default {
  onWsMessage,
  dealWebsocket,
  filteringTime,
  transformTime
};
