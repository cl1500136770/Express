Page({

  /**
   * 页面的初始数据
   */
  data: {
    //头像设置默认图片
    wxHeadImg: 'http://qty83k.creatby.com/materials/origin/324748ea39a05bebe5fca7af948e23bb_origin.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log('onLoad')
    var that = this

    //检查是否已拥有获取用户信息权限
    wx.getSetting({
      success(res) {
        //如果不存在权限则进行获取
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              //调用成功后登录微信
              wx.login({
                success: function () {
                  //获取用户信息
                  wx.getUserInfo({
                    success: function (res) {
                      var userInfoData = res.userInfo;

                      console.log(userInfoData.nickName);//名字
                      console.log(userInfoData.avatarUrl);//头像
                      console.log(userInfoData.province);//所在省
                      console.log(userInfoData.city);//所在城市
                      console.log(userInfoData.gender);//性别 0：未知 1：男 2：女
                      console.log(userInfoData.country);//所在国家

                      //设置微信名和头像
                      that.setData({
                        wxName: userInfoData.nickName,
                        wxHeadImg: userInfoData.avatarUrl
                      });

                      //缓存微信头像微信名
                      wx.setStorage({
                        key: 'wxUserInfo',
                        data: userInfoData,
                      })

                    }
                  });
                }
              });

            }
          })
        } else {//如果获取用户信息权限已存在 则从缓存中提取用户名和头像

          wx.getStorage({
            key: 'wxUserInfo',
            success: function (res) {

              //设置微信名和头像
              that.setData({
                wxName: res.data.nickName,
                wxHeadImg: res.data.avatarUrl
              });
            }
          })

        }

      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})