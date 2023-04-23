import{_ as s,o as a,c as n,d as l}from"./chunks/framework.ad53f7b3.js";const p=JSON.parse('{"title":"如何打包发布应用","description":"","frontmatter":{},"headers":[{"level":2,"title":"React Native CLI 环境项目应用打包","slug":"react-native-cli-环境项目应用打包","link":"#react-native-cli-环境项目应用打包","children":[{"level":3,"title":"生成一个签名密钥","slug":"生成一个签名密钥","link":"#生成一个签名密钥","children":[]},{"level":3,"title":"设置 gradle 变量","slug":"设置-gradle-变量","link":"#设置-gradle-变量","children":[]},{"level":3,"title":"把签名配置加入到项目的 gradle 配置中","slug":"把签名配置加入到项目的-gradle-配置中","link":"#把签名配置加入到项目的-gradle-配置中","children":[]},{"level":3,"title":"生成发行 APK 包","slug":"生成发行-apk-包","link":"#生成发行-apk-包","children":[]},{"level":3,"title":"修改 APP 名称与图标","slug":"修改-app-名称与图标","link":"#修改-app-名称与图标","children":[]}]},{"level":2,"title":"Expo 环境应用打包","slug":"expo-环境应用打包","link":"#expo-环境应用打包","children":[]}],"relativePath":"front-end/react/react-native/09. 常见问题/如何打包发布应用.md"}'),o={name:"front-end/react/react-native/09. 常见问题/如何打包发布应用.md"},e=[l('<h1 id="如何打包发布应用" tabindex="-1">如何打包发布应用 <a class="header-anchor" href="#如何打包发布应用" aria-label="Permalink to &quot;如何打包发布应用&quot;">​</a></h1><p>当我们的应用开发完成后，下一步要做的就是对应用进行打包。本文将介绍如何对 <em>RN</em> 项目进行打包，分为两种情况：</p><ul><li><em>React Native CLI</em> 环境项目应用打包</li><li><em>Expo</em> 环境应用打包</li></ul><h2 id="react-native-cli-环境项目应用打包" tabindex="-1"><em>React Native CLI</em> 环境项目应用打包 <a class="header-anchor" href="#react-native-cli-环境项目应用打包" aria-label="Permalink to &quot;*React Native CLI* 环境项目应用打包&quot;">​</a></h2><p>Android 要求所有应用都有一个数字签名才会被允许安装在用户手机上，所以在把应用发布到应用市场之前，你需要先生成一个签名的 AAB 或 APK 包（Google Play 现在要求 AAB 格式，而国内的应用市场目前仅支持 APK 格式。但无论哪种格式，下面的签名步骤是一样的）。</p><h3 id="生成一个签名密钥" tabindex="-1">生成一个签名密钥 <a class="header-anchor" href="#生成一个签名密钥" aria-label="Permalink to &quot;生成一个签名密钥&quot;">​</a></h3><p>你可以用keytool命令生成一个私有密钥。在 Windows 上keytool命令放在 JDK 的 bin 目录中（比如C:\\Program Files\\Java\\jdkx.x.x_x\\bin），你可能需要在命令行中先进入那个目录才能执行此命令。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000</span></span>\n<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>这条命令会要求你输入密钥库（<em>keystore</em>）和对应密钥的密码，然后设置一些发行相关的信息。最后它会生成一个叫做 <em>my-release-key.keystore</em> 的密钥库文件。</p><p>在运行上面这条语句之后，密钥库里应该已经生成了一个单独的密钥，有效期为 <em>10000</em> 天。<em>--alias</em> 参数后面的别名是将来为应用签名时所需要用到的，所以记得记录这个别名。</p><p>切换目录到项目根目录下，具体操作如下图所示：</p><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-054203.png" alt="image-20220720134202756"></p><blockquote><p>注意：请记得妥善地保管好你的密钥库文件，一般不要上传到版本库或者其它的地方。</p></blockquote><h3 id="设置-gradle-变量" tabindex="-1">设置 gradle 变量 <a class="header-anchor" href="#设置-gradle-变量" aria-label="Permalink to &quot;设置 gradle 变量&quot;">​</a></h3><ol><li><p>把my-release-key.keystore文件放到你工程中的android/app文件夹下。</p></li><li><p>编辑~/.gradle/gradle.properties（全局配置，对所有项目有效）或是项目目录/android/gradle.properties（项目配置，只对所在项目有效）。如果没有gradle.properties文件你就自己创建一个，添加如下的代码（注意把其中的****替换为相应密码）</p></li></ol><blockquote><p>注意：~符号表示用户目录，比如 windows 上可能是C:\\Users\\用户名，而 mac 上可能是/Users/用户名。</p></blockquote><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">MYAPP_RELEASE_STORE_FILE=my-release-key.keystore</span></span>\n<span class="line"><span style="color:#A6ACCD;">MYAPP_RELEASE_KEY_ALIAS=my-key-alias</span></span>\n<span class="line"><span style="color:#A6ACCD;">MYAPP_RELEASE_STORE_PASSWORD=*****</span></span>\n<span class="line"><span style="color:#A6ACCD;">MYAPP_RELEASE_KEY_PASSWORD=*****</span></span>\n<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>具体操作如下图所示：</p><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-054220.png" alt="image-20220720134220560"></p><p>其中最后两行的 <em>PASSWORD</em> 要替换为上面在创建 <em>my-release-key.keystore</em> 的密钥库文件时所输入的密码。</p><h3 id="把签名配置加入到项目的-gradle-配置中" tabindex="-1">把签名配置加入到项目的 gradle 配置中 <a class="header-anchor" href="#把签名配置加入到项目的-gradle-配置中" aria-label="Permalink to &quot;把签名配置加入到项目的 gradle 配置中&quot;">​</a></h3><p>编辑你项目目录下的android/app/build.gradle，添加如下的签名配置：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">...</span></span>\n<span class="line"><span style="color:#A6ACCD;">android {</span></span>\n<span class="line"><span style="color:#A6ACCD;">    ...</span></span>\n<span class="line"><span style="color:#A6ACCD;">    defaultConfig { ... }</span></span>\n<span class="line"><span style="color:#A6ACCD;">    signingConfigs {</span></span>\n<span class="line"><span style="color:#A6ACCD;">        release {</span></span>\n<span class="line"><span style="color:#A6ACCD;">            if (project.hasProperty(&#39;MYAPP_RELEASE_STORE_FILE&#39;)) {</span></span>\n<span class="line"><span style="color:#A6ACCD;">                storeFile file(MYAPP_RELEASE_STORE_FILE)</span></span>\n<span class="line"><span style="color:#A6ACCD;">                storePassword MYAPP_RELEASE_STORE_PASSWORD</span></span>\n<span class="line"><span style="color:#A6ACCD;">                keyAlias MYAPP_RELEASE_KEY_ALIAS</span></span>\n<span class="line"><span style="color:#A6ACCD;">                keyPassword MYAPP_RELEASE_KEY_PASSWORD</span></span>\n<span class="line"><span style="color:#A6ACCD;">            }</span></span>\n<span class="line"><span style="color:#A6ACCD;">        }</span></span>\n<span class="line"><span style="color:#A6ACCD;">    }</span></span>\n<span class="line"><span style="color:#A6ACCD;">    buildTypes {</span></span>\n<span class="line"><span style="color:#A6ACCD;">        release {</span></span>\n<span class="line"><span style="color:#A6ACCD;">            ...</span></span>\n<span class="line"><span style="color:#A6ACCD;">            signingConfig signingConfigs.release</span></span>\n<span class="line"><span style="color:#A6ACCD;">        }</span></span>\n<span class="line"><span style="color:#A6ACCD;">    }</span></span>\n<span class="line"><span style="color:#A6ACCD;">}</span></span>\n<span class="line"><span style="color:#A6ACCD;">...</span></span>\n<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>具体操作如下图所示：</p><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-054237.png" alt="image-20220720134237710"></p><h3 id="生成发行-apk-包" tabindex="-1">生成发行 APK 包 <a class="header-anchor" href="#生成发行-apk-包" aria-label="Permalink to &quot;生成发行 APK 包&quot;">​</a></h3><p>只需在终端中运行以下命令：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">$ cd android</span></span>\n<span class="line"><span style="color:#A6ACCD;">$ ./gradlew assembleRelease</span></span>\n<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><blockquote><p>cd android表示进入 android 目录（如果你已经在 android 目录中了那就不用输入了）。</p></blockquote><p>打包成功。</p><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-054252.png" alt="image-20220720134252892"></p><p>最终，打包好的 <em>apk</em> 文件存放于 <em>项目根目录/android/app/build/outputs/apk/release/</em></p><h3 id="修改-app-名称与图标" tabindex="-1">修改 <em>APP</em> 名称与图标 <a class="header-anchor" href="#修改-app-名称与图标" aria-label="Permalink to &quot;修改 *APP* 名称与图标&quot;">​</a></h3><p>一般来讲，我们需要替换掉默认的应用图标和名称。方法如下：</p><ul><li>修改 <em>app</em> 的名称：在 <em>android/src/main/res/values/strings.xml</em></li></ul><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">resources</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">string</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">app_name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">你的应用名称</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">string</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">resources</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><ul><li>修改 <em>app</em> 图标：在 <em>android/src/main/res/mipmap-*</em> 里面的图片全部换成自己的图片</li></ul><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-054310.png" alt="image-20220720134309505" style="zoom:50%;"><p>替换之后重新打包项目即可。</p><h2 id="expo-环境应用打包" tabindex="-1"><em>Expo</em> 环境应用打包 <a class="header-anchor" href="#expo-环境应用打包" aria-label="Permalink to &quot;*Expo* 环境应用打包&quot;">​</a></h2><p>在 <em>expo</em> 中要打包项目非常简单。启动项目后，在浏览器端的控制台页面，选择“<em>Publish or republish project</em>”选项。</p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-054335.png" alt="image-20220720134335005" style="zoom:50%;"><p>在右边的面板中，填写对应的信息，如下图：</p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-054431.png" alt="image-20220720134431493" style="zoom:50%;"><p>之后点击【<em>Publish project</em>】按钮进行打包。打包完成后，会在控制台提示我们打包已经完成。</p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-054455.png" alt="image-20220720134455712" style="zoom:67%;"><p>当出现该提示时，说明打包的应用已被放到 <em>expo</em> 官网了。访问这个链接，可以看到我们发布的项目。</p><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-054512.png" alt="image-20220720134511653"></p><p>点击【<em>Builds</em>】，可以看到打包后的应用的详细信息，在【<em>Status</em>】那一栏提供了下载链接，我们可以下载打包好的 <em>apk</em> 文件，来进行发布。</p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-054525.png" alt="image-20220720134525640" style="zoom:67%;"><p>当然，我们也可以通过命令的形式来进行打包，在 <em>app.json</em> 文件中，可以进行更加详细的配置：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">expo</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">expo_app</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">slug</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">expo_app</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">1.0.0</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">orientation</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">portrait</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">icon</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./assets/icon.png</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">splash</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">image</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./assets/splash.png</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">resizeMode</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">contain</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">backgroundColor</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">#ffffff</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">sdkVersion</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">38.0.0</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">updates</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">fallbackToCacheTimeout</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">assetBundlePatterns</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> [</span></span>\n<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">**/*</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#F07178;">    ]</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">ios</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">supportsTablet</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">web</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">favicon</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./assets/favicon.png</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">android</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">package</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">com.test.expo_app</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">description</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;&quot;</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><p>在该配置文件中，主要就是配置了应用的图标、版本等信息。</p><p>详细的配置选项，可以参阅：<em><a href="https://docs.expo.io/versions/latest/config/app/" target="_blank" rel="noreferrer">https://docs.expo.io/versions/latest/config/app/</a></em></p><p>接下来通过 <em>expo start</em> 启动应用，然后新开一个窗口，通过 <em>exp build:android</em> 来进行打包。</p><blockquote><p>注：所以在上面的 <em>app.json</em> 中，一定要有 <em>android</em> 这个配置项。</p></blockquote><p>具体操作如下图所示：</p><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-20-054546.png" alt="image-20220720134546250"></p><p>整个打包过程会比较长，因为应用也会先被存储到 <em>expo</em> 官网。</p><p>打包完成后，<em>expo</em> 会给我们一个链接，通过该链接可以下载打包的 <em>apk</em> 文件，然后就可以进行发布了。</p><hr><p>-<em>EOF</em>-</p>',62)];const t=s(o,[["render",function(s,l,p,o,t,c){return a(),n("div",null,e)}]]);export{p as __pageData,t as default};
