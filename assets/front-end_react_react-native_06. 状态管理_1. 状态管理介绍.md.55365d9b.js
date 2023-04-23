import{_ as e,o as m,c as t,d as i}from"./chunks/framework.ad53f7b3.js";const l=JSON.parse('{"title":"1. 状态管理介绍","description":"","frontmatter":{},"headers":[{"level":3,"title":"Flux","slug":"flux","link":"#flux","children":[]},{"level":3,"title":"Vuex","slug":"vuex","link":"#vuex","children":[]},{"level":3,"title":"Redux","slug":"redux","link":"#redux","children":[]},{"level":3,"title":"Mobx","slug":"mobx","link":"#mobx","children":[]}],"relativePath":"front-end/react/react-native/06. 状态管理/1. 状态管理介绍.md"}'),o={name:"front-end/react/react-native/06. 状态管理/1. 状态管理介绍.md"},a=[i('<h1 id="_1-状态管理介绍" tabindex="-1">1. 状态管理介绍 <a class="header-anchor" href="#_1-状态管理介绍" aria-label="Permalink to &quot;1. 状态管理介绍&quot;">​</a></h1><p>在目前前端的组件化开发风潮中，无论是 <em>PC</em> 端还是移动端，对于组件化来讲有一个非常重要的就是状态管理。要理解什么状态管理，首先就要理解什么是状态。</p><p>实际上，状态的概念非常简单，就是每个组件自身可以维护一些数据。而由于组件与组件之间存在一些关系（例如父子关系、兄弟关系），这就避免不了组件之间要进行数据的传递，这也就是所谓的组件状态管理出现的背景。</p><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-06-27-023352.png" alt="image-20220627103352425"></p><p>如果使用传统的 <em>porps</em> 或者自定义事件的形式来传递组件的数据，就会显得非常的繁琐，一个组件状态更新，需要一层一层传递到根组件，再由根组件一层一层往下传递。这样一个应用的组件层数嵌套得越深，工作量就会变得越大。</p><p>在这样的背景下，专门用于状态管理的库就出现了。</p><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-06-27-025600.png" alt="image-20220627105559707"></p><p>状态管理库的核心思想很简单，专门拿一个 <em>store</em> 的仓库来管理所有组件的状态，假如一个组件状态更新后，同步更新仓库中的状态，这样另一个组件再获取最新的状态时，也不用向之前那样层层传递，直接从仓库获取最近的状态即可。</p><p>目前，市面上比较流行的状态管理库有：</p><ul><li><em>Flux</em></li><li><em>Vuex</em></li><li><em>Redux</em></li><li><em>Mobx</em></li></ul><h3 id="flux" tabindex="-1"><em>Flux</em> <a class="header-anchor" href="#flux" aria-label="Permalink to &quot;*Flux*&quot;">​</a></h3><p><em>2013</em> 年，<em>Facebook</em> 亮出 <em>React</em> 的时候，也跟着带出了 <em>Flux</em>。<em>Facebook</em> 认为两者相辅相成，结合在一起才能构建大型的 <em>JavaScript</em> 应用。</p><p><em>Flux</em> 的组成：</p><ul><li><em>View</em>: 视图层</li><li><em>Action</em>: 动作，即数据改变的消息对象（可通过事件触发、测试用例触发等） <ul><li><em>Store</em> 的改变只能通过 <em>Action</em></li><li>具体 <em>Action</em> 的处理逻辑一般放在 <em>Store</em> 里</li><li><em>Action</em> 对象包含 <em>type</em>（类型）与 <em>payload</em>（传递参数）</li><li><em>Action</em> 仅仅是改变 <em>Store</em> 的一个动作，一般包含该动作的类型、传递的数据</li></ul></li><li><em>Dispatcher</em>: 派发器，接收 <em>Actions</em>，发给所有的 <em>Store</em>。</li><li><em>Store</em>: 数据层，存放应用状态与更新状态的方法，一旦发生变动，就提醒 <em>Views</em> 更新页面</li></ul><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-06-27-025618.png" alt="image-20220627105617920"></p><p><em>Flux</em> 的特点：</p><ul><li>单向数据流。视图事件或者外部测试用例发出 <em>Action</em>，经由 <em>Dispatcher</em> 派发给 <em>Store</em>，<em>Store</em> 会触发相应的方法更新数据、更新视图</li><li><em>Store</em> 可以有多个</li><li><em>Store</em> 不仅存放数据，还封装了处理数据的方法</li></ul><h3 id="vuex" tabindex="-1"><em>Vuex</em> <a class="header-anchor" href="#vuex" aria-label="Permalink to &quot;*Vuex*&quot;">​</a></h3><p><em>Vuex</em> 是 <em>Vue</em> 官方推出的状态管理库。</p><p><em>Vuex</em> 的核心概念：</p><ul><li><em>Store</em>: <em>Vuex</em> 采用单一状态树，每个应用仅有一个 <em>Store</em> 实例，在该实例下包含了 <em>state、actions、mutations、getters、modules</em>。</li><li><em>State</em>: <em>Vuex</em> 为单一数据源。可以通过 <em>mapState</em> 辅助函数将 <em>state</em> 作为计算属性访问，或者将通过 <em>Store</em> 将 <em>state</em> 注入全局之后使用 <em>this.$store.state</em> 访问。<em>State</em> 更新视图是通过 <em>vue</em> 的双向绑定机制实现的。</li><li><em>Getter</em>: <em>Getter</em> 的作用与 <em>filters</em> 有一些相似，可以将 <em>State</em> 进行过滤后输出。</li><li><em>Mutation</em>: <em>Mutaion</em> 是 <em>vuex</em> 中改变 <em>State</em> 的唯一途径（严格模式下），并且只能是同步操作。<em>Vuex</em> 中通过 <em>store.commit( )</em> 调用 <em>Mutation</em>。</li><li><em>Action</em>: 一些对 <em>State</em> 的异步操作可以放在 <em>Action</em> 中，并通过在 <em>Action</em> 提交 <em>Mutaion</em> 变更状态。<em>Action</em> 通过 <em>store.dispatch( )</em> 方法触发。可以通过 <em>mapActions</em> 辅助函数将 <em>vue</em> 组件的 <em>methods</em> 映射成 <em>store.dispatch</em> 调用（需要先在根节点注入 <em>store</em>）。</li><li><em>Module</em>: 当 <em>Store</em> 对象过于庞大时，可根据具体的业务需求分为多个 <em>Module</em>，每个 <em>Module</em> 都具有自己的 <em>state 、mutation 、action 、getter</em>。</li></ul><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-06-27-025636.png" alt="image-20220627105636282" style="zoom:50%;"><p><em>Vuex</em> 的特点：</p><ul><li>单向数据流。<em>View</em> 通过 <em>store.dispatch( )</em> 调用 <em>Action</em>，在 <em>Action</em> 执行完异步操作之后通过 <em>store.commit( )</em> 调用 <em>Mutation</em> 更新 <em>State</em>，通过 <em>vue</em> 的响应式机制进行视图更新。</li><li>单一数据源，和 <em>Redux</em> 一样全局只有一个 <em>Store</em> 实例。</li><li>可直接对 <em>State</em> 进行修改。</li></ul><h3 id="redux" tabindex="-1"><em>Redux</em> <a class="header-anchor" href="#redux" aria-label="Permalink to &quot;*Redux*&quot;">​</a></h3><p>作为一款针对 <em>JavaScript</em> 应用的可预测状态管理容器库，由 <em>Dan Abramov</em> 在 <em>2015</em> 年创建的 <em>Redux</em> 在创建之初曾受到 <em>Flux</em> 架构以及函数式 <em>Elm</em> 的启发。后来，随着 <em>Dan Abramov</em> 加盟 <em>Facebook</em>，<em>Redux</em> 最终成为 <em>Facebook</em> 旗下的一个子项目。<em>Redux</em> 之所以被广泛接受，是因为 <em>Redux</em> 融合了各家技术于一身，不但简化了 <em>Flux</em> 的流程与开发方式，还引入了一些优秀的设计理念。</p><p>作为一个应用状态管理库，<em>Redux</em> 和 <em>Flux</em> 有很多相似的地方。不同之处在于，<em>Flux</em> 可以有很多个改变应用状态的 <em>Store</em>，并可以通过事件来触发状态的变化，组件可以通过订阅这些事件来和当前状态保持同步。</p><p>在 <em>Redux</em> 中，则并没有 <em>Dispatcher</em>（分发器）的概念，<em>Redux</em> 使用一个单独的常量状态树来保存整个应用的状态，并且这个对象是不能直接被改变的。如果某些数据发生改变，那么就会创建出一个新的对象。</p><p>由于 <em>Redux</em> 是在 <em>Flux</em> 的基础上扩展出的一种单向数据流的实现，所以数据的流向、变化都能得到清晰的控制，并且能很好地划分业务逻辑和视图逻辑。</p><p><em>Redux</em> 的组成：</p><ul><li><em>Store</em>: 存储应用 <em>state</em> 以及用于触发 <em>state</em> 更新的 <em>dispatch</em> 方法等，整个应用仅有单一的 <em>Store</em></li><li><em>Store</em> 中提供了几个 <em>API</em>: <ul><li><em>store.getState( )</em>: 获取当前 <em>state</em></li><li><em>store.dispatch(action)</em>: 用于 <em>View</em> 发出 <em>Action</em></li><li><em>store.subscribe(listener)</em>: 设置监听函数，一旦 <em>state</em> 变化则执行该函数（若把视图更新函数作为 <em>listener</em> 传入，则可触发视图自动渲染）。</li></ul></li><li><em>Action</em>: 同 <em>Flux</em>，<em>Action</em> 是用于更新 <em>state</em> 的消息对象，由 <em>View</em> 发出。有专门生成 <em>Action</em> 的 <em>Action Creator</em></li><li><em>Reducer</em>: 是一个用于改变 <em>state</em> 的纯函数（对于相同的参数返回相同的返回结果，不修改参数，不依赖外部变量），即通过应用状态与 <em>Action</em> 推导出新的 <em>state</em>: <em>(previousState, action) =&gt; newState</em>。<em>Reducer</em> 返回一个新的 <em>state</em></li></ul><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-06-27-030106.png" alt="image-20220627110106329"></p><p><em>Redux</em> 的特点：</p><ul><li>单向数据流。<em>View</em> 发出 <em>Action(store.dispatch(action))</em>，<em>Store</em> 调用 <em>Reducer</em> 计算出新的 <em>state</em>，若 <em>state</em> 产生变化，则调用监听函数重新渲染 <em>View</em> <em>(store.subscribe(render))</em>。</li><li>单一数据源，只有一个 <em>Store</em>。</li><li><em>state</em> 是只读的，每次状态更新之后只能返回一个新的 <em>state</em>。</li><li>没有 <em>Dispatcher</em>，而是在 <em>Store</em> 中集成了 <em>dispatch</em> 方法，<em>store.dispatch( )</em> 是 <em>View</em> 发出 <em>Action</em> 的唯一途径。</li></ul><h3 id="mobx" tabindex="-1"><em>Mobx</em> <a class="header-anchor" href="#mobx" aria-label="Permalink to &quot;*Mobx*&quot;">​</a></h3><p>作为一个应用状态管理库，<em>Redux</em> 被广泛用于复杂的大型应用中，在很多大型 <em>Web</em> 前端应用中都可以看到它的身影。不过除了 <em>Redux</em>，社区里近年来还有另一产品呼声很高，那就是 <em>Mobx</em>。</p><p><em>MobX</em> 是由 <em>Mendix、Coinbase</em> 和 <em>Facebook</em> 开源的状态管理框架。MobX 背后的哲学是:</p><blockquote><p>任何源自应用状态的东西都应该自动地获得。</p></blockquote><p>意思就是，当状态改变时，所有应用到状态的地方都会自动更新。它通过响应式函数编程来实现状态的存储和管理。<strong>受到面向对象编程和响应式编程的影响，<em>Mobx</em> 可以将状态包装成可观察对象，通过观察和修改对象的状态进而实现视图的更新。</strong></p><p>这样一个功能强大，上手非常容易的状态管理工具。就连 <em>Redux</em> 的作者也曾经向大家推荐过它，在不少情况下你的确可以使用 <em>Mobx</em> 来替代掉 <em>Redux</em>。</p><p><em>MobX</em> 的核心概念：</p><ul><li><em>State</em>: 驱动应用的数据</li><li><em>Computed values</em>: 计算值。如果你想创建一个基于当前状态的值时，请使用 <em>computed</em></li><li><em>Reactions</em>: 反应，当状态改变时自动发生</li><li><em>Actions</em>: 动作，用于改变 <em>State</em></li><li>依赖收集（<em>autoRun</em>）: <em>MobX</em> 中的数据以来基于观察者模式，通过 <em>autoRun</em> 方法添加观察者</li></ul><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-06-27-030125.png" alt="image-20220627110125184"></p><p><em>MobX</em> 的特点：</p><ul><li>数据流流动不自然，只有用到的数据才会引发绑定，局部精确更新（细粒度控制）</li><li>没有时间回溯能力，因为数据只有一份引用</li><li>基于面向对象</li><li>往往是多个 <em>Store</em></li><li>代码侵入性小</li><li>简单可扩展</li><li>大型项目使用 <em>MobX</em> 会使得代码难以维护</li></ul><p>最后总结一下：</p><ul><li><em>Flux 、Redux 、Vuex</em> 均为单向数据流。</li><li><em>Redux</em> 和 <em>Vuex</em> 是基于 <em>Flux</em> 的，<em>Redux</em> 较为泛用，<em>Vuex</em> 只能用于 <em>vue</em>。</li><li><em>Flux</em> 与 <em>MobX</em> 可以有多个 <em>Store</em>，<em>Redux、Vuex</em> 全局仅有一个 <em>Store</em>（单状态树）。</li><li><em>Redux、Vuex</em> 适用于大型项目的状态管理，<em>MobX</em> 在大型项目中应用会使代码可维护性变差。</li><li><em>Redux</em> 中引入了中间件，主要解决异步带来的副作用，可通过约定完成许多复杂工作。</li><li><em>MobX</em> 是状态管理库中代码侵入性最小的之一，具有细粒度控制、简单可扩展等优势，但是没有时间回溯能力，一般适合应用于中小型项目中。</li></ul><hr><p>-<em>EOF</em>-</p>',49)];const u=e(o,[["render",function(e,i,l,o,u,r){return m(),t("div",null,a)}]]);export{l as __pageData,u as default};
