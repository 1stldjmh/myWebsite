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
document.getElementById('guestbookForm').addEventListener('submit', function(e) {
    e.target.querySelector('button').textContent = '提交中...';
  });