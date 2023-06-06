<template>
  <div class="search-bar">
    <div style="display: flex;">
      <el-input v-model="searchInput" placeholder="搜索图书……" size="large" style="width: 400px">
        <template #prepend>
          <el-button type="primary">搜索</el-button>
        </template>
      </el-input>
      <p class="search-bar-text">第一标签：</p>
      <el-select v-model="firstLabel" placeholder="全部" size="large" style="width: 150px;">
        <el-option v-for="item in firstLabels" :key="item.value" :value="item.value">{{ item.value }}</el-option>
      </el-select>
      <p class="search-bar-text">第二标签：</p>
      <el-select v-model="nextLabel" placeholder="全部" size="large" style="width: 150px;">
        <el-option v-for="item in getLabels(firstLabel)" :key="item" :value="item">{{ item }}</el-option>
      </el-select>
    </div>
  </div>
  <el-divider style="margin: 0px;" />
  <div style="padding: 0px 130px;">
    <span style="font-size: 32px; color: lightgray;">|</span>
    <el-radio-group v-model="options[0]">
      <el-radio :label="0" border>按时间降序</el-radio>
      <el-radio :label="1" border>按时间升序</el-radio>
    </el-radio-group>
    <span style="font-size: 32px; color: lightgray;">|</span>
    <el-radio-group v-model="options[1]">
      <el-radio :label="0" border>按热度降序</el-radio>
      <el-radio :label="1" border>按热度升序</el-radio>
    </el-radio-group>
    <span style="font-size: 32px; color: lightgray;">|</span>
    <el-radio-group v-model="options[2]">
      <el-radio :label="0" border>按评分降序</el-radio>
      <el-radio :label="1" border>按评分升序</el-radio>
    </el-radio-group>
    <span style="font-size: 32px; color: lightgray;">|</span>
  </div>
  <el-divider style="margin: 0px;" />
  <div style="padding: 50px 120px;">
    <div style="display: flex; flex-wrap: wrap;">
      <LittleBook imgName="R-C.jpg" name="hhh" rate="3.5" bookId="123456" isvip="true" v-for="o in 8" :key="o" style="margin: 20px;"></LittleBook>
    </div>
  </div>
</template>

<script>
import LittleBook from '@/components/LittleBook.vue'

export default {
  name: 'LibraryView',
  components: {
    LittleBook
  },
  data () {
    return {
      searchInput: '',
      firstLabel: '全部',
      nextLabel: '全部',
      firstLabels: [{
        value: '全部',
        includes: ['全部']
      },
      {
        value: '历史',
        includes: ['全部', '中国历史', '西方历史']
      },
      {
        value: '文学',
        includes: ['全部', '古典文学', '戏剧文学']
      }],
      options: [0, 0, 0], // [时间, 热度, 评分]
      books: [{
        imgName: 'R-C.jpg',
        name: '北航OS操作系统',
        rate: 0,
        bookId: '123456'
      }]
    }
  },
  methods: {
    getLabels (theValue) {
      for (let index = 0; index < this.firstLabels.length; index++) {
        const element = this.firstLabels[index]
        if (theValue === element.value) {
          return element.includes
        }
      }
      return []
    }
  }
}
</script>

<style scoped>
body {
  width: 1000px;
}
.search-bar {
  padding: 30px 150px;
}
.search-bar-text {
  padding: 9px 20px 9px 50px;
  margin: 0px;
  font-size: 17px;
}
.el-radio-group {
  padding: 20px 50px;
}
</style>
