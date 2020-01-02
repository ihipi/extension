
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
