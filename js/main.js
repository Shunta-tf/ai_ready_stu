/* =====================================================================
   AI教育推進機構 学生部 公式サイト  共通スクリプト
   - 依存なしの素の JS。全ページで読み込む。
   - 機能: ページfade-in / 固定ヘッダーのscrolled切替 / ハンバーガー開閉 /
     IntersectionObserver による .fade-in / アクティブナビ判定 / フォーム検証。
   - prefers-reduced-motion を尊重する。
   ===================================================================== */
(function () {
  "use strict";

  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- 1. ページ fade-in ---------------------------------------- */
  function pageFadeIn() {
    // requestAnimationFrame で初期描画後に loaded を付与
    requestAnimationFrame(function () {
      document.body.classList.add("loaded");
    });
  }

  /* ---- 2. 固定ヘッダーの scrolled 切替 -------------------------- */
  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var threshold = 24;
    var ticking = false;

    function update() {
      if (window.scrollY > threshold) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
  }

  /* ---- 3. ハンバーガー開閉 -------------------------------------- */
  function initNavToggle() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      // 状態に合わせてアクセシブルネームも切り替える
      toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
      document.body.classList.toggle("nav-open", open);
      // ドロワー展開中は背面コンテンツをフォーカス・支援技術から外す
      // （inert 未対応の古い環境では従来どおり＝悪化はしない）
      var main = document.querySelector("main");
      var footer = document.querySelector(".site-footer");
      if (main) main.inert = open;
      if (footer) footer.inert = open;
    }

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") !== "true";
      setOpen(open);
    });

    // メニュー内リンクで閉じる
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    // Esc で閉じる
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    // デスクトップに戻ったらリセット
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) setOpen(false);
    });
  }

  /* ---- 4. IntersectionObserver による .fade-in ------------------ */
  function initReveal() {
    var els = document.querySelectorAll(".fade-in");
    if (!els.length) return;

    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- 5. アクティブナビ判定 ------------------------------------ */
  function initActiveNav() {
    var links = document.querySelectorAll(".nav-link");
    if (!links.length) return;

    // 現在ファイル名（index.html 既定）
    var path = window.location.pathname.split("/").pop() || "index.html";

    links.forEach(function (link) {
      var href = (link.getAttribute("href") || "").split("/").pop();
      // ルート相対 "/" や "" は index 扱い
      if (href === "" || href === "/") href = "index.html";
      if (href === path) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---- 7. 問い合わせフォームのバリデーション -------------------- */
  function initContactForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;
    var status = form.querySelector("[data-form-status]");
    var fields = form.querySelectorAll("[data-validate]");
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function errorEl(field) {
      var row = field.closest(".form-row");
      return row ? row.querySelector(".form-error") : null;
    }
    function setError(field, msg) {
      field.setAttribute("aria-invalid", "true");
      var err = errorEl(field);
      if (err) err.textContent = msg;
    }
    function clearError(field) {
      field.removeAttribute("aria-invalid");
      var err = errorEl(field);
      if (err) err.textContent = "";
    }
    function validateField(field) {
      var val = (field.value || "").trim();
      if (field.hasAttribute("required") && !val) {
        setError(field, field.getAttribute("data-msg-required") || "入力してください。");
        return false;
      }
      if (field.type === "email" && val && !emailRe.test(val)) {
        setError(field, "メールアドレスの形式が正しくありません。");
        return false;
      }
      clearError(field);
      return true;
    }

    Array.prototype.forEach.call(fields, function (f) {
      f.addEventListener("blur", function () { validateField(f); });
      f.addEventListener("input", function () {
        if (f.getAttribute("aria-invalid") === "true") validateField(f);
      });
    });

    form.addEventListener("submit", function (e) {
      var ok = true;
      var firstInvalid = null;
      Array.prototype.forEach.call(fields, function (f) {
        if (!validateField(f)) { ok = false; if (!firstInvalid) firstInvalid = f; }
      });

      if (!ok) {
        e.preventDefault();
        if (status) {
          status.textContent = "未入力または形式に誤りのある項目があります。修正してください。";
          status.hidden = false;
        }
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // 送信先が未設定（プレースホルダ）の場合はネイティブ送信せず案内する
      var action = form.getAttribute("action") || "";
      if (action === "" || action === "#" || action.indexOf("{{") !== -1) {
        e.preventDefault();
        if (status) {
          status.textContent =
            "送信ありがとうございます。現在フォーム送信先を準備中のため、お手数ですが記載のメール宛にご連絡ください。";
          status.hidden = false;
          status.focus && status.focus();
        }
      }
      // 実エンドポイント設定後はそのまま action へ送信される
    });
  }

  /* ---- 起動 ----------------------------------------------------- */
  function init() {
    pageFadeIn();
    initHeaderScroll();
    initNavToggle();
    initReveal();
    initActiveNav();
    initContactForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
