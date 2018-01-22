function hello(){






  // var settings = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": "https://api.agora.io/dev/v1/projects/",
  //   "method": "GET",
  //   "headers": {
  //     "Authorization": "Basic YWIwN2FiN2MwZWJlNDg4ZmFkYTk2NDQ1OThmMTI5ZjE6YzQzMzc3NDhlZDIwNGMzNGJkZTcxNjgyZjFiN2FjODY=",
  //     "Cache-Control": "no-cache",
  //     "Postman-Token": "4c3c3e0a-8497-d1d8-0897-96c94fb7ac2c"
  //   }
  // }
  
  // $.ajax(settings).done(function (response) {
  //   console.log(response);
  // });
  // var settings = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": "https://api.agora.io/dev/v1/projects/",
  //   "method": "GET",
  //   "headers": {
  //     "Cache-Control": "no-cache",
  //     "Postman-Token": "94b8aa70-c2cd-d8a6-a511-ae642f2407f7"
  //   }
  // }
  
  // $.ajax(settings).done(function (response) {
  //   console.log(response);
  // });

  // var settings_1 = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": "https://api.agora.io/dev/v1/projects/",
  //   "method": "GET",
  //   "headers": {}
  // }
  
  // $.ajax(settings).done(function (response) {
  //   console.log(response);
  // });




  var username = "ab07ab7c0ebe488fada9644598f129f1";
  var pwd = "c4337748ed204c34bde71682f1b7ac86";
    $.ajax({
      // url: "https://api.agora.io/dev/v1/kicking-rule/",
      url:"https://api.agora.io/dev/v1/projects/",
      type: "GET",
      headers: {"Content-type": "application/json"},
      data:JSON.stringify({
        username:username,
        password:pwd
      })
    }).done(function (result) {
        console.log(result);
    });
  }
