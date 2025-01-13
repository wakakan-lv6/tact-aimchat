localStorage.setItem('time', 'false');
if (localStorage.getItem('stime') === null){
  localStorage.setItem('stime', '0');
}
setTimeout(function(){localStorage.setItem('stime', '0')}, 30000);
let pw = prompt('パスワード');
if (pw !== 'Manbou4649'){
  alert('パスワードがちがいます。');
  setTimeout(function(){while (true){}}, 3000);
}
var val = 'default'
if (localStorage.getItem('id') === null){
  localStorage.setItem('id', String(Math.floor( Math.random() * 1000001)));
}
let socket = null;
let username = null;
var kari = '';
var id = localStorage.getItem("id");
const music = new Audio('https://cdn.glitch.global/2d18f0d6-61c9-4f7c-9d14-e4ee97040600/%E3%82%AB%E3%83%BC%E3%82%BD%E3%83%AB%E7%A7%BB%E5%8B%951.mp3?v=1695554769918');
const text = document.getElementsByClassName('text')[0];
const chatscroll = document.getElementsByClassName('chatscroll')[0];
var editopen = false;
var time = '';
var month = 0;
var date = 0;
var hour = 0;
var min = 0;
var c = 0;
var a = 0;
var to = 'all';
var blist = [];
if (location.href != 'https://tact-aimchat.glitch.me/'){
  while (true){}
}
document.addEventListener('load', function(){if (id == '393505' || id == '920754'){
  window.location.reload();
}});
const editnamelist = ['ヽ(ﾟ∀｡)ﾉｳｪ🍡', '全部消す', 'リンク', 'スクラッチキャット', 'live', 'デフォルトユザネ変更', 'ユザネ変更', 'プラベチャット', '生存確認', '画像', '音', 'ブラックリストに追加', 'ブラックリストからなくす'];
const editscroll = document.createElement('div');
editscroll.className = 'editscroll';
editscroll.setAttribute('tabindex','-1');
for(let i = 0;i < editnamelist.length; i++) {
    const editelement = document.createElement('p');
    editelement.textContent = editnamelist[i];
    editscroll.appendChild(editelement);
}
fetch("/getchat")
.then(function(response){
return response.json()
})
.then(function(data){
for(let i = 0;i < data.length; i++) {
  if (data[i].to == 'all'){
    addchat('<!==', '><p class="tm">'+String(data[i].month)+'/'+String(data[i].date)+' '+String(data[i].hour)+':'+String(data[i].min)+'</p>');
    addchat(data[i].username, data[i].data);
  } else if (data[i].to == username) {
    addchat('<!==', '><p class="tm">'+String(data[i].month)+'/'+String(data[i].date)+' '+String(data[i].hour)+':'+String(data[i].min)+'</p>');
    addchat('<font color="red" size="2">(プラベ)</font>' + data[i].username, data[i].data);
  }
}
});
function addchat (usernamevalue, messagevalue) {
  if (blist.indexOf(usernamevalue) == -1){
    let newelement = document.createElement('div');
    if (usernamevalue !== 'もんく'){
    var tester = messagevalue.replaceAll(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
    if (tester.length > 300){
      messagevalue = '文量が長すぎるため非表示になっています'
    }
    tester = usernamevalue.replaceAll(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
    if (tester.length > 300){
      usernamevalue = '文量が長すぎるため非表示になっています';
    }
    }
    newelement.innerHTML = `${usernamevalue}：${messagevalue}`;
    chatscroll.appendChild(newelement);
    chatscroll.scrollTo(0, chatscroll.scrollHeight);
  }
}
function connect(){
    socket = io();
    socket.on('connect',function() {
      if (localStorage.saveKey !== undefined){
        val = localStorage.saveKey.replaceAll(/onload=".*?"/ig, '').replaceAll(/onload='.*?'/ig, '').replaceAll(/onload=`.*?`/ig, '').replaceAll(/<meta[^>]*>/ig, '').replaceAll(/<marquee[^>]*>/ig, '');
      }
      if (val == 'default'){
        localStorage.saveKey = 'default';
      }
      username = val;
      socket.emit('ip', username)
    });
    socket.on('message',function(e) {
      if(e.id !== id){
        if(e.to == 'all'){
          addchat('<!==', '><p class="tm">'+String(e.month)+'/'+String(e.date)+' '+String(e.hour)+':'+String(e.min)+'</p>');
          addchat(e.username, e.data);
          music.play().catch(error => console.log("再生に失敗しました:", error));;
        } else if(e.to == username){
          addchat('<!==', '><p class="tm">'+String(e.month)+'/'+String(e.date)+' '+String(e.hour)+':'+String(e.min)+'</p>');
          addchat('<font color="red" size="2">(プラベ)</font>' + e.username, e.data);
          music.play().catch(error => console.log("再生に失敗しました:", error));;
        }
      } 
    });
    socket.on('check',function(e) {
        if (username !== e.username){
          var kari = text.value;
          text.value = '生存';
          send();
          text.value = kari;
        }
    });
    socket.on('reload',function(e) {
        if (username == e.username){
            window.location.reload();
        } else if (e.username == 'all'){
            window.location.reload();
        }
    });
}
connect();
function send(){
  if(text.value !== '') {
    if (localStorage.getItem('time') == 'false'){
      text.value = text.value.replaceAll(/onload=".*?"/ig, '').replaceAll(/onload='.*?'/ig, '').replaceAll(/onload=`.*?`/ig, '').replaceAll(/<meta[^>]*>/ig, '').replaceAll(/<marquee[^>]*>/ig, '');
      localStorage.setItem('time', 'true');
      setTimeout(function(){localStorage.setItem('time', 'false')}, '1000');
      time = new Date();
      month = time.getMonth();
      month += 1;
      date = time.getDate();
      hour = time.getHours();
      min = time.getMinutes();
      socket.emit('send', { 'data': text.value, 'username': username, 'id': id, 'month': month, 'date': date, 'hour': hour, 'min': min, 'to': to});
      addchat('<!==', '><p class="tm">'+String(month)+'/'+String(date)+' '+String(hour)+':'+String(min)+'</p>');
      if (to == 'all'){
        addchat(username, text.value);
      } else {
        addchat('<font color="red" size="2">(プラベ 対象:' + to +')</font>' + username, text.value);
      }
        text.value = '';
    } else {
      alert('コメントの間隔が早すぎるっぽいよ');
    }
  }
}
document.getElementsByClassName('send')[0].addEventListener('click', function(){
    send();
});
text.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        send();
    }
});
document.addEventListener('click', function(e) {
    if (editopen === true) {
        if (e.target.parentElement.className === 'editscroll') {
            const editname = editnamelist.indexOf(e.target.textContent);
            if (editname === 0) {
                text.value += 'ー<font color="pink">ヽ(ﾟ∀｡)ﾉ<font color="black">ヽ(ﾟ∀｡)ﾉ<font color="#a2ffa2">ヽ(ﾟ∀｡)ﾉ</font>ーーー';
                text.focus();
            }
            if (editname === 1) {
                if (confirm('本当にやるんだな？')) {
                    chatscroll.innerHTML = '';
                }
            }
            if (editname === 2) {
                const inputurl = prompt('urlを入力');
                text.value += `<button onclick = "window.open('${inputurl}')">${inputurl}</button>`;
                text.focus();
            }
            if (editname === 3) {
                text.value += '<img loading="lazy" src="https://cdn.glitch.global/2d18f0d6-61c9-4f7c-9d14-e4ee97040600/cat.svg?v=1695555591061" width="24px" height="24px">';
                text.focus();
            }
            if (editname === 4) {
                if (confirm('本当にやるんだな？')) {
                    const bodyelement = document.getElementsByTagName('body')[0];
                    const video = document.createElement('video');
                    video.autoplay = true;
                    video.style = 'display:none;';
                    bodyelement.appendChild(video);
                    const canvas = document.createElement('canvas');
                    canvas.style = 'display:none; width: 960; height: 720;';
                    bodyelement.appendChild(canvas);
                    canvascontext = canvas.getContext('2d');
                    navigator.mediaDevices.getDisplayMedia({
                        video: {
                          resolutions: 4000,
                          frameRate: 60
                        },
                        audio: false
                    }).then(function(stream) {
                        video.srcObject = stream;
                    });
                    function canvasset() {
                        canvascontext.drawImage(video, 0, 0, canvas.width, canvas.height);
                        requestAnimationFrame(canvasset);
                    }
                    canvasset();
                    const socket = io();
                    socket.on('connect',function() {
                        const interval = setInterval(function() {
                            socket.emit('livesend', { 'message': canvas.toDataURL('image/jpeg')});
                        }, 100);
                    });
                    text.value += `<button onclick = "const chatscroll = document.getElementsByClassName('chatscroll')[0];
                    const canvas = document.createElement('canvas');
                    canvas.style = 'position: sticky;top: 0; width: 960; height: 720;';
                    chatscroll.appendChild(canvas);
                    const canvascontext = canvas.getContext('2d');
                    const image = new Image();
                    const socket = io();
                    socket.on('livemessage',function(e) {
                        image.src = e.message;
                        image.onload = function() {
                            canvascontext.clearRect(0, 0, canvas.width, canvas.height);
                            canvascontext.drawImage(image, 0, 0, canvas.width, canvas.height);
                        };
                    });">live</button>`;
                }
            }
            if (editname === 5) {
                username = prompt('新しいデフォルトのユーザー名').replaceAll(/onload=".*?"/ig, '').replaceAll(/onload='.*?'/ig, '').replaceAll(/onload=`.*?`/ig, '').replaceAll(/<meta[^>]*>/ig, '').replaceAll(/<marquee[^>]*>/ig, '');
                localStorage.saveKey = username.replaceAll(/onload=".*?"/ig, '').replaceAll(/onload='.*?'/ig, '').replaceAll(/onload=`.*?`/ig, '').replaceAll(/<meta[^>]*>/ig, '').replaceAll(/<marquee[^>]*>/ig, '');
            }
            if (editname === 6) {
                username = prompt('ユザネ').replaceAll(/onload=".*?"/ig, '').replaceAll(/onload='.*?'/ig, '').replaceAll(/onload=`.*?`/ig, '').replaceAll(/<meta[^>]*>/ig, '').replaceAll(/<marquee[^>]*>/ig, '');
            }
            if (editname === 7){
                to = prompt('対象のユザネ(全員:all) 戻すときはこれにallと入れてください。');
            }
            if (editname === 8){
              if (localStorage.getItem('stime') == '0'){
                kari = text.value;
                text.value = username + 'が生存確認しています...';
                send();
                text.value = kari;
                socket.emit('checking', {'username': username});
                localStorage.setItem('stime', '1')
                setTimeout(function(){localStorage.setItem('stime', '0')}, 30000)
              } else {
                alert('1回使うと30秒使えません')
              }
            }
            if (editname === 9){
              const fileInput = document.createElement('input');
              fileInput.type = 'file';
              fileInput.accept = 'image/*';
              
              fileInput.addEventListener('change', function(event) {
                const file = event.target.files[0];
                if (file) {
                  const reader = new FileReader();
            
                  reader.onload = function(e) {
                    const base64String = e.target.result;console.log(base64String);
                    text.value += `<img loading="lazy" src="${base64String}">`;
                    text.focus();
                  };
            
                  reader.readAsDataURL(file);
                }
              });
    
              fileInput.click();
            }
            if (editname === 10) {
              const fileInput = document.createElement('input');
              fileInput.type = 'file';
              fileInput.accept = 'audio/*';
              
              fileInput.addEventListener('change', function(event) {
                const file = event.target.files[0];
                if (file) {
                  const reader = new FileReader();
            
                  reader.onload = function(e) {
                    const base64String = e.target.result;console.log(base64String);
                    text.value += `<video controls="" autoplay="" name="media"><source src="${base64String}" type="audio/wav"></video>`;
                    text.focus();
                  };
            
                  reader.readAsDataURL(file);
                }
              });
    
              fileInput.click();
            }
            if (editname === 11){
              if (confirm('自分だけその人のチャットが来なくなるよ　それでもいいんだな')){
                blist += prompt('こなくしたいユザネ');
              }
            }
            if (editname === 12){
              var u = prompt('来るようにするユザネ(ブラックリスト:'+blist+')');
              var ind = blist.indexOf(u);
              if (ind !== -1){
                blist.splice(ind, ind);
              } else {
                alert('そのユザネの人はリストに入っていません');
              }
            }
        }
        editscroll.remove();
        editopen = false;
    }else if (e.target === document.getElementsByClassName('edit')[0]){
        document.getElementsByClassName('main')[0].appendChild(editscroll);
        editopen = true;
    }
});
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    text.focus();     
  } 
});
