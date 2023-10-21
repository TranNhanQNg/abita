const sendSingleDeviceNotification = data => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      'key=AAAACwgAoHE:APA91bGCUtjPxdlZAu6WHPEIJ__6oF-ZBwirIW-wj25c0Xea11ExxoIwEOm2tkwhZRVK-LdWC22wOPSI5P_V08v5UWOnsk002AS6GDQqBTW1Qus4wOcIIDbo96UmbL9_SjDDg8ygXSg2',
    );
  
    var raw = JSON.stringify({
      data: {},
      notification: {
        body: data.data.body+': '+data.data.MaDonHang,
      },
      to: data.token,
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
  
    fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
  
  const sendMultiDeviceNotification = data => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      'key=AAAACwgAoHE:APA91bGCUtjPxdlZAu6WHPEIJ__6oF-ZBwirIW-wj25c0Xea11ExxoIwEOm2tkwhZRVK-LdWC22wOPSI5P_V08v5UWOnsk002AS6GDQqBTW1Qus4wOcIIDbo96UmbL9_SjDDg8ygXSg2',
    );
  
    var raw = JSON.stringify({
      data: data.data,
      registration_ids: data.token,
      notification: {
        body: data.data.body+': '+data.data.MaDonHang,
      },
      priority: "high",
      contentAvailable:true
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
  
    fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
  
  export default {
    sendSingleDeviceNotification,
    sendMultiDeviceNotification,
  };