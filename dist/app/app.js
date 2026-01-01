// Game State
let gameState = {
  level: 1,
  exp: 0,
  expToNextLevel: 200,
  hp: 100,
  hpMax: 100,
  mp: 100,
  mpMax: 100,
  statPoints: 0,
  attributes: {
    focus: 10,
    discipline: 10,
    efficiency: 10,
    intelligence: 10,
    stamina: 10,
    willpower: 10
  },
  dailyQuests: [
    { name: "Morning Routine Complete", expReward: 50, completed: false },
    { name: "Focus Session - 1 hour", expReward: 100, completed: false },
    { name: "Complete 3 Priority Tasks", expReward: 150, completed: false },
    { name: "Exercise/Physical Activity", expReward: 75, completed: false },
    { name: "Learning Session - 30 min", expReward: 80, completed: false },
    { name: "Review Tomorrow's Plan", expReward: 40, completed: false }
  ],
  weeklyQuests: [
    { name: "Complete 20 Tasks This Week", expReward: 500, progress: 0, target: 20, completed: false },
    { name: "7-Day Consistency Streak", expReward: 600, progress: 0, target: 7, completed: false },
    { name: "Master a New Skill", expReward: 400, progress: 0, target: 1, completed: false },
    { name: "Zero Procrastination Days: 5/7", expReward: 700, progress: 0, target: 5, completed: false },
    { name: "Deep Work: 10 Hours Total", expReward: 550, progress: 0, target: 10, completed: false }
  ],
  customTasks: [],
  skills: [
    { name: "Quick Start", description: "Reduces procrastination and helps you start tasks faster", levelRequired: 5, currentLevel: 0, maxLevel: 3, cost: 3, unlocked: false },
    { name: "Deep Focus", description: "Enables extended concentration periods without breaks", levelRequired: 8, currentLevel: 0, maxLevel: 3, cost: 4, unlocked: false },
    { name: "Time Mastery", description: "Dramatically improves time management abilities", levelRequired: 10, currentLevel: 0, maxLevel: 3, cost: 5, unlocked: false },
    { name: "Energy Surge", description: "Increases daily stamina and productivity capacity", levelRequired: 12, currentLevel: 0, maxLevel: 3, cost: 4, unlocked: false },
    { name: "Multi-Task", description: "Ability to efficiently handle multiple projects", levelRequired: 15, currentLevel: 0, maxLevel: 3, cost: 5, unlocked: false },
    { name: "Perfect Planning", description: "Enhanced organization and strategic thinking", levelRequired: 18, currentLevel: 0, maxLevel: 3, cost: 6, unlocked: false },
    { name: "Discipline Master", description: "Automatic habit formation and consistency", levelRequired: 20, currentLevel: 0, maxLevel: 3, cost: 7, unlocked: false },
    { name: "Flow State", description: "Access peak productivity and focus mode", levelRequired: 25, currentLevel: 0, maxLevel: 3, cost: 8, unlocked: false }
  ],
  achievements: [
    { name: "First Quest Complete", description: "Complete your first quest", rarity: "Common", unlocked: false, icon: "🎯" },
    { name: "Level 10 Reached", description: "Reach Level 10", rarity: "Rare", unlocked: false, icon: "⭐" },
    { name: "7-Day Streak Master", description: "Maintain a 7-day completion streak", rarity: "Rare", unlocked: false, icon: "🔥" },
    { name: "100 Tasks Completed", description: "Complete 100 total tasks", rarity: "Epic", unlocked: false, icon: "💯" },
    { name: "Skill Collector", description: "Unlock 5 different skills", rarity: "Epic", unlocked: false, icon: "🎓" },
    { name: "Productivity Warrior", description: "Reach Level 20", rarity: "Epic", unlocked: false, icon: "⚔️" },
    { name: "Shadow Monarch", description: "Reach Level 50", rarity: "Legendary", unlocked: false, icon: "👑" }
  ],
  statistics: {
    totalExp: 0,
    totalTasks: 0,
    currentStreak: 0,
    longestStreak: 0,
    completionRate: 0,
    skillsUnlocked: 0
  },
  quotes: [
    "ARISE.",
    "I ALONE CAN LEVEL UP.",
    "THE SYSTEM ACKNOWLEDGES YOUR EFFORT.",
    "EFFORT WILL NEVER BETRAY YOU.",
    "TODAY'S IMPOSSIBLE IS TOMORROW'S POSSIBLE.",
    "YOUR GROWTH KNOWS NO BOUNDS.",
    "THERE IS NO GROWTH WITHOUT STRUGGLE.",
    "THE PATH TO STRENGTH IS ENDLESS."
  ]
};

// Initialize app
function init() {
  updateDateTime();
  setInterval(updateDateTime, 1000);
  displayRandomQuote();
  renderStatus();
  renderDailyQuests();
  renderWeeklyQuests();
  renderCustomTasks();
  renderSkills();
  renderAchievements();
  renderStatistics();
}

// Update date and time
function updateDateTime() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  document.getElementById('dateTime').textContent = now.toLocaleDateString('en-US', options);
}

// Display random quote
function displayRandomQuote() {
  const quote = gameState.quotes[Math.floor(Math.random() * gameState.quotes.length)];
  document.getElementById('quoteDisplay').textContent = `│ ${quote} │`;
}

// Switch tabs
function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Remove active class from all nav tabs
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Show selected tab
  document.getElementById(tabName).classList.add('active');
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}

// Render status window
function renderStatus() {
  document.getElementById('playerLevel').textContent = gameState.level;
  document.getElementById('streakCount').textContent = gameState.statistics.currentStreak;
  
  // EXP bar
  const expPercent = (gameState.exp / gameState.expToNextLevel) * 100;
  document.getElementById('expBar').style.width = `${expPercent}%`;
  document.getElementById('expText').textContent = `EXP: ${gameState.exp} / ${gameState.expToNextLevel}`;
  
  // HP bar
  const hpPercent = (gameState.hp / gameState.hpMax) * 100;
  document.getElementById('hpBar').style.width = `${hpPercent}%`;
  document.getElementById('hpText').textContent = `${gameState.hp} / ${gameState.hpMax}`;
  
  // MP bar
  const mpPercent = (gameState.mp / gameState.mpMax) * 100;
  document.getElementById('mpBar').style.width = `${mpPercent}%`;
  document.getElementById('mpText').textContent = `${gameState.mp} / ${gameState.mpMax}`;
  
  // Stat points
  document.getElementById('statPointsDisplay').textContent = `Points: ${gameState.statPoints}`;
  
  // Render stats
  const statsList = document.getElementById('statsList');
  statsList.innerHTML = '';
  
  Object.entries(gameState.attributes).forEach(([stat, value]) => {
    const statItem = document.createElement('div');
    statItem.className = 'stat-item';
    statItem.innerHTML = `
      <span class="stat-name">${stat}</span>
      <div class="stat-value-group">
        <span class="stat-value">${value}</span>
        ${gameState.statPoints > 0 ? `<button class="stat-btn" onclick="addStatPoint('${stat}')">+</button>` : ''}
      </div>
    `;
    statsList.appendChild(statItem);
  });
}

// Add stat point
function addStatPoint(stat) {
  if (gameState.statPoints > 0) {
    gameState.attributes[stat]++;
    gameState.statPoints--;
    
    // Update max HP and MP based on stats
    gameState.hpMax = 100 + (gameState.attributes.stamina - 10) * 5;
    gameState.mpMax = 100 + (gameState.attributes.willpower - 10) * 5;
    
    renderStatus();
    showNotification('Stat Increased', `${stat} increased to ${gameState.attributes[stat]}!`, 'success');
  }
}

// Render daily quests
function renderDailyQuests() {
  const questsList = document.getElementById('dailyQuestsList');
  questsList.innerHTML = '';
  
  let totalExp = 0;
  let earnedExp = 0;
  
  gameState.dailyQuests.forEach((quest, index) => {
    totalExp += quest.expReward;
    if (quest.completed) earnedExp += quest.expReward;
    
    const questItem = document.createElement('div');
    questItem.className = `quest-item ${quest.completed ? 'completed' : ''}`;
    questItem.innerHTML = `
      <div class="quest-checkbox ${quest.completed ? 'checked' : ''}" onclick="toggleDailyQuest(${index})"></div>
      <div class="quest-info-group">
        <div class="quest-name">${quest.name}</div>
        <div class="quest-reward">+${quest.expReward} EXP</div>
      </div>
    `;
    questsList.appendChild(questItem);
  });
  
  document.getElementById('dailyExpEarned').textContent = earnedExp;
  document.getElementById('dailyExpTotal').textContent = totalExp;
}

// Toggle daily quest
function toggleDailyQuest(index) {
  const quest = gameState.dailyQuests[index];
  
  if (!quest.completed) {
    quest.completed = true;
    addExp(quest.expReward);
    gameState.statistics.totalTasks++;
    checkAchievements();
    renderDailyQuests();
    showNotification('Quest Complete!', `+${quest.expReward} EXP earned`, 'success');
  }
}

// Reset daily quests
function resetDailyQuests() {
  gameState.dailyQuests.forEach(quest => {
    quest.completed = false;
  });
  gameState.hp = gameState.hpMax;
  gameState.mp = gameState.mpMax;
  renderDailyQuests();
  renderStatus();
  showNotification('Daily Reset', 'Daily quests have been reset!', 'info');
}

// Render weekly quests
function renderWeeklyQuests() {
  const questsList = document.getElementById('weeklyQuestsList');
  questsList.innerHTML = '';
  
  gameState.weeklyQuests.forEach((quest, index) => {
    const progressPercent = (quest.progress / quest.target) * 100;
    const isComplete = quest.completed || quest.progress >= quest.target;
    
    const questItem = document.createElement('div');
    questItem.className = `quest-item ${isComplete ? 'completed' : ''}`;
    questItem.innerHTML = `
      <div class="quest-info-group">
        <div class="quest-name">${quest.name}</div>
        <div class="quest-reward">+${quest.expReward} EXP</div>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${progressPercent}%"></div>
          <div class="progress-text">${quest.progress} / ${quest.target}</div>
        </div>
      </div>
      ${!isComplete ? `<button class="btn btn-primary" onclick="incrementWeeklyQuest(${index})">+1</button>` : ''}
    `;
    questsList.appendChild(questItem);
  });
}

// Increment weekly quest
function incrementWeeklyQuest(index) {
  const quest = gameState.weeklyQuests[index];
  
  if (quest.progress < quest.target && !quest.completed) {
    quest.progress++;
    
    if (quest.progress >= quest.target) {
      quest.completed = true;
      addExp(quest.expReward);
      showNotification('Weekly Quest Complete!', `+${quest.expReward} EXP earned`, 'success');
    }
    
    renderWeeklyQuests();
  }
}

// Reset weekly quests
function resetWeeklyQuests() {
  gameState.weeklyQuests.forEach(quest => {
    quest.progress = 0;
    quest.completed = false;
  });
  renderWeeklyQuests();
  showNotification('Weekly Reset', 'Weekly quests have been reset!', 'info');
}

// Render custom tasks
function renderCustomTasks() {
  const tasksList = document.getElementById('customTasksList');
  tasksList.innerHTML = '';
  
  if (gameState.customTasks.length === 0) {
    tasksList.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 20px;">No custom tasks yet. Add one above!</p>';
    return;
  }
  
  // Sort by priority
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  const sortedTasks = [...gameState.customTasks].sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
  
  sortedTasks.forEach((task, index) => {
    const taskItem = document.createElement('div');
    taskItem.className = `task-item priority-${task.priority} ${task.completed ? 'completed' : ''}`;
    taskItem.innerHTML = `
      <div class="quest-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleCustomTask(${gameState.customTasks.indexOf(task)})"></div>
      <div class="task-details">
        <div class="task-name-display">${task.name}</div>
        <div class="task-meta">
          <span>Priority: ${task.priority.toUpperCase()}</span>
          <span class="quest-reward">+${task.expReward} EXP</span>
        </div>
      </div>
      <div class="task-actions">
        <button class="btn-delete" onclick="deleteCustomTask(${gameState.customTasks.indexOf(task)})">Delete</button>
      </div>
    `;
    tasksList.appendChild(taskItem);
  });
}

// Add custom task
function addCustomTask() {
  const nameInput = document.getElementById('taskName');
  const difficultySelect = document.getElementById('taskDifficulty');
  const prioritySelect = document.getElementById('taskPriority');
  
  const name = nameInput.value.trim();
  
  if (!name) {
    showNotification('Error', 'Please enter a task name', 'warning');
    return;
  }
  
  const task = {
    name: name,
    expReward: parseInt(difficultySelect.value),
    priority: prioritySelect.value,
    completed: false
  };
  
  gameState.customTasks.push(task);
  
  nameInput.value = '';
  difficultySelect.value = '100';
  prioritySelect.value = 'medium';
  
  renderCustomTasks();
  showNotification('Task Added', `${name} added to your task list`, 'success');
}

// Toggle custom task
function toggleCustomTask(index) {
  const task = gameState.customTasks[index];
  
  if (!task.completed) {
    task.completed = true;
    addExp(task.expReward);
    gameState.statistics.totalTasks++;
    checkAchievements();
    renderCustomTasks();
    showNotification('Task Complete!', `+${task.expReward} EXP earned`, 'success');
  }
}

// Delete custom task
function deleteCustomTask(index) {
  gameState.customTasks.splice(index, 1);
  renderCustomTasks();
  showNotification('Task Deleted', 'Task removed from your list', 'info');
}

// Render skills
function renderSkills() {
  const skillsGrid = document.getElementById('skillsGrid');
  skillsGrid.innerHTML = '';
  
  gameState.skills.forEach((skill, index) => {
    const canUnlock = gameState.level >= skill.levelRequired && !skill.unlocked && gameState.statPoints >= skill.cost;
    const canUpgrade = skill.unlocked && skill.currentLevel < skill.maxLevel && gameState.statPoints >= skill.cost;
    
    const skillCard = document.createElement('div');
    skillCard.className = `skill-card ${skill.unlocked ? 'unlocked' : 'locked'}`;
    
    let stars = '';
    for (let i = 0; i < skill.maxLevel; i++) {
      stars += `<span class="skill-star ${i < skill.currentLevel ? '' : 'empty'}">★</span>`;
    }
    
    let buttonHtml = '';
    if (!skill.unlocked) {
      if (gameState.level >= skill.levelRequired) {
        buttonHtml = `<button class="btn btn-primary" onclick="unlockSkill(${index})" ${!canUnlock ? 'disabled' : ''}>Unlock (${skill.cost} pts)</button>`;
      } else {
        buttonHtml = `<button class="btn btn-secondary" disabled>Level ${skill.levelRequired} Required</button>`;
      }
    } else if (skill.currentLevel < skill.maxLevel) {
      buttonHtml = `<button class="btn btn-primary" onclick="upgradeSkill(${index})" ${!canUpgrade ? 'disabled' : ''}>Upgrade (${skill.cost} pts)</button>`;
    } else {
      buttonHtml = `<button class="btn btn-secondary" disabled>Max Level</button>`;
    }
    
    skillCard.innerHTML = `
      <div class="skill-header">
        <div class="skill-name-display">${skill.name}</div>
        <div class="skill-level-required">Lv ${skill.levelRequired}</div>
      </div>
      <div class="skill-description">${skill.description}</div>
      <div class="skill-level">${stars}</div>
      ${buttonHtml}
    `;
    
    skillsGrid.appendChild(skillCard);
  });
}

// Unlock skill
function unlockSkill(index) {
  const skill = gameState.skills[index];
  
  if (gameState.level >= skill.levelRequired && !skill.unlocked && gameState.statPoints >= skill.cost) {
    skill.unlocked = true;
    skill.currentLevel = 1;
    gameState.statPoints -= skill.cost;
    gameState.statistics.skillsUnlocked++;
    
    renderSkills();
    renderStatus();
    checkAchievements();
    showNotification('Skill Unlocked!', `${skill.name} has been unlocked!`, 'success');
  }
}

// Upgrade skill
function upgradeSkill(index) {
  const skill = gameState.skills[index];
  
  if (skill.unlocked && skill.currentLevel < skill.maxLevel && gameState.statPoints >= skill.cost) {
    skill.currentLevel++;
    gameState.statPoints -= skill.cost;
    
    renderSkills();
    renderStatus();
    showNotification('Skill Upgraded!', `${skill.name} upgraded to level ${skill.currentLevel}`, 'success');
  }
}

// Render achievements
function renderAchievements() {
  const achievementsGrid = document.getElementById('achievementsGrid');
  achievementsGrid.innerHTML = '';
  
  gameState.achievements.forEach(achievement => {
    const achievementCard = document.createElement('div');
    achievementCard.className = `achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`;
    achievementCard.innerHTML = `
      <div class="achievement-icon ${achievement.unlocked ? '' : 'locked'}">${achievement.icon}</div>
      <div class="achievement-name">${achievement.name}</div>
      <div class="achievement-description">${achievement.description}</div>
      <div class="achievement-rarity rarity-${achievement.rarity.toLowerCase()}">${achievement.rarity}</div>
    `;
    achievementsGrid.appendChild(achievementCard);
  });
}

// Check achievements
function checkAchievements() {
  const achievements = gameState.achievements;
  
  // First Quest Complete
  if (!achievements[0].unlocked && gameState.statistics.totalTasks >= 1) {
    achievements[0].unlocked = true;
    showNotification('Achievement Unlocked!', achievements[0].name, 'success');
  }
  
  // Level 10 Reached
  if (!achievements[1].unlocked && gameState.level >= 10) {
    achievements[1].unlocked = true;
    showNotification('Achievement Unlocked!', achievements[1].name, 'success');
  }
  
  // 7-Day Streak Master
  if (!achievements[2].unlocked && gameState.statistics.currentStreak >= 7) {
    achievements[2].unlocked = true;
    showNotification('Achievement Unlocked!', achievements[2].name, 'success');
  }
  
  // 100 Tasks Completed
  if (!achievements[3].unlocked && gameState.statistics.totalTasks >= 100) {
    achievements[3].unlocked = true;
    showNotification('Achievement Unlocked!', achievements[3].name, 'success');
  }
  
  // Skill Collector
  if (!achievements[4].unlocked && gameState.statistics.skillsUnlocked >= 5) {
    achievements[4].unlocked = true;
    showNotification('Achievement Unlocked!', achievements[4].name, 'success');
  }
  
  // Productivity Warrior
  if (!achievements[5].unlocked && gameState.level >= 20) {
    achievements[5].unlocked = true;
    showNotification('Achievement Unlocked!', achievements[5].name, 'success');
  }
  
  // Shadow Monarch
  if (!achievements[6].unlocked && gameState.level >= 50) {
    achievements[6].unlocked = true;
    showNotification('Achievement Unlocked!', achievements[6].name, 'success');
  }
  
  renderAchievements();
}

// Render statistics
function renderStatistics() {
  document.getElementById('totalExp').textContent = gameState.statistics.totalExp.toLocaleString();
  document.getElementById('totalTasks').textContent = gameState.statistics.totalTasks;
  document.getElementById('currentStreak').textContent = gameState.statistics.currentStreak;
  document.getElementById('longestStreak').textContent = gameState.statistics.longestStreak;
  document.getElementById('skillsUnlocked').textContent = gameState.statistics.skillsUnlocked;
  
  const completionRate = gameState.statistics.totalTasks > 0 ? 
    ((gameState.statistics.totalTasks / (gameState.statistics.totalTasks + gameState.customTasks.filter(t => !t.completed).length)) * 100).toFixed(1) : 0;
  document.getElementById('completionRate').textContent = `${completionRate}%`;
}

// Add EXP
function addExp(amount) {
  // Apply focus bonus
  const focusBonus = (gameState.attributes.focus - 10) * 0.02;
  const bonusExp = Math.floor(amount * focusBonus);
  const totalExp = amount + bonusExp;
  
  gameState.exp += totalExp;
  gameState.statistics.totalExp += totalExp;
  
  // Check for level up
  while (gameState.exp >= gameState.expToNextLevel) {
    levelUp();
  }
  
  renderStatus();
  renderStatistics();
}

// Level up
function levelUp() {
  const oldLevel = gameState.level;
  gameState.level++;
  gameState.exp -= gameState.expToNextLevel;
  gameState.expToNextLevel = Math.round(100 * Math.pow(gameState.level, 1.5));
  gameState.statPoints += 5;
  
  // Restore HP and MP
  gameState.hp = gameState.hpMax;
  gameState.mp = gameState.mpMax;
  
  // Show level up modal
  showLevelUpModal(oldLevel, gameState.level);
  
  checkAchievements();
  renderStatus();
  renderSkills();
}

// Show level up modal
function showLevelUpModal(oldLevel, newLevel) {
  const modal = document.getElementById('levelUpModal');
  document.getElementById('oldLevel').textContent = oldLevel;
  document.getElementById('newLevel').textContent = newLevel;
  modal.classList.add('active');
}

// Close level up modal
function closeLevelUpModal() {
  const modal = document.getElementById('levelUpModal');
  modal.classList.remove('active');
}

// Show notification
function showNotification(title, message, type = 'info') {
  const container = document.getElementById('notificationContainer');
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  const icons = {
    success: '✓',
    info: 'ℹ',
    warning: '⚠'
  };
  
  notification.innerHTML = `
    <div class="notification-icon">${icons[type] || 'ℹ'}</div>
    <div class="notification-content">
      <div class="notification-title">${title}</div>
      <div class="notification-text">${message}</div>
    </div>
  `;
  
  container.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Export progress
function exportProgress() {
  const dataStr = JSON.stringify(gameState, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `productivity-system-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showNotification('Progress Exported', 'Your progress has been saved to a file', 'success');
}

// Import progress
function importProgress(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      gameState = imported;
      
      // Re-render everything
      renderStatus();
      renderDailyQuests();
      renderWeeklyQuests();
      renderCustomTasks();
      renderSkills();
      renderAchievements();
      renderStatistics();
      displayRandomQuote();
      
      showNotification('Progress Imported', 'Your progress has been restored!', 'success');
    } catch (error) {
      showNotification('Import Failed', 'Invalid save file', 'warning');
    }
  };
  reader.readAsText(file);
  
  // Reset file input
  event.target.value = '';
}

// Initialize on load
window.addEventListener('DOMContentLoaded', init);