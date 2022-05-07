const SettingsEnum = {
  sentence_type: [
    {
      value: 'a',
      label: '动画'
    },
    {
      value: 'b',
      label: '漫画'
    },
    {
      value: 'c',
      label: '游戏'
    },
    {
      value: 'd',
      label: '文学'
    },
    {
      value: 'e',
      label: '原创'
    },
    {
      value: 'f',
      label: '来自网络'
    },
    {
      value: 'g',
      label: '其他'
    },
    {
      value: 'h',
      label: '影视'
    },
    {
      value: 'i',
      label: '诗词'
    },
    {
      value: 'j',
      label: '网易云'
    },
    {
      value: 'k',
      label: '哲学'
    },
    {
      value: 'l',
      label: '抖机灵'
    }
  ],
  encode: [
    {
      value: 'text',
      label: 'text'
    },
    {
      value: 'json',
      label: 'json'
    },
    {
      value: 'js',
      label: 'js'
    }
  ],
  charset: [
    {
      value: 'utf-8',
      label: 'utf-8'
    },
    {
      value: 'gbk',
      label: 'gbk'
    }
  ]
}

const SettingsPreset = {
  sentence_type: {
    name: 'c',
    enable: false,
    value: []
  },
  encode: {
    name: 'encode',
    enable: false,
    value: 'text'
  },
  charset: {
    name: 'charset',
    enable: false,
    value: 'utf-8'
  },
  min_length: {
    name: 'min_length',
    enable: false,
    value: 0
  },
  max_length: {
    name: 'max_length',
    enable: false,
    value: 30
  },
  select: {
    name: 'select',
    enable: false,
    value: '.hitokoto'
  }
}

const RequestBaseUrl = 'https://v1.hitokoto.cn/'

export {
  SettingsEnum,
  SettingsPreset,
  RequestBaseUrl
}
