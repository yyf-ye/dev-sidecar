import DsContainer from '../components/container'
import status from '../status'
import lodash from 'lodash'
export default {
  components: {
    DsContainer
  },
  data () {
    return {
      config: undefined,
      status: status,
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      applyLoading: false
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  methods: {
    init () {
      this.$api.config.reload().then(ret => {
        this.config = ret
        if (this.ready) {
          return this.ready(this.config)
        }
      })
    },
    async apply () {
      this.applyLoading = true
      await this.applyBefore()
      await this.saveConfig()
      if (this.applyAfter) {
        await this.applyAfter()
      }
      this.applyLoading = false
    },
    async applyBefore () {

    },
    reloadDefault (key) {
      this.$api.config.resetDefault(key).then(ret => {
        this.config = ret
      }).then(() => {
        this.apply()
      })
    },
    saveConfig () {
      return this.$api.config.save(this.config).then(() => {
        this.$message.info('设置已保存')
      })
    },
    getConfig (key) {
      const value = lodash.get(this.config, key)
      if (value == null) {
        return {}
      }
      return value
    },
    getStatus (key) {
      const value = lodash.get(this.status, key)
      if (value == null) {
        return {}
      }
      return value
    }
  }
}
