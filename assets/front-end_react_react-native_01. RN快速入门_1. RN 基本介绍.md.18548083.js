import{_ as e,o as m,c as a,d as i}from"./chunks/framework.ad53f7b3.js";const t=JSON.parse('{"title":"1. RN 基本介绍","description":"","frontmatter":{},"headers":[{"level":2,"title":"什么是 RN","slug":"什么是-rn","link":"#什么是-rn","children":[]},{"level":2,"title":"RN 特点","slug":"rn-特点","link":"#rn-特点","children":[{"level":3,"title":"使用 React 来创建 Android 和 iOS 的原生应用","slug":"使用-react-来创建-android-和-ios-的原生应用","link":"#使用-react-来创建-android-和-ios-的原生应用","children":[]},{"level":3,"title":"预览速度快","slug":"预览速度快","link":"#预览速度快","children":[]},{"level":3,"title":"无缝跨平台","slug":"无缝跨平台","link":"#无缝跨平台","children":[]}]},{"level":2,"title":"谁在使用 RN","slug":"谁在使用-rn","link":"#谁在使用-rn","children":[]}],"relativePath":"front-end/react/react-native/01. RN快速入门/1. RN 基本介绍.md"}'),r={name:"front-end/react/react-native/01. RN快速入门/1. RN 基本介绍.md"},n=[i('<h1 id="_1-rn-基本介绍" tabindex="-1">1. <em>RN</em> 基本介绍 <a class="header-anchor" href="#_1-rn-基本介绍" aria-label="Permalink to &quot;1. *RN* 基本介绍&quot;">​</a></h1><p>本小节主要包含以下知识点：</p><ul><li>什么是 <em>RN</em></li><li><em>RN</em> 特点</li><li>谁在使用 <em>RN</em></li></ul><h2 id="什么是-rn" tabindex="-1">什么是 <em>RN</em> <a class="header-anchor" href="#什么是-rn" aria-label="Permalink to &quot;什么是 *RN*&quot;">​</a></h2><p><em>RN</em> 英文全称 <em>ReactNative</em>，是 <em>Facebook</em> 于 <em>2015</em> 年 <em>4</em> 月开源的跨平台移动应用开发框架，也是 <em>Facebook</em> 早先所开源的 <em>JavaScript</em> 框架 <em>React</em> 在原生移动应用平台的衍生产物，目前支持 <em>iOS</em> 和安卓两大平台。</p><p><em>RN</em> 使用 <em>Javascript</em> 和 <em>React</em> 中类似于 <em>html</em> 的 <em>JSX</em>，以及 <em>css</em> 来开发移动应用，因此熟悉 <em>Web</em> 前端开发的技术人员只需很少的学习就可以快速进入移动应用开发领域。</p><p><em>RN</em> 官网：<em><a href="https://reactnative.dev/" target="_blank" rel="noreferrer">https://reactnative.dev/</a></em></p><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-06-02-061556.png" alt="image-20220602141555963"></p><p><em>RN</em> 中文网：<em><a href="https://reactnative.cn/" target="_blank" rel="noreferrer">https://reactnative.cn/</a></em></p><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-06-02-061614.png" alt="image-20220602141614461"></p><h2 id="rn-特点" tabindex="-1"><em>RN</em> 特点 <a class="header-anchor" href="#rn-特点" aria-label="Permalink to &quot;*RN* 特点&quot;">​</a></h2><p>根据官网的介绍，<em>RN</em> 主要有如下的特点：</p><ul><li>使用 <em>React</em> 来创建 <em>Android</em> 和 <em>iOS</em> 的原生应用</li><li>预览速度快</li><li>无缝跨平台</li></ul><h3 id="使用-react-来创建-android-和-ios-的原生应用" tabindex="-1">使用 <em>React</em> 来创建 <em>Android</em> 和 <em>iOS</em> 的原生应用 <a class="header-anchor" href="#使用-react-来创建-android-和-ios-的原生应用" aria-label="Permalink to &quot;使用 *React* 来创建 *Android* 和 *iOS* 的原生应用&quot;">​</a></h3><p>目前来讲，我们的移动端应用主要分为三大类：<em>WebApp</em>、<em>NativeApp</em> 和 <em>HybridApp</em>。</p><p><em>WebApp</em> 指的是移动端的 <em>Web</em> 浏览器，其实和 <em>PC</em> 端的 <em>Web</em> 浏览器没有任何区别，只不过 <em>Web</em> 浏览器所依附的操作系统不再是 <em>Windows</em> 和 <em>Linux</em> 了，而是 <em>iOS</em> 和 <em>Android</em>，<em>WebApp</em> 采用的技术主要是，传统的 <em>HTML、JavaScript、CSS</em> 等 <em>Web</em> 技术栈，当然现在 <em>HTML5</em> 也得到了广泛的应用。另外，<em>WebApp</em> 所访问的页面内容都是放在服务器端的，本质上就是 <em>Web</em> 网页，所以天生就是跨平台的。不能在商店中下载，只能在移动设备浏览器中打开。</p><p><em>NativeApp</em> 指的是移动端的原生应用，对于 <em>Android</em> 是 <em>apk</em>，对于 <em>iOS</em> 就是 <em>ipa</em>。<em>NativeApp</em> 是一种基于手机操作系统（<em>iOS</em> 和 <em>Android</em>），并使用原生程序编写运行的第三方应用程序。<em>NativeApp</em> 的开发，<em>Android</em> 使用的语言通常是 Java 或者 <em>Kotlin</em>，<em>iOS</em> 使用的语言是 <em>Objective-C</em> 或者 <em>Swift</em>。通常来说，<em>NativeApp</em> 可以提供比较好的用户体验以及性能，而且可以方便地操作手机本地资源，可在应用商店内进行下载，以 <em>app</em> 的形式打包。</p><p><em>HybridApp</em>，俗称混合应用，是介于 <em>WebApp</em> 和 <em>NativeApp</em> 两者之间的一种 <em>App</em> 形式，<em>HybridApp</em> 利用了 <em>WebApp</em> 和 <em>NativeApp</em> 的优点，通过一个原生实现的 <em>Native Container</em> 展示 <em>HTML5</em> 的页面。更通俗的讲法可以归结为，在原生移动应用中嵌入了 <em>Webview</em>，然后通过该 <em>Webview</em> 来访问网页。<em>HybridApp</em> 具有维护更新简单，用户体验优异以及较好的跨平台特性，是目前主流的移动应用开发模式，可在应用商店内进行下载，以 <em>app</em> 的形式打开。</p><p>那么，使用 <em>RN</em> 所开发的应用是属于哪一类呢？</p><p>根据官方的介绍，<em>RN</em> 所开发最终产品是一个真正的移动应用，从使用感受上和原生应用相比几乎是无法区分的。</p><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-06-02-061650.png" alt="image-20220602141649879"></p><p>在 <em>RN</em> 中所使用的基础 <em>UI</em> 组件会映射到原生应用中的对应组件。</p><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-06-02-061707.png" alt="image-20220602141706862"></p><h3 id="预览速度快" tabindex="-1">预览速度快 <a class="header-anchor" href="#预览速度快" aria-label="Permalink to &quot;预览速度快&quot;">​</a></h3><p>传统使用 <em>Objective-C</em> 或 <em>Java</em> 编写的原生应用，要预览效果，需要先将整个项目编译一次，而这个编译时间是比较耗时的。</p><p><em>RN</em> 让你可以快速迭代开发应用。比起传统原生应用漫长的编译过程，现在你可以在瞬间刷新你的应用。开启 <em>Hot Reloading</em> 的话，甚至能在保持应用运行状态的情况下热替换新代码！</p><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-06-02-061803.png" alt="image-20220602141803449"></p><h3 id="无缝跨平台" tabindex="-1">无缝跨平台 <a class="header-anchor" href="#无缝跨平台" aria-label="Permalink to &quot;无缝跨平台&quot;">​</a></h3><p>使用 <em>RN</em> 所开发的移动端应用是无缝跨平台的，原生代码和 <em>API</em> 会被封装到 <em>RN</em> 组件中，开发者只需要掌握 <em>React</em> 和 <em>JavaScript</em> 知识即可进行开发。</p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-06-02-061835.png" alt="image-20220602141835452" style="zoom:67%;"><h2 id="谁在使用-rn" tabindex="-1">谁在使用 <em>RN</em> <a class="header-anchor" href="#谁在使用-rn" aria-label="Permalink to &quot;谁在使用 *RN*&quot;">​</a></h2><p><em>RN</em> 从 <em>2015</em> 年开源至今，已经有非常多的国内外厂商选择使用 <em>RN</em> 来开发移动端应用，因为比起以前开发 <em>Andriod</em> 和 <em>iOS</em> 应用要各自找一波开发工程师，现在只需要找一个前端工程师即可。</p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-06-02-061857.png" alt="image-20220602141856881" style="zoom:67%;"><p>更多使用厂商，可以参阅：<em><a href="https://reactnative.dev/showcase" target="_blank" rel="noreferrer">https://reactnative.dev/showcase</a></em></p><hr><p>-<em>EOF</em>-</p>',36)];const p=e(r,[["render",function(e,i,t,r,p,l){return m(),a("div",null,n)}]]);export{t as __pageData,p as default};
