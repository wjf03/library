<template>
  <div style="background-color: aliceblue;">
    <div style="margin-left: 160px; margin-right: 160px;">
      <div style="background-color: lightblue; padding-top: 40px; padding-bottom: 10px;">
        <img class="author-image-box" src="@/assets/book.png" alt="img"/>
        <div style="display: inline-block; vertical-align: top;">
          <div class="author-name">{{ authorName }}</div>
          <el-scrollbar max-height="160px" style="margin: 10px 0px;">
            <div class="author-introduce">{{ introduce }}</div>
          </el-scrollbar>
        </div>
        <div v-if="userType == 'manager'" class="author-modify-container" @click="modify()">
          <span>修改信息</span>
        </div>
      </div>
      <div style="text-align: center;">·····················································································································································</div>
      <div style="text-align: center; background-color: lightsteelblue;"><h1 style="margin: 0px;">该作者的作品</h1></div>
      <div style="text-align: center;">·····················································································································································</div>
      <div style="padding: 50px 70px;">
        <div style="display: flex; flex-wrap: wrap;">
          <LittleBook v-for="book in books" :key="book" :imgName="book.imgName" :name="book.name" :rate="book.rate" :bookId="book.bookId" :isvip="book.isvip" style="margin: 20px;"></LittleBook>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LittleBook from '@/components/LittleBook.vue'

export default {
  name: 'BookView',
  components: {
    LittleBook
  },
  data () {
    return {
      username: '旅行者',
      userType: 'manager',
      authorName: '一个作家',
      introduce: 'this is author introduce this is book introduce this is book introduce this is book introduce this is book introduce\nthis is book introduce\nthis is book introduceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\nthis is book introduce\nthis is book introduce\nthis is book introduce\nthis is book introduce\nthis is book introduce',
      books: [{
        imgName: 'R-C.jpg',
        name: '北航OS操作系统',
        rate: 4.8,
        bookId: '123456',
        isvip: true
      },
      {
        imgName: 'R-C.jpg',
        name: 'hhhhh4444444444444',
        rate: 0,
        bookId: '123457',
        isvip: false
      }]
    }
  },
  methods: {
    modify () {
      this.$message.info('正在修改信息')
    }
  }
}
</script>

<style type="text/css" scoped>
.author-image-box {
  width: 150px;
  height: 200px;
  margin-left: 200px;
  margin-right: 100px;
  border: 5px solid red;
  border-style: inset;
  box-sizing: border-box;
}
.author-name {
  padding: 10px 0px;
  font-size: 40px;
  font-weight: bold;
}
.author-introduce {
  width: 440px;
  font-size: 17px;
  overflow: hidden;
  word-wrap: break-word;
  white-space: pre-line;
}
.author-introduce:hover {
  overflow-y: auto;
}
.author-modify-container {
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 145px;
  left: 1130px;
  height: 40px;
  width: 100px;
  background-color: lightgray;
  border: 3px solid rgb(153, 153, 153);
  border-radius: 10px;
}
.author-modify-container:hover {
  background-color: rgb(190, 190, 190);
  cursor: pointer;
}
.book-card:hover {
  box-shadow: 0 0 8px 8px rgb(235, 235, 235);
  cursor: pointer
}
</style>
