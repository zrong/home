<template>
<div>
  <top-menu pos="top" />
  <hr class="top-menu-hr">
  <main id="main-article">
    <h1 class="title">生涯</h1>
    <hr>
    <section class="content">
      <h2>作为创业者 <b-tag type="is-dark">2010~</b-tag></h2> 
      <hr>
      <h4>SAGI GAMES <b-tag type="is-dark">2017~</b-tag></h4>
      <p>第二次创业，作为团队创始人。从微信小游戏开始，赶上了微信小游戏红利期，尝试自研自发 60+ 款小游戏。2019年开始转型原生游戏开发，出海，自建立投放、运营团队。</p>
      <ul>
        <li><a href="https://blog.zengrong.net/post/hire2021/" target="_blank">来 SAGI GAMES，一起创造长期伟大的游戏</a></li>
        <li><a href="https://blog.zengrong.net/tag/youshootfirst/" target="_blank">微信小游戏从立项到上线的开发历程</a></li>
      </ul>
      <h4>公司内部创业 <b-tag type="is-dark">2016~2017</b-tag></h4>
      <p>作为制作人。同时负责一部分开发工作。时机、推广力度、市场理解度不足，以失败告终。</p>
      <p><strong>社交麻将</strong> <b-tag type="is-success">HTML5-微信公众平台</b-tag> <b-tag type="is-success">Android</b-tag> <b-tag type="is-success">iOS</b-tag></p>
      <h4>TEAM1201 <b-tag type="is-dark">2010~2015</b-tag></h4>
      <p>第一次创业，作为技术合伙人。</p>
      <p><a href="https://blog.zengrong.net/post/hire2014/" target="_blank">TEAM2101招人</a>
      <article class="media has-background-light">
        <br>
        <figure class="media-left">
          <p class="image imageicons">
            <img :src="$withBase('/project-game-yhq.png')">
          </p>
        </figure>
        <div class="media-content">
          <br>
          <div class="content">
          <p>
              <strong>小小联盟</strong> <b-tag type="is-success">Cocos2d-X</b-tag> <b-tag type="is-success">Android</b-tag> <b-tag type="is-success">iOS</b-tag>
              <br>
              一个 MOBA 手游。这个产品立项很早，但中间推倒重来好几次，错过了融资和发布的时机。
          </p>
          </div>
        </div>
      </article>
      <article class="media has-background-light">
        <figure class="media-left">
          <p class="image imageicons">
            <img :src="$withBase('/project-game-wlz.png')">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>卧龙传</strong> <b-tag type="is-success">Adobe AIR</b-tag> <b-tag type="is-success">Android</b-tag> <b-tag type="is-success">iOS</b-tag>
              <br>
              三国题材的 SLG 手游。第一次创业时的作品，作为主要开发者参与。在中国大陆、香港、台湾、韩国运营。
            </p>
          </div>
        </div>
      </article>
      <h2>作为技术管理者 <b-tag type="is-dark">2015~2017</b-tag></h2>
      <hr>
      <p>游戏部门技术负责人，负责前端团队、服务器团队。</p>
      <h2>作为程序员 <b-tag type="is-dark">2008~</b-tag></h2>
      <hr>
      <b-carousel indicator-style="is-lines" indicator-position="is-top">
        <b-carousel-item>
          <section class="hero is-medium is-light">
            <div class="hero-body">
              <h4>wiz2joplin <b-tag type="is-success">Python</b-tag></h4>
              <p>我是 为知笔记 WizNote 的忠实+重度用户。使用 WizNote 接近 10 年，笔记 3000 多篇。日常工作和个人记事，读书笔记和备忘均在为知笔记上，每天都要使用它。</p>
              <p>在 2021 牛年春节假期中，我下定决心转向 Joplin 了。我花了几天时间开发了一个工具 wiz2joplin，目前已经成功将我的所有笔记完美转换到 Joplin 。</p>
              <p>
                <a class="button is-gray" href="https://blog.zengrong.net/post/wiznote2joplin1/" target="_blank">说明&nbsp;
                  <b-icon icon="blogger" size="is-small"></b-icon>
                </a>
                <a class="button is-gray" href="https://github.com/zrong/wiz2joplin" target="_blank">源码&nbsp;
                    <b-icon icon="github" size="is-small"></b-icon>
                </a>
              </p>
            </div>
          </section>
        </b-carousel-item>
        <b-carousel-item>
          <section class="hero is-medium is-light">
            <div class="hero-body">
              <h4>pyzog <b-tag type="is-success">Python</b-tag></h4>
              <p>pyzog 是 uWSGI logging rotate 的终极方案。</p>
              <p>pyzog 是一个独立的服务，用来支持从 Redis 或者 ZeroMQ 发来的日志信息。它的特点如下：</p>
              <ol>
                <li>使用 python 的 logging 标准库来处理日志，方便扩展。</li>
                <li>支持使用 Redis 的 Pub/Sub 机制来接收日志。</li>
                <li>支持使用 ZeroMQ 的 PUB-SUB/DEALER-ROUTER 模式来接收日志。</li>
                <li>使用 Python 标准库模块 logging.handlers.WatchedFileHandler 来支持文件 inode 改变的时候自动打开新的流，以实现自动 logrotate。</li>
                <li>根据发来的信息提供的数据自动分类写入 log 文件。</li>
                <li>提供命令行来启动服务。</li>
                <li>使用 Supervisor 守护 pyzog 服务。</li>
                <li>提供 systemd 配置文件的生成功能。</li>
                <li>提供 program 配置文件的生成功能。</li>
              </ol>
              <p>
                <a class="button is-gray" href="https://blog.zengrong.net/post/pyzog/" target="_blank">说明&nbsp;
                  <b-icon icon="blogger" size="is-small"></b-icon>
                </a>
                <a class="button is-gray" href="https://github.com/zrong/pyzog" target="_blank">源码&nbsp;
                    <b-icon icon="github" size="is-small"></b-icon>
                </a>
              </p>
            </div>
          </section>
        </b-carousel-item>
        <b-carousel-item>
          <section class="hero is-medium is-light">
            <div class="hero-body">
              <h4>WPCMD <b-tag type="is-success">Python</b-tag> <b-tag type="is-success">Shell</b-tag></h4>
              <p>WPCMD(WordPress command) 是一个通过 WordPress XML-RPC 接口在本地创建、更新 WordPress 博客的命令行工具。</p>
              <p>zengrong.net 使用了很长时间的 WordPress，也使用本工具进行管理。</p>
              <p>
                <a class="button is-gray" href="https://blog.zengrong.net/wpcmd/" target="_blank">说明&nbsp;
                  <b-icon icon="blogger" size="is-small"></b-icon>
                </a>
                <a class="button is-gray" href="https://github.com/zrong/wpcmd" target="_blank">源码&nbsp;
                    <b-icon icon="github" size="is-small"></b-icon>
                </a>
              </p>
            </div>
          </section>
        </b-carousel-item>
        <b-carousel-item>
          <section class="hero is-medium is-light">
            <div class="hero-body">
              <h4>ROOKOUT <b-tag type="is-success">Python</b-tag></h4>
              <p>学习 Python 时做的常用工具封装。</p>
              <p>
                <a class="button is-gray" href="https://github.com/zrong/rookout" target="_blank">源码&nbsp;
                    <b-icon icon="github" size="is-small"></b-icon>
                </a>
              </p>
            </div>
          </section>
        </b-carousel-item>
        <b-carousel-item>
          <section class="hero is-medium is-light">
            <div class="hero-body">
              <h4>Cocos2d-x Filters <b-tag type="is-success">Adobe AIR</b-tag> <b-tag type="is-success">C++</b-tag> <b-tag type="is-success">Lua</b-tag></h4>
              <p>基于 cocos2d-x 开发的滤镜项目，支持下面这些滤镜：</p>
              <ol>
                <li><strong>色调类</strong> Gray/RGB/HUE/Brightness/Contrast/Exposure/Gamma</li>
                <li><strong>模糊类</strong> Gaussian/ZoomBlur/MotionBlur</li>
                <li><strong>效果类</strong> Haze/Sharpen</li>
              </ol>
              <p>
                <a class="button is-gray" href="https://blog.zengrong.net/cocos2d-x-filters/" target="_blank">说明&nbsp;
                  <b-icon icon="blogger" size="is-small"></b-icon>
                </a>
                <a class="button is-gray" href="https://github.com/zrong/cocos2d-x-filters" target="_blank">源码&nbsp;
                    <b-icon icon="github" size="is-small"></b-icon>
                </a>
              </p>
            </div>
          </section>
        </b-carousel-item>
        <b-carousel-item>
          <section class="hero is-medium is-light">
            <div class="hero-body">
              <h4>Lua <b-tag type="is-success">Lua</b-tag></h4>
              <p>一些 Lua 封装。主要在 quick-cocos2d-x 中使用，也可以用于 Pure Lua。包含 <code>Class/Gettext/ByteArray/SocketTCP/log</code> 等等功能。</p>
              <p>
                <a class="button is-gray" href="https://github.com/zrong/lua" target="_blank">源码&nbsp;
                    <b-icon icon="github" size="is-small"></b-icon>
                </a>
              </p>
            </div>
          </section>
        </b-carousel-item>
        <b-carousel-item>
          <section class="hero is-medium is-light">
            <div class="hero-body">
              <h4>Plantform ANEs <b-tag type="is-success">Adobe AIR</b-tag> <b-tag type="is-success">Java</b-tag> <b-tag type="is-success">C++</b-tag> <b-tag type="is-success">Objective-C</b-tag> <b-tag type="is-success">Android</b-tag> <b-tag type="is-success">iOS</b-tag></h4>
              <p>很早期的 SDK 合辑。在各种合并类 SDK 还没有出现的时候，我们已经在 Adobe AIR 上发布了这个 SDK 合辑。</p>
              <p>
                <a class="button is-gray" href="https://blog.zengrong.net/platform-anes/" target="_blank">说明&nbsp;
                  <b-icon icon="blogger" size="is-small"></b-icon>
                </a>
                <a class="button is-gray" href="https://github.com/platformanes" target="_blank">源码&nbsp;
                    <b-icon icon="github" size="is-small"></b-icon>
                </a>
              </p>
            </div>
          </section>
        </b-carousel-item>
        <b-carousel-item>
          <section class="hero is-medium is-light">
            <div class="hero-body">
              <h4>ANE Toolkit <b-tag type="is-success">Adobe AIR</b-tag> <b-tag type="is-success">Java</b-tag> <b-tag type="is-success">C++</b-tag> <b-tag type="is-success">Objective-C</b-tag> <b-tag type="is-success">Android</b-tag> <b-tag type="is-success">iOS</b-tag></h4>
              <p>ANEToolkit是一个非官方的稀烂的插件包，主要是zrong为苦逼的只会AS的或者不是只会AS但讨厌JAVA和Objective-C和C和C++的又希望在Android或者水果设备上开发游戏或者应用的程序猿所做的一个很是不到位的努力。</p>
              <p><strong>P.S.</strong> 从说明可以看出来当时的我相当的中二……</p>
              <p>
                <a class="button is-gray" href="http://zrong.github.io/anetoolkit/doc/" target="_blank">API文档&nbsp;
                  <b-icon icon="file-document" size="is-small"></b-icon>
                </a>
                <a class="button is-gray" href="https://blog.zengrong.net/anetoolkit/" target="_blank">说明&nbsp;
                  <b-icon icon="blogger" size="is-small"></b-icon>
                </a>
                <a class="button is-gray" href="https://github.com/zrong/anetoolkit" target="_blank">源码&nbsp;
                    <b-icon icon="github" size="is-small"></b-icon>
                </a>
              </p>
            </div>
          </section>
        </b-carousel-item>
        <b-carousel-item>
          <section class="hero is-medium is-light">
            <div class="hero-body">
              <h4>Sprite Sheet Editor <b-tag type="is-success">macOS</b-tag> <b-tag type="is-success">Windows</b-tag> <b-tag type="is-success">Adobe AIR</b-tag> <b-tag type="is-success">Actionscript3</b-tag></h4>
              <p>Sprite Sheet Editor 是一个生成 Sprite Sheet 的工具，用于自己开发的游戏中。</p>
              <p>
                <a class="button is-gray" href="https://blog.zengrong.net/spritesheeteditor/" target="_blank">说明&nbsp;
                  <b-icon icon="blogger" size="is-small"></b-icon>
                </a>
                <a class="button is-gray" href="https://github.com/zrong/sprite_sheet_editor" target="_blank">源码&nbsp;
                    <b-icon icon="github" size="is-small"></b-icon>
                </a>
              </p>
            </div>
          </section>
        </b-carousel-item>
        <b-carousel-item>
          <section class="hero is-medium is-light">
            <div class="hero-body">
              <h4>AS3 library <b-tag type="is-success">Adobe Flash</b-tag> <b-tag type="is-success">Adobe AIR</b-tag> <b-tag type="is-success">Actionscript3</b-tag></h4>
              <p>Actionscript3 时代的封装，用于页游开发</p>
              <p>
                <a class="button is-gray" href="https://github.com/zrong/as3" target="_blank">源码&nbsp;
                    <b-icon icon="github" size="is-small"></b-icon>
                </a>
              </p>
            </div>
          </section>
        </b-carousel-item>
      </b-carousel>
      <h2>作为教师 <b-tag type="is-dark">~2009</b-tag></h2>
      <hr>
      <article class="media has-background-light">
        <br>
        <figure class="media-left">
          <p class="image imageicons">
            <img :src="$withBase('/book-128x128.jpg')">
          </p>
        </figure>
        <div class="media-content">
          <br>
          <div class="content">
            <p>
              <strong>出版物</strong>
              <br>
              <ul>
                  <li>主编<strong>《Flash MX互动教学课件制作实例教程》</strong><small>人民邮电出版社</small></li>
                  <li>参编<strong>《用多媒体学 SQL Server 2000》</strong> <small>北京中电电子出版社</small></li>
                  <li>参编湖北省中小学信息技术教材 <strong>《信息技术与网络（小学版）》《网络技术应用（初高中版）》</strong> <small>华中科技大学出版社</small></li>
                  <li>参编<strong>《Flash完全手册》</strong> <small>清华大学出版社</small></li>
                  <li>参编多套课件制作书籍...</li>
              </ul>
            </p>
          </div>
        </div>
      </article>
    </section>
  </main>
  <page-footer />
</div>
</template>

<script>
import TopMenu from '@theme/components/TopMenu2.vue'
import PageFooter from '@theme/components/PageFooter.vue'

export default {
  components: {TopMenu, PageFooter}
}
</script>

<style lang="sass">
@import "@theme/styles/main"
@import "@theme/styles/page"
</style>