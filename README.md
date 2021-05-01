### PATCH
临时修正`SSR`项目在引入`ant-design-vue@2`中的一些问题

### ant-design-vue

修正`ant-design-vue@2`会在`cjs`模块中`require('lodash-es')`的问题，

通过执行`postinstall`脚本来替换`ant-design-vue/lib`中的`require('lodash-es')`为`require('lodash')`

### @ant-design/icons-vue

修正`ant-design-vue@2`会在`cjs`模块中引入`@ant-design/icons-vue`的`es`模块中的文件

通过在`@ant-design/icons-vue/package.json`中添加`exports`来解决。

```json
 ".": {
        "import": "./es/index.js",
        "require": "./lib/index.js"
    },
    "./*": {
        "import": "./es/icons/*.js",
        "require": "./lib/icons/*.js"
    }
```