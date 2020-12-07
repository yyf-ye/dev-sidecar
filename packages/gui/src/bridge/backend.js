import api from './api/backend'
import tongji from './tongji/backend'
import update from './update/backend'
import fileSelector from './file-selector/backend'

const modules = {
  api, // 核心接口模块
  fileSelector, // 文件选择模块
  tongji, // 统计模块
  update // 自动更新
}
export default {
  install (context) {
    for (const module in modules) {
      modules[module].install(context)
    }
  },
  ...modules
}
