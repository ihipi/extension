// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function createForm() {



  chrome.storage.sync.get(['removedContextMenu'], function (list) {
    let removed = list.removedContextMenu || [];
    let form = document.getElementById('form');

    

      $('#idToSearch').focus();
      
      document.execCommand("paste");

      $('#searchBtn').click(function () {

        let env = $('#selectEnv').val();
        let serch = $('#selectSearch').val();
        let endpoint = kSearchType[serch];
        let id = $('#idToSearch').val();
        let searchString = endpoint.replace('{{id}}', id);
        let pushId = $('input[name=push]:checked', '#form').val()
        let url =
          kEnvironment[env]["protocol"] + "://" + kEnvironment[env]["host"] + ":" + kEnvironment[env]["port"] + searchString + '?pushSite=' + pushId;

        chrome.tabs.create({ url: url });
      });

      //SearchType
      var sel = $('<select>').attr("id", "selectSearch").appendTo('form');

      for (let searchtKey of Object.keys(kSearchType)) {
        sel.append($("<option>").attr('value', searchtKey).text(searchtKey));
      }


      /*     let divSearch = document.createElement('div');
          let searchType = document.createElement('label');
          searchType.innerText = "Search Type";
          divSearch.appendChild(searchType);
          divSearch.classList.add('col-sm-10');
      
          for (let searchKey of Object.keys(kSearchType)) {
      
            var radioBtn = $('<input type="radio" class="form-check-input" name="rbtnCount" value="' + searchKey + '">' + searchKey + '</input>');
            radioBtn.appendTo(divSearch);
            
          } */

      /* 
          for (let searchKey of Object.keys(kSearchType)) {
            let div = document.createElement('div');
            let radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = "searchType";
            radio.id = searchKey;
            radio.value = searchKey;
            if(selSearchEndPoint == searchKey){
              radio.checked = true;
            }
            let span = document.createElement('span');
            span.textContent = kSearchType[searchKey];
            div.appendChild(radio);
            div.appendChild(span);
            divSearch.appendChild(div);
          } */
      chrome.storage.sync.get(['selectedSearchType'], function (result) {
        console.log('Value currently is ' + result.key);
      });

      //Location
      var sel = $('<select>').attr("id", "selectEnv").appendTo('form');

      for (let hostKey of Object.keys(kEnvironment)) {
        console.log(kEnvironment[hostKey]["name"]);
        sel.append($("<option>").attr('value', hostKey).text(kEnvironment[hostKey]["name"]));
      }

      /*       let host = document.createElement('div');
            let hostLabel = document.createElement('label');
            hostLabel.innerText = "Entorno";
            host.appendChild(hostLabel);
            for (let hostKey of Object.keys(kEnvironment)) {
              let div = document.createElement('div');
              let radio = document.createElement('input');
              radio.type = 'radio';
              radio.name = "searchType";
              radio.value = kEnvironment[hostKey]["name"];
              let span = document.createElement('span');
              span.textContent = kEnvironment[hostKey]["name"];
              div.appendChild(radio);
              div.appendChild(span);
              host.appendChild(div);
            }
            form.appendChild(host); */



      //pushSite
      let divPush = document.createElement('div');
      let pushLabel = document.createElement('label');
      pushLabel.innerText = "PushSite";
      divPush.appendChild(pushLabel);

      for (let key of Object.keys(kPushSite)) {
        let div = document.createElement('div');
        let radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = "push";
        radio.value = kPushSite[key];
        if ("eciStore" === kPushSite[key]) {
          radio.checked = true;
        }
        let span = document.createElement('span');
        span.textContent = kPushSite[key];
        div.appendChild(radio);
        div.appendChild(span);
        divPush.appendChild(div);
      }
      form.appendChild(divPush)


      $('#selectEnv').onchange(function(){
        chrome.storage.sync.set({ "selectedEnv": $('#selectEnv').val() }, function () {
          console.log('Value is set to ' + $('#selectEnv').val());
        });
      });
    });
  }

createForm();

  document.getElementById('idToSearch').onchange = function () {
    let text = $('#idToSearch').val();
    var starts = /^\d/;
    if (text.match(starts) != null) {
      if (text.length === 18) {
        $("#selectSearch").val("eciRef");
      } else {
        $("#selectSearch").val("skuId");
      }
    } else {
      if (text[0] === 'o') {
        $("#selectSearch").val("orderId");
      } else {
        $("#selectSearch").val("productId");
      }
    }
    let sst = $("#selectSearch").val();
    chrome.storage.sync.set({ "selectedSearchType": sst }, function () {
      console.log('Value is set to ' + sst);
    });
    selSearchEndPoint = sst;
    //createForm();
  }

