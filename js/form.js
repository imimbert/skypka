document.addEventListener('DOMContentLoaded', () => {
    const joinForm = document.getElementById('joinForm');
    const submitButton = joinForm?.querySelector('.submit-button');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = "We'll get back to you soon.";

    if (joinForm) {
        joinForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!submitButton) return;
            
            // 禁用提交按钮并显示加载状态
            submitButton.disabled = true;
            submitButton.textContent = 'Commiting...';
            
            
            

            try {
                const formData = new FormData(joinForm);
                let dataString = '';
                for (const [key, value] of formData.entries()) {
                    dataString += `${key}: ${value}\n`;
                }
                
                console.log({"email": dataString});

                const response = await fetch('https://skypka-backend.skypka.tech/email/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({"email": dataString})
                });
                
                

                if (!response.ok) {
                    throw new Error('failed to commit, please try again later');
                }
                
                // 显示成功消息
                joinForm.appendChild(successMessage);
                successMessage.classList.add('visible');
                
                // 重置表单
                joinForm.reset();
                
            } catch (error) {
                alert(error.message);
            } finally {
                // 恢复提交按钮状态
                submitButton.disabled = false;
                submitButton.textContent = 'Submit';
            }
        });
    }
});