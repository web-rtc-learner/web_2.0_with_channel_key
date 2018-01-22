
if(!AgoraRTC.checkSystemRequirements()) {
  alert("This browswer does not fully support Web RTC");
}

function return2Index(){

}
/* select Log type */
// AgoraRTC.Logger.setLogLevel(AgoraRTC.Logger.NONE);
// AgoraRTC.Logger.setLogLevel(AgoraRTC.Logger.ERROR);
// AgoraRTC.Logger.setLogLevel(AgoraRTC.Logger.WARNING);
// AgoraRTC.Logger.setLogLevel(AgoraRTC.Logger.INFO);  
// AgoraRTC.Logger.setLogLevel(AgoraRTC.Logger.DEBUG);

/* simulated data to proof setLogLevel() */
//AgoraRTC.Logger.error('this is error');
//AgoraRTC.Logger.warning('this is warning');
//AgoraRTC.Logger.info('this is info');
//AgoraRTC.Logger.debug('this is debug');
//AgoraRTC.Logger.setLogLevel(AgoraRTC.Logger.ERROR);
//  AgoraRTC.Logger.setLogLevel(AgoraRTC.Logger.NONE);

var client,localStream, camera, microphones,shareClient,test_appcert,shareScream;
var channel_key,test_uid,test_appcert;

var audioSelect = document.querySelector('select#audioSource');
var videoSelect = document.querySelector('select#videoSource');
var inputChannelKey = input_channel_key.value;
function join_channel(){
 
    channel_key = inputChannelKey;
    if(uid.value==="0"){
        test_uid = null;
    }else {
        test_uid = parseInt(uid.value);
    }
    test_appcert = appcert.value;
    if(input_channel_key.value){
      channel_key=input_channel_key.value;
      join();    
    }
    if (!test_appcert) {
        console.log("No channel Key Applied");
        document.getElementById("genChannelKey").innerHTML = "No app cert Applied";
        channel_key = null;
        join();
    } else if(input_channel_key.value){
      channel_key = input_channel_key.value;
join();
    } else {
      $.ajax({
        url: 'http://recording.agorapremium.agora.io:9001/agora/media/genDynamicKey5?uid='+ uid.value +'&key=' + appid.value + '&sign=' + test_appcert + '&channelname=' + channel.value
    }).done(function (key) {
        channel_key = key;
        console.log("Channel key is " + key);
        document.getElementById("genChannelKey").innerHTML = channel_key;
        join();
    });
    }
  
}

function join() {
console.log("Init AgoraRTC client with vendor key: " + appid.value);
switch (mode.value) {
  case "":
  client = AgoraRTC.createClient();
    break;
  case "interop":
  client = AgoraRTC.createClient({mode:'interop'});
    break;
  default:
  client = AgoraRTC.createClient({mode:'h264_interop'});
    break;
}
  client.init(appid.value, function () {
    console.log("AgoraRTC client initialized");
  //         client.configPublisher({
  //      width: 360,
  //      height:  360,
  //      framerate: 15,
  //      bitrate: 500,
  //      publishUrl: "rtmp://vid-218.push.fastweb.broadcastapp.agora.io/live/1234_123"
  // });
    client.join(channel_key, channel.value,test_uid, function(uid) {
      console.log("User " + uid + " join channel successfully");
      document.getElementById("leave").disabled = false;
      document.getElementById("join").disabled = true;
      if (document.getElementById("video").checked) {
        camera = videoSource.value;
        microphone = audioSource.value;
        // alert(camera);
        
  localStream = AgoraRTC.createStream({streamID: uid, audio: true, cameraId: camera, microphoneId: microphone, video:true, screen: false});
        //localStream = AgoraRTC.createStream({streamID: uid, audio: false, cameraId: camera, microphoneId: microphone, video: false, screen: true, extensionId: 'minllpmhdgpndnkomcoccfekfegnlikg'});
        // localStream.disableVideo();
        if (document.getElementById("video").checked) {
          vp = videoProfile.value;
          console.log("video profile is " + vp);
          localStream.setVideoProfile(vp);  
        }

        // The user has granted access to the camera and mic.
        localStream.on("accessAllowed", function() {
          console.log("accessAllowed");
        });

        // The user has denied access to the camera and mic.
        localStream.on("accessDenied", function() {
          console.log("accessDenied");
        });
        
        localStream.init(function() {
          console.log("getUserMedia successfully");
          localStream.play('agora_local');

          client.publish(localStream, function (err) {
            console.log("Publish local stream error: " + err);
          });

          client.on('stream-published', function (evt) {
            console.log("Publish local stream successfully");
          });
        }, function (err) {
          console.log("getUserMedia failed", err);
        });
      }
    }, function(err) {
      console.log("Join channel failed", err);
      document.getElementById("status").innerHTML = err;

    });
  }, function (err) {
    console.log("AgoraRTC client init failed", err);
  });

  channelKey = "";
  client.on('error', function(err) {
    console.log("Got error msg:", err.reason);
    if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
      client.renewChannelKey(channelKey, function(){
        console.log("Renew channel key successfully");
      }, function(err){
        console.log("Renew channel key failed: ", err);
      });
    }
  });


  client.on('stream-added', function (evt) {
    var stream = evt.stream;
    console.log("New stream added: " + stream.getId());
    console.log("Subscribe ", stream);
    console.log("The stream has video: "+stream.hasVideo());
    console.log("The stream has video: "+stream.hasAudio());
    console.log("*********************");
    console.log(stream);
    console.log("*********************");
    client.subscribe(stream, function (err) {
      console.log("*********************");
      console.log(stream);
      console.log("*********************");
      console.log("Subscribe stream failed", err);
    });
  });

  client.on('stream-subscribed', function (evt) {
    var stream = evt.stream;
   
    console.log("Subscribe remote stream successfully: " + stream.getId());
    // if(stream.getId()==shareScream.getId()){
    //   console.log("local share screen stream is found");
    // }
    if ($('div#video #agora_remote'+stream.getId()).length === 0  ){
      $('div#video').append('<div id="agora_remote'+stream.getId()+'" style="float:left; width:210px;height:147px;display:inline-block;"></div>');
      // $('div#video').append('<lable>Remoter Video Source</lable')
    }
    stream.play('agora_remote' + stream.getId());
  });

  client.on('stream-removed', function (evt) {
    var stream = evt.stream;
    stream.stop();
    $('div#video').remove('<lable>Remoter Video Source</lable')
    $('#agora_remote' + stream.getId()).remove();
    console.log("Remote stream is removed " + stream.getId());
  });

  client.on('peer-leave', function (evt) {
    var stream = evt.stream;
    if (stream) {
      stream.stop();
      $('#agora_remote' + stream.getId()).remove();
      console.log(evt.uid + " leaved from this channel");
    }
  });

  client.on('client-banned',function(evt){
      var h_uid= evt.uid;
      var attr = evt.attr;
   console.log(" user banned:" + uid + ", banntype:" + attr);
   alert(" user banned:" + uid + ", banntype:" + attr);
  });

  client.enableDualStream(function(onSuccess){
      console.log("Duel Stream Enabled")
  }, function(onFailure){
      console.log("Failed to Enable Duel Stream");
  });
  client.disableDualStream(function(onSuccess){
    console.log("Duel Stream Disabled")
  }, function(onFailure){
    console.log("Failed to Disable Duel Stream");
  });

}

function switchDuelStream(){
  switchStream = function (){
    if (highOrLow === 0) {
      highOrLow = 1
      console.log("Switch from high to low");
    }
    else {
      highOrLow = 0
      console.log("Switch from low to high");
    }
  
    client.setRemoteVideoStreamType(localStream, hightOrLow);
  }
}

function leave() {
  document.getElementById("leave").disabled = true;
  client.leave(function () {
    console.log("Leavel channel successfully");
    document.getElementById("join").disabled = false;
  }, function (err) {
    console.log("Leave channel failed");
  });
}

function publish() {
  document.getElementById("publish").disabled = true;
  document.getElementById("unpublish").disabled = false;
  client.publish(localStream, function (err) {
    console.log("Publish local stream error: " + err);
  });
}

function unpublish() {
  document.getElementById("publish").disabled = false;
  document.getElementById("unpublish").disabled = true;
  client.unpublish(localStream, function (err) {
    console.log("Unpublish local stream failed" + err);
  });
}

function getDevices() {
  AgoraRTC.getDevices(function (devices) {
    console.log(devices);
    for (var i = 0; i !== devices.length; ++i) {
      var device = devices[i];
      var option = document.createElement('option');
      option.value = device.deviceId;
      if (device.kind === 'audioinput') {
        option.text = device.label || 'microphone ' + (audioSelect.length + 1);
        audioSelect.appendChild(option);
      } else if (device.kind === 'videoinput') {
        option.text = device.label || 'camera ' + (videoSelect.length + 1);
        videoSelect.appendChild(option);
      } else {
        console.log('Some other kind of source/device: ', device);
      }
    }
  });
}

function get_status(){
  localStream.getStats(function(stats){
    console.log(stats);
    console.log(stats.audioSendBytes);
  });
}

function display_volume(){
  setInterval(function() {
    var audioLevel = localStream.getAudioLevel();
        // use audioLeve to render UI
      document.getElementById("uid_volume").innerHTML = localStream.getId();
      document.getElementById("volume").innerHTML = audioLevel; 
    }, 100)
}



function share() {
    channel_key = inputChannelKey;
    if(share_uid.value==="0"){
        share_uid = null;
    }else {
        share_uid = parseInt(share_uid.value);
    }

    test_appcert = appcert.value;
    if (!test_appcert) {
        console.log("No channel Key Applied");
        document.getElementById("genChannelKey").innerHTML = "No app cert Applied";
    } else {
        $.ajax({
            url: 'http://recording.agorapremium.agora.io:9001/agora/media/genDynamicKey5?uid=0&key=' + appid.value + '&sign=' + test_appcert + '&channelname=' + channel.value
        }).done(function (key) {
            channel_key = key;
            console.log("Channel key is " + key);
            document.getElementById("genChannelKey").innerHTML = channel_key;
        });
    }

  console.log("Init AgoraRTC client with vendor key: " + appid.value);

//web 对 web
  // client = AgoraRTC.createClient({});
// 除了safari以外
  shareClient = AgoraRTC.createClient({mode: 'interop'});
// 只有 safari 需要 是有 h264_introp
  // client = AgoraRTC.createClient({mode: 'h264_interop'});
  // client.configPublisher({
  //  	width: 360,
  //  	height:  360,
  //  	framerate: 15,
  //  	bitrate: 500,
  //  	publishUrl: "rtmp://vid-218.push.fastweb.broadcastapp.agora.io/live/1234"
  // });


  shareClient.init(appid.value, function () {
    console.log("AgoraRTC client initialized");

    shareClient.join(channel_key, channel.value, share_uid, function(uid) {
      console.log("User " + uid + " join channel successfully");

      if (document.getElementById("video").checked) {
        camera = videoSource.value;
        microphone = audioSource.value;
        // localStream = AgoraRTC.createStream({streamID: uid, audio: true, cameraId: camera, microphoneId: microphone, video:true, screen: false});
        shareScream = AgoraRTC.createStream({streamID: uid, audio: false, cameraId: camera, microphoneId: microphone, video: false, screen: true, extensionId: 'minllpmhdgpndnkomcoccfekfegnlikg'});
        // localStream.disableVideo();
        shareScream.setScreenProfile('480p_1');
        // if (document.getElementById("video").checked) {
            
        // }
  //            client.configPublisher({
  //  	width: 480,
  //  	height:  480,
  //  	framerate: 15,
  //  	bitrate: 500,
  //  	publishUrl: "rtmp://vid-218.push.fastweb.broadcastapp.agora.io/live/1234_1"
  // });

        // The user has granted access to the camera and mic.
        shareScream.on("accessAllowed", function() {
          console.log("accessAllowed");
        });

        // The user has denied access to the camera and mic.
        shareScream.on("accessDenied", function() {
          console.log("accessDenied");
        });

        shareScream.init(function() {
          console.log("getUserMedia successfully");
          shareScream.play('agora_local');

          shareClient.publish(shareScream, function (err) {
            console.log("Publish local stream error: " + err);
          });

          shareClient.on('stream-published', function (evt) {
            console.log("Publish local stream successfully");
          });
        }, function (err) {
          console.log("getUserMedia failed", err);
        });
      }
    }, function(err) {
      console.log("Join channel failed", err);
      document.getElementById("status").innerHTML = err;

    });
  }, function (err) {
    console.log("AgoraRTC client init failed", err);
  });

  channelKey = "";
  shareClient.on('error', function(err) {
    console.log("Got error msg:", err.reason);
    if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
      shareClient.renewChannelKey(channelKey, function(){
        console.log("Renew channel key successfully");
      }, function(err){
        console.log("Renew channel key failed: ", err);
      });
    }
  });
}


function pause_share(){

}


// if (isDynamicKey) {
//                 $.ajax({
//                     url: 'https://agorapremium-test.agora.io:9002/agora/media/genDynamicKey5?channelname=' + params.channelName + '&key=' + appId + '&sign=' + crt
//                 }).done(function (key) {
//                     cb(appId, key);
//                 });
//             } else {
//                 cb(appId);
//             }




//audioSelect.onchange = getDevices;
//videoSelect.onchange = getDevices;
getDevices();