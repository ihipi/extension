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

        newSearch();
      });

      //SearchType
      var sel = $('<select  class="custom-select">').attr("id", "selectSearch").appendTo('form');

      for (let searchtKey of Object.keys(kSearchType)) {
        sel.append($("<option>").attr('value', searchtKey).text(searchtKey));
      }
      selectSearchTpeByInputID();

      //Environment
      var sel = $('<select  class="custom-select">').attr("id", "selectEnv").appendTo('form');

      for (let hostKey of Object.keys(kEnvironment)) {
        console.log(kEnvironment[hostKey]["name"]);
        sel.append($("<option>").attr('value', hostKey).text(kEnvironment[hostKey]["name"]));
      }
      
      $('#selectEnv').on("change",function(){
        chrome.storage.sync.set({ "selectedEnv": $('#selectEnv').val() }, function () {
          console.log('Environment saved as ' + $('#selectEnv').val());
        });
      });
      chrome.storage.sync.get("selectedEnv", function(result){
        console.log("saved Env" + result);
        
        console.log();
        $('#selectEnv').val(result.selectedEnv);
        
      });


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
      $('input[type=radio][name=push]').change(function() {
        chrome.storage.sync.set({ "selectedPushSite": $('input[name=push]:checked', '#form').val() }, function () {
          console.log('Environment saved as ' + $('input[name=push]:checked', '#form').val());
        });
    });
    chrome.storage.sync.get("selectedPushSite", function(result){
      console.log("saved Env" + result);
      $("input[name=push][value=" + result.selectedPushSite + "]").attr('checked', true);

      
    });

    });
  }

createForm();

  document.getElementById('idToSearch').onchange = function () {
    selectSearchTpeByInputID();
    let sst = $("#selectSearch").val();
    chrome.storage.sync.set({ "selectedSearchType": sst }, function () {
      console.log('Value is set to ' + sst);
    });
    selSearchEndPoint = sst;
    //only for debug
    //createForm();
  }



function newSearch() {
  let env = $('#selectEnv').val();
  let serch = $('#selectSearch').val();
  let endpoint = kSearchType[serch];
  let id = $('#idToSearch').val();
  let searchString = endpoint.replace('{{id}}', id);

  let url = pushSite( kEnvironment[env]["protocol"] + "://" + kEnvironment[env]["host"] + ":" + kEnvironment[env]["port"] + searchString );
  chrome.tabs.create({ url: url });
}
function pushSite(url) {
  let pushId = $('input[name=push]:checked', '#form').val();
  let pushKey = '?pushSite=';
  if ($('#selectSearch').val() === 'PDP' ||
              $('#selectSearch').val() === 'PLP'){
                pushKey = 'siteId=';
              }
  return url + pushKey + pushId;
}
function selectSearchTpeByInputID() {
  let text = $('#idToSearch').val();
  var starts = /^\d/;
  if (text.match(starts) != null) {
    if (text.length === 18) {
      $("#selectSearch").val("eciRef");
    }
    else {
      $("#selectSearch").val("skuId");
    }
  }
  else {
    if (text[0] === 'o') {
      $("#selectSearch").val("orderId");
    }
    else {
      $("#selectSearch").val("productId");
    }
  }
}

$("#idToSearch").keyup(function(event){
  if(event.keyCode == 13){
      $("#searchBtn").click();
  }
});