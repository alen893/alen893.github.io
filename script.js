// 模块化组织代码
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 初始化GSAP动画
    initAnimations();
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 移动端菜单切换
    mobileMenuBtn.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
    });
    
    // 关闭移动端菜单（点击导航链接后）
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
        });
    });
    
    // 平滑滚动
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    gsap.to(window, {
                        duration: 0.8,
                        scrollTo: {
                            y: targetElement.offsetTop - 80,
                            autoKill: true
                        },
                        ease: "power2.out"
                    });
                }
            } else {
                // 外部链接直接跳转
                window.location.href = targetId;
            }
        });
    });
    
    // 作品筛选功能
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有按钮的active类
                filterBtns.forEach(b => b.classList.remove('active'));
                // 给当前按钮添加active类
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // 筛选作品
                portfolioItems.forEach(item => {
                    item.classList.remove('show');
                    
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        setTimeout(() => {
                            item.classList.add('show');
                        }, 100);
                    }
                });
            });
        });
        
        // 默认显示全部作品
        setTimeout(() => {
            portfolioItems.forEach(item => {
                item.classList.add('show');
            });
        }, 300);
    }
    
    // 表单提交处理
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 简单的表单提交动画
            const submitBtn = this.querySelector('.primary-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '发送中...';
            submitBtn.disabled = true;
            
            // 模拟提交
            setTimeout(() => {
                submitBtn.textContent = '发送成功！';
                this.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        });
    }
});

// 初始化页面动画
function initAnimations() {
    // 页面加载时的淡入效果
    gsap.from('body', {
        opacity: 0,
        duration: 0.5,
        ease: "power1.out"
    });
    
    // 滚动触发的元素动画
    const animateOnScroll = (selector, animationProps) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            gsap.from(element, {
                ...animationProps,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    };
    
    // 为各个区块添加滚动动画
    animateOnScroll('.section-title', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });
    
    animateOnScroll('.about-content', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2
    });
    
    animateOnScroll('.contact-content', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2
    });
}
const galleryImages = document.querySelectorAll('.gallery-item img, .project-main-img img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

galleryImages.forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

lightboxClose.addEventListener('click', () => {
  lightbox.classList.remove('show');
  document.body.style.overflow = 'auto';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightboxClose.click();
});