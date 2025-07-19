// News Page Manager
class NewsPageManager {
  constructor() {
    this.updatesContainer = document.getElementById("updates-container");
    this.diariesContainer = document.getElementById("diaries-container");
    this.init();
  }

  async init() {
    await this.loadUpdates();
    await this.loadDiaries();
  }

  async loadUpdates() {
    try {
      const response = await fetch("./data/updates.json");
      const updates = await response.json();
      this.renderUpdates(updates);
    } catch (error) {
      console.error("Error loading updates:", error);
      this.renderDefaultUpdates();
    }
  }

  async loadDiaries() {
    try {
      const response = await fetch("./data/diaries.json");
      const diaries = await response.json();
      this.renderDiaries(diaries);
    } catch (error) {
      console.error("Error loading diaries:", error);
      this.renderDefaultDiaries();
    }
  }

  renderUpdates(updates) {
    if (!this.updatesContainer) return;

    const updatesHTML = updates
      .map(
        (update, index) => `
            <div class="news-card">
                <div class="news-content">
                    <div class="news-date">${update.date}</div>
                    <h3 class="news-title">${update.title}</h3>
                    <p class="news-excerpt">${update.excerpt}</p>
                    <div class="news-full" id="update-full-${index}">
                        ${update.fullText}
                    </div>
                    <button class="read-more-btn" onclick="toggleReadMore('update-full-${index}', this)">
                        Read more
                    </button>
                </div>
            </div>
        `
      )
      .join("");

    this.updatesContainer.innerHTML = updatesHTML;
  }

  renderDiaries(diaries) {
    if (!this.diariesContainer) return;

    const diariesHTML = diaries
      .map(
        (diary, index) => `
            <div class="news-card">
                <div class="news-content">
                    <div class="news-date">${diary.date}</div>
                    <h3 class="news-title">${diary.title}</h3>
                    <p class="news-excerpt">${diary.excerpt}</p>
                    <div class="news-full" id="diary-full-${index}">
                        ${diary.fullText}
                    </div>
                    <button class="read-more-btn" onclick="toggleReadMore('diary-full-${index}', this)">
                        Read more
                    </button>
                </div>
            </div>
        `
      )
      .join("");

    this.diariesContainer.innerHTML = diariesHTML;
  }

  renderDefaultUpdates() {
    if (!this.updatesContainer) return;

    const defaultUpdates = [
      {
        title: "New Championship Mode Released!",
        date: "January 15, 2025",
        excerpt:
          "We're excited to announce the biggest update yet - the Championship Mode! Players can now compete in global tournaments and climb the leaderboards.",
        fullText:
          "The Championship Mode introduces a completely new competitive dimension to Bridge Race. Players can now participate in global tournaments, compete against the best bridge builders worldwide, and climb the prestigious leaderboards. The new system features multiple tournament formats including daily challenges, weekly championships, and monthly grand finals. Additionally, we've added 50+ new bridge designs, including rare golden blocks that can only be found in special events. The championship also includes a new ranking system with unique rewards for top performers. We've received amazing feedback from our beta testers, and we can't wait to see who will become the ultimate Bridge Race champion!",
        image: "card_new1.jpg",
      },
      {
        title: "Winter Racing Event Coming Soon",
        date: "January 10, 2025",
        excerpt:
          "Get ready for the most challenging season in Bridge Race! Special winter-themed obstacles and limited-time racing events will be available.",
        fullText:
          "The winter season is approaching, and we're bringing the frosty challenge to Bridge Race! Starting January 20th, players will face exclusive winter-themed obstacles including ice blocks, snow barriers, and slippery surfaces that test your bridge-building skills. The racing events will also feature special winter environments with frozen rivers and snow-covered platforms. We're also introducing a new 'Frost Challenge' where players must build bridges that can withstand extreme cold conditions. The event will run until February 5th, so make sure to participate in all the seasonal challenges while they're available!",
        image: "card_new1.jpg",
      },
      {
        title: "Performance Improvements",
        date: "January 5, 2025",
        excerpt:
          "We've optimized the game engine for smoother racing and faster loading times across all devices.",
        fullText:
          "Our development team has been working hard to improve the overall performance of Bridge Race. The latest update includes significant optimizations to the game engine, resulting in smoother racing animations and faster loading times. We've also improved the mobile experience with better touch controls and reduced battery consumption. The bridge building interface has been streamlined for easier navigation, and the racing screen now loads twice as fast. These improvements ensure that players can enjoy the game seamlessly across all devices, from smartphones to desktop computers.",
        image: "card_new1.jpg",
      },
    ];

    this.renderUpdates(defaultUpdates);
  }

  renderDefaultDiaries() {
    if (!this.diariesContainer) return;

    const defaultDiaries = [
      {
        title: "My First Championship Victory",
        date: "January 12, 2025",
        excerpt:
          "After weeks of practice and strategic planning, I finally won my first championship. Here's my journey and some tips for new players.",
        fullText:
          "When I first started playing Bridge Race, I had no idea how strategic this game would become. My journey began with simple bridge building, collecting basic blocks and learning the mechanics. As I progressed, I discovered the joy of competitive racing and strategic planning. The key to winning championships is patience and precision. I learned to focus on efficient bridge designs - my winning strategy was to build compact, sturdy bridges that could withstand opponent interference. The most challenging part was competing against skilled players, but the satisfaction of winning a championship made it all worthwhile. My advice to new players: start with single-player mode to master the basics before entering championships. Also, don't forget to practice different bridge designs - versatility is key in competitive play!",
        image: "card_new1.jpg",
      },
      {
        title: "The Mountain Bridge Challenge",
        date: "January 8, 2025",
        excerpt:
          "Tackling the new mountain bridge challenge revealed some of the most difficult yet rewarding racing experiences I've ever had.",
        fullText:
          "The mountain bridge challenge is definitely the most difficult route in the game, but it's also the most rewarding. The challenge features steep inclines, narrow platforms, and unpredictable obstacles that test your bridge-building skills and racing reflexes. However, the blocks you collect here are absolutely unique - mountain materials, rare stones, and special building elements that you won't find anywhere else. I spent three days mastering this challenge, and the effort was worth it. My 'Mountain Master' collection is now one of my favorites, featuring reinforced bridges, special supports, and advanced building techniques. The key to success in this challenge is to practice your timing and to be patient - some of the best materials are hidden in hard-to-reach places. I recommend trying this challenge only after you've mastered the basic controls and have some experience with the game.",
        image: "card_new1.jpg",
      },
      {
        title: "Racing Strategy Tips",
        date: "January 3, 2025",
        excerpt:
          "After competing in Bridge Race for months, I've learned some valuable strategies that I want to share with the community.",
        fullText:
          "Racing strategy is the heart of Bridge Race, and mastering it can make the difference between a good player and a champion. My first tip is to always prioritize speed over complexity in the early stages. A simple, fast bridge is better than a complex one that takes too long to build. Secondly, focus on blocking your opponents' paths while building your own. Strategic placement of your bridges can prevent opponents from using your materials. Third, don't neglect the timing of your movements - the best bridge builders know when to collect blocks and when to focus on building. Finally, participate in community events and challenges. These often provide rare materials and exclusive building blocks that can't be obtained through regular gameplay. The competitive aspect of this game is what keeps me coming back - there's always a new challenge to overcome!",
        image: "card_new1.jpg",
      },
    ];

    this.renderDiaries(defaultDiaries);
  }
}

// Modal functionality
function showModal(content, title, image = null) {
  // Create modal overlay
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  modalOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  // Create modal content
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  modalContent.style.cssText = `
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    margin: 1rem;
  `;

  // Create close button
  const closeButton = document.createElement("button");
  closeButton.innerHTML = "×";
  closeButton.style.cssText = `
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
  `;

  // Add content to modal
  let modalHTML = `<h2 style="margin-bottom: 1rem; color: #2c5aa0;">${title}</h2>`;

  if (image) {
    modalHTML += `<img src="./race_painting/${image}" alt="${title}" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 1rem;">`;
  }

  modalHTML += `<div style="line-height: 1.6; color: #333;">${content}</div>`;

  modalContent.innerHTML = modalHTML;

  // Add close button to modal
  modalContent.appendChild(closeButton);

  // Add modal to page
  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);

  // Close modal functionality
  function closeModal() {
    document.body.removeChild(modalOverlay);
  }

  closeButton.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });
}

// Toggle read more functionality
function toggleReadMore(elementId, button) {
  const fullText = document.getElementById(elementId);
  if (fullText) {
    const content = fullText.innerHTML;
    const titleElement = fullText.previousElementSibling.previousElementSibling;
    const title = titleElement ? titleElement.textContent : "News Article";

    if (fullText.style.display === "block") {
      fullText.style.display = "none";
      button.textContent = "Read more";
    } else {
      // Only show images for specific titles with different images
      let image = null; // no image by default

      if (title.includes("New Championship Mode Released!")) {
        image = "card_new1.jpg";
      } else if (title.includes("My First Championship Victory")) {
        image = "card_new2.jpg";
      } else if (title.includes("Performance Improvements")) {
        image = "card_new3.jpg";
      }

      showModal(content, title, image);
    }
  }
}

// Initialize news page when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  new NewsPageManager();
});
