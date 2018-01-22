var share,
    localIds = [],
    streamList = [],
    params = parseQuery(location.search),
    keys = {
        old: {
            communication: '74a0b7bb5d3e47c7abca0533d17b0afa',
            interop_commutication: '74a0b7bb5d3e47c7abca0533d17b0afa',
            liveBroadcast: 'f4637604af81440596a54254d53ade20'
        },
        new: {
            communication: '0c0b4b61adf94de1befd7cdd78a50444',
            interop_commutication: '0c0b4b61adf94de1befd7cdd78a50444',
            liveBroadcast: 'aab8b8f5a8cd4469a63042fcfafe7063'
        }
    },
    dynamicKey = {
        communication: 'f248443b95df480581e06497d620a48e',
        interop_commutication: 'f248443b95df480581e06497d620a48e',
        liveBroadcast: '80e54398fed94ae8a010acf782f569b7'
    },
    appCertificate = {
        communication: 'a5c832fbb6e4473a97df9300eb18eccd',
        interop_commutication: 'a5c832fbb6e4473a97df9300eb18eccd',
        liveBroadcast: '8c85123d5e8c43c88da748c2141573a7'
    },
    uid,
    mainBox = $('.main-box'),
    remoteBox = $('#remote_video_box'),
    localBox = $('.local-video'),
    extensionId = 'minllpmhdgpndnkomcoccfekfegnlikg',
    publishUrl = null,
    hignOrLow = 0, // 0 refer to high
    videoProfileTable = PROFILE_TABLE;


var utils = {
    notification: function (str) {
        var options =  {
            content: str, // text of the snackbar
            style: "alert alert-info snackbar", // add a custom class to your snackbar
            timeout: 10000 // time in milliseconds after the snackbar autohides, 0 is disabled
        }
        
        $.snackbar(options);
        // $('#notification').html(str);
    },
    error: function (str) {
        // $('#error').show().html(str);
        var options =  {
            content: str, // text of the snackbar
            style: "alert alert-danger snackbar", // add a custom class to your snackbar
            timeout: 10000 // time in milliseconds after the snackbar autohides, 0 is disabled
        }
        
        $.snackbar(options);
    },
    isMobile: function () {
        var check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera)
        return check;
    },
    backToHome: function(){
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = 'index.html';
        }
    }
}


var toInt = function(val){
    var value = parseInt(val);
    if(isNaN(value)){
        return 0;
    } else {
        return value;
    }
}

var toFloat = function(val){
    var value = parseFloat(val);
    if(isNaN(value)){
        return 0;
    } else {
        return value;
    }
}

var rtc = function () {
    var client,
        localStream,
        UID,
        transcodings,
        transcodingUsers,
        streamUrls,
        displayVolumns = false;

    return {
        getUID: function () {
            return UID;
        },
        getClient: function () {
            return client;
        },
        getLocalStream: function () {
            return localStream;
        },
        getTranscoding: function () {
            transcodingUsers = transcodingUsers || [];
            var bgcolor = $("#live_streaming_bg_color").val();
            bgcolor = parseInt(bgcolor, 16);

            if(isNaN(bgcolor)){
                bgcolor = 0;
            }

            var coding = {
                width: toInt($("#live_streaming_canvas_width").val()),
                height: toInt($("#live_streaming_canvas_height").val()),
                videoFramerate: toInt($("#live_streaming_fps").val()),
                videoBitrate: toInt($("#live_streaming_bitrate").val()),
                userCount: transcodingUsers.length,
                transcodingUsers: transcodingUsers,
                audioBitrate:toInt($("#live_streaming_audio_bitrate").val()),
                audioChannels: toInt($("#live_streaming_audio_channels").val()),
                audioSampleRate: toInt($("#live_streaming_audio_samples").val()),
                backgroundColor: bgcolor,
                lowLatency: toInt($("#live_streaming_low_latency").prop("checked")),
                userConfigExtraInfo: {},
                videoCodecProfile: toInt($("#live_streaming_codec").val()),
                videoGop: toInt($("#live_streaming_gop").val())
            };

            return coding;
        },
        setEncoding: function(){
            var coding = this.getTranscoding();
            client.setLiveTranscoding(coding);
        },
        addStreaming: function(url, enableTranscoding){
            streamUrls = streamUrls || [];

            if(streamUrls.indexOf(url) !== -1){
                utils.error("Streaming exists already");
                return;
            }

            if(!enableTranscoding){
                client.startLiveStreaming(url, false);
            } else {
                var coding = this.getTranscoding();
                client.setLiveTranscoding(coding);
                client.startLiveStreaming(url, true);
            }
            streamUrls.push(url);
            $("#live_streaming_list").append("<option value=\"" + (streamUrls.length - 1) + "\">" + streamUrls.length + " - " + url + "</option>");
        },
        removeStreaming: function(url){
            var selectedIdx = $("#live_streaming_list").val();
            var url = streamUrls.splice(selectedIdx, 1)[0];
            $("#live_streaming_list option[value=" + selectedIdx + "]").remove();
            client.stopLiveStreaming(url);
        },
        addTranscodingUser: function(user){
            transcodingUsers = transcodingUsers || [];
            transcodingUsers.push(user);
            this.refreshTranscodingUsers();
        },
        removeTranscodingUser: function(){
            var selectedIdx = $("#live_streaming_users_list").val();
            transcodingUsers.splice(selectedIdx, 1);
            this.refreshTranscodingUsers();
        },
        refreshTranscodingUsers: function(){
            var $list = $("#live_streaming_users_list");
            $list.html("");
            for(var i = 0; i < transcodingUsers.length; i++){
                $list.append("<option value=\"" + i + "\">" + (i+1) + " - " + transcodingUsers[i].uid + "</option>");
            }
        },
        getKey: function (mode, isDynamicKey) {
            if (mode == 'broadcaster' || mode == 'audience' || mode == 'safari') {
                mode = 'liveBroadcast';
            }
            if (isDynamicKey) {
                return dynamicKey[mode];
            }
            if (params.key == 'enabled') {
                return keys.new[mode];
            } else {
                return keys.old[mode];
            }
        },
        getCert: function (mode) {
            if (mode == 'broadcaster' || mode == 'audience' || mode == 'safari') {
                mode = 'liveBroadcast';
            }
            return appCertificate[mode];
        },
        getAppId: function (cb) {
            var mode = params.mode;
            mode = mode !== "communication" ? params.interop_mode : mode;
            var isDynamicKey = this.isDynamicKey();
            var appId = this.getKey(mode, isDynamicKey);

            var crt = this.getCert(mode);

            if (isDynamicKey) {
                $.ajax({
                    url: 'https://agorapremium-test.agora.io:9002/agora/media/genDynamicKey5?channelname=' + params.channelName + '&key=' + appId + '&sign=' + crt
                }).done(function (key) {
                    cb(appId, key);
                });
            } else {
                cb(appId);
            }
        },
        isDynamicKey: function () {
            var dynamicKey = params.dynamic;

            if (dynamicKey == 'enabled') {
                return true;
            } else if (dynamicKey == 'disabled') {
                return false;
            }
        },
        join: function (config) {
            var self = this;
            self.getAppId(function (appId, key) {
                if (params.mode === 'interop') {
                    client = AgoraRTC.createClient({ mode: 'interop' })
                } else if ('safari' == params.mode) {
                    client = AgoraRTC.createClient({ mode: 'h264_interop' });
                } else {
                    client = AgoraRTC.createClient();
                }

                client.init(appId, function () {
                    if (!key) {
                        key = appId;
                    }
                    client.join(key, params.channelName, undefined, function (uid) {
                        console.log(uid);
                        localIds.push(uid);
                        UID = uid
                        self.streamInit(UID, config);
                    }, function (err) {
                        // console.log("client join failed ", err); error handling
                    });
                }, function (err) {
                    // console.log("client init failed ", err); error handling
                });
                if ('screen' != config) {
                    self.subEvent();
                }

            })
        },
        setDefaultTranscoding: function () {
            var width = videoProfileTable[params.videoProfile][0] || 640,
                height = videoProfileTable[params.videoProfile][1] || 480,
                framerate = videoProfileTable[params.videoProfile][2] || 30,
                bitrate = videoProfileTable[params.videoProfile][3] || 750;

            $("#live_streaming_url_addon").html("rtmp://vid-218.push.chinanetcenter.broadcastapp.agora.io/live/");
            $("#live_streaming_bitrate").val(bitrate);
            $("#live_streaming_fps").val(framerate);
        },
        publish: function () {
            client.publish(localStream, function (err) {
                utils.notification('publish:' + err.type + ':' + err.msg);
            });
        },
        unpublish: function () {
            client.unpublish(localStream, function (err) {
                utils.notification('unpublish:' + JSON.stringify(err));
            });
        },
        toggleQuality: function () {
            $(".quality-monitor").toggle();
        },
        toggleVolumn: function(){
            displayVolumns = !displayVolumns;
            var visible = displayVolumns;
            displayVolumns ? $(".volumn-item").show() : $(".volumn-item").hide();
        },
        audioOnly: function () {
            return params["audio_only"] === "enabled";
        },
        getId: function () {
            utils.notification('getId:' + localStream.getId());
        },
        hasVideo: function () {
            utils.notification('hasVideo:' + JSON.stringify(localStream.hasVideo()));
        },
        hasAudio: function () {
            utils.notification('hasAudio:' + localStream.hasAudio());
        },
        enableVideo: function () {
            utils.notification('enableVideo:' + localStream.enableVideo());
        },
        disableVideo: function () {
            utils.notification('disableVideo:' + localStream.disableVideo());
        },
        enableAudio: function () {
            utils.notification('enableAudio:' + localStream.enableAudio());
        },
        disableAudio: function () {
            utils.notification('disableAudio:' + localStream.disableAudio());
        },
        stop: function () {
            this.localStop = true;
            utils.notification('stop:' + localStream.stop());
        },
        close: function () {
            utils.notification('close:' + localStream.close());
        },
        play: function (stream, boxId) {
            if (!stream && !boxId) {
                var localStreamBoxId = 'video-item' + localStream.getId();
                if (this.localStop) {
                    utils.notification('play:' + localStream.play(localStreamBoxId));
                    this.localStop = false;
                }
                return;
            }
            if (localStream.getId() == stream.getId() && this.localStop) {
                return;
            } else {
                console.log('play')
                stream.play(boxId);
            }
        },
        subEvent: function () {
            var self = this;
            //listen to ban event
            client.on('client-banned', function (evt) {
                var uid = evt.uid;
                var attr = evt.attr;
                utils.notification(" user banned:" + uid + ", banntype:" + attr);
                utils.backToHome();
            });

            client.on('mute-audio', function (evt) {
                var uid = evt.uid;
                utils.notification(" mute audio:" + uid);
            });
            client.on('unmute-audio', function (evt) {
                var uid = evt.uid;
                utils.notification(" unmute audio:" + uid);
            });
            client.on('mute-video', function (evt) {
                var uid = evt.uid;
                utils.notification(" mute video:" + uid);
            });
            client.on('unmute-video', function (evt) {
                var uid = evt.uid;
                utils.notification(" unmute video:" + uid);
            });
            //listen to streaming publish event
            client.on('liveStreamingStarted', function (evt) {
                utils.notification("Live streaming started");
            });  // 推流成功回调
            client.on('liveStreamingFailed', function (evt) {
                utils.error("Live streaming failed");
            });  // 推流失败回调
            client.on('liveStreamingStopped', function (evt) {
                utils.notification("Live streaming stopped");
            });  // 停止推流回调
            client.on('liveTranscodingUpdated', function (evt) {
                utils.notification("Live streaming updated");
            });  // 主播转码更新回调

            client.on('stream-added', function (evt) {
                var stream = evt.stream;
                var uid = stream.getId();
                utils.notification("stream-added:" + stream.getId());
                if (localIds.indexOf(uid) == -1) {
                    //subscribe the stream
                    client.subscribe(stream, function (err) {
                        console.info("stream subscribe");
                    });
                }
            });
            client.on('active-speaker', function (evt) {
                var uid = evt.uid;
                $('.video-item').removeClass('speaker');
                $('#video-item' + uid).addClass('speaker');
            });
            client.on('stream-removed', function (evt) {
                var uid = evt.stream.getId();
                if (localIds.indexOf(uid) == -1) {
                    self.removeStream(uid);
                    console.info("stream-removed:", uid);
                }
            });
            client.on('stream-subscribed', function (evt) {
                var stream = evt.stream;
                self.scheduleQualityDetection(stream, false);
                self.scheduleAudioVolumnCheck(stream);
                $("#live_streaming_user_uid").append("<option value='"+stream.getId()+"'>"+stream.getId()+"</option>")
                console.info("unstream-subscribed:", stream.getId());
                if (localIds.indexOf(stream.getId()) == -1) {
                    self.displayStream(stream, 'remote');
                }
            });
            client.on('peer-leave', function (evt) {
                if (evt.stream) {
                    var uid = evt.stream.getId();
                    self.removeStream(uid);
                    console.info("peer-leave:", evt.stream.getId());
                }
                console.info("peer-leave:", evt.msg);
            })
        },
        removeStream: function (uid) {
            if (getStream(uid)) {
                var itemContainer = $('#video-item' + uid);

                getStream(uid).close();
                itemContainer.remove();

                streamList.forEach(function (item, index) {
                    if (item.getId() == uid) {
                        streamList.splice(index, 1);
                    }
                });
                $("#remote-stream-switch option[value=" + uid + "]").remove();
                $("#live_streaming_user_uid option[value=" + uid + "]").remove();
                $('#quality-item' + uid).remove()
                var event = utils.isMobile() ? "tap" : "click";
                if (streamList.length == 1) {
                    localBox.find('.video-item').eq(0).trigger(event);
                } else {
                    remoteBox.find('.video-item').eq(0).trigger(event);
                }
                utils.notification("stream remove:" + uid);
            }
        },
        streamInit: function (obj, config) {
            var self = this;
            this.localStop = false;

            var defaultObj = {
                streamID: UID,
                audio: true,
                video: !this.audioOnly(),
                screen: false
            };
            if (config == 'screen') {
                defaultObj = {
                    streamID: UID,
                    audio: false,
                    video: false,
                    screen: true,
                    extensionId: extensionId
                };
            }

            var newObj;
            if (typeof obj == 'object') {
                newObj = $.extend(defaultObj, obj);
            } else {
                newObj = defaultObj;
            }

            localStream = AgoraRTC.createStream(newObj);

            // The user has denied access to the camera and mic.
            localStream.on("accessAllowed", function () {
                utils.notification("获取摄像头和麦克风权限成功");
            });

            // The user has denied access to the camera and mic.
            localStream.on("accessDenied", function () {
                utils.error("AgoraRTC无法获取摄像头和麦克风的权限，部分功能可能受限");
            });

            if (config == 'screen') {
                localStream.setScreenProfile("1080p_2");
            } else {
                localStream.setVideoProfile(params.videoProfile.split(',')[0]);
            }

            localStream.init(function () {
                $("#live_streaming_user_uid").append("<option value='"+localStream.getId()+"'>"+localStream.getId()+"</option>")
                self.displayStream(localStream);
                if (params.mode != 'audience') {
                    client.publish(localStream, function (err) {
                        console.info("publish");
                    });
                }
                client.on('stream-published', function (evt) {
                    // console.info(evt.stream.getId());
                    self.scheduleQualityDetection(localStream, true);
                    self.scheduleAudioVolumnCheck(localStream);
                });
                // publish the stream
            }, function (err) {
                utils.notification(err.type + ':' + err.msg);
                // console.log("local stream init failed ", err);
            });
        },
        scheduleQualityDetection: function (stream, islocal) {
            var self = this;
            if (!stream) {
                return;
            }
            setTimeout(function () {
                stream.getStats(function (e) {
                    // console.log(JSON.stringify(e));
                    var containerId = 'quality-item' + stream.getId();
                    var container = $("#" + containerId);
                    var content_items = ["#" + stream.getId() + (islocal ? "-local" : "-remote")];

                    if (islocal) {
                        content_items.push("aCodec: " + e.audioCodecName);
                        content_items.push("asBytes: " + e.audioSendBytes);
                        content_items.push("asPackets: " + e.audioSendPackets);
                        content_items.push("vCodec: " + e.videoCodecName);
                        content_items.push("vsBandwidth: " + e.videoSendBandwidth);
                        content_items.push("vsBytes: " + e.videoSendBytes);
                        content_items.push("vsPackets: " + e.videoSendPackets);
                        content_items.push("vsFrameRate: " + e.videoSendFrameRate);
                        content_items.push("vsPacketsLost: " + e.videoSendPacketsLost);
                        content_items.push("vsResolutionHieght: " + e.videoSendResolutionHeight);
                        content_items.push("vsResolutionWidth: " + e.videoSendResolutionWidth);
                        content_items.push("audioTrackers: " + (stream.stream.getAudioTracks()[0] && stream.stream.getAudioTracks()[0].enabled));
                        content_items.push("videoTrackers: " + (stream.stream.getVideoTracks()[0] && stream.stream.getVideoTracks()[0].enabled));
                    } else {
                        content_items.push("arBytes: " + e.audioReceiveBytes);
                        content_items.push("arPackets: " + e.audioReceivePackets);
                        content_items.push("arPacketsLost: " + e.audioReceivePacketsLost);
                        content_items.push("vrBandwidth: " + e.videoReceiveBandwidth);
                        content_items.push("vrBytes: " + e.videoReceiveBytes);
                        content_items.push("vrDecodeFrameRate: " + e.videoReceiveDecodeFrameRate);
                        content_items.push("vrFrameRate: " + e.videoReceiveFrameRate);
                        content_items.push("vrPackets: " + e.videoReceivePackets);
                        content_items.push("vrPacketsLost: " + e.videoReceivePacketsLost);
                        content_items.push("vrResolutionHieght: " + e.videoReceivedResolutionHeight);
                        content_items.push("vrResolutionWidth: " + e.videoReceivedResolutionWidth);
                        content_items.push("audioTrackers: " + (stream.stream.getAudioTracks()[0] && stream.stream.getAudioTracks()[0].enabled));
                        content_items.push("videoTrackers: " + (stream.stream.getVideoTracks()[0] && stream.stream.getVideoTracks()[0].enabled));
                    }
                    var content = content_items.join(", ");
                    if (container.length === 0) {
                        $('<div class="' + (islocal ? "quality-local":"quality-remote") + '" id="quality-item' + stream.getId() + '"></div>').appendTo(".quality-monitor");
                        container = $("#" + containerId);
                    }
                    container.html(content);
                    self.scheduleQualityDetection(stream, islocal);
                });
            }, 1000);
        },
        scheduleAudioVolumnCheck: function (stream) {
            var self = this;
            if (!stream) {
                return;
            }
            setTimeout(function () {
                var audioLevel = (stream.getAudioLevel() * 100);
                var streamId = stream.getId();
                var element = $("#video-item" + streamId);

                if(element.length !== 0){
                    element.find(".volumn-item").remove();
                    element.append("<div class=\"volumn-item " + (displayVolumns ? "" : "hidden") +"\">" + audioLevel +"</div>");
                }
                self.scheduleAudioVolumnCheck(stream);
            }, 1000);
        },
        setDevice: function () {
            this.unpublish();
            this.stop();
            this.removeStream(UID);
            this.streamInit({ cameraId: $('#js_set_device_video').val(), microphoneId: $('#js_set_device_audio').val() });
        },
        getDevices: function () {
            AgoraRTC.getDevices(function (devices) {
                var htmlString = '',
                    videoHtml = '',
                    audioHtml = '';
                devices.forEach(function (item) {
                    if (item['kind'] == 'audioinput') {
                        audioHtml += '<option value=' + item['deviceId'] + '>' + item['label'] + '</option>'
                    }
                    if (item['kind'] == 'videoinput') {
                        videoHtml += '<option value=' + item['deviceId'] + '>' + item['label'] + '</option>'
                    }
                    htmlString += '<br>'
                });
                $('#js_set_device_box').removeClass('hide');
                $('#js_set_device_video').html(videoHtml);
                $('#js_set_device_audio').html(audioHtml);
                // utils.notification(htmlString);
            });
        },
        displayStream: function (stream, remote) {
            var boxId = 'video-item' + stream.getId(),
                cloneItem = $('.video-item').eq(0).clone().attr('id', boxId).show();

            if (remote) {
                remoteBox.append(cloneItem);
            } else {
                if (!localBox.find('video-item').get(0) || true) {
                    localBox.append(cloneItem);
                } else {
                    if (mainBox.find('video-item').get(0)) {
                        mainBox.html('');
                    }
                    mainBox.append(cloneItem);
                }
            }
            this.play(stream, boxId);

            if (!getStream(stream.getId())) {
                var tempID = stream.getId()
                streamList.push(stream);
                if (tempID != localIds[0]) {
                    $("#remote-stream-switch").append("<option value='"+tempID+"'>"+tempID+"</option>")
                }
                // According to the remote video to the main window
                var event = utils.isMobile() ? "tap" : "click";
                if (streamList.length == 1) {
                    localBox.find('.video-item').eq(0).trigger(event);
                } else if (streamList.length == 2) {
                    remoteBox.find('.video-item').eq(0).trigger(event);
                } else if (share) {
                    localBox.find('.video-item').eq(1).trigger(event);
                } else {
                    //TODO
                }
            }
        },
        leave: function () {
            client.leave(function () {
                utils.backToHome();
            }, function (err) {
                utils.notification('leave:' + err.type + ':' + err.msg);
            });
        },
        enableDualStream: function () {
            client.enableDualStream(function() {
                console.log('Enable dual stream success!')
            }, function(e) {
                console.log(e)
            })
        },
        disableDualStream: function () {
            client.disableDualStream(function() {
                console.log('Disable dual stream success!')
            }, function(e) {
                console.log(e)
            })
        },
        switchStream: function () {
            if (hignOrLow === 0) {
                // hignStreamFlag = !hignStreamFlag
                hignOrLow = 1
                console.log("Switch from high to low");
            } 
            else {
                hignOrLow = 0
                console.log("Switch from low to high");
            }
            var tempID = $("#remote-stream-switch").val()
            var remote_stream = getStream(tempID)
            client.setRemoteVideoStreamType(remote_stream, hignOrLow);
        }
    }
}

function checkBrowserCompatibility() {
    var compatible = AgoraRTC.checkSystemRequirements();
    //for test
    // compatible = false;
    if (!compatible) {
        utils.error("当前浏览器不兼容AgoraRTC, 部分功能可能无法正常工作");
    }
}

function getStream(uid) {
    var stream;
    streamList.forEach(function (item, index) {
        if (item.getId() == uid) {
            stream = item;
            return;
        }
    });
    return stream;
}

function getStreamIdByDom($dom) {
    try {
        return parseInt($dom.attr('id').substring(10));
    } catch (error) {
        debugger;
    }

}

$(function () {
    var premium = new rtc();
    premium.setDefaultTranscoding();
    premium.join();

    checkBrowserCompatibility();

    function onClickLocalItem() {
        var video = $(this),
            uid = getStreamIdByDom(video),
            mainVideo = mainBox.find('.video-item'),
            mainVideoStream;

        if (mainVideo.get(0)) {
            mainVideoUid = getStreamIdByDom(mainVideo);
            mainVideoStream = getStream(mainVideoUid);
            if (localIds.indexOf(mainVideoUid) != -1) {
                mainVideo.appendTo(localBox);
            } else {
                mainVideo.appendTo(remoteBox);
            }
        }
        video.appendTo(mainBox);

        var stream = getStream(uid);
        var tools = premium;
        if (premium.getUID() != uid) {
            tools = share;
        }
        if (stream) {
            stream.stop();
            tools.play(stream, video.attr('id'));
        }
        if (mainVideoStream && uid != mainVideoUid) {
            mainVideoStream.stop();
            tools.play(mainVideoStream, mainVideo.attr('id'));
        }
    }

    function onClickRemoteItem() {
        var video = $(this),
            uid = getStreamIdByDom(video),
            mainVideo = mainBox.find('.video-item'),
            mainVideoStream;

        if (mainVideo.get(0)) {
            mainVideoUid = getStreamIdByDom(mainVideo);
            mainVideoStream = getStream(mainVideoUid);
            if (localIds.indexOf(mainVideoUid) != -1) {
                mainVideo.appendTo(localBox);
            } else {
                mainVideo.appendTo(remoteBox);
            }
        }
        video.appendTo(mainBox);
        var stream = getStream(uid);
        if (stream) {
            stream.stop();
            premium.play(stream, video.attr('id'));
        }
        if (mainVideoStream && uid != mainVideoUid) {
            mainVideoStream.stop();
            premium.play(mainVideoStream, mainVideo.attr('id'));
        }
    }
    if (utils.isMobile()) {
        $('body').on('tap', '.local-video .video-item', onClickLocalItem);
        $('body').on('tap', '#remote_video_box .video-item', onClickRemoteItem);
    } else {
        $('body').on('click', '.local-video .video-item', onClickLocalItem);
        $('body').on('click', '#remote_video_box .video-item', onClickRemoteItem);
    }

    $('#js_option button').click(function () {
        var type = $(this).data('type');

        switch (type) {
            case 'shareScreen':
                if (share) {
                    share.unpublish();
                    share.getClient().leave();
                    share.close();
                }
                share = new rtc();
                share.join('screen');
                break;
            case 'stopScreen':
                if (share) {
                    share.unpublish();
                    share.getClient().leave();
                    share.close();
                }
                break;
            case 'disableScreen':
                if (share) {
                    share.disableVideo();
                }
                break;
            case 'enableScreen':
                if (share) {
                    share.enableVideo();
                }
                break;
            default:
                premium[type]();
                break;
        }
    });

    $("#toggle_streaming_btn").off("click").on("click", function(){
        $("#js_live_streaming_box").toggle();
    });

    $('#live_streaming_user_add').off("click").on("click", function () {
        var client = premium.getClient();
        var coding = {
            x: toInt($("#live_streaming_user_x").val()),
            y: toInt($("#live_streaming_user_y").val()),
            width: toInt($("#live_streaming_user_width").val()),
            height: toInt($("#live_streaming_user_height").val()),
            zorder: toInt($("#live_streaming_user_z").val()),
            alpha: toFloat($("#live_streaming_user_alpha").val()),
            uid: toInt($("#live_streaming_user_uid").val())
        };
        if(!coding.uid){
            alert("you have to provide a uid for transcoding user");
        } else {
            premium.addTranscodingUser(coding);
        }
    });
    $('#live_streaming_user_remove').off("click").on("click", function () {
        premium.removeTranscodingUser();
    });
    $('#live_streaming_start_streaming').off("click").on("click", function () {
        var url = $("#live_streaming_url_addon").html()+$("#live_streaming_url").val();
        var enableTranscoding = $("#live_streaming_enable_transcoding").prop("checked");
        premium.addStreaming(url, enableTranscoding);
    });
    $('#live_streaming_stop_streaming').off("click").on("click", function () {
        premium.removeStreaming();
    });
    $('#live_streaming_set_encoding').off("click").on("click", function () {
        premium.setEncoding();
    });
});;
