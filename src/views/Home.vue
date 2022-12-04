<template>
    <div>
        <h1>我是个人主页</h1>
        <button @click="paperClicked()">发paper了</button>
    </div>

</template>

<script>
// 测试一下 请求方法的调用
import { getUserInfo, publicArticle } from '../api';

export default {
    data() {
        return {}
    },
    created() {
        // 调用 api中的 获取用户信息的 方法
        getUserInfo(1, null).then(
            res => {
                console.info(res.data)
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    },
    methods: {
        // 调用 api中的 publicArticle 方法 发一个 Post请求 测试一下 

        paperClicked() {
            const postdata = {
                'name': 'process modeling',
                'content': 'win',
                'author': { 'id': 1 }
            }
            publicArticle(postdata).then((res => {
                console.log('拿下')
                console.log(res)
            })).catch(err => {
                console.log('wrong :(')
            })
        }
    }

}
</script>
