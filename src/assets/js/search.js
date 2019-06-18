import sinPinyin from './sinToPinyin'

/**
 * @param {Array} list  搜索数组
 * @description 用于基本搜索工具类
 */
export class DefaultSearch {
  // es5的构造函数前面如果不用new调用,this指向window。
  // 所以以前我们都要在构造函数中通过判断this是否使用了new关键字来确保普通的函数调用方式都能让对象复制到属性。
  constructor (list) {
    // 初始化类的属性，方法
    // 因为babel转译之后，子类B里面的super()被替换成了A.constructor.call(), 这样new.target当然就是undefined
    if (!this.constructor.name) { // 暂用this.cconstructor代替
      throw new Error('必须使用 new 命令生成实例')
    }
    this.list = list || []
  }
  static findOne (list, _string, isPinyin = false) {
    // 只能使用this调用其他静态方法，变量
    _string = _string.trim()
    if (_string === '') { return [] }
    const reg = new RegExp(_string)
    return list.filter(l => {
      l = typeof l === 'string' ? l.toLowerCase() : l
      let py = isPinyin ? sinPinyin(l.toString()) : false
      if (reg.test(l) || reg.test(py)) {
        return l
      }
    })
  }
  // 可被实例化的方法
  search (value) {
    return DefaultSearch.findOne(this.list, value.toLowerCase())
  }
}

/**
 * @param {list} 搜索数组
 * @description  用于高级搜索，支持汉字匹配拼音
 */
export class SinSearch extends DefaultSearch {
  chineseReg = /[\u4e00-\u9fa5]/ // /\p{Unified_Ideograph}/ug
  constructor (list) {
    super(list) // 代表父类的构造函数
    // super之后才能调用this
    this.list = list// this.list是继承父元素的list
  }
  search (value) {
    if (this.chineseReg.test(value)) {
      value = sinPinyin(value)
    }
    return SinSearch.findOne(this.list, value.toLowerCase())
    // super.search() // 指向父类的原型对象
  }
  static findOne (list, _string) {
    return super.findOne(list, _string, true) // 指向父类
  }
}
