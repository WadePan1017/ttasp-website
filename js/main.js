// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
  var menuToggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });

    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        menuToggle.classList.remove('active');
      });
    });
  }

  // Notice auto-scroll
  var noticeScroll = document.getElementById('noticeScroll');
  if (noticeScroll) {
    var list = noticeScroll.querySelector('ul');
    if (list) {
      var items = list.querySelectorAll('li');
      var itemHeight = items[0] ? items[0].offsetHeight : 44;
      var totalItems = items.length;
      var currentIndex = 0;
      var scrollTimer = null;

      // Clone first item and append for seamless loop
      var firstClone = items[0].cloneNode(true);
      list.appendChild(firstClone);

      function startScroll() {
        if (scrollTimer) clearInterval(scrollTimer);
        scrollTimer = setInterval(function () {
          currentIndex++;
          if (currentIndex > totalItems) {
            currentIndex = 0;
            list.style.transition = 'none';
            list.style.top = '0';
            list.offsetHeight;
          }
          list.style.transition = 'top 0.5s ease';
          list.style.top = -(currentIndex * itemHeight) + 'px';
        }, 3000);
      }

      startScroll();

      // Recalculate on resize
      var resizeTimer = null;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          var newHeight = items[0] ? items[0].offsetHeight : 44;
          if (newHeight !== itemHeight) {
            itemHeight = newHeight;
            currentIndex = 0;
            list.style.transition = 'none';
            list.style.top = '0';
            list.offsetHeight;
            startScroll();
          }
        }, 200);
      });
    }
  }

  // News tab filter
  var newsTabs = document.querySelectorAll('.news-tab');
  var newsCards = document.querySelectorAll('.news-card');
  if (newsTabs.length && newsCards.length) {
    newsTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        newsTabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var filter = tab.getAttribute('data-filter');
        newsCards.forEach(function (card) {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});

// Email subscription check
function checkEmail() {
  var email = document.querySelector('.subscribe-form input[type="email"]');
  if (email && !email.value) {
    alert('请输入邮箱地址');
    return false;
  }
  return true;
}
