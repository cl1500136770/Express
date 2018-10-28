// pages/index/index.js

var WxSearch = require('../../wxSearch/wxSearch.js')

var app = getApp();

var apiKey = "9a824adbf3ae1e57";
var expressUrl = "http://api.jisuapi.com/express/query";
var inputValue = '';

//快递公司编码对照JSON
var companyDataJson = '';

Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //初始化的时候渲染wxSearchdata 第二个为你的search高度
    WxSearch.init(that, 43, ['weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification']);
    WxSearch.initMindKeys(['0']);

    companyDataJson = app.globalData.companyDataJson;//获取快递对照编码JSON

  },

  indexClcikSearch: function () {

    var that = this
    //数据加载完成之前，显示加载中提示框
    wx.showToast({
      title: '查询中',
      icon: 'loading',
      duration: 10000
    });

    //输入框没有值
    if (that.data.inputValue == null) {

      wx.hideToast();
      wx.showModal({

        content: '请输入正确的快递单号',
        showCancel: false,
        confirmColor: '#000000',

      });
      return;

    }

    //查询快递
    wx.request({
      // url: expressUrl + "?appkey=" + apiKey + "&type=auto&number=" + inputValue,
      url: 'https://www.easy-mock.com/mock/592d4acd91470c0ac1feb0e8/test/wechat/test/wechat',
      data: {},
      method: 'GET',
      header: { 'Content-type': 'application/json' },
      success: function (res) {

        console.log(res.data.status);

        //对返回的快递状态进行提示
        if (res.data.status == '201') {
          wx.hideToast();
          wx.showModal({

            content: '快递单号不存在或未发货',
            showCancel: false,
            confirmColor: '#000000',

          });
        } else if (res.data.status == '204') {
          wx.hideToast();
          wx.showModal({

            content: '快递公司识别失败，请重试',
            showCancel: false,
            confirmColor: '#000000',

          });

        } else {

          //设置快件状态
          var expressDeliverystatus = '';
          var companyType = res.data.result.type;
          var objCpmpany = JSON.parse(companyDataJson);//JSON转对象再进行操作

          if (res.data.result.deliverystatus == '1') {
            expressDeliverystatus = '在途中';
          } else if (res.data.result.deliverystatus == '2') {
            expressDeliverystatus = '派件中';
          } else if (res.data.result.deliverystatus == '3') {
            expressDeliverystatus = '已签收';
          } else if (res.data.result.deliverystatus == '4') {
            expressDeliverystatus = '派送失败(拒签等)';
          }

          console.log(res.data.result.list);
          console.log(expressDeliverystatus);

          wx.hideToast();
          that.setData({

            //返回数据状态
            //返回数据msg
            //返回快递状态
            //返回数据
            //返回快递单号
            //返回快递公司
            //返回快递list
            isclickexpresshide: false,     //订单页面显示
            expressStatus: res.data.status,
            expressMsg: res.data.msg,
            expressDeliverystatus: expressDeliverystatus,
            expressData: res.data.result,
            expressNumber: res.data.result.number,
            expressCompany: objCpmpany[companyType],//动态提取对象中的值时需要用[]
            expressDataList: res.data.result.list,

          });

          //将流水号数据存储至缓存中 1:运输中 2:派件中 3:已签收 4:派件失败
          if (res.data.result.deliverystatus == '1') {
            wx.setStorage({
              key: '1' + res.data.result.number,
              data: res,
            })
          } else if (res.data.result.deliverystatus == '2') {
            wx.setStorage({
              key: '2' + res.data.result.number,
              data: res,
            })
          } else if (res.data.result.deliverystatus == '3') {
            wx.setStorage({
              key: '3' + res.data.result.number,
              data: res,
            })
          } else if (res.data.result.deliverystatus == '4') {
            wx.setStorage({
              key: '3' + res.data.result.number,
              data: res,
            })
          }

        }

        console.log(res);

      }
    })

    WxSearch.wxSearchAddHisKey(that);

  },

  //获取输入框的值
  indexClcikSearchInput: function (e) {
    var that = this
    console.log(e);

    that.setData({
      inputValue: e.detail.value
    });

    WxSearch.wxSearchInput(e, that);
  },



  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  }



})