class InteractiveStory {
  constructor() {
    this.screens = document.querySelectorAll('.screen');
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
    // Обработчик колеса мыши на всем документе
    document.addEventListener('wheel', (e) => {
      if (this.isAnimating) return;
      
      // Защита от слишком быстрой прокрутки
      if (Date.now() - this.lastScrollTime < 1000) return;
      
      if (e.deltaY > this.scrollThreshold) {
        this.nextScreen();
      } else if (e.deltaY < -this.scrollThreshold) {
        this.prevScreen();
      }
      
      this.lastScrollTime = Date.now();
    }, { passive: false });

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

    // Обработчик для тач-устройств
    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      if (this.isAnimating) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.nextScreen();
        } else {
          this.prevScreen();
        }
      }
    }, { passive: true });
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
    const currentContent = currentScreen.querySelector('.content');
    
    // 1. Сначала скрываем контент текущего экрана
    currentContent.classList.remove('visible');
    
    // 2. Затем раздвигаем ветки и приближаем фон
    setTimeout(() => {
      currentScreen.classList.add('exiting');
      
      // Анимация фона
      const currentBg = currentScreen.querySelector('.background');
      if (currentBg) {
        currentBg.classList.add('zooming');
      }
      
      // 3. Показываем следующий экран (но он пока не виден)
      nextScreen.classList.add('active');
      
      // 4. После завершения анимации скрываем текущий экран
      setTimeout(() => {
        // Скрываем текущий экран
        currentScreen.classList.remove('active', 'exiting');
        if (currentBg) {
          currentBg.classList.remove('zooming');
        }
        
        // Показываем контент следующего экрана
        const nextContent = nextScreen.querySelector('.content');
        setTimeout(() => {
          nextContent.classList.add('visible');
        }, 300);
        
        this.currentScreen = nextIndex;
        this.isAnimating = false;
        this.updateScrollIndicator();
      }, 1500);
    }, 800); // Задержка перед раздвиганием веток
  }

  showScreen(index) {
    this.currentScreen = index;
    
    // Скрываем все экраны
    this.screens.forEach(screen => {
      screen.classList.remove('active');
      const content = screen.querySelector('.content');
      content.classList.remove('visible');
    });
    
    // Показываем нужный экран
    const nextScreen = this.screens[index];
    nextScreen.classList.add('active');
    
    // Показываем контент с небольшой задержкой
    setTimeout(() => {
      const nextContent = nextScreen.querySelector('.content');
      nextContent.classList.add('visible');
    }, 300);
    
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