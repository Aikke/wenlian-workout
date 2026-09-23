(function (root, factory) {
  const data = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
  root.WorkoutData = data;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const workoutPlan = [
    {
      id: 'warmup',
      label: '鐑韩',
      tone: 'orange',
      description: '鐢ㄥ脊鍔涘甫鍞ら啋鑲╄儗鍜屼笅鑲紝鍐嶇敤蹇蛋鎶婁綋娓╂媺璧锋潵銆?,
      steps: [
        { id: 'band-circles', kind: 'movement', name: '寮瑰姏甯﹁偐閮ㄧ粫鐜?, subtitle: '鑲╄儧娲诲姩 路 灏忓箙搴︺€佹參閫熷害', equipment: '寮瑰姏甯?, reps: 15, duration: 45, pauseable: true, image: 'band-circles.webp' },
        { id: 'band-pull-apart', kind: 'movement', name: '寮瑰姏甯︽媺寮€', subtitle: '鑳歌儗鎵撳紑 路 淇濇寔鑲嬮涓嬫矇', equipment: '寮瑰姏甯?, reps: 15, duration: 45, pauseable: true, image: 'band-pull-apart.webp' },
        { id: 'band-face-pull', kind: 'movement', name: '寮瑰姏甯﹂潰鎷?, subtitle: '鑲╁悗鏉熷敜閱?路 鎵嬭倶鍚戝', equipment: '寮瑰姏甯?, reps: 15, duration: 45, pauseable: true, image: 'band-face-pull.webp' },
        { id: 'band-squat', kind: 'movement', name: '寮瑰姏甯︽繁韫?, subtitle: '鑶濈洊瀵瑰噯鑴氬皷 路 璧疯韩鍛兼皵', equipment: '寮瑰姏甯?, reps: 15, duration: 60, pauseable: true, image: 'band-squat.webp' },
        { id: 'treadmill-walk', kind: 'movement', name: '璺戞鏈哄揩璧?, subtitle: '鑳借瀹屾暣鍙ュ瓙鍗冲彲 路 涓嶈拷姹傞€熷害', equipment: '璺戞鏈?, duration: 600, pauseable: true, image: 'treadmill-walk.webp' },
      ],
    },
    {
      id: 'strength',
      label: '姝ｅ紡璁粌',
      tone: 'blue',
      description: '姣忎釜鍔ㄤ綔 3 缁?脳 12 娆°€傞€夋嫨鑳界ǔ瀹氬畬鎴愩€佽繕鐣?2鈥? 娆′綑鍔涚殑閲嶉噺銆?,
      steps: [
        { id: 'chest-press', kind: 'movement', name: '鍧愬Э鎺ㄨ兏', subtitle: '鑳搁儴 路 鑳岄儴璐村灚锛屾帹璧锋椂鍛兼皵', equipment: '鍥哄畾鍣ㄦ', sets: 3, reps: 12, duration: 180, pauseable: true, image: 'chest-press.webp' },
        { id: 'changeover-chest-to-lat', kind: 'transition', name: '鎹㈠櫒姊?路 楂樹綅涓嬫媺', subtitle: '鎿︽嫮鍣ㄦ锛岃皟濂藉骇妞呭拰閲嶉噺', equipment: '鎹㈠櫒姊?, duration: 60, pauseable: true, image: 'lat-pulldown.webp' },
        { id: 'lat-pulldown', kind: 'movement', name: '楂樹綅涓嬫媺', subtitle: '鑳岄儴 路 鎶婃墜鎷夊悜閿侀涓婃柟', equipment: '鍥哄畾鍣ㄦ', sets: 3, reps: 12, duration: 180, pauseable: true, image: 'lat-pulldown.webp' },
        { id: 'changeover-lat-to-row', kind: 'transition', name: '鎹㈠櫒姊?路 鍧愬Э鍒掕埞', subtitle: '绉诲姩鍒颁笅涓€鍙板櫒姊帮紝淇濇寔鍛煎惛骞崇ǔ', equipment: '鎹㈠櫒姊?, duration: 60, pauseable: true, image: 'seated-row.webp' },
        { id: 'seated-row', kind: 'movement', name: '鍧愬Э鍒掕埞', subtitle: '鑳岄儴 路 鍏堟敹鑲╄儧锛屽啀鎷夋墜鏌?, equipment: '鍥哄畾鍣ㄦ', sets: 3, reps: 12, duration: 180, pauseable: true, image: 'seated-row.webp' },
        { id: 'changeover-row-to-legpress', kind: 'transition', name: '鎹㈠櫒姊?路 鑵夸妇', subtitle: '鎵惧埌绌洪棽鑵夸妇鏈哄苟璋冩暣闈犺儗', equipment: '鎹㈠櫒姊?, duration: 60, pauseable: true, image: 'leg-press.webp' },
        { id: 'leg-press', kind: 'movement', name: '鍧愬Э鑵夸妇', subtitle: '鑵块儴 路 鑶濈洊涓嶈閿佹', equipment: '鍥哄畾鍣ㄦ', sets: 3, reps: 12, duration: 180, pauseable: true, image: 'leg-press.webp' },
        { id: 'changeover-legpress-to-curl', kind: 'transition', name: '鎹㈠櫒姊?路 鑵垮集涓?, subtitle: '璋冩暣鑶濆叧鑺傝酱绾匡紝閲嶉噺浠庤交寮€濮?, equipment: '鎹㈠櫒姊?, duration: 60, pauseable: true, image: 'leg-curl.webp' },
        { id: 'leg-curl', kind: 'movement', name: '鍧愬Э鑵垮集涓?, subtitle: '鑵垮悗渚?路 鍥炵▼鎺у埗閫熷害', equipment: '鍥哄畾鍣ㄦ', sets: 3, reps: 12, duration: 180, pauseable: true, image: 'leg-curl.webp' },
        { id: 'changeover-curl-to-shoulder', kind: 'transition', name: '鎹㈠櫒姊?路 鍧愬Э鑲╂帹', subtitle: '璋冩暣闈犺儗锛岄€夋嫨鑳界ǔ瀹氬畬鎴愮殑閲嶉噺', equipment: '鎹㈠櫒姊?, duration: 60, pauseable: true, image: 'shoulder-press.webp' },
        { id: 'shoulder-press', kind: 'movement', name: '鍧愬Э鑲╂帹', subtitle: '鑲╅儴 路 涓嶈鑰歌偐锛屽姩浣滅暀浣欏姏', equipment: '鍥哄畾鍣ㄦ', sets: 3, reps: 12, duration: 180, pauseable: true, image: 'shoulder-press.webp' },
      ],
    },
    {
      id: 'cooldown',
      label: '娉℃搏杞存斁鏉?,
      tone: 'mint',
      description: '浠ヨ垝鏈嶇殑鍘嬪姏婊氬姩锛屼笉杩芥眰鐤肩棝锛涘嚭鐜伴夯鏈ㄦ垨鍒虹棝灏卞仠姝€?,
      steps: [
        { id: 'foam-calf', kind: 'movement', name: '灏忚吙娉℃搏杞?, subtitle: '鑴氳笣鍒拌啙涓?路 鍙戠幇閰哥偣鍋滅暀鍛煎惛', equipment: '娉℃搏杞?, duration: 45, pauseable: true, image: 'foam-calf.webp' },
        { id: 'foam-quad', kind: 'movement', name: '澶ц吙鍓嶄晶娉℃搏杞?, subtitle: '楂嬮儴鍒拌啙涓?路 淇濇寔鏍稿績绋冲畾', equipment: '娉℃搏杞?, duration: 60, pauseable: true, image: 'foam-quad.webp' },
        { id: 'foam-glute', kind: 'movement', name: '鑷€閮ㄦ场娌酱', subtitle: '宸﹀彸鍚勫崐 路 杞绘煍婊氬姩', equipment: '娉℃搏杞?, duration: 60, pauseable: true, image: 'foam-glute.webp' },
        { id: 'foam-back', kind: 'movement', name: '鑳岄儴娉℃搏杞?, subtitle: '鑳告鍖哄煙 路 閬垮紑鑵版鐩存帴鍘嬭揩', equipment: '娉℃搏杞?, duration: 60, pauseable: true, image: 'foam-back.webp' },
        { id: 'foam-thoracic', kind: 'movement', name: '鑳告浼稿睍', subtitle: '娉℃搏杞存í鏀?路 閰嶅悎娣卞懠鍚?, equipment: '娉℃搏杞?, duration: 45, pauseable: true, image: 'foam-thoracic.webp' },
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
          name: setNumber === step.sets ? `瀹屾垚 路 ${step.name}` : `缁勯棿浼戞伅 路 ${step.name}`,
          subtitle: setNumber === step.sets ? '鏀炬澗鍛煎惛锛屽噯澶囨崲鍣ㄦ' : '鍠濅竴鍙ｆ按锛屼繚鎸佸懠鍚稿钩绋?,
          equipment: '浼戞伅',
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

