class InteractiveStory {
  constructor() {
    this.screens = document.querySelectorAll('.screen');
    this.scroller = document.getElementById('scroller');
    this.currentScreen = 0;
    this.isAnimating = false;
    this.scrollThreshold = 50;
    this.lastScrollTime = 0;
    
    this.init();
  }

  init() {
    this.fadeInPage();
    this.setupEventListeners();
    this.showScreen(0);
  }

  fadeInPage() {
    const overlay = document.querySelector('.fade-overlay.start');
    
    setTimeout(() => {
      overlay.classList.add('hidden');
      
      setTimeout(() => {
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }, 1500);
    }, 500);
  }

  setupEventListeners() {
    // Обработчик колеса мыши
    this.scroller.addEventListener('wheel', (e) => {
      e.preventDefault();
      
      const now = Date.now();
      if (now - this.lastScrollTime < 1000) return; // Защита от слишком частой прокрутки
      
      if (e.deltaY > this.scrollThreshold && !this.isAnimating) {
        this.nextScreen();
      } else if (e.deltaY < -this.scrollThreshold && !this.isAnimating) {
        this.prevScreen();
      }
      
      this.lastScrollTime = now;
    });

    // Клавиши вверх/вниз
    document.addEventListener('keydown', (e) => {
      if (this.isAnimating) return;
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        this.nextScreen();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        this.prevScreen();
      }
    });

    // Скрываем индикатор прокрутки при начале прокрутки
    this.scroller.addEventListener('scroll', () => {
      const indicator = document.querySelector('.scroll-indicator');
      if (this.currentScreen > 0) {
        indicator.classList.add('hidden');
      }
    });
  }

  nextScreen() {
    if (this.currentScreen < this.screens.length - 1 && !this.isAnimating) {
      this.transitionToScreen(this.currentScreen + 1);
    }
  }

  prevScreen() {
    if (this.currentScreen > 0 && !this.isAnimating) {
      this.transitionToScreen(this.currentScreen - 1);
    }
  }

  transitionToScreen(nextIndex) {
    this.isAnimating = true;
    
    const currentScreen = this.screens[this.currentScreen];
    const nextScreen = this.screens[nextIndex];
    
    // Анимация ухода текущего экрана
    currentScreen.classList.add('exiting');
    
    // Анимация фона
    const currentBg = currentScreen.querySelector('.background');
    if (currentBg) {
      currentBg.classList.add('next');
    }
    
    setTimeout(() => {
      // Скрываем текущий экран
      currentScreen.classList.remove('active', 'exiting');
      if (currentBg) {
        currentBg.classList.remove('next');
      }
      
      // Показываем следующий экран
      this.showScreen(nextIndex);
      
      this.isAnimating = false;
    }, 1500);
  }

  showScreen(index) {
    this.currentScreen = index;
    
    // Скрываем все экраны
    this.screens.forEach(screen => {
      screen.classList.remove('active');
    });
    
    // Показываем нужный экран
    this.screens[index].classList.add('active');
    
    // Прокручиваем к экрану
    this.scroller.scrollTo({
      top: window.innerHeight * index,
      behavior: 'smooth'
    });
    
    // Обновляем индикатор прокрутки
    this.updateScrollIndicator();
  }

  updateScrollIndicator() {
    const indicator = document.querySelector('.scroll-indicator');
    if (this.currentScreen === this.screens.length - 1) {
      indicator.classList.add('hidden');
    } else {
      indicator.classList.remove('hidden');
    }
  }
}

// Запуск при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
  new InteractiveStory();
});