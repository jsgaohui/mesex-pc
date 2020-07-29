/**
 * Created by liang.zc on 2018/1/26.
 */

// import {Base64} from "js-base64";
import {hisQuotation, getServerTime} from "./quotation";
import { reloadKline,onAction } from '@/utils/quotation'
// import datafeedUtil from "../utils/datafeedUtil";

let Datafeeds = {};
Datafeeds.UDFCompatibleDatafeed = function (symbolInfo) {
  this._configuration = undefined;

  this._symbolInfo = symbolInfo;
  this._barsPulseUpdater = new Datafeeds.DataPulseUpdater(this);

  this._enableLogging = false;
  this._initializationFinished = false;
  this._callbacks = {};
  this._initialize();
};

Datafeeds.UDFCompatibleDatafeed.prototype.defaultConfiguration = function () {
  return {
    supports_search: false,
    supports_group_request: true,
    supported_resolutions: this._symbolInfo.supported_resolutions,
    supports_marks: false,
    supports_timescale_marks: false,
    supports_time: true
  };
};

Datafeeds.UDFCompatibleDatafeed.prototype.getServerTime = function (callback) {
  if (this._configuration.supports_time) {
    getServerTime().then((response) => {
      if (response.code === 200) {
        callback(response.data.serverTime)
      }
    })
  }
};

Datafeeds.UDFCompatibleDatafeed.prototype.on = function (event, callback) {
  if (!this._callbacks.hasOwnProperty(event)) {
    this._callbacks[event] = [];
  }

  this._callbacks[event].push(callback);
  return this;
};

Datafeeds.UDFCompatibleDatafeed.prototype._fireEvent = function (event, argument) {
  if (this._callbacks.hasOwnProperty(event)) {
    let callbacksChain = this._callbacks[event];
    for (let i = 0; i < callbacksChain.length; ++i) {
      callbacksChain[i](argument);
    }

    this._callbacks[event] = [];
  }
};

Datafeeds.UDFCompatibleDatafeed.prototype.onInitialized = function () {
  this._initializationFinished = true;
  this._fireEvent('initialized');
};

Datafeeds.UDFCompatibleDatafeed.prototype._logMessage = function (message) {
  if (this._enableLogging) {
    let now = new Date();
  }
};

Datafeeds.UDFCompatibleDatafeed.prototype._initialize = function () {
  this._configuration = this.defaultConfiguration();
  this.onInitialized();
  this._fireEvent('configuration_ready');
}

Datafeeds.UDFCompatibleDatafeed.prototype.onReady = function (callback) {
  let _this = this;

  if (this._configuration) {
    setTimeout(function () {
      callback(_this._configuration);
    }, 0);
  } else {
    this.on('configuration_ready', function () {
      callback(_this._configuration);
    });
  }
};

//	===============================================================================================================================
//	The functions set below is the implementation of JavaScript API.

Datafeeds.UDFCompatibleDatafeed.prototype.resolveSymbol = function (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
  let _this = this;

  setTimeout(function () {
    onSymbolResolvedCallback(_this._symbolInfo);
  }, 0);
};


  Datafeeds.UDFCompatibleDatafeed.prototype.getBars = function (symbolInfo, resolution, rangeStartDate, rangeEndDate, onHistoryCallback, onErrorCallback, firstDataRequest) {
  //	timestamp sample: 1399939200
  if (rangeStartDate > 0 && (rangeStartDate + '').length > 10) {
    throw new Error(['Got a JS time instead of Unix one.', rangeStartDate, rangeEndDate]);
  }
  // var cacheData = JSON.parse(sessionStorage.getItem("cacheData"));
  // if(cacheData){
  //  sessionStorage.removeItem("cacheData");
  //   let meta = {noData: true};
  //   getServerTime().then((response) => {
  //     if (response.code === 200) {
  //       meta['nextTime'] = response.data.serverTime;
  //     }
  //   })
  //
  //   // 只会执行一次
  //   onHistoryCallback(cacheData, meta);
  //   return;
  // }
  // var cacheKey = "TradeViewDataHistory_" + resolution + "_" + symbolInfo.ticker;
  // let cacheData = localStorage.getItem(cacheKey);
  // if (cacheData&&cacheData.length>0) {
  //   cacheData = JSON.parse(cacheData);
  //   rangeStartDate = cacheData[cacheData.length - 1]["time"];
  // }else{
  //   cacheData=[];
  // }
  hisQuotation({
      symbol: symbolInfo.ticker,
      startTimeStamp: rangeStartDate,
      endTimeStamp: rangeEndDate,
      step: this.getStepByResolution(resolution)
    }
  ).then((response) => {
    var cacheData=[];
    if (!response.data) {
      onHistoryCallback(cacheData, meta);
      return;
    }
    let kLineData = response.data.kLineData;
    if(!kLineData){
      onHistoryCallback(cacheData, meta);
      return;
    }
    let klineList = kLineData.kLineList;

    if (!klineList) {
      onHistoryCallback(cacheData, meta);
      return;
    }
    var replaceLast=false;
    for (let i = 0; i < klineList.length; i++) {
      var quotation = klineList[i];
      if (quotation) {
        var time=quotation.sTimeStamp*1000;
        // if(Object.keys(cacheData).length!==0){
        //   var lastTime=cacheData[cacheData.length-1].time;
        //   if(time===lastTime){
        //     cacheData[cacheData.length-1].open=quotation.open
        //       cacheData[cacheData.length-1].close= quotation.close
        //       cacheData[cacheData.length-1].high=quotation.high
        //       cacheData[cacheData.length-1].low=quotation.low
        //       cacheData[cacheData.length-1].volume=quotation.volume
        //     replaceLast=true;
        //   }else if(time<lastTime){
        //     continue;
        //   }
        // }
        if(!replaceLast){
          cacheData.push({
            time: time,
            close: quotation.close,
            open: quotation.open,
            high: quotation.high,
            low: quotation.low,
            volume: quotation.volume
          });
        }
      }
    }
    // localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    var nodata = !kLineData.hasNext;
    // if (cacheData && cacheData.length > 0) {
    //   nodata = false;
    // }
    let meta = {noData: nodata};
    if (nodata) {
      getServerTime().then((response) => {
        if (response.code === 200) {
          meta['nextTime'] = response.data.serverTime;
        }
      })
    }
    sessionStorage.removeItem("cacheData");
    // 只会执行一次
    onHistoryCallback(cacheData, meta);

  })
};

// 订阅K线数据。图表库将调用onRealtimeCallback方法以更新实时数据。
Datafeeds.UDFCompatibleDatafeed.prototype.subscribeBars = function (symbolInfo, resolution, onRealtimeCallback, listenerGUID, onResetCacheNeededCallback) {
  this._barsPulseUpdater.subscribeDataListener(symbolInfo, resolution, onRealtimeCallback, listenerGUID, onResetCacheNeededCallback);
};

// 取消订阅K线数据。在调用subscribeBars方法时,图表库将跳过与subscriberUID相同的对象。
Datafeeds.UDFCompatibleDatafeed.prototype.unsubscribeBars = function (listenerGUID) {
  this._barsPulseUpdater.unsubscribeDataListener(listenerGUID);
};

// 图表库在它要请求一些历史数据的时候会调用这个函数，让你能够覆盖所需的历史深度。
Datafeeds.UDFCompatibleDatafeed.prototype.calculateHistoryDepth = function (period, resolutionBack, intervalBack) {
  if(period == "1M"){
    return {
      resolutionBack:'M',
      intervalBack: 100,
    }
  } else  if(period == "1W"){

    return {
      resolutionBack:'M',
      intervalBack: 40,
    }
  }
  if(period == "1D"){
    return {
      resolutionBack:'M',
      intervalBack: 6,
    }
  }else  if(period == "60"){
    return {
      resolutionBack:'D',
      intervalBack: 10,
    }
  }else  if(period == "15"){
    return {
      resolutionBack:'D',
      intervalBack: 3,
    }
  }else  if(period == "30"){
    return {
      resolutionBack:'D',
      intervalBack: 6,
    }
  }else  if(period == "5"){
    return {
      resolutionBack:'',
      intervalBack: 1000,
    }
  }else if(period == "1"){
    return {
      resolutionBack:'',
      intervalBack: 350,
    }
  }

};


Datafeeds.DataPulseUpdater = function (datafeed) {
  this._datafeed = datafeed;
  this._subscriber = {};

    // if(result){
    //   window.stompLoad=false;
    // }
  // }
};
Datafeeds.UDFCompatibleDatafeed.prototype.subcribeKline = function(solution){
  reloadKline(this._symbolInfo.name,solution)
  let that = this._barsPulseUpdater;
  onAction('reloadSymbolKline', (rsp) => {
    let quotation=rsp.list
    if (quotation) {
      var subscriptionRecord = that._subscriber;
      if (subscriptionRecord) {
        var resolution = subscriptionRecord.resolution;
        if (subscriptionRecord.symbolInfo && quotation.symbol == subscriptionRecord.symbolInfo.ticker && quotation.period == resolution) {
          var bar = {
            time: quotation.sTimeStamp * 1000,
            close: quotation.close,
            open: quotation.open,
            high: quotation.high,
            low: quotation.low,
            volume: quotation.volume
            // period: quotation.period,
            // symbol: quotation.symbol
          }
          subscriptionRecord.listener(bar);
          // let resolutionTime = datafeedUtil.filteringTime(resolution); //合并到历史数据缓存中
          // datafeedUtil.dealWebsocket(bar)
        }
      }
    }
  })
}

Datafeeds.DataPulseUpdater.prototype.periodLengthSeconds = function (resolution, requiredPeriodsCount) {
  var daysCount = 0;

  if (resolution == "D") {
    daysCount = requiredPeriodsCount;
  }
  else if (resolution == "M") {
    daysCount = 31 * requiredPeriodsCount;
  }
  else if (resolution == "W") {
    daysCount = 7 * requiredPeriodsCount;
  }
  else {
    daysCount = requiredPeriodsCount * resolution / (24 * 60);
  }

  return daysCount * 24 * 60 * 60;
};

Datafeeds.DataPulseUpdater.prototype.subscribeDataListener = function (symbolInfo, resolution, onRealtimeCallback, listenerGUID,onResetCacheNeededCallback) {

  this._datafeed._logMessage("Subscribing " + listenerGUID);

  this._subscriber = {
    symbolInfo: symbolInfo,
    resolution: resolution,
    listener: onRealtimeCallback,
    dataCallback:onResetCacheNeededCallback
  };
};

Datafeeds.DataPulseUpdater.prototype.unsubscribeDataListener = function (listenerGUID) {
  this._datafeed._logMessage("Unsubscribing " + listenerGUID);
  delete this._subscriber;
};


Datafeeds.UDFCompatibleDatafeed.prototype.getStepByResolution = function (resolution) {
  let step = parseFloat(resolution);
  let filter = resolution.toString().match(/[a-z]/i);

  if (isNaN(step)) {
    step = 1;
  }

  if (filter) {
    switch (filter[0].toUpperCase()) {
      case "D":
        step *= 24 * 60;
        break;
      case "W":
        step *= 7 * 24 * 60;
        break;
      case "M":
        step *= 30 * 24 * 60;
        break;
    }
  } else {
    step *= 1;
  }

  return step;
}

export default {
  UDFCompatibleDatafeed: Datafeeds.UDFCompatibleDatafeed
};
