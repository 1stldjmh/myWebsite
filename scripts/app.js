// 自动更新年份
document.getElementById('current-year').textContent = new Date().getFullYear();
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
/* document.getElementById('guestbookForm').addEventListener('submit', function(e) {
    e.target.querySelector('button').textContent = '提交中...';
}); */
/* AJAX提交 */
document.getElementById('guestbookForm').addEventListener('submit', async function(e) {
    e.preventDefault();//阻止表单默认提交行为（页面跳转）
    const wechatName = document.querySelector('[name="wechat_verify"]').value.trim();
    const correctName = "stldjmh"; 
    if(wechatName !== correctName) {
        const input = document.querySelector('[name="wechat_verify"]');
        input.classList.add('theWrong'); // 添加CSS错误样式
        input.focus(); // 聚焦到错误输入框
        // 延迟弹窗和移除，让浏览器先渲染样式
        setTimeout(() => {
            alert("验证失败，请输入正确的微信名");
            input.classList.remove('theWrong');
        }, 50); // 50ms足够渲染
        return false;
    }
    const form = e.target;
    const button = form.querySelector('button');
    button.disabled = true;// 禁用按钮并修改文字，防止重复提交
    button.textContent = '提交中...';
    try {
        // 使用fetch API异步提交表单数据
        const response = await fetch(form.action, {
            method: 'POST',// 使用HTTP POST方法发送请求
            body: new FormData(form),// 将表单数据作为请求体
            headers: { 'Accept': 'application/json' } // 告诉服务器希望接收JSON格式的响应
        });
        if (response.ok) {// 检查响应状态
            alert('留言成功！');
            form.reset();
        } else {
            throw new Error('提交失败');
        }
    } catch (error) {
        alert('提交出错，请稍后再试');
        console.error(error);
    } finally {
        button.textContent = '提交留言';
        button.disabled = false;
    }
});