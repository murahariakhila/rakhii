/* ===================== STATE ===================== */
var state = {
  brotherName: "Kannayyaaaa",
  senderName: "Puppyy❤️",
  msg: "Happy Rakhi, kannayya ❤️ Growing up with you was a mix of fights, laughter, complaints, and countless memories. You annoy me like no one else, but life wouldn’t be the same without you. Stay crazy, stay happy, and keep troubling me forever",
  reasons: [
    "Dear brother, on this Rakhi I promise I will always support you… especially when I need a favor, a gift, or some money 😌💸 Happy Rakhi!.",
    "Happy Rakhi to my brother who thinks he is the boss of the house… but we both know who actually runs the show 😌👑",
    "Happy Raksha Bandhan to my brother! May your wallet always be full because I have many shopping plans waiting for you 💸🤣"
  ],
      photos: [
    {src: "assets/images/1.jpeg", cap: ""},
    {src: "assets/images/2.jpeg", cap: ""},
    {src: "assets/images/3.jpeg", cap: ""},
    {src: "assets/images/4.jpeg", cap: ""},
    {src: "assets/images/5.jpeg", cap: ""},
    {src: "assets/images/6.jpeg", cap: ""}
  ],
  closing: "Happy Rakhi! I was going to give you a big gift, but then I remembered you already have the greatest gift: a sister like me. You’re welcome 😌✨.",
  signoff: "\u2014 eat laddu , Be happy \ud83d\udc9c",
  theme: "royal"
};

var themes = {
  royal:   {purple:"#6B3FA0", purpleDeep:"#3D1660", purpleMid:"#8B5FBF", gold:"#E8B34E", goldDeep:"#C9922E", lavender:"#F3EAFB", pink:"#D46FB0"},
  blush:   {purple:"#A0508F", purpleDeep:"#5C1F52", purpleMid:"#C07AB0", gold:"#F2C14E", goldDeep:"#D99B2B", lavender:"#FBEAF3", pink:"#E9789F"},
  midnight:{purple:"#4B3F91", purpleDeep:"#241455", purpleMid:"#6E5FC2", gold:"#D8B457", goldDeep:"#B4903B", lavender:"#E9E6FA", pink:"#8E6FD1"}
};

/* ===================== PAGE NAVIGATION ===================== */
var pages = Array.prototype.slice.call(document.querySelectorAll('.page'));
var currentPage = 0;

function renderDots(){
  var nav = document.getElementById('dotNav');
  nav.innerHTML = '';
  pages.forEach(function(p, i){
    var d = document.createElement('div');
    d.className = 'dot' + (i === currentPage ? ' current' : (i < currentPage ? ' done' : ''));
    nav.appendChild(d);
  });
}

function goToPage(index){
  if(index < 0 || index >= pages.length) return;
  pages[currentPage].classList.remove('active');
  currentPage = index;
  pages[currentPage].classList.add('active');
  renderDots();
  window.scrollTo(0,0);
}

/* ===================== THEME ===================== */
function applyTheme(name){
  var t = themes[name] || themes.royal;
  var root = document.documentElement.style;
  root.setProperty('--purple', t.purple);
  root.setProperty('--purple-deep', t.purpleDeep);
  root.setProperty('--purple-mid', t.purpleMid);
  root.setProperty('--gold', t.gold);
  root.setProperty('--gold-deep', t.goldDeep);
  root.setProperty('--lavender', t.lavender);
  root.setProperty('--pink', t.pink);
}

function renderThemeSwatches(){
  var row = document.getElementById('themeRow');
  row.innerHTML = '';
  Object.keys(themes).forEach(function(name){
    var sw = document.createElement('div');
    sw.className = 'swatch' + (state.theme === name ? ' active' : '');
    sw.style.background = themes[name].purple;
    sw.title = name;
    sw.onclick = function(){ state.theme = name; renderThemeSwatches(); applyTheme(name); };
    row.appendChild(sw);
  });
}

/* ===================== EFFECTS ===================== */
function launchConfetti(){
  var colors = ['#E8B34E','#6B3FA0','#D46FB0','#C9922E'];
  for(var i=0;i<40;i++){
    (function(){
      var p = document.createElement('div');
      p.className = 'confetti-piece';
      p.style.left = Math.random()*100 + 'vw';
      p.style.background = colors[Math.floor(Math.random()*colors.length)];
      p.style.transform = 'rotate('+(Math.random()*360)+'deg)';
      document.body.appendChild(p);
      var duration = 2000 + Math.random()*1500;
      var start = null;
      function step(ts){
        if(!start) start = ts;
        var elapsed = ts - start;
        var progress = elapsed / duration;
        p.style.top = (progress*110) + 'vh';
        p.style.opacity = 1 - progress;
        if(progress < 1) requestAnimationFrame(step);
        else p.remove();
      }
      requestAnimationFrame(step);
    })();
  }
}

function launchPetals(){
  var petals = ['\ud83c\udf38','\ud83c\udf3c','\ud83c\udf3a'];
  for(var i=0;i<18;i++){
    (function(){
      var p = document.createElement('div');
      p.className = 'petal';
      p.textContent = petals[Math.floor(Math.random()*petals.length)];
      p.style.left = (30 + Math.random()*40) + 'vw';
      document.body.appendChild(p);
      var duration = 1600 + Math.random()*1000;
      var start = null;
      function step(ts){
        if(!start) start = ts;
        var elapsed = ts - start;
        var progress = elapsed / duration;
        p.style.top = (progress*90) + 'vh';
        p.style.opacity = 1 - progress;
        p.style.transform = 'rotate('+(progress*220)+'deg)';
        if(progress < 1) requestAnimationFrame(step);
        else p.remove();
      }
      requestAnimationFrame(step);
    })();
  }
}

function playBell(){
  try{
    var ctx = new (window.AudioContext || window.webkitAudioContext)();
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.6);
  }catch(e){}
}

/* ===================== PAGE 1: THREAD PULL ===================== */
(function(){
  var handle = document.getElementById('threadHandle');
  var line = document.getElementById('threadLine');
  var spin = document.getElementById('rakhiSpin');
  var zone = document.getElementById('threadZone');
  var label = document.getElementById('pullLabel');
  var dragging = false, startX = 0, maxDrag = 0, threshold = 120, done = false;

  function trackWidth(){ return document.querySelector('.thread-track').offsetWidth - 60; }

  function onDown(e){
    if(done) return;
    dragging = true;
    startX = (e.touches ? e.touches[0].clientX : e.clientX);
    handle.style.cursor = 'grabbing';
  }
    function onMove(e){
    if(!dragging || done) return;
    var x = (e.touches ? e.touches[0].clientX : e.clientX);
    var delta = Math.max(0, startX - x);
    maxDrag = trackWidth();
    var pull = Math.min(delta, maxDrag);
    handle.style.transform = 'translate(-'+pull+'px,-50%)';
    line.style.transform = 'translateY(-50%) scaleX(' + (1 - pull/maxDrag*0.4) + ')';
    spin.style.transform = 'translate(-50%,-50%) rotate('+(pull*3)+'deg)';
    if(pull >= threshold && !done){
      completePull();
    }
  }

  function completePull(){
    done = true;
    zone.classList.add('completing');
    label.textContent = "Tying the thread...";
    maxDrag = trackWidth();
    handle.style.transition = 'transform .45s ease';
    line.style.transition = 'transform .45s ease';
    handle.style.transform = 'translate(-'+maxDrag+'px,-50%)';
    line.style.transform = 'translateY(-50%) scaleX(0.2)';
    spin.style.transform = 'translate(-50%,-50%) rotate(360deg) scale(1.3)';
    launchPetals();
    setTimeout(function(){ goToPage(1); }, 700);
  }
  function onUp(){
    dragging = false;
    if(!done){
      handle.style.transform = 'translate(0,-50%)';
      line.style.transform = 'translateY(-50%) scaleX(1)';
    }
    handle.style.cursor = 'grab';
  }

  handle.addEventListener('mousedown', onDown);
  handle.addEventListener('touchstart', onDown, {passive:true});
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, {passive:true});
  window.addEventListener('mouseup', onUp);
  window.addEventListener('touchend', onUp);

  // tap fallback for accessibility
    handle.addEventListener('click', function(){
    if(done) return;
    completePull();
  });
})();

/* ===================== PAGE 2: ENVELOPE ===================== */
/* ===================== PAGE 2: ENVELOPE ===================== */
document.getElementById('openLetterBtn').addEventListener('click', function(){
  var closed = document.getElementById('envelopeClosed');
  var letter = document.getElementById('letterFull');
  var openBtn = this;
  var nextBtn = document.getElementById('nextNoteBtn');

  closed.classList.add('flap-open');
  openBtn.classList.add('hidden');

  setTimeout(function(){
    closed.classList.add('hidden');
    letter.classList.add('show');
    nextBtn.classList.remove('hidden');
  }, 550);
});

document.getElementById('nextNoteBtn').addEventListener('click', function(){
  goToPage(2);
});

/* ===================== PAGE 3: PHOTO ALBUM ===================== */
/* ===================== PAGE 3: PHOTO ALBUM ===================== */
var albumPlacedCount = 0;

function renderAlbumPage(){
  var slotsWrap = document.getElementById('albumSlots');
  var trayWrap = document.getElementById('photoTray');
  slotsWrap.innerHTML = '';
  trayWrap.innerHTML = '';
  albumPlacedCount = 0;

  var count = 3;
  for(var s=0; s<count; s++){
    var slot = document.createElement('div');
    slot.className = 'album-slot';
    slot.dataset.index = s;
    slotsWrap.appendChild(slot);
  }

  for(var i=0; i<count; i++){
    var p = state.photos[i] || {src:'', cap:''};
    var chip = document.createElement('div');
    chip.className = 'photo-chip';
    chip.dataset.index = i;
    if(p.src){
      chip.innerHTML = '<img src="'+p.src+'" alt="memory" draggable="false">';
    } else {
      chip.innerHTML = '<div class="ph-placeholder">\ud83d\uddbc\ufe0f</div>';
    }
    trayWrap.appendChild(chip);
  }

  wireAlbumInteractions();
}

function wireAlbumInteractions(){
  var chips = document.querySelectorAll('.photo-chip');

  chips.forEach(function(chip){
    var dragging = false, moved = false, startX = 0, startY = 0;
    var origParent, origNext;

    function getPoint(e){ return e.touches ? e.touches[0] : e; }

    function onDown(e){
      if(chip.classList.contains('placed')) return;
      dragging = true;
      moved = false;
      var pt = getPoint(e);
      startX = pt.clientX;
      startY = pt.clientY;
      origParent = chip.parentNode;
      origNext = chip.nextSibling;
    }

    function onMove(e){
      if(!dragging) return;
      var pt = getPoint(e);
      var dx = pt.clientX - startX;
      var dy = pt.clientY - startY;
      if(!moved && (Math.abs(dx) > 6 || Math.abs(dy) > 6)){
        moved = true;
        var rect = chip.getBoundingClientRect();
        chip.style.width = rect.width + 'px';
        chip.style.height = rect.height + 'px';
        document.body.appendChild(chip);
        chip.style.position = 'fixed';
        chip.style.zIndex = 999;
        chip.style.left = rect.left + 'px';
        chip.style.top = rect.top + 'px';
        chip.style.transition = 'none';
        chip.classList.add('dragging-chip');
      }
      if(moved){
        chip.style.left = (pt.clientX - startX + parseFloat(chip.dataset.origLeft || chip.getBoundingClientRect().left)) + 'px';
        var rect0 = chip.getBoundingClientRect();
        chip.style.left = (rect0.left + dx) + 'px';
        chip.style.top = (rect0.top + dy) + 'px';
        startX = pt.clientX;
        startY = pt.clientY;
        highlightSlotUnder(pt.clientX, pt.clientY);
      }
    }

    function onUp(e){
      if(!dragging) return;
      dragging = false;
      document.querySelectorAll('.album-slot').forEach(function(s){ s.classList.remove('dragover'); });

      if(!moved){
        return; // simple tap, not a drag — no action
      }

      var pt = e.changedTouches ? e.changedTouches[0] : e;
      var target = findSlotUnder(pt.clientX, pt.clientY);

      chip.style.position = '';
      chip.style.zIndex = '';
      chip.style.left = '';
      chip.style.top = '';
      chip.style.width = '';
      chip.style.height = '';
      chip.style.transition = '';
      chip.classList.remove('dragging-chip');

      if(origNext){ origParent.insertBefore(chip, origNext); }
      else { origParent.appendChild(chip); }

      if(target){
        placePhotoInSlot(chip.dataset.index, target);
      }
    }

    chip.addEventListener('mousedown', onDown);
    chip.addEventListener('touchstart', onDown, {passive:true});
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, {passive:true});
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
  });
}

function findSlotUnder(x, y){
  var slots = document.querySelectorAll('.album-slot:not(.filled)');
  for(var i=0; i<slots.length; i++){
    var r = slots[i].getBoundingClientRect();
    if(x >= r.left && x <= r.right && y >= r.top && y <= r.bottom){
      return slots[i];
    }
  }
  return null;
}

function highlightSlotUnder(x, y){
  document.querySelectorAll('.album-slot').forEach(function(s){ s.classList.remove('dragover'); });
  var slot = findSlotUnder(x, y);
  if(slot) slot.classList.add('dragover');
}

function placePhotoInSlot(chipIndex, slot){
  if(slot.classList.contains('filled')) return;
  var chip = document.querySelector('.photo-chip[data-index="'+chipIndex+'"]');
  if(!chip || chip.classList.contains('placed')) return;
  var p = state.photos[chipIndex] || {};
  slot.innerHTML = p.src ? '<img src="'+p.src+'" alt="memory">' : '<div class="ph-placeholder">\ud83d\uddbc\ufe0f</div>';
  slot.classList.add('filled');
  chip.classList.add('placed');
  albumPlacedCount++;
  if(albumPlacedCount >= 3){
    var instr = document.getElementById('albumInstructions');
    instr.textContent = "\u2764\ufe0f You've unlocked our memories";
    instr.classList.add('album-unlocked');
    setTimeout(function(){ goToPage(3); }, 1300);
  }
}

/* ===================== PAGE 4: FLIP CARDS + GIFT ===================== */
var flippedCount = 0;
var randomPhotos = [
  'assets/images/4.jpeg',
  'assets/images/5.jpeg',
  'assets/images/6.jpeg'
];

function renderFlipCards(){

  var grid = document.getElementById('flipGrid');

  grid.innerHTML = '';

  flippedCount = 0;

  document.getElementById('giftReveal').classList.remove('show');
  document.getElementById('reasonsInstructions').style.display = 'block';

  /*
   * ==========================================
   * CREATE THE CARD CONTENT
   * ==========================================
   */

    var cards = [];

  /* 1. Pick one random photo to be the hidden heart's surprise photo */
  var heartPhotoIndex = -1;
  if(state.photos.length > 0){
    heartPhotoIndex = Math.floor(Math.random() * state.photos.length);
  }
  var heartPhoto = heartPhotoIndex >= 0 ? state.photos[heartPhotoIndex] : null;

  /* 2. Add the remaining uploaded photos as regular cards */
  state.photos.forEach(function(photo, i){

    if(photo.src && i !== heartPhotoIndex){

      cards.push({
        type:'photo',
        src:photo.src,
        caption:photo.cap || 'A little memory 💜'
      });

    }

  });


  /* 2. Add some personal notes */
  state.reasons.forEach(function(reason){

    cards.push({
      type:'note',
      text:reason
    });

  });


  /* 3. Add "not this one" cards */
  cards.push({
    type:'nope'
  });

  cards.push({
    type:'nope'
  });

  cards.push({
    type:'nope'
  });


  /* 4. Add the actual hidden heart */
  cards.push({
    type:'heart'
  });


  /*
   * ==========================================
   * SHUFFLE THE CARDS
   * ==========================================
   */

  cards.sort(function(){

    return Math.random() - 0.5;

  });


  /*
   * ==========================================
   * SCATTER POSITIONS
   * ==========================================
   */

    var positions = [];
  var cols = 4;
  var rows = Math.ceil(cards.length / cols);
  var cellW = 100 / cols;
  var cellH = 100 / rows;
  for(var p = 0; p < cards.length; p++){
    var col = p % cols;
    var row = Math.floor(p / cols);
    positions.push({
      x: col * cellW + (Math.random() * (cellW * 0.3)),
      y: row * cellH + (Math.random() * (cellH * 0.3)),
      r: (Math.random() * 16) - 8
    });
  }


  /*
   * ==========================================
   * CREATE EACH CARD
   * ==========================================
   */

  cards.forEach(function(item, i){

    var card = document.createElement('div');

    card.className = 'flip-card';

    var pos = positions[i % positions.length];

    card.style.left = pos.x + '%';
    card.style.top = pos.y + '%';
    card.style.transform = 'rotate(' + pos.r + 'deg)';

    /*
     * FRONT
     */

    var front = '<div class="flip-front"></div>';

    var back = '';


    /*
     * PHOTO CARD
     */

    if(item.type === 'photo'){

      back =
        '<div class="flip-back photo-back">' +

          '<img src="' + item.src + '" alt="memory">' +

          '<div class="flip-photo-caption">' +
            item.caption +
          '</div>' +

        '</div>';

    }


    /*
     * NOTE CARD
     */

    else if(item.type === 'note'){

      back =
        '<div class="flip-back note-back">' +
          item.text +
        '</div>';

    }


    /*
     * NOT THIS ONE
     */

    else if(item.type === 'nope'){

      back =
        '<div class="flip-back nope-back">' +
          '<div>Not this one 😜</div>' +
        '</div>';

    }


    /*
     * HIDDEN HEART
     */

    else if(item.type === 'heart'){

  if(heartPhoto && heartPhoto.src){

    back =
      '<div class="flip-back heart-back photo-back">' +
        '<img src="' + heartPhoto.src + '" alt="special memory">' +
        '<div class="flip-photo-caption">💜 You found it!</div>' +
      '</div>';

  } else {

    back =
      '<div class="flip-back heart-back">' +
        '<div style="font-size:48px;">💜</div>' +
        '<div style="margin-top:8px;">You found it!</div>' +
      '</div>';

  }

}


    card.innerHTML =
      '<div class="flip-inner">' +
        front +
        back +
      '</div>';


    /*
     * ==========================================
     * CLICK / FLIP
     * ==========================================
     */

    card.addEventListener('click', function(){

      if(this.classList.contains('flipped')) return;

      this.classList.add('flipped');

      flippedCount++;


      /*
       * Small pop effect after flipping
       */

      this.style.transform =
        'rotate(' + pos.r + 'deg) scale(1.06)';


      setTimeout(function(){

        card.style.transform =
          'rotate(' + pos.r + 'deg) scale(1)';

      },250);


      /*
       * ALL CARDS FLIPPED
       */

      if(flippedCount >= cards.length){

        document.getElementById(
          'reasonsInstructions'
        ).textContent =
          '💜 You found all the memories!';

        setTimeout(function(){

          document.getElementById(
            'reasonsInstructions'
          ).style.display = 'none';

          document.getElementById(
            'giftReveal'
          ).classList.add('show');

        },700);

      }

    });


    grid.appendChild(card);

  });

}

document.getElementById('giftBoxReasons').addEventListener('click', function(){
  var self = this;
  self.classList.add('shake');
  setTimeout(function(){
    self.classList.add('opened');
    launchConfetti();
    setTimeout(function(){ goToPage(4); }, 700);
  }, 500);
});

/* ===================== PAGE 5: RAKHI DRAG-TO-WRIST ===================== */
(function(){
  var drag = document.getElementById('rakhiDrag');
  var dropZone = document.getElementById('wristDrop');
  var tied = document.getElementById('rakhiTied');
  var success = document.getElementById('tieSuccess');
  var continueBtn = document.getElementById('continueAfterTie');
  var dragging = false, offsetX = 0, offsetY = 0, isTied = false;

  function getPoint(e){ return e.touches ? e.touches[0] : e; }

  function onDown(e){
    if(isTied) return;
    dragging = true;
    var pt = getPoint(e);
    var rect = drag.getBoundingClientRect();
    offsetX = pt.clientX - rect.left;
    offsetY = pt.clientY - rect.top;
    drag.style.position = 'fixed';
    drag.style.zIndex = 999;
  }
  function onMove(e){
    if(!dragging || isTied) return;
    var pt = getPoint(e);
    drag.style.left = (pt.clientX - offsetX) + 'px';
    drag.style.top = (pt.clientY - offsetY) + 'px';
    drag.style.transform = 'none';
  }
  function onUp(e){
    if(!dragging || isTied) return;
    dragging = false;
    var dragRect = drag.getBoundingClientRect();
    var dropRect = dropZone.getBoundingClientRect();
    var overlap = !(dragRect.right < dropRect.left || dragRect.left > dropRect.right ||
                     dragRect.bottom < dropRect.top || dragRect.top > dropRect.bottom);
    if(overlap){
      completeTying();
    } else {
      drag.style.position = 'absolute';
      drag.style.left = '50%'; drag.style.top = '0';
      drag.style.transform = 'translate(-50%,0)';
    }
  }

    function completeTying(){
    isTied = true;
    drag.classList.add('hidden');
    dropZone.classList.add('tied');
    launchPetals();
    playBell();
    success.classList.add('show');
    continueBtn.classList.remove('hidden');
  }

  drag.addEventListener('mousedown', onDown);
  drag.addEventListener('touchstart', onDown, {passive:true});
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, {passive:false});
  window.addEventListener('mouseup', onUp);
  window.addEventListener('touchend', onUp);

  // tap fallback
  drag.addEventListener('click', function(){
    if(isTied || dragging) return;
    completeTying();
  });

  continueBtn.addEventListener('click', function(){ goToPage(5); });
})();

/* ===================== PAGE 6: FINAL GIFT ===================== */
document.getElementById('giftBoxFinal').addEventListener('click', function(){
  var self = this;
  if(self.classList.contains('opened')) return;
  self.classList.add('shake');
  setTimeout(function(){
    self.classList.add('opened');
    document.getElementById('ladduPop').classList.add('show');
    launchConfetti();
    document.getElementById('tapHint').style.display = 'none';
    document.getElementById('closingMessageWrap').classList.remove('hidden');
  }, 500);
});

document.getElementById('copyWishBtn').addEventListener('click', function(){
  var text = document.getElementById('closingText').textContent;
  if(navigator.clipboard){ navigator.clipboard.writeText(text); }
  alert('Copied the wish! Paste it wherever you like.');
});

document.getElementById('restartBtn').addEventListener('click', function(){
  location.reload();
});

function renderPreview(){
  document.getElementById('brotherNameHero').textContent = state.brotherName || 'Brother';
  document.getElementById('senderNameHero').textContent = state.senderName || 'Sister';
  document.getElementById('msgText').textContent = state.msg;
  document.getElementById('closingText').textContent = state.closing;
  document.getElementById('signOff').textContent = state.signoff;
  renderFlipCards();
  renderAlbumPage();
}

/* ===================== INIT ===================== */
renderDots();
renderPreview();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(function(){});
}
