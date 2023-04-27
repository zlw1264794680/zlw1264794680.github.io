import{_ as a,o as s,c as l,d as e}from"./chunks/framework.4d89205b.js";const n=JSON.parse('{"title":"2. 渲染、提交和挂载","description":"","frontmatter":{},"headers":[{"level":2,"title":"初始渲染","slug":"初始渲染","link":"#初始渲染","children":[{"level":3,"title":"阶段一：渲染","slug":"阶段一-渲染","link":"#阶段一-渲染","children":[]},{"level":3,"title":"阶段二：提交","slug":"阶段二-提交","link":"#阶段二-提交","children":[]},{"level":3,"title":"阶段三：挂载","slug":"阶段三-挂载","link":"#阶段三-挂载","children":[]}]},{"level":2,"title":"React 状态更新","slug":"react-状态更新","link":"#react-状态更新","children":[{"level":3,"title":"阶段一：渲染","slug":"阶段一-渲染-1","link":"#阶段一-渲染-1","children":[]},{"level":3,"title":"阶段二：提交","slug":"阶段二-提交-1","link":"#阶段二-提交-1","children":[]},{"level":3,"title":"阶段三：挂载","slug":"阶段三-挂载-1","link":"#阶段三-挂载-1","children":[]}]},{"level":2,"title":"React Native 渲染器状态更新","slug":"react-native-渲染器状态更新","link":"#react-native-渲染器状态更新","children":[{"level":3,"title":"阶段二：提交","slug":"阶段二-提交-2","link":"#阶段二-提交-2","children":[]},{"level":3,"title":"阶段三：挂载","slug":"阶段三-挂载-2","link":"#阶段三-挂载-2","children":[]}]}],"relativePath":"front-end/react/react-native/08.RN架构/2.渲染、提交和挂载.md"}'),p={name:"front-end/react/react-native/08.RN架构/2.渲染、提交和挂载.md"},o=[e('<h1 id="_2-渲染、提交和挂载" tabindex="-1">2. 渲染、提交和挂载 <a class="header-anchor" href="#_2-渲染、提交和挂载" aria-label="Permalink to &quot;2. 渲染、提交和挂载&quot;">​</a></h1><blockquote><p>本文档涉及正在积极推出的新渲染器 Fabric 的架构。</p></blockquote><p>React Native 渲染器通过一系列工作将 React 逻辑渲染到主机平台。 这一系列工作称为渲染管道，用于初始渲染和更新 UI 状态。 本文档介绍了渲染管道以及它在这些场景中的不同之处。</p><p>渲染管道可以分为三个一般阶段：</p><ul><li><p>渲染：React 执行应用逻辑，在 JavaScript 中创建 React 元素树。根据这棵树，渲染器在 C++ 中创建一个 React Shadow Tree。</p></li><li><p>提交：React Shadow Tree 完全创建后，渲染器将触发提交。此时会将 React Element Tree 和新创建的 React Shadow Tree 提升为要挂载的“下一棵树”。这里面也包含了其布局信息的计算。</p></li><li><p>挂载：React Shadow Tree，现在连同布局计算的结果，将被转换为 Host View Tree。</p></li></ul><blockquote><p>渲染管道的阶段可能发生在不同的线程上。 有关详细信息，请参阅线程模型文档。</p></blockquote><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-15-084019.png" alt="image-20220715164019028" style="zoom:50%;"><h2 id="初始渲染" tabindex="-1">初始渲染 <a class="header-anchor" href="#初始渲染" aria-label="Permalink to &quot;初始渲染&quot;">​</a></h2><p>假设您要渲染以下内容：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">MyComponent</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> (</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">View</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Text</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Hello, World</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#FFCB6B;">Text</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#FFCB6B;">View</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#F07178;">  )</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">// &lt;MyComponent /&gt;</span></span>\n<span class="line"></span></code></pre></div><p>在上面的例子中，&lt;MyComponent /&gt; 是一个 React 元素。 React 通过调用它（如果是使用 JavaScript 类实现则调用它的 render 方法）递归地将这个 React 元素缩减为终端 React 主机组件，直到每个 React 元素都不能被进一步缩减。现在你有一个 React 主机组件的 React 元素树。</p><h3 id="阶段一-渲染" tabindex="-1">阶段一：渲染 <a class="header-anchor" href="#阶段一-渲染" aria-label="Permalink to &quot;阶段一：渲染&quot;">​</a></h3><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-15-084040.png" alt="image-20220715164039531"></p><p>在这个元素缩减的过程中，随着每个 React Element 的调用，渲染器也会同步创建一个 React Shadow Node。这只发生在 React 主机组件，而不是 React Composite 组件。在上面的示例中，&lt;View&gt; 导致创建 ViewShadowNode 对象，&lt;Text&gt; 导致创建 TextShadowNode 对象。 值得注意的是，从来没有直接代表 &lt;MyComponent&gt; 的 React Shadow Node。</p><p>每当 React 在两个 React 元素节点之间创建父子关系时，渲染器都会在相应的 React 影子节点之间创建相同的关系。 这就是 React Shadow Tree 的组装方式。</p><p><strong>额外细节</strong></p><ul><li><p>从（创建 React Shadow 节点以及创建两个 React Shadow 节点之间的父子关系）React (JavaScript) 到渲染器 (C++) 的执行操作是同步的，并且是线程安全的操作。该操作通常在 JavaScript 线程上执行。</p></li><li><p>React 元素树（及其组成的 React 元素节点）不会无限期地存在。它是由 React 中的“fibers”具体化的时间表示。每个代表主机组件的“fiber”都存储一个指向 React Shadow Node 的 C++ 指针，这由 JSI 实现。</p></li><li><p>React Shadow Tree是不可变的。为了更新任何 React Shadow 节点，渲染器会创建一个新的 React Shadow Tree。但是，渲染器提供了克隆操作以使状态更新更高效。</p></li></ul><p>在上面的示例中，渲染阶段的结果如下所示：</p><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-15-084056.png" alt="image-20220715164056410"></p><p>React Shadow Tree 完成后，渲染器会触发 React Element Tree 的提交。</p><h3 id="阶段二-提交" tabindex="-1">阶段二：提交 <a class="header-anchor" href="#阶段二-提交" aria-label="Permalink to &quot;阶段二：提交&quot;">​</a></h3><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-15-084113.png" alt="image-20220715164112806"></p><p>提交阶段包括两个操作：布局计算和 Tree 提升。</p><ul><li><strong>布局计算</strong>：此操作计算每个 React Shadow Node 的位置和大小。在 React Native 中，这涉及调用 Yoga 来计算每个 React Shadow 节点的布局。实际计算需要来自 JavaScript 中的 React 元素的每个 React Shadow 节点的样式。它还需要 React Shadow Tree 根的布局约束，它决定了结果节点可以占用的可用空间量。</li></ul><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-15-084129.png" alt="image-20220715164128686"></p><blockquote><p>备注：Litho 和 Yoga 都是基于 Flexbox，Flexbox 是一种布局模式，标准来自于前端 CSS，可以理解为类似 Linear Layout 提供的一种布局规范。其中 Litho 底层依赖于 Yoga 部分模块，但是两者在原理上有一些区别。</p></blockquote><ul><li><strong>树提升（新树→下一棵树）</strong>：此操作将新的 React Shadow Tree 提升为要挂载的“下一棵树”。这个提升表明新的 React Shadow Tree 已经拥有了所有要挂载的信息，并且代表了 React Element Tree 的最新状态。“下一棵树”安装在 UI 线程的下一个“tick”上。</li></ul><p><strong>额外细节</strong></p><ul><li><p>这些操作在后台线程上异步执行。</p></li><li><p>大多数布局计算完全在 C++ 中执行。 但是，某些组件的布局计算取决于宿主平台（例如 Text、TextInput 等）。文本的大小和位置是每个主机平台特定的，需要在主机平台层进行计算。为此，Yoga 调用宿主平台中定义的函数来计算组件的布局。</p></li></ul><h3 id="阶段三-挂载" tabindex="-1">阶段三：挂载 <a class="header-anchor" href="#阶段三-挂载" aria-label="Permalink to &quot;阶段三：挂载&quot;">​</a></h3><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-15-084146.png" alt="image-20220715164145639"></p><p>挂载阶段将 React Shadow Tree（现在包含来自布局计算的数据）转换为在屏幕上呈现像素的主机视图树。提醒一下，React 元素树如下所示：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">View</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Text</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Hello, World</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#FFCB6B;">Text</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#FFCB6B;">View</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>在高层次上，React Native 渲染器为每个 React Shadow Node 创建一个对应的 Host View 并将其安装在屏幕上。</p><p>在上面的示例中，渲染器为 &lt;View&gt; 创建了一个 android.view.ViewGroup 实例，为 &lt;Text&gt; 创建了一个 android.widget.TextView 实例，并用“Hello World”填充它。</p><p>同样，对于 iOS，创建 UIView 并使用对 NSLayoutManager 的调用填充文本。</p><p>每个 Host View 都将会使用使用来自其 React Shadow 节点的 props 来计算出的布局信息配置其大小和位置。</p><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-15-084201.png" alt="image-20220715164200535"></p><p>更详细地说，安装阶段包括以下三个步骤：</p><ul><li><p><strong>树的 Diffing 计算</strong>：此步骤完全在 C++ 中计算“先前渲染的树”和“下一个树”之间的差异。计算结果是为了要在 Host View 上执行原子级别的变化操作（例如 createView、updateView、removeView、deleteView 等）。这一步也是 React Shadow Tree 被展平的地方，以避免创建不必要的 Host View。</p></li><li><p><strong>树提升（下一棵树→渲染树）</strong>：此步骤以原子方式将“下一个树”提升为“前一次渲染树”，以便在下一个挂载阶段计算与新树的差异。</p></li><li><p><strong>视图挂载</strong>：此步骤会调用平台提供的原子级别的操作方法来渲染视图。该步骤在平台的 UI 线程中执行。</p></li></ul><p><strong>额外细节</strong></p><ul><li><p>这些操作在 UI 线程上同步执行。 如果提交阶段在后台线程上执行，则为 UI 线程的下一个“tick”安排挂载阶段。另一方面，如果提交阶段在 UI 线程上执行，则挂载阶段在同一线程上同步执行。</p></li><li><p>挂载阶段的调度、实现和执行很大程度上取决于主机平台。 例如，目前 Android 和 iOS 的挂载层的渲染器架构是不同的。</p></li><li><p>在初始渲染期间，“前一次的渲染树”是空的。 因此，树的 Diffing 计算步骤将产生一个仅包括创建视图、设置道具和相互添加视图的操作列表。在处理 React 状态更新时，树的 Diffing 计算对于提升性能来讲变得至关重要。</p></li><li><p>在当前的生产测试中，React Shadow Tree 通常由大约 600-1000 个 React Shadow 节点组成（在视图展平之前），在视图展平后树会减少到约 200 个节点。在 iPad 或桌面应用程序上，这个数量可能会增加 10 倍。</p></li></ul><h2 id="react-状态更新" tabindex="-1">React 状态更新 <a class="header-anchor" href="#react-状态更新" aria-label="Permalink to &quot;React 状态更新&quot;">​</a></h2><p>当 React 元素树的状态更新时，让我们探索渲染管道的每个阶段。</p><p>假设您在初始渲染中渲染了以下组件：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">MyComponent</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> (</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">View</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">View</span></span>\n<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">style</span><span style="color:#89DDFF;">={{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">backgroundColor</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">red</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}}</span></span>\n<span class="line"><span style="color:#89DDFF;">      /&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">View</span></span>\n<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">style</span><span style="color:#89DDFF;">={{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">backgroundColor</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">blue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}}</span></span>\n<span class="line"><span style="color:#89DDFF;">      /&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#FFCB6B;">View</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#F07178;">  )</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><p>根据初始渲染部分中描述的内容，我们知道会创建以下树：</p><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-15-084222.png" alt="image-20220715164221460"></p><p>请注意，节点 3 所映射的具有红色背景的主机视图，以及节点 4 映射到的具有蓝色背景的主机视图。假设由于 JavaScript 产品逻辑中的状态更新，第一个嵌套 &lt;View&gt; 的背景从“红色”变为“黄色”。这是新的 React 元素树的外观：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">View</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">View</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#C792EA;">style</span><span style="color:#89DDFF;">={{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">backgroundColor</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">yellow</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}}</span></span>\n<span class="line"><span style="color:#89DDFF;">  /&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">View</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#C792EA;">style</span><span style="color:#89DDFF;">={{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">backgroundColor</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">blue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}}</span></span>\n<span class="line"><span style="color:#89DDFF;">  /&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#FFCB6B;">View</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>React Native 是如何处理这个更新的？</p><p>当状态更新发生时，渲染器首先需要更新 React 元素树，从而以便更新已经挂载的 Host 视图。但是为了保持线程安全，React Element Tree 和 React Shadow Tree 都必须是不可变的。这意味着，不是改变当前的 React Element Tree 和 React Shadow Tree，React 必须为每棵树创建一个新的副本，其中包含新的 props、styles 和 children。</p><p>让我们在状态更新期间探索渲染管道的每个阶段。</p><h3 id="阶段一-渲染-1" tabindex="-1">阶段一：渲染 <a class="header-anchor" href="#阶段一-渲染-1" aria-label="Permalink to &quot;阶段一：渲染&quot;">​</a></h3><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-15-084256.png" alt="image-20220715164255498"></p><p>当 React 创建一个包含新状态的新 React 元素树时，它必须克隆每个受更改影响的 React 元素和 React Shadow 节点。 克隆后，新的 React Shadow Tree 被提交。</p><p>React Native 渲染器利用结构共享来最小化开销。当一个 React 元素被克隆时，副本会包含新的状态，并且该元素到根结点上的所有 React 元素都会被克隆。**React 只有在需要更新其 props、style 或 children 时才会克隆 React Element。**状态更新未更改的任何 React 元素都由新旧树共享。</p><p>在上面的示例中，React 使用以下操作创建新树：</p><ul><li>CloneNode(节点 3, {backgroundColor: &#39;yellow&#39;}) → 节点 3&#39;</li><li>CloneNode（节点 2）→ 节点 2&#39;</li><li>AppendChild（节点 2&#39;，节点 3&#39;）</li><li>AppendChild（节点 2&#39;，节点 4）</li><li>CloneNode（节点 1）→ 节点 1&#39;</li><li>AppendChild（节点 1&#39;，节点 2&#39;）</li></ul><p>在这些操作之后，节点 1&#39; 代表新的 React 元素树的根。我们使用 T 代表“上一次的渲染树”，使用 T&#39; 表示“新树”：</p><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-15-084311.png" alt="image-20220715164311388"></p><p>注意 T 和 T&#39; 将会共享节点 4。结构共享提高了性能并减少了内存使用。</p><h3 id="阶段二-提交-1" tabindex="-1">阶段二：提交 <a class="header-anchor" href="#阶段二-提交-1" aria-label="Permalink to &quot;阶段二：提交&quot;">​</a></h3><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-15-084326.png" alt="image-20220715164326525"></p><p>在 React 创建新的 React Element Tree 和 React Shadow Tree 之后，将会提交它们。</p><ul><li><p><strong>布局计算</strong>：类似于初始渲染期间的布局计算。 一个重要的区别是布局计算可能会导致共享的 React 影子节点被克隆。 发生这种情况是因为如果共享 React Shadow Node 的父级发生布局更改，则共享 React Shadow Node 的布局也可能发生更改。</p></li><li><p><strong>树提升（新树→下一棵树）</strong>：类似于初始渲染期间的树提升。</p></li><li><p><strong>树 Diffing 计算</strong>：此步骤计算“先前渲染的树”（T）和“下一个树”（T&#39;）之间的差异。计算结果会被用于调用主机对应的原子级别的视图变化操作。</p><ul><li>在上面的例子中，操作包括：UpdateView(Node 3&#39;, {backgroundColor: &#39;“yellow”})</li></ul></li></ul><h3 id="阶段三-挂载-1" tabindex="-1">阶段三：挂载 <a class="header-anchor" href="#阶段三-挂载-1" aria-label="Permalink to &quot;阶段三：挂载&quot;">​</a></h3><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-15-084342.png" alt="image-20220715164341742"></p><ul><li><strong>树提升（下一棵树→渲染树）</strong>：此步骤以原子方式将“下一棵树”提升为“先前渲染的树”，以便下一个挂载阶段计算与新树的差异。任何已经挂载的树与新树之间都可以进行 Diff 计算。渲染器可以跳过树的一些中间版本。</li><li><strong>视图挂载</strong>：此步骤会调用主机对应的原子级别的修改操作方法。在上面的例子中，只有 View 3 的 backgroundColor 会被更新（变成黄色）。</li></ul><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-15-084359.png" alt="image-20220715164358434"></p><h2 id="react-native-渲染器状态更新" tabindex="-1">React Native 渲染器状态更新 <a class="header-anchor" href="#react-native-渲染器状态更新" aria-label="Permalink to &quot;React Native 渲染器状态更新&quot;">​</a></h2><p>对于 Shadow Tree 中的大多数信息，React 是唯一的所有者和唯一的事实来源。 所有数据都来自 React，并且存在单向数据流。</p><p>但是，有一个重要的机制是一个例外，那就是 C++ 中的组件可以包含不直接暴露给 JavaScript 的状态，此时 JavaScript 就不是事实的来源。C++ 和平台来控制此 C++ 状态。通常，这仅在您开发需要 C++ 状态的复杂主机组件时才相关。绝大多数主机组件不需要此功能。</p><p>例如，ScrollView 使用这种机制让渲染器知道当前偏移量是多少。因为更新是从宿主平台所触发的，特别是从代表 ScrollView 组件的宿主视图。在测量相关的 API 中会使用有关偏移量的信息。由于此更新源于主机平台，并且不影响 React Element Tree，因此此状态数据由 C++ State 保存。</p><p>从概念上讲，C++ 状态更新类似于上面描述的 React 状态更新。但是有两个重要区别：</p><ol><li><p>他们跳过“渲染阶段”，因为不涉及 React。</p></li><li><p>更新可以在任何线程上发起和发生，包括主线程。</p></li></ol><h3 id="阶段二-提交-2" tabindex="-1">阶段二：提交 <a class="header-anchor" href="#阶段二-提交-2" aria-label="Permalink to &quot;阶段二：提交&quot;">​</a></h3><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-15-084416.png" alt="image-20220715164415905"></p><p>在执行 C++ 状态更新时，代码块请求更新 ShadowNode (N) 以将 C++ 状态设置为值 S。React Native 渲染器将反复尝试获取 N 的最新提交版本，将其克隆为新状态 S，并将 N&#39; 提交到树。如果 React 或另一个 C++ 状态更新在此期间执行了另一个提交，则 C++ 状态提交将失败，渲染器将多次重试 C++ 状态更新，直到提交成功。 这可以防止真相来源的冲突和竞争。</p><h3 id="阶段三-挂载-2" tabindex="-1">阶段三：挂载 <a class="header-anchor" href="#阶段三-挂载-2" aria-label="Permalink to &quot;阶段三：挂载&quot;">​</a></h3><p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-07-15-084435.png" alt="image-20220715164434472"></p><p>挂载阶段实际上与 React 状态更新的挂载阶段相同。渲染器仍然需要重新计算布局执行树差异等。有关详细信息，请参阅上面的部分。</p><hr><p>-<em>EOF</em>-</p>',84)];const t=a(p,[["render",function(a,e,n,p,t,c){return s(),l("div",null,o)}]]);export{n as __pageData,t as default};
