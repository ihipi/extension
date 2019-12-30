// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const kPushSite = {
  'eciStore': 'eciStore',
  'portugalStore': 'portugalStore',
  'frStore': 'frStore',
  'ltcStore': 'ltcStore',
  'ukStore': 'ukStore' 
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
    "protocol":"http",
    "host": "node1.uat001.azure.cloud.elcorteingles.es",
    "port": "10585"
  },
  "uat2": {
    "name":"UAT002",
    "protocol":"http",
    "host": "node1.uat002.azure.cloud.elcorteingles.es",
    "port": "10585"
  },
  "nft": {
    "name":"NFT",
    "protocol":"http",
    "host": "mx0000001811004.eci.geci",
    "port": "10585"
  },  
  "pro": {
    "name":"PROD",
    "protocol":"http",
    "host": "mx0000001811005.eci.geci",
    "port": "10585"
  }
}

const kSearchType = {
  "productId": "/rest/repository/atg/commerce/catalog/ProductCatalog/product/{{id}}",
  "skuId": "/rest/repository/atg/commerce/catalog/ProductCatalog/sku/{{id}}",
  "eciRef": '/rest/repository/atg/commerce/catalog/ProductCatalog/sku/?atg-rest-rql=eciref%20STARTS%20WITH%20"{{id}}"',
  "orderId":"/rest/repository/atg/commerce/order/OrderRepository/order/{{id}}",
  "PDP":"/ecommerce/product/{{id}}?",
  "PLP":"/ecommerce/category/{{id}}/products?size=24&" 
}

var selSearchEndPoint = "";
/* 
HOST
http://node1.uat001.azure.cloud.elcorteingles.es:10585/dyn/admin/
http://node1.uat002.azure.cloud.elcorteingles.es:10585/dyn/admin/
http://mx0000001811004.eci.geci:10585/dyn/admin/

http://mx0000001811005.eci.geci/
ENDPOINT

http://mx0301001811005.eci.geci/ecommerce/product/A23880801?siteId=eciStore
http://mx0301001811005.eci.geci/ecommerce/category/999.54130013/products?size=24&siteId=eciStore
http://mx0000001811005.eci.geci:10580/rest/repository/atg/commerce/order/OrderRepository/order/o15190002?pushSite=eciStore
http://mx0000001811005.eci.geci:10580/rest/repository/atg/commerce/catalog/ProductCatalog/sku/?atg-rest-rql=eciref%20STARTS%20WITH%20%22001019510114259%22
http://mx0000001811005.eci.geci:10580/rest/repository/atg/commerce/catalog/ProductCatalog/sku/24218828001
http://mx0000001811005.eci.geci:10580/rest/repository/atg/commerce/catalog/ProductCatalog/product/A12946144?pushSite=eciStore
http://mx0301001811005.eci.geci/ecommerce/product/A23880801?siteId=eciStore
http://mx0301001811005.eci.geci/ecommerce/category/999.54130013/products?size=24&siteId=eciStore
 */

