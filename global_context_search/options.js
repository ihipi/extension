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
  for (let searchtKey of Object.keys(kSearchType)) {
    $('#selectSearch').append($("<option>").attr('value', searchtKey).text(searchtKey));
  }
  selectSearchTpeByInputID();

  //Environment
  for (let hostKey of Object.keys(kEnvironment)) {
    console.log(kEnvironment[hostKey]["name"]);
    $('#selectEnv').append($("<option>").attr('value', hostKey).text(kEnvironment[hostKey]["name"]));
  }

  $('#selectEnv').on("change", function () {
    chrome.storage.sync.set({ "selectedEnv": $('#selectEnv').val() }, function () {
      console.log('Environment saved as ' + $('#selectEnv').val());
    });
  });
  chrome.storage.sync.get("selectedEnv", function (result) {
    console.log("saved Env" + result);

    console.log();
    $('#selectEnv').val(result.selectedEnv);

  });


  //pushSite
      for (let pushKey of Object.keys(kPushSite)) {
        console.log(kPushSite[pushKey]);
        $('#selectPush').append($("<option>").attr('value', pushKey).text(kPushSite[pushKey]));
      }
  $('#selectPush').on("change", function () {
    chrome.storage.sync.set({ "selectedPush": $('#selectPush').val() }, function () {
      console.log('EciStore saved as ' + $('#selectPush').val());
    });
  });
  chrome.storage.sync.get("selectedPush", function (result) {
    console.log("saved site" + result);
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
  chrome.storage.sync.set({ "idToSearch": $('#idToSearch').val() }, function () {
    console.log('Id to search is set to ' + $('#idToSearch').val());
  });
  selSearchEndPoint = sst;
  //only for debug
  //createForm();
}



function newSearch() {
  let id = $('#idToSearch').val();
  let env = $('#selectEnv').val();
  let search = $('#selectSearch').val();
  let push = $('#selectPush').val();
  newTapSearch(id, search, env, push);
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

$("#idToSearch").keyup(function (event) {
  if (event.keyCode == 13) {
    $("#searchBtn").click();
  }
});