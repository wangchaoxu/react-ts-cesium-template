/*
 * @Author: wangchaoxu
 * @Date: 2020-07-15 20:32:58
 * @LastEditors: wangchaoxu
 * @LastEditTime: 2020-09-24 18:07:42
 * @Description:引入cesium的方法
 */
import { initViewer, flyTo } from "./viewer";
import { addNav, moveGetInfo, infoWindow, infoWindowClose } from "./other";
import { addLayer, getAllLayer, getLayerByAttr, removeAllLayer, removeLayerByAttr } from "./layer";
import { addBoundary } from "./addBoundary";
import { leftSingleClick, mouseMove } from "./mouse";
import { addLabel, addBillboard, addMarker, getAllEntities, getEntitysByAttr, removeAllEntities, removeEntitiesByAttr, clickGetEntitties, clickRemoveEntities } from "./entities";

export {
  initViewer,
  flyTo,
  addNav,
  moveGetInfo,
  infoWindow,
  infoWindowClose,
  addLayer,
  getAllLayer,
  getLayerByAttr,
  removeAllLayer,
  removeLayerByAttr,
  addBoundary,
  mouseMove,
  addLabel,
  addBillboard,
  addMarker,
  getAllEntities,
  getEntitysByAttr,
  removeAllEntities,
  removeEntitiesByAttr,
  clickRemoveEntities,
  clickGetEntitties,
  leftSingleClick,
};
// const files = require.context("../wcesium", true, /\.js$/); //批量读取模块文件

// const modules = files.keys().reduce((modules: any, path) => {
//   const name = path.replace(/^\.\/(.*)\.js$/, "$1");
//   const module = files(path);
//   modules[name] = module;
//   return modules;
// }, {});
// console.log(modules);
// export default modules;
