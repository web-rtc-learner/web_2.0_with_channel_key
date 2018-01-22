/**
 * Function Name: get_devices
 * Return Values: None
 * Callbacks: devices
 * deviceId:"default"
 * groupId:"675963c7b77618850e0e48ac20536d8aee3ca783cd4f385a3971377ca14c9b64"
 * kind:"audioinput"
 * label:"Default"
 */
    
function get_devices(){
    AgoraRTC.getDevices(function (devices) {
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
