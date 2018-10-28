//index.js  
//获取应用实例  
var app = getApp()

//快递缓存key集合
var ongoingArr = new Array();//运输中
var completedArr = new Array();//已送达
var tosendArr = new Array();//派件中

Page({

  data: {
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,


  },
  onLoad: function () {
    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

    //获取所有的key

    wx.getStorageInfo({
      success: function (res) {//获取缓存成功;

        var expressNumber = res.keys;

        for (var i = 0; i < expressNumber.length; i++) {
          //判断是否为数字
          if (!isNaN(expressNumber[i])) {
            console.log('123');
            console.log(expressNumber[i]);

            //根据快递状态插入不同数组
            if (expressNumber[i].substring(0, 1) == '1') {
              ongoingArr[i] = expressNumber[i].substring(2, expressNumber[i].length);
            } else if (expressNumber[i].substring(0, 1) == '2') {
              tosendArr[i] = expressNumber[i].substring(2, expressNumber[i].length);
            } else if (expressNumber[i].substring(0, 1) == '3') {
              completedArr[i] = expressNumber[i].substring(2, expressNumber[i].length);
            } else if (expressNumber[i].substring(0, 1) == '4') {
              completedArr[i] = expressNumber[i].substring(2, expressNumber[i].length);
            }

            console.log(ongoingArr);
            console.log(tosendArr);
            console.log(completedArr);

          }

        }
        var currentTabNumber = that.data.currentTab;
        //根据当前标签页显示对应快递数据
        if (currentTabNumber == '0') {//运输中

          console.log('ongoingArr.length' + ongoingArr.length);
          for (var i = 0; i < ongoingArr.length; i++) {
            console.log('1' + ongoingArr[i]);
            if (ongoingArr[i] != undefined) {
//只循环一次 查清原因
              console.log('1' + ongoingArr[i]);

              wx.getStorage({
                key: '1' + ongoingArr[i],
                success: function (res) {

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

                  console.log(expressDeliverystatus);
                  console.log(res.data.result.deliverystatus);
                  console.log(objCpmpany[companyType]);

                  that.setData({

                    expressStatus1: expressDeliverystatus,
                    expressNumber1: res.data.result.deliverystatus,
                    expressCompany1: objCpmpany[companyType],

                  });
                },
              })
            }

          }

        } else if (currentTabNumber == '1') {//派件中

          for (var i = 0; i < tosendArr.length; i++) {

            if (tosendArr[i] != undefined) {
              wx.getStorage({
                key: '2' + tosendArr[i],
                success: function (res) {

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

                  console.log(expressDeliverystatus);
                  console.log(res.data.result.deliverystatus);
                  console.log(objCpmpany[companyType]);

                  that.setData({

                    expressStatus2: expressDeliverystatus,
                    expressNumber2: res.data.result.deliverystatus,
                    expressCompany2: objCpmpany[companyType],

                  });
                },
              })
            }

          }

        } else if (currentTabNumber == '2') {//已送达

          for (var i = 0; i < completedArr.length; i++) {

            if (completedArr[i] != undefined) {
              wx.getStorage({
                key: '3' + completedArr[i],
                success: function (res) {

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

                  console.log(expressDeliverystatus);
                  console.log(res.data.result.deliverystatus);
                  console.log(objCpmpany[companyType]);

                  that.setData({

                    expressStatus3: expressDeliverystatus,
                    expressNumber3: res.data.result.deliverystatus,
                    expressCompany3: objCpmpany[companyType],

                  });
                },
              })
            }

          }

        }


      },
      fail:function(){//获取缓存失败

      },
      complete:function(){//获取缓存是否成功一定执行

      }

    })
   
 

  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
      console.log(e.target.dataset.current);
    }
  }
})


