// Homepage JavaScript
class HomepageManager {
  constructor() {
    this.reviewsContainer = document.getElementById("reviews-container");
    this.gameIframe = document.querySelector(".game-container iframe");
    this.init();
  }

  async init() {
    await this.loadReviews();
    this.setupGameIframe();
  }

  setupGameIframe() {
    if (this.gameIframe) {
      // Add error handling for iframe
      this.gameIframe.addEventListener("load", () => {
        console.log("Game iframe loaded successfully");
      });

      this.gameIframe.addEventListener("error", (e) => {
        console.warn("Game iframe failed to load:", e);
        this.showGameError();
      });

      // Add timeout for iframe loading
      setTimeout(() => {
        if (this.gameIframe.contentDocument === null) {
          console.warn("Game iframe may not have loaded properly");
        }
      }, 5000);
    }
  }

  showGameError() {
    const gameContainer = document.querySelector(".game-container");
    if (gameContainer) {
      const errorDiv = document.createElement("div");
      errorDiv.className = "game-error";
      errorDiv.innerHTML = `
        <div style="text-align: center; padding: 2rem; background: #f8f9fa; border-radius: 12px;">
          <h3 style="color: #e74c3c; margin-bottom: 1rem;">Game Loading Error</h3>
          <p style="color: #7f8c8d; margin-bottom: 1rem;">The game is temporarily unavailable. Please try refreshing the page.</p>
          <button onclick="location.reload()" style="background: #2c5aa0; color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">Refresh Page</button>
        </div>
      `;
      gameContainer.appendChild(errorDiv);
    }
  }

  async loadReviews() {
    try {
      const response = await fetch("./data/reviews.json");
      const reviews = await response.json();
      this.renderReviews(reviews);
    } catch (error) {
      console.error("Error loading reviews:", error);
      this.renderDefaultReviews();
    }
  }

  renderReviews(reviews) {
    if (!this.reviewsContainer) return;

    const reviewsHTML = reviews
      .map(
        (review) => `
            <div class="review-card">
                <div class="review-author">${review.author}</div>
                <div class="review-text">"${review.text}"</div>
            </div>
        `
      )
      .join("");

    this.reviewsContainer.innerHTML = reviewsHTML;
  }

  renderDefaultReviews() {
    if (!this.reviewsContainer) return;

    const defaultReviews = [
      {
        author: "Sarah M.",
        text: "This game is absolutely addictive! I love building bridges and racing against other players. The bridge building mechanics are smooth and the competitive aspect is thrilling.",
      },
      {
        author: "Mike R.",
        text: "Perfect game for strategic thinking! The bridge building aspect adds a nice tactical element, and the racing system is really satisfying when you win championships.",
      },
      {
        author: "Emma L.",
        text: "My kids love this game! It's educational and fun at the same time. They learn about engineering, strategy, and problem-solving while having a blast racing and building.",
      },
      {
        author: "David K.",
        text: "Great competitive game with beautiful graphics. The different bridge designs keep things interesting, and I love discovering new building techniques.",
      },
    ];

    this.renderReviews(defaultReviews);
  }
}

// Scroll to game function
function scrollToGame() {
  const gameSection = document.querySelector(".game-section");
  if (gameSection) {
    gameSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Fullscreen function
function toggleFullscreen() {
  const iframe = document.getElementById("game-iframe");
  const fullscreenBtn = document.querySelector(".fullscreen-btn");

  if (!document.fullscreenElement) {
    // Enter fullscreen
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
      iframe.msRequestFullscreen();
    }

    // Update button text
    if (fullscreenBtn) {
      fullscreenBtn.innerHTML =
        '<span class="fullscreen-icon">⛶</span> Exit Fullscreen';
    }
  } else {
    // Exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }

    // Update button text
    if (fullscreenBtn) {
      fullscreenBtn.innerHTML =
        '<span class="fullscreen-icon">⛶</span> Fullscreen';
    }
  }
}

// Listen for fullscreen changes
document.addEventListener("fullscreenchange", updateFullscreenButton);
document.addEventListener("webkitfullscreenchange", updateFullscreenButton);
document.addEventListener("msfullscreenchange", updateFullscreenButton);

function updateFullscreenButton() {
  const fullscreenBtn = document.querySelector(".fullscreen-btn");
  if (fullscreenBtn) {
    if (document.fullscreenElement) {
      fullscreenBtn.innerHTML =
        '<span class="fullscreen-icon">⛶</span> Exit Fullscreen';
    } else {
      fullscreenBtn.innerHTML =
        '<span class="fullscreen-icon">⛶</span> Fullscreen';
    }
  }
}

// Error handling for external scripts
window.addEventListener("error", function (e) {
  if (e.filename && e.filename.includes("imasdk.googleapis.com")) {
    console.warn(
      "Google IMA SDK failed to load - this is normal if ad blockers are active"
    );
    return false; // Prevent error from showing in console
  }
});

// Initialize homepage when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  new HomepageManager();
});
