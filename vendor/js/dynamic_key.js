function cal(){
var appid = appid.value;
var appcert = appcert.value;
var uid = 0
var channel = channel.value;
console.log(document.getElementById("appid"));




    $.ajax({
        url: 'http://recording.agorapremium.agora.io:9001/agora/media/genDynamicKey5?uid=0&key=' + appid + '&sign=' + appcert + '&channelname=' + channel
    }).done(function (key) {
        channel_key = key;
        console.log("Channel key is " + key);
        document.getElementById("correct_channel_key").innerHTML = channel_key;
    });

}

