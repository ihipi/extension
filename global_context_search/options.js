// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function createForm() {

    let form = document.getElementById('form');

    

      $('#idToSearch').focus();
      
      document.execCommand("paste");

      $('#searchBtn').click(function () {

        newSearch();
      });

      //SearchType
      

      $('<label class="col-sm" for="selectSearch">SearchType</label>').appendTo('form');

      var sel = $('<select  class="custom-select">').attr("id", "selectSearch").attr("name", "selectSearch").appendTo('form');

      for (let searchtKey of Object.keys(kSearchType)) {
        sel.append($("<option>").attr('value', searchtKey).text(searchtKey));
      }
      selectSearchTpeByInputID();

      //Environment
      $('<label for="selectEnv" class="col-sm" >Entorno</label>').appendTo('form');
      var sel = $('<select  class="custom-select">').attr("id", "selectEnv").attr("name","selectEnv").appendTo('form');

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
      $('<label for="selectPush" class="col-sm"  >Site</label>').appendTo('form');
      var sel = $('<select  class="custom-select">').attr("id", "selectPush").attr("name", "selectPush").appendTo('form');

      for (let pushKey of Object.keys(kPushSite)) {
        console.log(kPushSite[pushKey]);
        sel.append($("<option>").attr('value', pushKey).text(kPushSite[pushKey]));
      }
      $('#selectPush').on("change",function(){
        chrome.storage.sync.set({ "selectedPush": $('#selectPush').val() }, function () {
          console.log('Environment saved as ' + $('#selectPush').val());
        });
      });
      chrome.storage.sync.get("selectedPush", function(result){
        console.log("saved Env" + result);
        
        console.log();
        $('#selectPush').val(result.selectedPush);
        
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
  let pushId = $('#selectPush').val();
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