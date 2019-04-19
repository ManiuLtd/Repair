var onDeviceReady = function() {
  document.addEventListener("jpush.receiveRegistrationId", function (event) {
    alert("receiveRegistrationId" + JSON.stringify(event));
    $("#registrationId").html(event.registrationId);
  }, false)

  initiateUI();
};

var getRegistrationID = function() {
  window.JPush.getRegistrationID(onGetRegistrationID);
};

var onGetRegistrationID = function(data) {
  try {
    console.log("JPushPlugin:registrationID is " + data);

    if (data.length == 0) {
      var t1 = window.setTimeout(getRegistrationID, 1000);
    }

    $("#registrationId").html(data);
  } catch (exception) {
    console.log(exception);
  }
};

var onTagsWithAlias = function(event) {
  try {
    console.log("onTagsWithAlias");
    var result = "result code:" + event.resultCode + " ";
    result += "tags:" + event.tags + " ";
    result += "alias:" + event.alias + " ";
    $("#tagAliasResult").html(result);
  } catch (exception) {
    console.log(exception)
  }
};

var onOpenNotification = function(event) {
  try {
    var alertContent;
    if (device.platform == "Android") {
      alertContent = event.alert;
    } else {
      alertContent = event.aps.alert;
    }
    alert("open Notification:" + alertContent);
  } catch (exception) {
    console.log("JPushPlugin:onOpenNotification" + exception);
  }
};

var onReceiveNotification = function(event) {
  try {
    var alertContent;
    if (device.platform == "Android") {
      alertContent = event.alert;
    } else {
      alertContent = event.aps.alert;
    }
    $("#notificationResult").html(alertContent);
  } catch (exception) {
    console.log(exception)
  }
};

var onReceiveMessage = function(event) {
  try {
    var message;
    if (device.platform == "Android") {
      message = event.message;
    } else {
      message = event.content;
    }
    $("#messageResult").html(message);
  } catch (exception) {
    console.log("JPushPlugin:onReceiveMessage-->" + exception);
  }
};

var initiateUI = function() {
  try {
    window.JPush.init();
    window.JPush.setDebugMode(true);
    window.setTimeout(getRegistrationID, 1000);

    if (device.platform != "Android") {
      window.JPush.setApplicationIconBadgeNumber(0);
    }
  } catch (exception) {
    console.log(exception);
  }

  $("#setTags").click(function(ev) {
    try {
      var tag1 = $("#tagText1").val()
      var tag2 = $("#tagText2").val()
      var tag3 = $("#tagText3").val()
      var tags = []

      if (tag1) {
        tags.push(tag1)
      }
      if (tag2) {
        tags.push(tag2)
      }
      if (tag3) {
        tags.push(tag3)
      }

      window.JPush.setTags({ sequence: 1, tags: tags },
        function (result) {
          $("#tagsResult").html(result.tags)
        }, function (error) {
          alert(error.code)
        })
    } catch (exception) {
      console.log(exception)
    }
  })

  $("#getAllTags").click(function (event) {
    window.JPush.getAllTags({ sequence: 2 },
      function (result) {
        $("#tagsResult").html(result.tags)
      }, function (error) {
        alert(error.code)
      })
  })

  $("#cleanTags").click(function (event) {
    window.JPush.cleanTags({ sequence: 2 },
      function (result) {
        alert(result.sequence)
        $("#tagsResult").html("")
      }, function (error) {
        alert(error.code)
      })
  })

  $("#setAlias").click(function (event) {
    var alias = $("#aliasText").val()
    window.JPush.setAlias({ sequence: 1, alias: alias },
      function (result) {
        $("#aliasResult").html(result.alias)
      }, function (error){
        alert(error.code)
      })
  })

  $("#getAlias").click(function (event) {
    window.JPush.getAlias({ sequence: 2 },
      function (result) {
        alert(JSON.stringify(result));
      }, function (error) {
        alert(error.code)
      })
  });

  $("#deleteAlias").click(function (event) {
    window.JPush.deleteAlias({ sequence: 3 },
      function (result) {
        alert(JSON.stringify(result));
      }, function (error) {
        alert(error.code)
      })
  });
};

document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("jpush.openNotification", onOpenNotification, false);
document.addEventListener("jpush.receiveNotification", onReceiveNotification, false);
document.addEventListener("jpush.receiveMessage", onReceiveMessage, false);
