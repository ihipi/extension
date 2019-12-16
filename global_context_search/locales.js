// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const kPushSite = {
  'portugalStore': 'portugalStore',
  'eciStore': 'eciStore',
};
const kEnvironment = {
  "local": {
    "name":"Local",
    "protocol":"http",
    "host": "localhost",
    "port": "8081"
  },
  "uat1": {
    "name":"UAT001",
    "protocol":"https",
    "host": "uatHost",
    "port": "8881"
  }

}

const kSearchType = {
  "productId": "productId",
  "skuId": "skuId",
  "eciRef": "eciRef" 
}