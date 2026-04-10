document.addEventListener('DOMContentLoaded', () => {
    
    // 1. АНИМАЦИЯ ПОЯВЛЕНИЯ (REVEAL)
    // Используем IntersectionObserver для отслеживания появления элементов на экране
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // После появления отключаем наблюдение за этим элементом
                observer.unobserve(entry.target);
            }
        });
    };
    const revealObserver = new IntersectionObserver(revealCallback, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


    // 2. ЭФФЕКТ ДЕЛИКАТНОЙ НАВОДКИ (HIGHLIGHT)
    // Подсвечиваем секцию, когда пользователь наводит на соответствующий пункт меню
    const navLinks = document.querySelectorAll('.site-nav a');
    
    navLinks.forEach(link => {
        const targetId = link.getAttribute('data-link');
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            link.addEventListener('mouseenter', () => {
                targetSection.classList.add('section-highlight');
            });
            link.addEventListener('mouseleave', () => {
                targetSection.classList.remove('section-highlight');
            });
        }
    });


    // 3. УНИВЕРСАЛЬНАЯ ЛОГИКА АККОРДЕОНОВ (Кейсы и Для кого)
    const setupAccordion = (itemsSelector) => {
        const items = document.querySelectorAll(itemsSelector);
        items.forEach(item => {
            item.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                // Закрываем все остальные
                items.forEach(el => el.classList.remove('active'));
                // Если текущий не был открыт — открываем
                if (!isActive) item.classList.add('active');
            });
        });
    };
    setupAccordion('.portfolio-item');
    setupAccordion('.acc-item');


    // 4. ЭФФЕКТ ШАПКИ ПРИ СКРОЛЛЕ
    // Делаем шапку полупрозрачной с блюром
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });


    // 5. ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Отступ под шапку
                    behavior: 'smooth'
                });
            }
        });
    });
});