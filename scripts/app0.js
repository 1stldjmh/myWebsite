// 配置GitHub信息
const GITHUB_USERNAME = '1stldjmh'; //GitHub用户名
const GITHUB_REPO = 'mywebsite'; //GitHub Pages仓库名
const GITHUB_TOKEN = '__API_KEY__';
//const GITHUB_TOKEN = require('./config.js'); // CommonJS 方式 //个人访问令牌，用于认证API请求（避免匿名调用限制）
// 调试代码
console.log('脚本已加载');
console.log('GitHub用户名:', GITHUB_USERNAME);
console.log('仓库名:', GITHUB_REPO);
console.log('Token前10位:', GITHUB_TOKEN?.slice(0, 10) + '...'); 
// 邮箱链接点击提示
document.querySelector('.email-link').addEventListener('click', function(e) {
    /* 检查用户代理(浏览器)是否不是Windows Mail或Outlook */
    if (!navigator.userAgent.includes('Windows Mail') && 
        !navigator.userAgent.includes('Outlook')) {
        alert('系统将尝试打开邮件客户端，如果没有反应请手动复制邮箱地址');
    }
});
// 项目卡片点击效果
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        setTimeout(() => {
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }, 300);/* 300毫秒后恢复原阴影效果 */
    });
});
// 获取留言表单和留言显示容器的DOM引用
//DOM的作用是使JavaScript有能力操作HTML文档
const guestbookForm = document.getElementById('guestbookForm');
const guestbookEntries = document.getElementById('guestbookEntries');
// 表单提交处理
guestbookForm.addEventListener('submit', function(e) {
    e.preventDefault();//阻止表单默认提交
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    if (!name || !message) {
        alert('请填写昵称和留言内容');
        return;
    }
    /* 反引号让字符串拼接更简洁、可读性更强，特别适合含变量或多行文本的场景。 */
    const fullMessage = `昵称: ${name}\n\n${message}`;//格式化留言内容
    // 发送POST请求到GitHub API
    axios.post(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/issues`, {
        title: `来自${name}的留言`,// Issue标题
        body: fullMessage// Issue内容(留言)
    }, {
        headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,// 认证头
            'Accept': 'application/vnd.github.v3+json'// 指定API版本
        }
    })
    .then(response => {
        //成功处理
        alert('留言提交成功！');
        guestbookForm.reset();// 清空表单
        loadGuestbookEntries();// 重新加载留言列表
    })
    .catch(error => {
        //错误处理
        console.error('提交留言失败:', error);
        alert('留言提交失败，请稍后再试');
    });
});
// 加载留言列表
function loadGuestbookEntries() {
    // 发送GET请求获取所有issues(留言)
    axios.get(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/issues`, {
        headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(response => {
        // 清空留言容器
        guestbookEntries.innerHTML = '';
        // 处理无留言情况
        if (response.data.length === 0) {
            guestbookEntries.innerHTML = '<p>暂无留言，快来成为第一个留言的人吧！</p>';
            return;
        }
        // 遍历所有issues并渲染为留言条目
        response.data.forEach(issue => {
            // 从issue body中提取昵称和留言内容
            const bodyLines = issue.body.split('\n');
            const name = bodyLines[0].replace('昵称: ', '');
            const message = bodyLines.slice(2).join('\n');
            // 创建留言元素
            const entryDiv = document.createElement('div');
            entryDiv.className = 'guestbook-entry';
            entryDiv.innerHTML = `
                <h3>${name}</h3>
                <p>${message}</p>
                <small>${new Date(issue.created_at).toLocaleString()}</small>
            `;
            // 添加到容器
            guestbookEntries.appendChild(entryDiv);
        });
    })
    .catch(error => {
        console.error('加载留言失败:', error);
        alert('加载留言失败');
        guestbookEntries.innerHTML = '<p>加载留言失败，请刷新页面重试</p>';
    });
}
// 页面加载时获取留言
document.addEventListener('DOMContentLoaded', loadGuestbookEntries);
/* JS留言板代码：引入axios库，配置部分，DOM元素获取，表单提交处理，加载留言列表，页面初始化 
   所有操作都通过客户端JavaScript完成，无需服务器*/