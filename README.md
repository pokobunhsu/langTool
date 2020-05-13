# langTool
Lang Login tool with node js cros domain

此程式需要跨網域執行API，若須更改跨網域server位置，
請至<script>內的server做更改路徑即可!

本專案使用到cors-anywhere，
若須自架cros proxy可以參考:
https://github.com/Rob--W/cors-anywhere

----
## 使用說明
首次請使用電話號碼接收簡訊登入~
在取得驗證碼之後會得到token及uid，在點選"送出取得token及uid"時就會自動帶入到token及uid欄位囉!

----
## 特別感謝
https://github.com/Rob--W/cors-anywhere

npm install http-proxy
npm install proxy-from-env
