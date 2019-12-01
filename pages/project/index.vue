<template>
  <div id="main-article">
    <h1 class="title">项目</h1>
    <hr>
    <article
      v-for="(group, i) in projectList"
      :key="i"
      class="media">
      <figure class="media-left box has-text-centered">
        <b-icon
          :icon="group.icon"
          size="is-large" />
        <figcaption class="subtitle is-4">{{ group.title }}</figcaption>
      </figure>
      <div class="media-content">
        <div
          v-for="item in group.detail"
          :key="item.name">
          <div class="block">
            <a
              v-if="item.url"
              :href="item.url"
              target="_blank"
              class="title is-4">
              {{ item.name }}
              <b-icon icon="link-variant"/>
            </a>
            <span
              v-else
              class="title is-4">
              {{ item.name }}
            </span>
            <b-tag type="is-dark">
              {{ item.age[0] }}-{{ item.age[1] }}
            </b-tag>
          </div>
          <figure
            v-if="item.icon"
            class="is-flex imageicons block">
            <img
              v-for="(icon, i) in item.icon"
              :key="i"
              :src="require(`@/assets/${icon}`)">
          </figure>
          <div class="tags">
            <span
              v-for="(tag, i) in item.platform"
              :key="i"
              class="tag is-success">
              {{ tag }}
            </span>
          </div>
          <div class="notification"><p v-html="$md.render(item.desc)" /></div>
          <hr>
        </div>
      </div>
    </article>
  </div>
</template>

<script>

const GAME = [
  {
    name: '小游戏合辑3',
    desc: '翻瓶子3D，漂移碰碰赛车，抢夺大乱斗，最后的英雄',
    platform: ['微信小游戏', '手Q小游戏', '百度小游戏', '字节跳动小游戏', 'OPPO 小游戏'],
    icon: ['project-game-bottle-wxqr.jpg', 'project-game-car-wxqr.jpg', 'project-game-football-wxqr.jpg', 'project-game-hero-wxqr.jpg'],
    age: [2019, '']
  },
  {
    name: '小游戏合辑2',
    desc: '街头大乱斗，站桩大作战，单挑篮球，画线大逃亡',
    platform: ['微信小游戏', '手Q小游戏', '百度小游戏', '字节跳动小游戏', 'OPPO 小游戏'],
    icon: ['project-game-jt-wxqr.jpg', 'project-game-stake-wxqr.jpg', 'project-game-basketball-wxqr.jpg', 'project-game-line-wxqr.png'],
    age: [2019, '']
  },
  {
    name: '小游戏合辑1',
    desc: '黑洞大作战吞噬版，疯狂的球球，疯狂打砖块，萌宠碰一碰',
    platform: ['微信小游戏'],
    icon: ['project-game-hole-qr.png', 'project-game-ball-wxqr.jpg', 'project-game-brick-wxqr.jpg', 'project-game-bump-wxqr.jpg'],
    age: [2018, 2019]
  },
  {
    name: '开心射手',
    desc: '微信小游戏平台的第一个作品，回合制对战。详细可以阅读我博客上的 [系列文章](https://blog.zengrong.net/tag/youshootfirst/) 。',
    platform: ['微信小游戏', 'QQ轻游戏'],
    icon: ['project-game-ysf.png', 'project-game-ysf-wxqr.png'],
    age: [2018, 2019]
  },
  {
    name: '麻将',
    desc: '从这个游戏开始转型制作人。负责一部分开发工作。做了五种玩法，发现了团队全栈开发的高效。',
    platform: ['HTML5-微信公众平台', 'Android', 'iOS'],
    age: [2016, 2017]
  },
  {
    name: '小小联盟',
    desc: '一个 MOBA 手游。这个产品立项很早，但中间推倒重来好几次。很遗憾没有上线运营。',
    platform: ['Cocos2d-X', 'Android', 'iOS'],
    icon: ['project-game-yhq.png'],
    age: [2012, 2014]
  },
  {
    name: '卧龙传',
    desc: '三国题材的 SLG 手游。第一款手游作品。在中国大陆、香港、台湾、韩国运营。',
    platform: ['Adobe AIR', 'Android', 'iOS'],
    icon: ['project-game-wlz.png'],
    age: [2010, 2011]
  }
]

const TOOL = [
  {
    name: 'WPCMD',
    desc: 'WPCMD(WordPress command) 是一个通过 WordPress XML-RPC 接口在本地创建、更新 WordPress 博客的命令行工具。 [zengrong.net](https://zengrong.net) 使用了很长时间的 WordPress，也使用本工具进行管理。',
    url: 'https://blog.zengrong.net/wpcmd/',
    platform: ['Python', 'Shell'],
    age: [2015, 2016]
  },
  {
    name: 'Sprite Sheet Editor',
    desc: 'Sprite Sheet Editor 是一个生成Sprite Sheet(也叫Tile Sheet)的免费工具。',
    url: 'https://blog.zengrong.net/spritesheeteditor/',
    platform: ['Adobe AIR', 'Windows', 'macOS'],
    age: [2011, 2013]
  }
]

const LIBRARY = [
  {
    name: 'ROOKOUT',
    url: 'https://github.com/zrong/rookout',
    desc: '学习 Python 时做的常用工具封装。',
    platform: ['Python'],
    age: [2014, 2016]
  },
  {
    name: 'Cocos2d-x Filters',
    url: 'https://blog.zengrong.net/cocos2d-x-filters/',
    desc: `基于 cocos2d-x 开发的滤镜项目，支持下面这些滤镜：
    1. **色调类** Gray/RGB/HUE/Brightness/Contrast/Exposure/Gamma
    2. **模糊类** Gaussian/ZoomBlur/MotionBlur
    3. **效果类** Haze/Sharpen`,
    platform: ['Adobe AIR', 'C++', 'Lua'],
    age: [2014, 2015]
  },
  {
    name: 'Lua library',
    url: 'https://github.com/zrong/lua',
    desc: '一些 Lua 封装。主要在 quick-cocos2d-x 中使用，也可以用于 Pure Lua。包含 `Class/Gettext/ByteArray/SocketTCP/log` 等等功能。',
    platform: ['Lua'],
    age: [2013, 2015]
  },
  {
    name: 'Plantform ANEs',
    url: 'https://blog.zengrong.net/platform-anes/',
    desc: '很早期的 SDK 合辑。在各种合并类 SDK 还没有出现的时候，我们已经在 Adobe AIR 上发布了这个 SDK 合辑。',
    platform: ['Adobe AIR', 'JAVA','C++', 'Objective-C', 'Android', 'iOS'],
    age: [2013, 2014]
  },
  {
    name: 'ANE Toolkit',
    url: 'https://blog.zengrong.net/anetoolkit/',
    desc: `ANEToolkit是一个非官方的稀烂的插件包，主要是zrong为苦逼的只会AS的或者不是只会AS但讨厌JAVA和Objective-C和C和C++的又希望在Android或者水果设备上开发游戏或者应用的程序猿所做的一个很是不到位的努力。

[API 文档](http://zrong.github.io/anetoolkit/doc/)
    
**P.S.** 从说明可以看出来当时的我相当的中二……`,
    platform: ['Adobe AIR', 'JAVA','C++', 'Objective-C', 'Android', 'iOS'],
    age: [2012, 2013]
  },
  {
    name: 'AS3 library',
    url: 'https://github.com/zrong/as3',
    desc: 'Actionscript 3 的封装，用于我的早期游戏开发。',
    platform: ['Adobe Flash', 'Adobe AIR', 'Actionscript3'],
    age: [2008, 2013]
  },
]

const name2Icon = {
  Python: 'language-python',
  JAVA: 'language-java',
  'C++': 'language-cpp',
  Lua: 'language-lua',
  Javascipt: 'language-javascript',
  Android: 'android',
  iOS: 'apple-ios',
}

export default {
  layout: 'page',
  data () {
    return {
      projectList: [
        {title: '游戏', icon: 'gamepad-variant', detail: GAME},
        {title: '库', icon: 'library-books', detail: LIBRARY},
        {title: '工具', icon: 'toolbox', detail: TOOL}
      ]
    }
  },
  methods: {
    getIconByName (name) {
      return name2Icon[name]
    }
  }
}
</script>

<style>
.imageicons img {
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    color: #4a4a4a;
    display: block;
    padding: 0.75rem;
    margin-right: 1rem;
}
</style>

