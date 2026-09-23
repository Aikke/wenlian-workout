(function () {
  'use strict';

  const { workoutPlan, flattenSteps, getPlanDurationSeconds } = window.WorkoutData;
  const steps = flattenSteps(workoutPlan);
  const totalPlanSeconds = getPlanDurationSeconds(steps);
  const circumference = 2 * Math.PI * 53;

  const elements = {
    startView: document.querySelector('#start-view'),
    workoutView: document.querySelector('#workout-view'),
    completeView: document.querySelector('#complete-view'),
    startButton: document.querySelector('#start-button'),
    exitButton: document.querySelector('#exit-button'),
    restartButton: document.querySelector('#restart-button'),
    installButton: document.querySelector('#install-button'),
    playButton: document.querySelector('#play-button'),
    playLabel: document.querySelector('#play-label'),
    playIcon: document.querySelector('#play-icon'),
    previousButton: document.querySelector('#previous-button'),
    nextButton: document.querySelector('#next-button'),
    skipButton: document.querySelector('#skip-button'),
    planMinutes: document.querySelector('#plan-minutes'),
    routeCards: document.querySelector('#route-cards'),
    progressLabel: document.querySelector('#progress-label'),
    remainingLabel: document.querySelector('#remaining-label'),
    progressBar: document.querySelector('#progress-bar'),
    progressTrack: document.querySelector('.progress-track'),
    stageDot: document.querySelector('#stage-dot'),
    stageLabel: document.querySelector('#stage-label'),
    equipmentLabel: document.querySelector('#equipment-label'),
    exerciseName: document.querySelector('#exercise-name'),
    exerciseSubtitle: document.querySelector('#exercise-subtitle'),
    exerciseImageButton: document.querySelector('#exercise-image-button'),
    exerciseImage: document.querySelector('#exercise-image'),
    imageDialog: document.querySelector('#image-dialog'),
    imageDialogImage: document.querySelector('#image-dialog-image'),
    imageDialogTitle: document.querySelector('#image-dialog-title'),
    imageDialogClose: document.querySelector('#image-dialog-close'),
    setMetric: document.querySelector('#set-metric'),
    setLabel: document.querySelector('#set-label'),
    repMetric: document.querySelector('#rep-metric'),
    repLabel: document.querySelector('#rep-label'),
    timerDisplay: document.querySelector('#timer-display'),
    timerStatus: document.querySelector('#timer-status'),
    timerProgress: document.querySelector('#timer-progress'),
    stageDescription: document.querySelector('#stage-description'),
    nextLabel: document.querySelector('#next-label'),
    elapsedTime: document.querySelector('#elapsed-time'),
    summaryTime: document.querySelector('#summary-time'),
    summarySteps: document.querySelector('#summary-steps'),
  };

  const state = {
    index: 0,
    remaining: steps[0].duration,
    running: false,
    elapsed: 0,
    completed: new Set(),
    timerId: null,
    audioContext: null,
    installPrompt: null,
  };

  function formatTime(seconds) {
    const safeSeconds = Math.max(0, Math.round(seconds));
    const minutes = Math.floor(safeSeconds / 60);
    const rest = safeSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
  }

  function getStage(stageId) {
    return workoutPlan.find((stage) => stage.id === stageId);
  }

  function getRemainingPlanSeconds() {
    const future = steps.slice(state.index + 1).reduce((sum, step) => sum + step.duration, 0);
    return state.remaining + future;
  }

  function renderRoute() {
    elements.routeCards.innerHTML = workoutPlan.map((stage, index) => {
      const minutes = Math.round(steps.filter((step) => step.stageId === stage.id).reduce((sum, step) => sum + step.duration, 0) / 60);
      const detail = stage.id === 'strength' ? '6 个器械动作 · 每个 3 × 12' : `${stage.steps.length} 个步骤`;
      return `<article class="route-card" data-index="0${index + 1}" data-tone="${stage.tone}">
        <div class="route-top"><span>${detail}</span><span>${minutes} MIN</span></div>
        <h3>${stage.label}</h3>
        <p>${stage.description}</p>
      </article>`;
    }).join('');
  }

  function showView(view) {
    elements.startView.hidden = view !== 'start';
    elements.workoutView.hidden = view !== 'workout';
    elements.completeView.hidden = view !== 'complete';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function colorForTone(tone) {
    return tone === 'blue' ? '#64a8ff' : tone === 'mint' ? '#67d7b0' : '#ff6a2a';
  }

  function render() {
    const step = steps[state.index];
    const stage = getStage(step.stageId);
    const progress = ((state.index + (1 - state.remaining / step.duration)) / steps.length) * 100;
    const strokeOffset = circumference * (1 - state.remaining / step.duration);
    const accent = colorForTone(step.stageTone);

    elements.progressLabel.textContent = `第 ${state.index + 1} / ${steps.length} 项`;
    elements.remainingLabel.textContent = `剩余约 ${Math.ceil(getRemainingPlanSeconds() / 60)} 分钟`;
    elements.progressBar.style.width = `${Math.max(0, Math.min(100, progress))}%`;
    elements.progressTrack.setAttribute('aria-valuenow', String(Math.round(progress)));
    elements.progressBar.style.background = accent;
    elements.stageDot.style.background = accent;
    elements.stageLabel.textContent = step.stageLabel;
    elements.equipmentLabel.textContent = step.equipment;
    elements.exerciseName.textContent = step.name;
    elements.exerciseSubtitle.textContent = step.subtitle;
    elements.exerciseImage.src = step.image;
    elements.exerciseImage.alt = `${step.name}动作或器械示意图`;
    elements.exerciseImageButton.setAttribute('aria-label', `放大查看${step.name}示意图`);
    elements.timerDisplay.textContent = formatTime(state.remaining);
    elements.timerProgress.style.strokeDasharray = String(circumference);
    elements.timerProgress.style.strokeDashoffset = String(strokeOffset);
    elements.timerProgress.style.stroke = accent;
    elements.timerStatus.textContent = state.running ? (step.kind === 'rest' ? '放松呼吸' : step.kind === 'transition' ? '从容换器械' : '保持稳定节奏') : '已暂停 · 时间不会流走';
    elements.stageDescription.textContent = stage.description;
    elements.nextLabel.textContent = steps[state.index + 1]?.name || '训练完成';
    elements.elapsedTime.textContent = formatTime(state.elapsed);
    elements.previousButton.disabled = state.index === 0;

    if (step.sets) {
      elements.setMetric.hidden = false;
      elements.setLabel.textContent = `${step.setNumber} / ${step.sets}`;
    } else if (step.kind === 'rest' && step.completedSet) {
      elements.setMetric.hidden = false;
      elements.setLabel.textContent = `${step.completedSet} / 3`;
    } else {
      elements.setMetric.hidden = true;
    }
    if (step.reps) {
      elements.repMetric.hidden = false;
      elements.repLabel.textContent = `${step.reps} 次`;
    } else {
      elements.repMetric.hidden = true;
    }

    elements.playLabel.textContent = state.running ? '暂停' : state.remaining === step.duration ? '开始' : '继续';
    elements.playIcon.innerHTML = state.running ? '<path d="M7 5h4v14H7zm6 0h4v14h-4z"/>' : '<path d="M8 5v14l11-7z"/>';
    elements.skipButton.textContent = step.kind === 'movement' && step.stageId === 'strength' ? '当前器械被占用，先跳过' : '跳过当前项目';
  }

  function cue(frequency, duration) {
    try {
      state.audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = state.audioContext.createOscillator();
      const gain = state.audioContext.createGain();
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.05, state.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, state.audioContext.currentTime + duration);
      oscillator.connect(gain).connect(state.audioContext.destination);
      oscillator.start();
      oscillator.stop(state.audioContext.currentTime + duration);
    } catch (_) { /* Audio cues are optional. */ }
  }

  function pulse() {
    if ('vibrate' in navigator) navigator.vibrate(80);
    cue(640, 0.1);
  }

  function clearTimer() {
    if (state.timerId) window.clearInterval(state.timerId);
    state.timerId = null;
  }

  function startTimer() {
    if (state.running) return;
    state.running = true;
    render();
    clearTimer();
    state.timerId = window.setInterval(() => {
      state.remaining -= 1;
      state.elapsed += 1;
      if (state.remaining <= 3 && state.remaining > 0) pulse();
      if (state.remaining <= 0) {
        pulse();
        advance(1, true);
      } else {
        render();
      }
    }, 1000);
  }

  function pauseTimer() {
    state.running = false;
    clearTimer();
    render();
  }

  function toggleTimer() {
    state.running ? pauseTimer() : startTimer();
  }

  function advance(direction, automatic = false) {
    const wasRunning = state.running;
    clearTimer();
    state.running = false;

    if (direction > 0) state.completed.add(state.index);
    const nextIndex = state.index + direction;
    if (nextIndex >= steps.length) {
      completeWorkout();
      return;
    }
    state.index = Math.max(0, nextIndex);
    state.remaining = steps[state.index].duration;
    render();
    if (automatic || wasRunning) startTimer();
  }

  function resetWorkout() {
    clearTimer();
    state.index = 0;
    state.remaining = steps[0].duration;
    state.running = false;
    state.elapsed = 0;
    state.completed.clear();
    render();
  }

  function beginWorkout() {
    resetWorkout();
    showView('workout');
    render();
  }

  function exitWorkout() {
    pauseTimer();
    showView('start');
  }

  function completeWorkout() {
    clearTimer();
    state.running = false;
    elements.summaryTime.textContent = formatTime(state.elapsed);
    elements.summarySteps.textContent = String(state.completed.size);
    showView('complete');
    pulse();
  }

  function openExerciseImage() {
    const step = steps[state.index];
    elements.imageDialogImage.src = step.image;
    elements.imageDialogImage.alt = `${step.name}动作或器械示意图`;
    elements.imageDialogTitle.textContent = step.name;
    elements.imageDialog.showModal();
  }

  async function installApp() {
    if (!state.installPrompt) return;
    state.installPrompt.prompt();
    await state.installPrompt.userChoice;
    state.installPrompt = null;
    elements.installButton.hidden = true;
  }

  elements.planMinutes.textContent = String(Math.round(totalPlanSeconds / 60));
  renderRoute();
  render();
  elements.startButton.addEventListener('click', beginWorkout);
  elements.exitButton.addEventListener('click', exitWorkout);
  elements.restartButton.addEventListener('click', beginWorkout);
  elements.playButton.addEventListener('click', toggleTimer);
  elements.previousButton.addEventListener('click', () => advance(-1));
  elements.nextButton.addEventListener('click', () => advance(1));
  elements.skipButton.addEventListener('click', () => advance(1));
  elements.exerciseImageButton.addEventListener('click', openExerciseImage);
  elements.imageDialogClose.addEventListener('click', () => elements.imageDialog.close());
  elements.imageDialog.addEventListener('click', (event) => {
    if (event.target === elements.imageDialog) elements.imageDialog.close();
  });
  elements.installButton.addEventListener('click', installApp);
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    state.installPrompt = event;
    elements.installButton.hidden = false;
  });
  window.addEventListener('appinstalled', () => {
    elements.installButton.hidden = true;
    state.installPrompt = null;
  });
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(() => {}));
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.running) pauseTimer();
  });
}());
