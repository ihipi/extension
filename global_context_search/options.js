// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function createForm() {
  chrome.storage.sync.get(['removedContextMenu'], function (list) {
    let removed = list.removedContextMenu || [];
    let form = document.getElementById('form');

    //SearchType
    let divSearch = document.createElement('div');
    let searchType = document.createElement('label');
    searchType.innerText = "Search Type";
    divSearch.appendChild(searchType);
    for (let searchKey of Object.keys(kSearchType)) {
      let div = document.createElement('div');
      let radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = "searchType";
      radio.id = searchKey;
      radio.value = kSearchType[searchKey];
      let span = document.createElement('span');
      span.textContent = kSearchType[searchKey];
      div.appendChild(radio);
      div.appendChild(span);
      divSearch.appendChild(div);
    }
    form.appendChild(divSearch);

      //Location
      let host = document.createElement('div');
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
      form.appendChild(host);
  
  

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
      if("eciStore" === kPushSite[key]){
        radio.checked = true;
      }
      let span = document.createElement('span');
      span.textContent = kPushSite[key];
      div.appendChild(radio);
      div.appendChild(span);
      divPush.appendChild(div);
    }
    form.appendChild(divPush)


  });
}

createForm();

document.getElementById('idToSearch').onchange = function () {
  let text = document.getElementsByTagName('idToSearch').innerText;
  var starts = /^\d/;
  if(text.match(starts) ){
    if(text.str.length === 18){
      document.getElementById('eciRef').checked;
    } else {
      document.getElementById('skuId').checked;
    }
  } else {
    document.getElementById('productId').checked;
  }
  chrome.storage.sync.set({ removedContextMenu: removed });
  window.close();
}

