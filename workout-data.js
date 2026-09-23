(function (root, factory) {
  const data = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
  root.WorkoutData = data;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const workoutPlan = [
    {
      id: 'warmup',
      label: '热身',
      tone: 'orange',
      description: '用弹力带唤醒肩背和下肢，再用快走把体温拉起来。',
      steps: [
        { id: 'band-circles', kind: 'movement', name: '弹力带肩部绕环', subtitle: '肩胛活动 · 小幅度、慢速度', equipment: '弹力带', reps: 15, duration: 45, pauseable: true, image: 'band-circles.webp' },
        { id: 'band-pull-apart', kind: 'movement', name: '弹力带拉开', subtitle: '胸背打开 · 保持肋骨下沉', equipment: '弹力带', reps: 15, duration: 45, pauseable: true, image: 'band-pull-apart.webp' },
        { id: 'band-face-pull', kind: 'movement', name: '弹力带面拉', subtitle: '肩后束唤醒 · 手肘向外', equipment: '弹力带', reps: 15, duration: 45, pauseable: true, image: 'band-face-pull.webp' },
        { id: 'band-squat', kind: 'movement', name: '弹力带深蹲', subtitle: '膝盖对准脚尖 · 起身呼气', equipment: '弹力带', reps: 15, duration: 60, pauseable: true, image: 'band-squat.webp' },
        { id: 'treadmill-walk', kind: 'movement', name: '跑步机快走', subtitle: '能说完整句子即可 · 不追求速度', equipment: '跑步机', duration: 600, pauseable: true, image: 'treadmill-walk.webp' },
      ],
    },
    {
      id: 'strength',
      label: '正式训练',
      tone: 'blue',
      description: '每个动作 3 组 × 12 次。选择能稳定完成、还留 2–3 次余力的重量。',
      steps: [
        { id: 'chest-press', kind: 'movement', name: '坐姿推胸', subtitle: '胸部 · 背部贴垫，推起时呼气', equipment: '固定器械', sets: 3, reps: 12, duration: 180, pauseable: true, image: 'chest-press.webp' },
        { id: 'changeover-chest-to-lat', kind: 'transition', name: '换器械 · 高位下拉', subtitle: '擦拭器械，调好座椅和重量', equipment: '换器械', duration: 60, pauseable: true, image: 'lat-pulldown.webp' },
        { id: 'lat-pulldown', kind: 'movement', name: '高位下拉', subtitle: '背部 · 把手拉向锁骨上方', equipment: '固定器械', sets: 3, reps: 12, duration: 180, pauseable: true, image: 'lat-pulldown.webp' },
        { id: 'changeover-lat-to-row', kind: 'transition', name: '换器械 · 坐姿划船', subtitle: '移动到下一台器械，保持呼吸平稳', equipment: '换器械', duration: 60, pauseable: true, image: 'seated-row.webp' },
        { id: 'seated-row', kind: 'movement', name: '坐姿划船', subtitle: '背部 · 先收肩胛，再拉手柄', equipment: '固定器械', sets: 3, reps: 12, duration: 180, pauseable: true, image: 'seated-row.webp' },
        { id: 'changeover-row-to-legpress', kind: 'transition', name: '换器械 · 腿举', subtitle: '找到空闲腿举机并调整靠背', equipment: '换器械', duration: 60, pauseable: true, image: 'leg-press.webp' },
        { id: 'leg-press', kind: 'movement', name: '坐姿腿举', subtitle: '腿部 · 膝盖不要锁死', equipment: '固定器械', sets: 3, reps: 12, duration: 180, pauseable: true, image: 'leg-press.webp' },
        { id: 'changeover-legpress-to-curl', kind: 'transition', name: '换器械 · 腿弯举', subtitle: '调整膝关节轴线，重量从轻开始', equipment: '换器械', duration: 60, pauseable: true, image: 'leg-curl.webp' },
        { id: 'leg-curl', kind: 'movement', name: '坐姿腿弯举', subtitle: '腿后侧 · 回程控制速度', equipment: '固定器械', sets: 3, reps: 12, duration: 180, pauseable: true, image: 'leg-curl.webp' },
        { id: 'changeover-curl-to-shoulder', kind: 'transition', name: '换器械 · 坐姿肩推', subtitle: '调整靠背，选择能稳定完成的重量', equipment: '换器械', duration: 60, pauseable: true, image: 'shoulder-press.webp' },
        { id: 'shoulder-press', kind: 'movement', name: '坐姿肩推', subtitle: '肩部 · 不要耸肩，动作留余力', equipment: '固定器械', sets: 3, reps: 12, duration: 180, pauseable: true, image: 'shoulder-press.webp' },
      ],
    },
    {
      id: 'cooldown',
      label: '泡沫轴放松',
      tone: 'mint',
      description: '以舒服的压力滚动，不追求疼痛；出现麻木或刺痛就停止。',
      steps: [
        { id: 'foam-calf', kind: 'movement', name: '小腿泡沫轴', subtitle: '脚踝到膝下 · 发现酸点停留呼吸', equipment: '泡沫轴', duration: 45, pauseable: true, image: 'foam-calf.webp' },
        { id: 'foam-quad', kind: 'movement', name: '大腿前侧泡沫轴', subtitle: '髋部到膝上 · 保持核心稳定', equipment: '泡沫轴', duration: 60, pauseable: true, image: 'foam-quad.webp' },
        { id: 'foam-glute', kind: 'movement', name: '臀部泡沫轴', subtitle: '左右各半 · 轻柔滚动', equipment: '泡沫轴', duration: 60, pauseable: true, image: 'foam-glute.webp' },
        { id: 'foam-back', kind: 'movement', name: '背部泡沫轴', subtitle: '胸椎区域 · 避开腰椎直接压迫', equipment: '泡沫轴', duration: 60, pauseable: true, image: 'foam-back.webp' },
        { id: 'foam-thoracic', kind: 'movement', name: '胸椎伸展', subtitle: '泡沫轴横放 · 配合深呼吸', equipment: '泡沫轴', duration: 45, pauseable: true, image: 'foam-thoracic.webp' },
      ],
    },
  ];

  function flattenSteps(plan) {
    return plan.flatMap((stage) => stage.steps.flatMap((step) => {
      const shared = { stageId: stage.id, stageLabel: stage.label, stageTone: stage.tone };
      if (stage.id !== 'strength' || step.kind !== 'movement' || !step.sets) return [{ ...step, ...shared }];

      const setDuration = Math.round(step.duration / step.sets);
      const expanded = [];
      for (let setNumber = 1; setNumber <= step.sets; setNumber += 1) {
        expanded.push({ ...step, ...shared, id: `${step.id}-set-${setNumber}`, duration: setDuration, setNumber });
        expanded.push({
          id: `${step.id}-rest-${setNumber}`,
          kind: 'rest',
          name: setNumber === step.sets ? `完成 · ${step.name}` : `组间休息 · ${step.name}`,
          subtitle: setNumber === step.sets ? '放松呼吸，准备换器械' : '喝一口水，保持呼吸平稳',
          equipment: '休息',
          duration: 70,
          pauseable: true,
          image: step.image,
          afterExercise: step.name,
          completedSet: setNumber,
          ...shared,
        });
      }
      return expanded;
    }));
  }

  function getPlanDurationSeconds(steps) {
    return steps.reduce((sum, step) => sum + step.duration, 0);
  }

  return { workoutPlan, flattenSteps, getPlanDurationSeconds };
}));
