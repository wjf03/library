<template>
  <div style="background-color: aliceblue;">
    <div style="margin-left: 160px; margin-right: 160px;">
      <div style="background-color: lightblue; padding-top: 40px; padding-bottom: 10px;">
        <img class="book-image-box" src="@/assets/book.png" alt="img"/>
        <div style="display: inline-block; vertical-align: top;">
          <div class="book-title">{{ bookName }}</div>
          <el-rate v-model="rate" disabled show-score score-template="{value}"/>
          <div class="book-author">作者：<span class="author-name" @click="authorInfo()" style="text-decoration: underline">{{ author }}</span></div>
          <div class="book-label" v-for="label in labels" :key="label"><span>{{ label }}</span></div>
          <el-scrollbar max-height="160px" style="margin: 10px 0px;">
            <div class="book-introduce">{{ introduce }}</div>
          </el-scrollbar>
        </div>
        <div v-if="userType == 'manager'" class="book-modify-container" @click="modify()">
          <span>修改信息</span>
        </div>
        <div v-else class="book-star-container" @click="star()">
          <div v-if="isStar">已收藏</div>
          <div v-else>+收藏</div>
        </div>
      </div>
      <div style="text-align: center;">·····················································································································································</div>
      <div style="text-align: center; background-color: lightsteelblue;"><h1 style="margin: 0px;">分节阅读</h1></div>
      <div style="text-align: center;">·····················································································································································</div>
      <el-scrollbar max-height="150px" style="background-color: lightblue;">
        <div class="chapter-info-container" v-for="(chapter, index) in chapters" :key="chapter" @click="readBook(index)">
          <el-text size="large" truncated>第 {{ index+1 }} 章：{{ chapter }}&nbsp;&nbsp;&nbsp;{{ chapter_contents.at(index) }}</el-text>
        </div>
      </el-scrollbar>
      <div style="text-align: center;">·····················································································································································</div>
      <div style="text-align: center; background-color: lightsteelblue;"><h1 style="margin: 0px;">用户评论</h1></div>
      <div style="text-align: center;">·····················································································································································</div>
      <div class="comment-container">
        <el-scrollbar max-height="600px" class="comment-container">
          <el-card v-for="comment in comments" :key="comment" shadow="hover" style="margin: 5px;">
            <template #header>
              <div style="display: flex;">
                <p style="display: flex; flex-direction: column; justify-content: center; margin: 0px;">{{ comment["username"] }}</p>
                <el-rate v-model='comment["rate"]' disabled show-score score-template="{value}" style="margin-left: auto;"/>
              </div>
            </template>
            <el-text>
              {{ comment["content"] }}
            </el-text>
          </el-card>
        </el-scrollbar>
      </div>
      <div class="comment-input-container">
        <el-input v-model="comment_input" placeholder="输入评论……（最多300字）" :autosize="{minRows: 3, maxRows: 6}" type="textarea" maxlength="300" show-word-limit/>
        <div style="display: flex; justify-content: space-between; align-items: center; margin: 10px 5px 5px 5px;">
          <span style="display:inline-block;">评分：</span>
          <el-rate v-model="comment_input_rate" allow-half show-score score-template="{value}"></el-rate>
          <el-button type="default" @click="comment" style="display: inline-block; margin-left: auto;">发表评论</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'BookView',
  // data () {
  //   return {
  //     username: '旅行者',
  //     userType: 'manager',
  //     bookName: '北航OS操作系统',
  //     bookType: 'common',
  //     rate: 4.5,
  //     author: 'abcde',
  //     isStar: false,
  //     labels: ['label1', 'label2', 'label3333'],
  //     introduce: 'this is book introduce this is book introduce this is book introduce this is book introduce this is book introduce\nthis is book introduce\nthis is book introduceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\nthis is book introduce\nthis is book introduce\nthis is book introduce\nthis is book introduce\nthis is book introduce',
  //     chapters: ['蒙德', '璃月', '稻妻', '须弥', '枫丹'],
  //     chapter_contents: ['chapter1 content1 content1 content11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111199999999999999999999', 'chapter2 content2 content2 content2', 'chapter3 content3 content3 content3', 'naxida'],
  //     comment_input: '',
  //     comment_input_rate: 0,
  //     comments: [
  //       {
  //         username: '万叶',
  //         rate: 4.8,
  //         content: 'eqeaaaa'
  //       },
  //       {
  //         username: '万叶',
  //         rate: 4.8,
  //         content: 'eqeaaaa'
  //       },
  //       {
  //         username: '万叶',
  //         rate: 4.8,
  //         content: 'eqeaaaa'
  //       }
  //     ]
  //   }
  // },
  // methods: {
  //   star () {
  //     this.isStar = !this.isStar
  //     if (this.isStar) {
  //       this.$message.success('收藏成功！')
  //     } else {
  //       this.$message.success('取消收藏成功！')
  //     }
  //   },
  //   modify () {
  //     this.$message.info('正在修改信息')
  //   },
  //   authorInfo () {
  //     this.$router.push({ path: '/author' })
  //   },
  //   readBook (index) {
  //     this.$message.info('读第' + (index + 1) + '章')
  //   },
  //   comment () {
  //     if (this.comment_input === '') {
  //       this.$message.error('评论不能为空！')
  //     } else {
  //       const newComment = {}
  //       newComment.username = this.username
  //       newComment.rate = this.comment_input_rate
  //       newComment.content = this.comment_input
  //       this.comments.push(newComment)
  //       this.comment_input = ''
  //       this.comment_input_rate = 0
  //       this.$message.success('评论成功！')
  //     }
  //   }
  // },
  setup () {
    const state = reactive({
      username: '旅行者',
      userType: 'manager',
      bookName: '北航OS操作系统',
      bookType: 'common',
      rate: 4.5,
      author: 'abcde',
      isStar: false,
      labels: ['label1', 'label2', 'label3333'],
      introduce: 'this is book introduce this is book introduce this is book introduce this is book introduce this is book introduce\nthis is book introduce\nthis is book introduceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\nthis is book introduce\nthis is book introduce\nthis is book introduce\nthis is book introduce\nthis is book introduce',
      chapters: ['蒙德', '璃月', '稻妻', '须弥', '枫丹'],
      chapter_contents: ['chapter1 content1 content1 content11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111199999999999999999999', 'chapter2 content2 content2 content2', 'chapter3 content3 content3 content3', 'naxida'],
      comment_input: '',
      comment_input_rate: 0,
      comments: [{ username: '万叶', rate: 4.8, content: 'eqeaaaa' }, { username: '万叶', rate: 4.8, content: 'eqeaaaa' }]
    })
    const readBook = async (index) => {
      console.log('读第' + (index + 1) + '章')
    }
    return {
      ...toRefs(state),
      readBook
    }
  }
}
</script>

<style type="text/css" scoped>
.book-image-box {
  width: 225px;
  height: 300px;
  margin-left: 120px;
  margin-right: 100px;
  border: 5px solid red;
  border-style: inset;
  box-sizing: border-box;
}
.book-title {
  margin: 10px 0px;
  font-size: 40px;
  font-weight: bold;
}
.book-author {
  margin: 10px 0px;
  font-size: 20px;
  color: #2828eb;
}
.author-name {
  text-decoration: underline;
}
.author-name:hover {
  cursor: pointer;
  text-shadow: 1px 1px 3px blue;
}
.book-label {
  display: inline;
  text-align: center;
  font-size: 18px;
  margin: 0px 8px;
  padding: 0px 5px;
  background-color: orange;
  border-radius: 7px;
}
.book-introduce {
  width: 440px;
  font-size: 17px;
  overflow: hidden;
  word-wrap: break-word;
  white-space: pre-line;
}
.book-introduce:hover {
  overflow-y: auto;
}
.book-star-container {
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 145px;
  left: 1130px;
  height: 40px;
  width: 100px;
  background-color: pink;
  border: 3px solid rgb(255, 142, 160);
  border-radius: 10px;
}
.book-star-container:hover {
  background-color: rgb(255, 177, 190);
  cursor: pointer;
}
.book-modify-container {
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
.book-modify-container:hover {
  background-color: rgb(190, 190, 190);
  cursor: pointer;
}
.chapter-info-container {
  height: 30px;
  margin: 3px 5px;
  padding-left: 8px;
  border-color: blue;
  border-style: solid;
  border-width: 2px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.chapter-info-container:hover {
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.comment-container {
  background-color: rgb(240, 240, 240);
}
.comment-input-container {
  background-color: rgb(240, 240, 240);
  padding: 10px 5px 5px 5px;
  border-top-color: lightgray;
  border-width: 1px 0px 0px 0px;
  border-style: solid;
}
/deep/ .el-rate__icon {
  font-size: 30px;
}
/deep/ .el-card .el-rate__icon {
  font-size: 20px;
}
/deep/ .comment-input-container .el-rate__icon {
  font-size: 20px;
}
/deep/ .el-rate__text {
  font-size: 20px;
}
/deep/ .el-card .el-rate__text {
  font-size: 17px;
}
/deep/ .comment-input-container .el-rate__icon {
  font-size: 17px;
}
.el-card__body .el-text{
  font-size: 17px;
}
/deep/ .el-textarea__inner {
  font-size: 17px;
}
</style>
