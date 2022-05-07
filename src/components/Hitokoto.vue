<template>
  <div class="container">
    <el-image class="image" :src="require('@/assets/hitokoto.png')"></el-image>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <el-row>
          <el-checkbox v-model="settings.sentence_type.enable"
            >句子类型</el-checkbox
          >
        </el-row>
        <el-row>
          <el-select
            v-model="settings.sentence_type.value"
            multiple
            placeholder="请选择"
            clearable
            :disabled="!settings.sentence_type.enable"
          >
            <el-option
              v-for="item in settingsEnum.sentence_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-row>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <el-row>
          <el-checkbox v-model="settings.encode.enable">返回编码</el-checkbox>
        </el-row>
        <el-row>
          <el-select
            v-model="settings.encode.value"
            placeholder="请选择"
            :disabled="!settings.encode.enable"
          >
            <el-option
              v-for="item in settingsEnum.encode"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-row>
      </el-col>

      <el-col
        :xs="24"
        :sm="12"
        :md="8"
        :lg="8"
        :xl="8"
        v-if="settings.encode.enable && settings.encode.value === 'js'"
      >
        <el-row>
          <el-checkbox v-model="settings.select.enable">选择器</el-checkbox>
        </el-row>
        <el-row>
          <el-input
            v-model="settings.select.value"
            placeholder="请输入选择器，例如 .hitokoto"
            clearable
            :disabled="!settings.select.enable"
          >
          </el-input>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <el-row>
          <el-checkbox v-model="settings.charset.enable">字符集</el-checkbox>
        </el-row>
        <el-row>
          <el-select
            v-model="settings.charset.value"
            placeholder="请选择"
            :disabled="!settings.charset.enable"
          >
            <el-option
              v-for="item in settingsEnum.charset"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-row>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <el-row>
          <el-checkbox v-model="settings.min_length.enable"
            >返回句子的最小长度</el-checkbox
          >
        </el-row>
        <el-row>
          <el-input-number
            v-model="settings.min_length.value"
            controls-position="right"
            :min="0"
            :disabled="!settings.min_length.enable"
          ></el-input-number>
        </el-row>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <el-row>
          <el-checkbox v-model="settings.max_length.enable"
            >返回句子的最大长度</el-checkbox
          >
        </el-row>
        <el-row>
          <el-input-number
            v-model="settings.max_length.value"
            controls-position="right"
            :min="0"
            :disabled="!settings.max_length.enable"
          ></el-input-number>
        </el-row>
      </el-col>
    </el-row>

    <el-row>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="onReset">重置</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-link type="primary" :href="request_url" target="_blank">
          {{ request_url }}
        </el-link>
        <el-button
          icon="el-icon-copy-document"
          size="small"
          v-clipboard:copy="request_url"
        ></el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <json-viewer :value="response_data" boxed copyable></json-viewer>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import JsonViewer from 'vue-json-viewer'
import {
  SettingsEnum,
  SettingsPreset,
  RequestBaseUrl
} from '@/utils/hitokotoSettings'

export default {
  name: 'Hitokoto',
  components: {
    JsonViewer
  },
  data () {
    return {
      settingsEnum: SettingsEnum,
      settingsPreset: SettingsPreset,
      settings: JSON.parse(JSON.stringify(SettingsPreset)),
      request_base_url: RequestBaseUrl,
      request_url: RequestBaseUrl,
      response_data: ''
    }
  },
  mounted () {
    this.getHitokoto()
  },
  watch: {
    'settings.encode.value' (newVal, oldVal) {
      this.settings.select.enable = (newVal === 'js')
    },
    'settings.min_length.value' (newVal, oldVal) {
      if (newVal === undefined) {
        this.$nextTick().then(() => {
          this.settings.min_length.value = this.settingsPreset.min_length.value
        })
      }
    },
    'settings.max_length.value' (newVal, oldVal) {
      if (newVal === undefined) {
        this.$nextTick().then(() => {
          this.settings.max_length.value = this.settingsPreset.max_length.value
        })
      }
    }
  },
  methods: {
    onSubmit () {
      this.spliceURL()
      this.getHitokoto()
    },
    onReset () {
      this.settings = JSON.parse(JSON.stringify(this.settingsPreset))
    },
    spliceURL () {
      this.request_url = `${this.request_base_url}?`

      for (const setting in this.settings) {
        const { name, enable, value } = this.settings[setting]
        if (enable && (value !== undefined && value !== '')) {
          if (Array.isArray(value)) {
            for (const item of value) {
              this.request_url = `${this.request_url}${name}=${item}&`
            }
          } else {
            this.request_url = `${this.request_url}${name}=${value}&`
          }
        }
      }
      this.request_url = this.request_url.slice(0, -1)
    },
    getHitokoto () {
      this.$axios.get(this.request_url).then(response => {
        this.response_data = response.data
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container {
  margin: 0% 10%;
}
.image {
  width: 220px;
  height: 220px;
  margin-bottom: 30px;
}
.el-row {
  margin-bottom: 15px;
  // &:last-child {
  //   margin-bottom: 0;
  // }
}
.el-col {
  text-align: left;
}
</style>
