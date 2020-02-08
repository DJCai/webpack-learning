/**
 * 预取/预加载模块 preload 与 prefetch 的区别
 * 1. preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
 * 2. preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
 * 3. preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
浏览器支持程度不同。
 */
export default async function printMe() {
    const { component } = await import(/* webpackPrefetch: true */ './index0.js');
    const { default: index } = await import(/* webpackPreload: true */ './index1.js');
    component()
    index()
}