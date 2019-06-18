<template>
  <div class="test-wrap">
    <ul>
      <li>
        <h4>汉字转拼音</h4>
        <Input v-model="inputVal" placeholder="请输入"><div slot="prepend">输入：</div></Input>
        <br />
        <Input v-model="output" readonly ><div slot="prepend">输出：</div></Input>
        <br />
        <Input v-model="outputFirst" readonly ><div slot="prepend">输出：</div></Input>
      </li>
      <li>
        <h4>基本搜索</h4>
        <Input :value="searchArr.join('、')" readonly ><div slot="prepend">选项：</div></Input>
        <br />
        <Input v-model="defaultVal" placeholder="模糊搜索"><div slot="prepend">输入：</div></Input>
        <br />
        <Input v-model="outputDef" readonly ><div slot="prepend">输出：</div></Input>
      </li>
      <li>
        <h4>拼音搜索</h4>
        <Input :value="searchArr.join('、')" readonly ><div slot="prepend">选项：</div></Input>
        <br />
        <Input v-model="sinVal" placeholder="支持拼音"><div slot="prepend">输入：</div></Input>
        <br />
        <Input v-model="outputSin" readonly ><div slot="prepend">输出：</div></Input>
      </li>
    </ul>
  </div>
</template>

<script>
import sinPinyin from '../assets/js/sinToPinyin'
import { DefaultSearch, SinSearch } from '../assets/js/search'
export default {
  name: 'HelloWorld',
  data () {
    return {
      inputVal: '',
      output: '',
      outputFirst: '',
      defaultVal: '',
      outputDef: '',
      sinVal: '',
      outputSin: '',
      searchArr: [
        '语文',
        'yuwen',
        'YuWen',
        '数学',
        'NBA',
        'nba',
        1,
        2,
        '12321'
      ],
      searchDef: {},
      searchSin: {}
    }
  },
  watch: {
    inputVal (val) {
      this.output = sinPinyin(val)
      this.outputFirst = sinPinyin(val, true)
    },
    defaultVal (val) {
      this.outputDef = this.searchDef.search(val).join('、')
    },
    sinVal (val) {
      this.outputSin = this.searchSin.search(val).join('、')
    }
  },
  methods: {
  },
  created () {
    this.searchDef = new DefaultSearch(this.searchArr)
    this.searchSin = new SinSearch(this.searchArr)
  }
}
</script>
<style>
.test-wrap {
  width: 400px;
  margin: 40px auto;
}

h4 {
  padding: 10px 0;
}

</style>
