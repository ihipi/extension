// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
// Add a listener to create the initial context menu items,
// context menu items only need to be created at runtime.onInstalled
chrome.runtime.onInstalled.addListener(function () {
  for (let key of Object.keys(kSearchType)) {
    chrome.contextMenus.create({
      id: key,
      title: key,
      type: 'normal',
      contexts: ['all'],
    });
    
  
  for (let envkey of Object.keys(kEnvironment)) {
    chrome.contextMenus.create({
      id: key + "_" + envkey,
      title: kEnvironment[envkey]["name"],
      type: 'normal',
      parentId: key,
      contexts: ['all'],
    });
  }
}
});



chrome.contextMenus.onClicked.addListener(function (item, tab) {
  var keys = item.menuItemId.split("_");
  var push = "eciStore";
  chrome.storage.sync.get("selectedPush", function (result) {
    push = result.selectedPush;
  });
  var id = item.selectionText;
  newTapSearch(id, keys[0], keys[1], push);
});

chrome.storage.onChanged.addListener(function (list, sync) {
  let newlyDisabled = [];
  let newlyEnabled = [];

  for (let locale of newlyEnabled) {
    chrome.contextMenus.create({
      id: locale.id,
      title: locale.title,
      type: 'normal',
      contexts: ['selection'],
    });
  }
  for (let locale of newlyDisabled) {
    chrome.contextMenus.remove(locale);
  }
});
function setId(id) {
  idToSearch = id;
  let searchId = document.getElementById('idToSearch');
  searchId.innerText = item.selectionText;
}

function newTapSearch(id, searchType, env, push) {
  let endpoint = kSearchType[searchType];
  let searchString = endpoint.replace('{{id}}', id);


  let url = kEnvironment[env]["protocol"] + "://" + kEnvironment[env]["host"] + ":" + kEnvironment[env]["port"] + searchString;
  chrome.tabs.create({ url: pushSite(searchType, url, push) });
}

function pushSite(searchType, url, push) {
  let pushKey = '?pushSite=';
  if (searchType === 'PDP' || searchType === 'PLP') {
    pushKey = 'siteId=';
  }
  return url + pushKey + push;
}