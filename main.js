document.addEventListener('DOMContentLoaded', () => {
  // 1. تفعيل فتح وإغلاق القائمة في الجوال
  const menuToggle = document.getElementById('menuToggle');
  const mainMenu = document.getElementById('mainMenu');

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mainMenu.classList.toggle('active');
  });

  // إغلاق القائمة عند الضغط على أي رابط بالجوال
  mainMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // 2. محرك التبديل اللغوي (Dual-Language Engine)
  const langToggle = document.getElementById('langToggle');
  let currentLang = 'ar';

  langToggle.addEventListener('click', () => {
    // تبديل المتغير
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    
    // تغيير سمات الـ HTML الأساسية للاتجاه واللغة
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    
    // تغيير نص الزر نفسه
    langToggle.textContent = currentLang === 'ar' ? 'English' : 'العربية';

    // تحديث النصوص بناءً على الميزّات المعطاة في الـ HTML
    document.querySelectorAll('[data-ar]').forEach(element => {
      const translation = element.getAttribute(`data-${currentLang}`);
      if (translation) {
        // إذا كان العنصر عبارة عن حقل إدخال، نغير الـ placeholder
        if (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') {
          element.setAttribute('placeholder', translation);
        } else {
          element.textContent = translation;
        }
      }
    });
  });

  // 3. إضافة تأثير نشط (Active Class) للروابط عند التمرير
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.menu a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 120)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
});