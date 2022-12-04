<template>
  <div class="hello">
    <el-row>
      <el-col :offset="2" :span="16">
        <div id="article" class="article" style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
          <div id="testdiv" style="white-space: pre-wrap">
            新时代中国特色社会主义思想是全党全国人民为实现中华民族伟大复兴而奋斗的行动指南。习近平新时代中国特色社会主义思想是当代中国马克思主义、二十一世纪马克思主义，是中华文化和中国精神的时代精华，实现了马克思主义中国化时代化新的飞跃。
            2017年10月18日，在中国共产党第十九次全国代表大会上习近平总书记首次提出“新时代中国特色社会主义思想”。2017年10月24日，中国共产党第十九次全国代表大会通过了关于《中国共产党章程（修正案）》的决议，习近平新时代中国特色社会主义思想写入党章。2018年3月11日，第十三届全国人民代表大会第一次会议通过《中华人民共和国宪法修正案》，习近平新时代中国特色社会主义思想写入《中华人民共和国宪法》。2021年11月11日，《中共中央关于党的百年奋斗重大成就和历史经验的决议》在党的十九大报告“八个明确”的基础上，用“十个明确”对习近平新时代中国特色社会主义思想的核心内容作了进一步概括。
            习近平新时代中国特色社会主义思想书写了坚持和发展中国特色社会主义的崭新篇章，让中国特色社会主义不断彰显巨大优越性和强大生命力。
          </div>
        </div>
      </el-col>

    </el-row>

    <!-- 输入标注的弹窗 -->
    <el-dialog title="标注" :visible.sync="centerDialogVisible" width="30%" center>
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="mark">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMark">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 抽屉组件 用于显示标注 -->
    <el-drawer title="标注内容" :visible.sync="drawerVisible" :direction="drawerDirection" size="30%">
      <el-row>
        <el-col :span="22">
          <el-timeline>
            <el-timeline-item v-for="(temp_mark, index) in marks_show" :key="index" :timestamp="temp_mark.createtime"
              placement="top">
              <el-card>
                <h4>{{ temp_mark.content }}</h4>
                <p>By {{ temp_mark.user_name }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-col>
      </el-row>
      <!-- <div class="time_line">
        
      </div> -->
    </el-drawer>

  </div>
</template>
<script>
import EasyMarker from 'easy-marker';

// 用于时间格式化
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "H+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

export default {
  name: 'HelloWorld',
  data() {
    return {
      // 输入标注对话框的可见性
      centerDialogVisible: false,

      // 标注展示抽屉的可见性
      drawerVisible: false,
      // 抽屉出来的方向 从右向左
      drawerDirection: 'rtl',

      // 保存 高亮与标注的映射关系
      marks_map: new Map(),

      marks_show: [],

      mark: '',
      target_highlight_id: -1,


      // test_comments
      test_comments: [
        {
          user: 'sam',
          content: '中国是最棒的',
          timestamp: '2018/4/12 20:46'
        },
        {
          user: 'sherry',
          content: '哈哈',
          timestamp: '2019/4/12 20:46'
        },
        {
          user: 'ming',
          content: ':)',
          timestamp: '2017/4/12 20:46'
        },
      ],

      selections: [],
      user_name: 'Sam',
      user_id: 1,
      selection_id_map: new Map(),
      id_auto_increase: 2
    }
  },
  methods: {
    // 确认添加标注的处理方法
    addMark() {
      console.info('here addMark')
      // 获取当前时间
      var date_now = new Date().Format("yyyy/MM/dd HH:mm:ss")
      // 构建一个标注对象
      var mark_obj = {
        user_id: this.user_id,
        user_name: this.user_name,
        highlight_id: this.target_highlight_id,
        content: this.mark,
        createtime: date_now
      }
      /**
       * 按道理说 这里会 post给后端 这里先不调用
       */

      // 维护 marks_map
      if (this.marks_map.has(this.target_highlight_id)) {
        var exist_marks = this.marks_map.get(this.target_highlight_id);
        console.info('before commit, length: ' + exist_marks.length);
        exist_marks.push(mark_obj);
        console.info('after commit, length: ' + this.marks_map.get(this.target_highlight_id).length);
      } else {
        var new_marks = [mark_obj];
        this.marks_map.set(this.target_highlight_id, new_marks);
      }

      // 清空输入框
      this.mark = '';
      this.centerDialogVisible = false

    },
    // MarkMenuClick事件
    MarkMenuClick(id, data) {
      console.log('You click the menu!', id, data);
      // console.log('parent_node : ' + data.anchorNode.parentNode.id);

      // 根据data 生成 key_selection
      var start_parent_id = data.anchorNode.parentNode.id;
      var end_parent_id = data.focusNode.parentNode.id;
      var start_offset = data.anchorOffset;
      var end_offset = data.focusOffset;
      var key_selection = start_parent_id + '-' + start_offset + '-' + end_parent_id + '-' + end_offset;
      // console.info('toString : ' + data_to_string)
      // 根据id判断一下是点了什么功能
      switch (id) {
        case '302':
          // 添加划线
          // 这里的 id_auto_increase 是前端模拟生成的 实际上就是传给后端保存后 获取的 自增id
          /**
           * post 后端 保存 高亮区域
           */

          this.em.highlightLine(data, this.id_auto_increase);
          // 维护一下 this.selections(数据保持一致)
          // 感觉 可以不维护？ 这就是 初始化的时候用到的
          // this.selections.push(
          //   {
          //     start_div_id: start_parent_id,
          //     start_offset: start_offset,
          //     end_div_id: end_parent_id,
          //     end_offset: end_offset,
          //     id: this.id_auto_increase
          //   }
          // )
          this.selection_id_map.set(key_selection, this.id_auto_increase);
          this.id_auto_increase++;
          break;
        case '303':
          // 删除划线
          // 可能需要一些判断逻辑
          // 当该高亮区域内有其他人标注的时候不能删除 （这部分 还没测试过）
          var selection_id = this.selection_id_map.get(key_selection);
          // 根据selection_id 找批注
          var canCancle = true;
          if (this.marks_map.has(selection_id)) {
            const marks = marks_map.get(selection_id);
            for (const mark in marks) {
              const userName = mark.user_name;
              if (userName !== this.user_name) {
                canCancle = false;
                break;
              }
            }
          }
          if (canCancle) {
            // 还要发给后端 请求 删
            // 1 如果存在标准内容 删
            if (this.marks_map.has(selection_id)) {
              // 请求后端 删标注内容

              // 前端marks_map 同步
              this.marks_map.delete(selection_id);
            }
            // 2 删除高亮
            // 请求后端 删高亮

            // 前端 同步
            this.em.cancelHighlightLine(selection_id);
            this.selection_id_map.delete(key_selection);
          } else {
            // 提示 当前高亮有其他人的标注 不能随意删除
            this.$message({
              showClose: true,
              message: '当前高亮有他人的标注内容，不能随意删除！'
            });
          }

          break;
        case '304':
          /**
           *  要处理高亮
           */
          // 当前区域如果没有高亮 需要添加高亮 否则不需要添加高亮
          if (!this.selection_id_map.has(key_selection)) {
            this.em.highlightLine(data, this.id_auto_increase);
            this.selection_id_map.set(key_selection, this.id_auto_increase);
            this.id_auto_increase++;
          }
          // 添加标注
          this.centerDialogVisible = true;
          // 获取当前highlight_id
          this.target_highlight_id = this.selection_id_map.get(key_selection);
          break;
        case '305':
          // 获取当前highlight_id
          this.target_highlight_id = this.selection_id_map.get(key_selection);
          if (this.marks_map.has(this.target_highlight_id)) {
            // 查看标注内容
            this.marks_show = this.marks_map.get(this.target_highlight_id);
            this.drawerVisible = true;

          } else {
            // 当前高亮 没有对应的marks
            this.$message({
              showClose: true,
              message: '当前高亮没有标注内容'
            });
          }

          break;
      }
    }

  },
  created() {
    // 造一些假数据 后面这部分数据 从后端获取
    this.selections = [
      {
        start_div_id: "testdiv",
        start_offset: 10,
        end_div_id: "testdiv",
        end_offset: 30,
        id: 0,
      },
      {
        start_div_id: "testdiv",
        start_offset: 60,
        end_div_id: "testdiv",
        end_offset: 90,
        id: 1
      }
    ]
  },
  mounted() {
    var that = this;
    this.em = new EasyMarker({
      menuItems: [
        {
          text: '划线',
          type: 'select',
          id: '302',
        },
        {
          text: '删除划线',
          type: 'highlight',
          id: '303',
        },
        {
          text: '标注',
          // iconName: 'iconfont icon-delete',
          id: '304',
        },
        {
          text: '查看标注',
          type: 'highlight',
          // iconName: 'iconfont icon-delete',
          id: '305',
        }
        // {
        //   id: 222,
        //   text: '复制',
        //   iconName: 'iconfont icon-copy',
        // },
      ],
      mask: {
        color: '#407ff2'
      },
      highlight: {
        color: '#40f0f2',
        type: 'underline',
      }

    });
    this.em.create(document.querySelector('#article'), document.body);
    var idx;
    for (idx in that.selections) {
      var selection = that.selections[idx];
      console.info('here ' + idx + ' selection start div id : ' + selection.start_div_id);
      var startdiv = document.querySelector('#' + selection.start_div_id);
      var starttext = startdiv.childNodes[0];
      var enddiv = document.querySelector('#' + selection.end_div_id);
      var endtext = enddiv.childNodes[0];
      var highlight_selection = {
        anchorNode: starttext,
        anchorOffset: selection.start_offset,
        focusNode: endtext,
        focusOffset: selection.end_offset,
      }
      // 高亮显示
      this.em.highlightLine(highlight_selection, selection.id);
      // 根据后端的selections 维护一个 map 后面删除划线的时候会用到
      var key_selection = selection.start_div_id + '-' + selection.start_offset + '-' + selection.end_div_id + '-' + selection.end_offset;
      that.selection_id_map.set(key_selection, selection.id);

    }

    // em.onMenuClick(function (id, data) {
    //   console.log('You click the menu!', id, data);
    //   // console.log('parent_node : ' + data.anchorNode.parentNode.id);

    //   // 根据data 生成 key_selection
    //   var start_parent_id = data.anchorNode.parentNode.id;
    //   var end_parent_id = data.focusNode.parentNode.id;
    //   var start_offset = data.anchorOffset;
    //   var end_offset = data.focusOffset;
    //   var key_selection = start_parent_id + '-' + start_offset + '-' + end_parent_id + '-' + end_offset;
    //   // console.info('toString : ' + data_to_string)
    //   // 根据id判断一下是点了什么功能
    //   switch (id) {
    //     case '302':
    //       // 添加划线
    //       // 这里的 id_auto_increase 是前端模拟生成的 实际上就是传给后端保存后 获取的 自增id
    //       /**
    //        * post 后端 保存 高亮区域
    //        */

    //       em.highlightLine(data, that.id_auto_increase);
    //       // 维护一下 this.selections(数据保持一致)
    //       // 感觉 可以不维护？ 这就是 初始化的时候用到的
    //       // that.selections.push(
    //       //   {
    //       //     start_div_id: start_parent_id,
    //       //     start_offset: start_offset,
    //       //     end_div_id: end_parent_id,
    //       //     end_offset: end_offset,
    //       //     id: that.id_auto_increase
    //       //   }
    //       // )
    //       that.selection_id_map.set(key_selection, that.id_auto_increase);
    //       that.id_auto_increase++;
    //       break;
    //     case '303':
    //       // 删除划线
    //       // 可能需要一些判断逻辑
    //       // 当该高亮区域内有其他人标注的时候不能删除 （这部分 还没测试过）
    //       var selection_id = that.selection_id_map.get(key_selection);
    //       // 根据selection_id 找批注
    //       var canCancle = true;
    //       if (that.marks_map.has(selection_id)) {
    //         const marks = marks_map.get(selection_id);
    //         for (const mark in marks) {
    //           const userName = mark.user_name;
    //           if (userName !== that.user_name) {
    //             canCancle = false;
    //             break;
    //           }
    //         }
    //       }
    //       if (canCancle) {
    //         // 还要发给后端 请求 删
    //         // 1 如果存在标准内容 删
    //         if (that.marks_map.has(selection_id)) {
    //           // 请求后端 删标注内容

    //           // 前端marks_map 同步
    //           that.marks_map.delete(selection_id);
    //         }
    //         // 2 删除高亮
    //         // 请求后端 删高亮

    //         // 前端 同步
    //         em.cancelHighlightLine(selection_id);
    //         that.selection_id_map.delete(key_selection);
    //       } else {
    //         // 提示 当前高亮有其他人的标注 不能随意删除
    //         that.$message({
    //           showClose: true,
    //           message: '当前高亮有他人的标注内容，不能随意删除！'
    //         });
    //       }

    //       break;
    //     case '304':
    //       /**
    //        *  要处理高亮
    //        */
    //       // 当前区域如果没有高亮 需要添加高亮 否则不需要添加高亮
    //       if (!that.selection_id_map.has(key_selection)) {
    //         em.highlightLine(data, that.id_auto_increase);
    //         that.selection_id_map.set(key_selection, that.id_auto_increase);
    //         that.id_auto_increase++;
    //       }
    //       // 添加标注
    //       that.centerDialogVisible = true;
    //       // 获取当前highlight_id
    //       that.target_highlight_id = that.selection_id_map.get(key_selection);
    //       break;
    //     case '305':
    //       // 获取当前highlight_id
    //       that.target_highlight_id = that.selection_id_map.get(key_selection);
    //       if (that.marks_map.has(that.target_highlight_id)) {
    //         // 查看标注内容
    //         that.marks_show = that.marks_map.get(that.target_highlight_id);
    //         that.drawerVisible = true;

    //       } else {
    //         // 当前高亮 没有对应的marks
    //         that.$message({
    //           showClose: true,
    //           message: '当前高亮没有标注内容'
    //         });
    //       }

    //       break;

    //   }


    // });
    this.em.onMenuClick(this.MarkMenuClick)

    // em.onSelectStatusChange((val) => {
    //   console.log('onSelectStatusChange', val);
    // });
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
