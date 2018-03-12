## 简介

WmjCheckBox 是一个免费开源的，快速、简单的面向对象的 轻量级javascript checkbox选择框弹层插件。

## 升级向导
由于上一个版本把前后端糅合了，而且 OPP 式的开发方式，让一个插件在用起来极为棘手，代码混乱，这一次的升级主要是找准了自己的定位，对，做一个专一的前端 checkBox 选择插件，由于思想层面的改变，加上设计模式的改变，所以代码几乎全部重构了一遍，带来一系列的优点：作用域隔离，对象调用，链式调用等，现在 WmjCheckBox 不在为大家提供后台的数据，你需要去数据库自己得到数据，然后传入 WmjCheckBox 所需的参数，一个简单的显示checkbox选择框的插件，就可以使用了。

## 一次调用的周期

新的WmjCheckBox 采用了OOP的开发思想，并且遵循ECMA javascript的开发标准。我们来系统的了解下WmjCheckBox 的标准执行流程

1.  对当前应用标记当前flag。
2.  判断当前flag对应应用的配置项，检测配置项合法性，并且合并系统默认配置项。
3.  检测layer配置项合法性，并且合并系统默认配置项。
4.  检测数据注入。
5.  将临时区的数据放到对应数据单元。
6.  构建dom。
7.  执行前置动作。
8.  保存数据镜像。
9.  弹出层，显示界面。
10. 执行注册事件。
11. 执行后置动作

以上是第一次请求的执行步骤，如果是第二次调用的话，已经保存了数据镜像，所以上面的 2~8 和第 10 步是可以省略的。

## 基础方法介绍

WmjCheckbox 内置了许多方法，下面进行简单的介绍：

### 链式调用方法
#### flag ( String str ) 
给当前调用一个标记，标记作用全局，如果你在页面多个地方需要用到WmjCheckBox 那么你就需要在链式调用的开始给应用一个标记。
#### config ( Array || Object data )
给当前调用注入配置参数，如果 data值是数组，那么就会注入多个配置项，可以多次调用注入多次。
#### layer ( Object data )
由于系统依赖layer弹出层插件，所以，这个方法是给layer注入配置项，但是data只能是对象，因为layer作用单一（因为每一次应用，只需要弹出层一次）。
注：这部分参数可以参考[layer开发手册](http://www.layui.com/doc/modules/layer.html#layer.open)
#### input ( Array || Object data )
给当前应用注入具体显示数据，如果是对象相当于多次注入，可以多次调用。
### 核心方法
#### show ( String data )
弹出层方法，这是WmjCheckBox的唯一核心方法，data参数是需要注入的显示数据，同 input(data) 方法,但是要注意参数类型，这里的data是字符串，传入的，而input方法里面的data是对象或者数组。
### 辅助方法
####  getCheckList ( )
获取已经选项的id，返回值是对象。如果提交表单是ajax方式的话，那么就可以用这个方法得到用户选择项。
####  evalString ( String str )
把str字符串，当作javascript 程序执行(执行字面值)。
####  ArrarRemoveUnit ( Array arr String str )
删除数组arr中的str项对应的数组的对应项
####  isArray ( str )
判断传入str是否是数组
### CURD相关方法
####  findParentName ( String id, Number pid, String sign )
根据选择项的id找到对应项的父项名称
####  findParentKey ( String id, Number pid, String sign )
根据选择项的id找到对应项的父项id
####  findName ( String id, Number pid, Number tid, String sign )
### 系统初始化相关方法
这部分方法是系统初始化的相关方法，只做简单介绍。
####  \_init_ ( )
系统全局初始化方法。
####  \_addEvent_ ( )
系统事件初始化方法，注册全局事件。
####  \_action_ ( )

大多数情况，我们只需要链式调用系列方法和 show() 方法。
如果还有不清晰的地方，可以看目录/demo下的两个demo。

## 基础参数介绍
### config ( ) 方法基础参数参数
config ( ) 方法传入的参数，会存在一个临时数据区，在和系统默认配置校对后，会更具data的数量，存相应数量份数，反映到页面就是弹出层页面的tab层对应的配置项。
####  Array checkList
默认已经选择的项目id
####  Number maxCount
最大选择上限，默认是1（就是单选的意思）
####  String title
每个tab层对应的标题，默认是 “分类tab”
####  String inputName
最后生成表单元素的name值，这个地方只需要传入字符串就可以了（不需要带[]，因为系统会帮你生成），默认值是checkbox
####  String fromDom
生成的“已选择项”的显示位置，这个值，每个tab项对应的不能相同，如果相同的话，就会造成生成之后dom混乱，因此没有默认值，所以这个是必填的，值必须传入jQuery选择器标准值，比如 
``` html
    <div name='a' class='b' id='c'></div>
```
选择它的话就必须传入'.b'或者'#c'或者'div[name="a"]'等...

## 注意
本插件依赖jQuery库 和layer库，请在引用之前保证两个库已经引入。
本库比较小巧，压缩版本仅8k，提供了压缩版和非压缩版，项目中建议映入开发版。
WmjCheckBox 在系统加载进来的时候就已经自动执行完毕了，这个时候只需要你去调用 show 方法就可以了使用了。
WmjCheckBox 有自己的隔离块，不会对页面中其他 javascript 代码造成影响。 
如果页面有多个地方用到 WmjCheckBox 一定要用 flag() 方法去指定，如果只用到一次，那么可以不用flag() 方法。

## 其他
开源且免费