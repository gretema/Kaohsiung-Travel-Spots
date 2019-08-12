//選取DOM
var area = document.querySelector('#area');
var pop = document.querySelector('.pop');
var listTitle = document.querySelector('.listTitle');
var list = document.querySelector('.list');

//事件監聽
area.addEventListener('change', spotsdata);
pop.addEventListener('click', spotsdata);

//AJAX
var xhr = new XMLHttpRequest();
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97&limit=268', true);
xhr.send();
xhr.onload = function() {
    if (xhr.status == 200) {
        //把撈回的資料物件化
        var backdata = JSON.parse(xhr.responseText);
        var backdataArr = backdata.result.records;

        //初始畫面，所有資料渲染至網頁
        var content = '';
        document.querySelector('.error').textContent = "";
        for (i = 0; i < backdataArr.length; i++) {
            content +=
                '<li class="spotlist"><div class="picbox"><img src="' +
                backdataArr[i].Picture1 + '"></div><p class="spotName">' +
                backdataArr[i].Name + '</p><div class="spotInfo"><span class="opentime_icon"></span><p class="opentime">' +
                backdataArr[i].Opentime + '</p><br><span class="address_icon"></span><p class="address">' +
                backdataArr[i].Add + '</p><br><span class="tel_icon"></span><p class="tel">' +
                backdataArr[i].Tel + '</p><br><span class="ticket_icon"></span><p class="ticket">' +
                backdataArr[i].Ticketinfo + '</p></div></li>'

        }
        list.innerHTML = content;
    } else {
        var error = document.querySelector('.error');
        error.innerHTML = "取得資料時發生錯誤，請檢查網路狀態並重新整理：）";
    }
}

function spotsdata(e) {
    if (xhr.status == 200) {
        //把撈回的資料物件化
        var backdata = JSON.parse(xhr.responseText);
        var backdataArr = backdata.result.records;
        //取得使用者選擇的地區
        var select = e.target.value;
        //撈出符合使用者選擇區域的資料，並組字串渲染至網頁
        var content = '';
        document.querySelector('.error').textContent = "";
        for (i = 0; i < backdataArr.length; i++) {
            if (select == backdataArr[i].Zone) {
                content +=
                    '<li class="spotlist"><div class="picbox"><img src="' +
                    backdataArr[i].Picture1 + '"></div><p class="spotName">' +
                    backdataArr[i].Name + '</p><div class="spotInfo"><span class="opentime_icon"></span><p class="opentime">' +
                    backdataArr[i].Opentime + '</p><br><span class="address_icon"></span><p class="address">' +
                    backdataArr[i].Add + '</p><br><span class="tel_icon"></span><p class="tel">' +
                    backdataArr[i].Tel + '</p><br><span class="ticket_icon"></span><p class="ticket">' +
                    backdataArr[i].Ticketinfo + '</p></div></li>'
            }
        }
        listTitle.innerHTML = select;
        list.innerHTML = content;
        //若資料庫無相符資料，顯示"查無資料"
        if (content == '') {
            document.querySelector('.error').textContent = "查無相關資料";
        }

    } else {
        var error = document.querySelector('.error');
        error.innerHTML = "取得資料時發生錯誤，請檢查網路狀態並重新整理：）";
    }
}