"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1494132542037557349/-1AT9edIZgUP2-bGgLHOl-0qEK0CQVTHtoVgenhHPLLVgcr7dmXnH8OTNSZ4aBMQt0bO";

const gemPackages = [
  { gems: 100, bonus: null, price: 0.99, label: "$0.99", popular: false },
  { gems: 500, bonus: null, price: 4.99, label: "$4.99", popular: false },
  { gems: 950, bonus: "+5% Bonus", price: 8.99, label: "$8.99", popular: true },
  { gems: 2250, bonus: "+12% Bonus", price: 19.99, label: "$19.99", popular: false },
  { gems: 4800, bonus: "+20% Bonus", price: 39.99, label: "$39.99", popular: false },
  { gems: 10800, bonus: "+35% Bonus", price: 79.99, label: "$79.99", popular: false },
];

const paymentMethods = [
  {
    key: "fib",
    number: "0750 117 3143",
    holder: "KonKan Payments",
    color: "from-sky-500/20 to-cyan-400/10",
    border: "border-sky-400/30",
  },
  {
    key: "fastpay",
    number: "0750 117 3143",
    holder: "KonKan Payments",
    color: "from-emerald-500/20 to-green-400/10",
    border: "border-emerald-400/30",
  },
];

const content = {
  en: {
    badge: "KonKan Official Gems Store",
    heroTitle1: "Buy",
    heroTitle2: "KonKan Gems",
    heroText:
      "A clean and simple store page for players who want to buy Gems outside the in-app purchase flow. Choose your package, complete the payment, upload the screenshot, and send your order directly to the KonKan team.",
    stats: [
      ["Delivery", "Manual"],
      ["Support", "Fast"],
      ["Methods", "FIB / FastPay"],
      ["Status", "Online"],
    ],
    packagesTitle: "Gems Packages",
    packagesSubtitle: "Choose the package that fits your order.",
    androidSupport: "Android purchase support",
    noBonus: "No bonus",
    mostPopular: "Most Popular",
    selected: "Selected",
    select: "Select",
    paymentTitle: "Payment Methods",
    paymentSubtitle: "Choose your preferred method and send the exact amount.",
    fib: "FIB",
    fastpay: "FastPay",
    paymentNumber: "Number",
    paymentName: "Name",
    copyNumber: "Copy Number",
    paymentNote1: "Send the exact amount and keep your receipt.",
    paymentNote2: "Use the same account information shown here when sending payment.",
    howTitle: "How It Works",
    howSubtitle: "A simple order flow for players who cannot buy directly in-app.",
    steps: [
      "Choose your Gems package",
      "Select FIB or FastPay",
      "Send the exact amount",
      "Upload your payment screenshot",
      "Submit your KonKan Player ID and order details",
    ],
    orderTitle: "Selected Order",
    orderSubtitle: "Review your package before you submit.",
    package: "Package",
    paymentMethod: "Payment method",
    orderFormTitle: "Submit Your Order",
    orderFormSubtitle: "Your screenshot and order details will be sent directly to the KonKan Discord team.",
    playerId: "KonKan Player ID",
    username: "Username",
    contact: "Contact Info",
    notes: "Extra Notes",
    notesPlaceholder: "Optional note",
    screenshot: "Payment Screenshot",
    uploadText: "Upload your payment screenshot here",
    uploadSubtext: "PNG, JPG, or JPEG",
    chooseFile: "Choose File",
    submit: "Submit Order",
    submitting: "Submitting...",
    copied: "Copied:",
    webhookMissing: "Please add your Discord webhook URL in the code first.",
    missingFields: "Please complete Player ID, Username, and Contact Info.",
    missingFile: "Please upload a payment screenshot before submitting.",
    sending: "Sending your order...",
    success: "Your order has been submitted successfully. Please wait for confirmation.",
    failed: "Something went wrong while submitting your order. Please try again.",
    faqTitle: "Store Notes",
    faqSubtitle: "Important details before placing your order.",
    faqs: [
      [
        "How do I receive my Gems?",
        "After you submit your order and screenshot, your payment will be reviewed manually, then Gems will be added to your KonKan account.",
      ],
      [
        "What do I need before ordering?",
        "You need your KonKan Player ID, your in-game name, and a payment screenshot after sending the amount.",
      ],
      [
        "Can Android players use this page?",
        "Yes. This page is designed especially for players who cannot buy Gems directly in-app.",
      ],
    ],
  },
  ku: {
    badge: "فرۆشگای فەرمی گەوهەری KonKan",
    heroTitle1: "کڕینی",
    heroTitle2: "گەوهەری KonKan",
    heroText:
      "ئەم پەڕەیە بە شێوەیەکی سادە و ڕێکخراو درووست کراوە بۆ ئەو یاریزانانەی دەیانەوێت گەوهەر لە دەرەوەی سیستەمی کرینی ناو ئەپ بکڕن. پاکێجەکەت هەڵبژێرە، پارەکە بنێرە، وێنەی پارەدانەکە باربکە و داواکارییەکەت بۆ تیمی KonKan بنێرە.",
    stats: [
      ["گەیاندن", "بە دەستی"],
      ["یارمەتی", "خێرا"],
      ["شێوازی پارەدان", "FIB / FastPay"],
      ["دۆخ", "چالاک"],
    ],
    packagesTitle: "پاکێجەکانی گەوهەر",
    packagesSubtitle: "ئەو پاکێجەی هەڵبژێرە کە بۆ داواکارییەکەت گونجاوە.",
    androidSupport: "پشتگیری کرینی ئەندرۆید",
    noBonus: "بۆنوسی نییە",
    mostPopular: "زۆرترین هەڵبژاردن",
    selected: "هەڵبژێردراو",
    select: "هەڵبژێرە",
    paymentTitle: "شێوازەکانی پارەدان",
    paymentSubtitle: "شێوازی دڵخوازت هەڵبژێرە و هەمان بڕی ڕاست بنێرە.",
    fib: "FIB",
    fastpay: "FastPay",
    paymentNumber: "ژمارە",
    paymentName: "ناو",
    copyNumber: "کۆپی ژمارە",
    paymentNote1: "هەمان بڕی ڕاست بنێرە و پسووڵەکەت بپارێزە.",
    paymentNote2: "لە کاتی ناردنی پارە، هەمان زانیارییەکانی خوارەوە بەکاربهێنە.",
    howTitle: "چۆنیەتی کارکردن",
    howSubtitle: "ڕێگایەکی سادە بۆ ئەو یاریزانانەی ناتوانن ڕاستەوخۆ لە ناو ئەپ بکڕن.",
    steps: [
      "پاکێجی گەوهەرەکەت هەڵبژێرە",
      "FIB یان FastPay هەڵبژێرە",
      "هەمان بڕی ڕاست بنێرە",
      "وێنەی پارەدانەکەت باربکە",
      "Player ID و زانیارییەکانی داواکارییەکەت بنێرە",
    ],
    orderTitle: "داواکاریی هەڵبژێردراو",
    orderSubtitle: "پێش ناردنێک دووبارە پاکێجەکەت بسەلمێنە.",
    package: "پاکێج",
    paymentMethod: "شێوازی پارەدان",
    orderFormTitle: "داواکارییەکەت بنێرە",
    orderFormSubtitle: "وێنەی پارەدانەکە و زانیارییەکانی داواکارییەکەت ڕاستەوخۆ بۆ تیمی دیسکۆردی KonKan دەنێردرێت.",
    playerId: "Player ID ـی KonKan",
    username: "ناوی یوزەر",
    contact: "زانیاریی پەیوەندی",
    notes: "تێبینی زیادە",
    notesPlaceholder: "تێبینییەکی هەڵبژاردە",
    screenshot: "وێنەی پارەدان",
    uploadText: "وێنەی پارەدانەکەت لێرە باربکە",
    uploadSubtext: "PNG, JPG, یان JPEG",
    chooseFile: "فایل هەڵبژێرە",
    submit: "ناردنی داواکاری",
    submitting: "لە ناردندایە...",
    copied: "کۆپی کرا:",
    webhookMissing: "تکایە سەرەتا Discord webhook URL لە ناو کۆدەکە دابنێ.",
    missingFields: "تکایە Player ID، ناوی یوزەر و زانیاریی پەیوەندی پڕبکەوە.",
    missingFile: "تکایە پێش ناردن وێنەی پارەدانەکە باربکە.",
    sending: "داواکارییەکەت دەنێردرێت...",
    success: "داواکارییەکەت بە سەرکەوتوویی نێردرا. تکایە چاوەڕێی پشتڕاستکردنەوە بکە.",
    failed: "لە ناردنی داواکارییەکەتدا کێشەیەک ڕوویدا. تکایە دووبارە هەوڵبدەوە.",
    faqTitle: "تێبینییەکانی فرۆشگا",
    faqSubtitle: "پێش کڕین، ئەم زانیارییانە بخوێنەوە.",
    faqs: [
      [
        "گەوهەرەکانم چۆن دەگەنە دەستم؟",
        "دوای ناردنی داواکاری و وێنەی پارەدانەکەت، پارەدانەکە بە دەستی پشکنین بۆ دەکرێت و پاشان گەوهەرەکان بۆ ئەکاونتی KonKan ـت زیاد دەکرێن.",
      ],
      [
        "پێش داواکاری پێویستم بە چییە؟",
        "پێویستت بە Player ID ـی KonKan، ناوی یاری، و وێنەی پارەدانەکەت هەیە.",
      ],
      [
        "ئایا یاریزانانی ئەندرۆید دەتوانن ئەم پەڕەیە بەکاربهێنن؟",
        "بەڵێ. ئەم پەڕەیە تایبەت درووست کراوە بۆ ئەو یاریزانانەی ناتوانن ڕاستەوخۆ لە ناو ئەپ گەوهەر بکڕن.",
      ],
    ],
  },
};

export default function KonkanGemsStore() {
  const [lang, setLang] = useState("en");
  const [selectedPackage, setSelectedPackage] = useState(gemPackages[2]);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].key);
  const [playerId, setPlayerId] = useState("");
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const t = content[lang];
  const isKurdish = lang === "ku";

  const selectedMethod = useMemo(
    () => paymentMethods.find((method) => method.key === paymentMethod) ?? paymentMethods[0],
    [paymentMethod]
  );

  const copyText = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus({ type: "success", message: `${t.copied} ${value}` });
    } catch {
      setStatus({
        type: "error",
        message: lang === "ku" ? "کۆپی خۆکار نەکرا. تکایە بە دەستی کۆپی بکە." : "Could not copy automatically. Please copy it manually.",
      });
    }
  };

  const resetForm = () => {
    setPlayerId("");
    setUsername("");
    setContact("");
    setNotes("");
    setFile(null);
    const fileInput = document.getElementById("payment-screenshot-input");
    if (fileInput) fileInput.value = "";
  };

  const submitOrder = async (event) => {
    event.preventDefault();

    if (DISCORD_WEBHOOK_URL === "PASTE_YOUR_DISCORD_WEBHOOK_HERE") {
      setStatus({ type: "error", message: t.webhookMissing });
      return;
    }

    if (!playerId.trim() || !username.trim() || !contact.trim()) {
      setStatus({ type: "error", message: t.missingFields });
      return;
    }

    if (!file) {
      setStatus({ type: "error", message: t.missingFile });
      return;
    }

    try {
      setSubmitting(true);
      setStatus({ type: "idle", message: t.sending });

      const embed = {
        title: "New KonKan Gems Order",
        color: 3127164,
        fields: [
          { name: "Language", value: lang.toUpperCase(), inline: true },
          { name: "Package", value: `${selectedPackage.gems.toLocaleString()} Gems (${selectedPackage.label})`, inline: true },
          { name: "Bonus", value: selectedPackage.bonus ?? "No bonus", inline: true },
          { name: "Payment", value: selectedMethod.key.toUpperCase(), inline: true },
          { name: "Player ID", value: playerId, inline: true },
          { name: "Username", value: username, inline: true },
          { name: "Contact", value: contact, inline: true },
          { name: "Payment Number", value: selectedMethod.number, inline: true },
          { name: "Holder Name", value: selectedMethod.holder, inline: true },
          { name: "Notes", value: notes.trim() || "No extra notes", inline: false },
        ],
        footer: { text: "KonKan Gems Store" },
        timestamp: new Date().toISOString(),
      };

      const payload = {
        content: "💎 New Gems purchase request received.",
        embeds: [embed],
      };

      const formData = new FormData();
      formData.append("payload_json", JSON.stringify(payload));
      formData.append("file", file, file.name);

      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Webhook request failed.");

      setStatus({ type: "success", message: t.success });
      resetForm();
    } catch {
      setStatus({ type: "error", message: t.failed });
    } finally {
      setSubmitting(false);
    }
  };

  const langButtonClass = (key) =>
    `rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
      lang === key
        ? "border-cyan-300/40 bg-cyan-300 text-slate-950"
        : "border-cyan-400/20 bg-white/5 text-slate-200 hover:bg-white/10"
    }`;

  return (
    <div className="min-h-screen bg-[#0A0C12] text-white">
      <style jsx global>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: #0A0C12; color: white; font-family: Inter, Arial, sans-serif; }
        .container { max-width: 1280px; margin: 0 auto; padding: 32px 16px; position: relative; }
        .glow { position: absolute; border-radius: 9999px; filter: blur(80px); pointer-events: none; }
        .glow-1 { top: -80px; left: 50%; transform: translateX(-50%); width: 320px; height: 320px; background: rgba(34,211,238,.15); }
        .glow-2 { top: 28%; left: -64px; width: 256px; height: 256px; background: rgba(37,99,235,.10); }
        .glow-3 { bottom: 0; right: 0; width: 288px; height: 288px; background: rgba(56,189,248,.10); }
        .hero { margin-bottom: 32px; overflow: hidden; border-radius: 30px; border: 1px solid rgba(34,211,238,.2); background: rgba(255,255,255,.05); box-shadow: 0 25px 50px rgba(0,0,0,.25); backdrop-filter: blur(12px); }
        .hero-grid { display: grid; gap: 0; }
        .hero-left { padding: 24px; }
        .hero-right { position: relative; min-height: 320px; overflow: hidden; border-top: 1px solid rgba(34,211,238,.1); }
        .badge { display: inline-flex; align-items: center; gap: 8px; border-radius: 9999px; border: 1px solid rgba(34,211,238,.2); background: rgba(34,211,238,.1); padding: 6px 12px; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: .25em; color: rgb(103,232,249); }
        .lang-switch { display: flex; gap: 8px; flex-wrap: wrap; }
        .title { font-size: 3rem; line-height: 1.05; font-weight: 900; margin: 0; letter-spacing: -.03em; }
        .cyan { color: rgb(103,232,249); }
        .hero-text { margin-top: 16px; max-width: 42rem; font-size: 16px; line-height: 2; color: rgb(203,213,225); }
        .stats-grid { margin-top: 24px; display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; }
        .stat { border-radius: 16px; border: 1px solid rgba(255,255,255,.1); background: rgba(0,0,0,.2); padding: 12px; }
        .stat-label { font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: .18em; color: rgb(100,116,139); }
        .stat-value { margin-top: 8px; font-size: 14px; font-weight: 700; color: rgb(241,245,249); }
        .hero-image { width: 100%; height: 100%; object-fit: cover; opacity: .82; display: block; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, #0A0C12, rgba(10,12,18,.35), transparent); }
        .hero-card { position: absolute; left: 24px; right: 24px; bottom: 24px; border-radius: 24px; border: 1px solid rgba(103,232,249,.2); background: rgba(0,0,0,.35); padding: 20px; backdrop-filter: blur(12px); }
        .hero-card-small { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: .22em; color: rgb(103,232,249); }
        .hero-card-title { margin-top: 8px; font-size: 24px; font-weight: 900; }
        .hero-card-text { margin-top: 8px; font-size: 14px; line-height: 1.8; color: rgb(203,213,225); }
        .main-grid { display: grid; gap: 32px; }
        .section-head { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 0 4px; }
        .section-title { font-size: 28px; font-weight: 700; margin: 0; }
        .section-sub { margin-top: 4px; font-size: 14px; color: rgb(148,163,184); }
        .pill { display: none; border-radius: 9999px; border: 1px solid rgba(34,211,238,.2); background: rgba(255,255,255,.05); padding: 8px 16px; font-size: 12px; color: rgb(203,213,225); }
        .list { display: grid; gap: 16px; }
        .package { position: relative; display: block; width: 100%; overflow: hidden; border-radius: 28px; border: 1px solid rgba(34,211,238,.2); background: rgba(255,255,255,.05); padding: 20px; text-align: left; box-shadow: 0 20px 40px rgba(0,0,0,.2); backdrop-filter: blur(12px); transition: transform .2s ease, border-color .2s ease, background .2s ease; cursor: pointer; }
        .package:hover { transform: translateY(-2px); border-color: rgba(103,232,249,.4); background: rgba(255,255,255,.08); }
        .package.active { border-color: rgba(103,232,249,.5); box-shadow: 0 0 0 2px rgba(103,232,249,.2); }
        .left-bar { position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: rgba(103,232,249,.8); }
        .popular { position: absolute; right: 16px; top: 16px; border-radius: 9999px; border: 1px solid rgba(103,232,249,.3); background: rgba(103,232,249,.1); padding: 4px 12px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .2em; color: rgb(165,243,252); }
        .package-row { display: flex; flex-direction: column; gap: 16px; }
        .package-left { display: flex; align-items: center; gap: 16px; }
        .diamond { display: flex; height: 64px; width: 64px; align-items: center; justify-content: center; border-radius: 16px; border: 1px solid rgba(103,232,249,.25); background: rgba(103,232,249,.1); font-size: 32px; box-shadow: inset 0 0 20px rgba(6,182,212,.1); }
        .gems { display: flex; flex-wrap: wrap; align-items: end; gap: 8px; }
        .gems-num { font-size: 36px; font-weight: 900; letter-spacing: -.03em; }
        .gems-label { margin-bottom: 4px; font-size: 14px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: rgb(103,232,249); }
        .bonus { margin-top: 4px; min-height: 20px; font-size: 14px; font-weight: 600; color: rgb(52,211,153); }
        .bonus.muted { color: rgb(100,116,139); }
        .package-right { display: flex; align-items: center; gap: 12px; align-self: flex-end; }
        .price-box { border-radius: 16px; border: 1px solid rgba(34,211,238,.2); background: rgba(0,0,0,.2); padding: 12px 20px; text-align: right; }
        .price { font-size: 30px; font-weight: 900; color: rgb(165,243,252); }
        .select-box { border-radius: 16px; padding: 12px 20px; font-size: 14px; font-weight: 600; }
        .select-box.selected { background: rgb(103,232,249); color: rgb(15,23,42); }
        .select-box.idle { border: 1px solid rgba(103,232,249,.3); background: rgba(103,232,249,.1); color: rgb(224,242,254); }
        .panel { border-radius: 28px; border: 1px solid rgba(34,211,238,.2); background: rgba(255,255,255,.05); padding: 20px; box-shadow: 0 20px 40px rgba(0,0,0,.25); backdrop-filter: blur(12px); }
        .panel-title { font-size: 18px; font-weight: 700; margin: 0; }
        .panel-sub { margin-top: 4px; font-size: 14px; line-height: 1.8; color: rgb(148,163,184); }
        .stack { display: grid; gap: 16px; }
        .faq-item, .method, .selected-card { border-radius: 24px; border: 1px solid rgba(255,255,255,.1); background: rgba(0,0,0,.2); padding: 16px; }
        .faq-q { font-size: 14px; font-weight: 700; color: white; }
        .faq-a { margin-top: 8px; font-size: 14px; line-height: 1.9; color: rgb(148,163,184); }
        .method { width: 100%; text-align: left; transition: box-shadow .2s ease; cursor: pointer; }
        .method.active { box-shadow: 0 0 0 2px rgba(103,232,249,.2); }
        .method-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
        .method-name { font-size: 18px; font-weight: 700; }
        .method-line { margin-top: 4px; font-size: 14px; color: rgb(203,213,225); }
        .method-sub { font-size: 14px; color: rgb(148,163,184); }
        .method-note { margin-top: 8px; font-size: 12px; line-height: 1.8; color: rgb(148,163,184); }
        .copy-btn, .lang-btn, .file-btn, .submit-btn { cursor: pointer; }
        .copy-btn { border-radius: 12px; border: 1px solid rgba(255,255,255,.1); background: rgba(0,0,0,.2); padding: 8px 12px; font-size: 12px; font-weight: 600; color: rgba(255,255,255,.8); }
        .active-badge { border-radius: 12px; background: rgb(103,232,249); padding: 8px 12px; text-align: center; font-size: 12px; font-weight: 700; color: rgb(15,23,42); }
        .steps { display: grid; gap: 12px; }
        .step { display: flex; align-items: flex-start; gap: 12px; }
        .step-num { margin-top: 2px; display: flex; height: 28px; width: 28px; align-items: center; justify-content: center; border-radius: 9999px; border: 1px solid rgba(103,232,249,.3); background: rgba(103,232,249,.1); font-size: 12px; font-weight: 700; color: rgb(165,243,252); }
        .step-text { font-size: 14px; line-height: 1.9; color: rgb(203,213,225); }
        .selected-card-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .selected-label { font-size: 14px; text-transform: uppercase; letter-spacing: .2em; color: rgb(100,116,139); }
        .selected-name { margin-top: 8px; font-size: 30px; font-weight: 900; }
        .selected-price { border-radius: 16px; border: 1px solid rgba(103,232,249,.2); background: rgba(103,232,249,.1); padding: 12px 16px; font-size: 24px; font-weight: 900; color: rgb(165,243,252); }
        .selected-foot { margin-top: 16px; border-top: 1px solid rgba(255,255,255,.1); padding-top: 16px; font-size: 14px; color: rgb(148,163,184); }
        .selected-foot strong { color: white; }
        .field { display: grid; gap: 8px; }
        .field label { font-size: 14px; font-weight: 500; color: rgb(226,232,240); }
        .field input, .field textarea { width: 100%; border-radius: 16px; border: 1px solid rgba(34,211,238,.2); background: rgba(0,0,0,.2); padding: 12px 16px; font-size: 14px; color: white; outline: none; transition: border-color .2s ease; }
        .field input::placeholder, .field textarea::placeholder { color: rgb(100,116,139); }
        .field input:focus, .field textarea:focus { border-color: rgba(103,232,249,.4); }
        .upload-label { display: block; cursor: pointer; border-radius: 24px; border: 1px dashed rgba(103,232,249,.25); background: rgba(0,0,0,.2); padding: 20px; text-align: center; transition: border-color .2s ease, background .2s ease; }
        .upload-label:hover { border-color: rgba(103,232,249,.4); background: rgba(0,0,0,.3); }
        .upload-text { margin-top: 8px; font-size: 14px; color: rgb(203,213,225); }
        .upload-sub { margin-top: 4px; font-size: 12px; color: rgb(100,116,139); }
        .file-btn { margin-top: 16px; display: inline-flex; border-radius: 16px; border: 1px solid rgba(103,232,249,.3); background: rgba(103,232,249,.1); padding: 8px 16px; font-size: 14px; font-weight: 600; color: rgb(224,242,254); }
        .submit-btn { width: 100%; border: 0; border-radius: 16px; background: rgb(103,232,249); padding: 12px 20px; font-size: 14px; font-weight: 700; color: rgb(15,23,42); }
        .submit-btn:disabled { cursor: not-allowed; opacity: .6; }
        .status { margin-top: 16px; border-radius: 16px; border: 1px solid rgba(34,211,238,.2); background: rgba(6,182,212,.1); padding: 12px 16px; font-size: 14px; }
        .status.success { border-color: rgba(52,211,153,.2); background: rgba(16,185,129,.1); color: rgb(110,231,183); }
        .status.error { border-color: rgba(251,113,133,.2); background: rgba(244,63,94,.1); color: rgb(253,164,175); }
        .status.idle { color: rgb(165,243,252); }
        @media (min-width: 640px) {
          .container { padding-left: 24px; padding-right: 24px; }
          .pill { display: block; }
        }
        @media (min-width: 1024px) {
          .container { padding-left: 32px; padding-right: 32px; }
          .hero-grid { grid-template-columns: 1.1fr .9fr; }
          .hero-left { padding: 40px; }
          .hero-right { border-top: 0; border-left: 1px solid rgba(34,211,238,.1); }
        }
        @media (min-width: 1280px) {
          .main-grid { grid-template-columns: 1.15fr .85fr; }
        }
        @media (min-width: 640px) {
          .package-row { flex-direction: row; align-items: center; justify-content: space-between; }
          .package-right { align-self: auto; }
        }
      `}</style>

      <div className="glow glow-1" />
      <div className="glow glow-2" />
      <div className="glow glow-3" />

      <div className="container">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="hero"
        >
          <div className="hero-grid">
            <div className="hero-left">
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div className="badge">{t.badge}</div>
                <div className="lang-switch">
                  <button className={langButtonClass("en")} onClick={() => setLang("en")}>English</button>
                  <button className={langButtonClass("ku")} onClick={() => setLang("ku")}>کوردی</button>
                </div>
              </div>

              <h1 className="title" style={isKurdish ? { lineHeight: 1.5 } : undefined}>
                {t.heroTitle1} <span className="cyan">{t.heroTitle2}</span>
              </h1>
              <p className="hero-text" style={isKurdish ? { fontSize: 15 } : undefined}>
                {t.heroText}
              </p>

              <div className="stats-grid">
                {t.stats.map(([label, value]) => (
                  <StatCard key={label} label={label} value={value} />
                ))}
              </div>
            </div>

            <div className="hero-right">
              <img src="/konkanvip.png" alt="KonKan game preview" className="hero-image" />
              <div className="hero-overlay" />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="hero-card"
              >
                <div className="hero-card-small">KonKan</div>
                <div className="hero-card-title" style={isKurdish ? { lineHeight: 1.5 } : undefined}>
                  {lang === "ku" ? "یارییەکی کارتی نوێ بۆ یاریزانان" : "A modern card experience for players"}
                </div>
                <div className="hero-card-text" style={isKurdish ? { fontSize: 15 } : undefined}>
                  {lang === "ku"
                    ? "لە 1 تاکو 13، چێژ لە یاریەکە ببینە و گەوهەرەکانت بە شێوەیەکی ئاسان و پارێزراو بکڕە."
                    : "From 1 to 13, enjoy the game and buy your Gems with a smooth and simple order flow."}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.header>

        <div className="main-grid">
          <section style={{ display: "grid", gap: 16 }}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="section-head">
              <div>
                <h2 className="section-title">{t.packagesTitle}</h2>
                <p className="section-sub" style={isKurdish ? { fontSize: 15 } : undefined}>{t.packagesSubtitle}</p>
              </div>
              <div className="pill">{t.androidSupport}</div>
            </motion.div>

            <div className="list">
              {gemPackages.map((item, index) => {
                const active = selectedPackage.gems === item.gems;
                return (
                  <motion.button
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.08 * index }}
                    key={item.gems}
                    type="button"
                    onClick={() => setSelectedPackage(item)}
                    className={`package ${active ? "active" : ""}`}
                  >
                    <div className="left-bar" />
                    {item.popular && <div className="popular">{t.mostPopular}</div>}

                    <div className="package-row">
                      <div className="package-left">
                        <div className="diamond">💎</div>
                        <div>
                          <div className="gems">
                            <span className="gems-num">{item.gems.toLocaleString()}</span>
                            <span className="gems-label">Gems</span>
                          </div>
                          <div className={`bonus ${item.bonus ? "" : "muted"}`}>{item.bonus ?? t.noBonus}</div>
                        </div>
                      </div>

                      <div className="package-right">
                        <div className="price-box">
                          <div className="price">{item.label}</div>
                        </div>
                        <div className={`select-box ${active ? "selected" : "idle"}`}>
                          {active ? t.selected : t.select}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <PanelCard title={t.faqTitle} subtitle={t.faqSubtitle}>
              <div className="stack">
                {t.faqs.map(([q, a]) => (
                  <motion.div key={q} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="faq-item">
                    <div className="faq-q">{q}</div>
                    <div className="faq-a" style={isKurdish ? { fontSize: 15 } : undefined}>{a}</div>
                  </motion.div>
                ))}
              </div>
            </PanelCard>
          </section>

          <aside className="stack">
            <PanelCard title={t.paymentTitle} subtitle={t.paymentSubtitle}>
              <div className="stack">
                {paymentMethods.map((method) => {
                  const active = paymentMethod === method.key;
                  const note = method.key === "fib" ? t.paymentNote1 : t.paymentNote2;
                  const title = method.key === "fib" ? t.fib : t.fastpay;
                  return (
                    <motion.button
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={method.name}
                      type="button"
                      onClick={() => setPaymentMethod(method.key)}
                      className={`method ${active ? "active" : ""}`}
                      style={{
                        borderColor: method.key === "fib" ? "rgba(56,189,248,.3)" : "rgba(52,211,153,.3)",
                        background:
                          method.key === "fib"
                            ? "linear-gradient(135deg, rgba(14,165,233,.20), rgba(34,211,238,.10))"
                            : "linear-gradient(135deg, rgba(16,185,129,.20), rgba(74,222,128,.10))",
                      }}
                    >
                      <div className="method-row">
                        <div>
                          <div className="method-name">{title}</div>
                          <div className="method-line">{t.paymentNumber}: {method.number}</div>
                          <div className="method-sub">{t.paymentName}: {method.holder}</div>
                          <div className="method-note" style={isKurdish ? { fontSize: 14 } : undefined}>{note}</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyText(method.number);
                            }}
                            className="copy-btn"
                          >
                            {t.copyNumber}
                          </button>
                          {active && <div className="active-badge">{t.selected}</div>}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </PanelCard>

            <PanelCard title={t.howTitle} subtitle={t.howSubtitle}>
              <ol className="steps">
                {t.steps.map((step, index) => (
                  <motion.li initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} key={step} className="step">
                    <div className="step-num">{index + 1}</div>
                    <span className="step-text" style={isKurdish ? { fontSize: 15 } : undefined}>{step}</span>
                  </motion.li>
                ))}
              </ol>
            </PanelCard>

            <PanelCard title={t.orderTitle} subtitle={t.orderSubtitle}>
              <div className="selected-card">
                <div className="selected-card-head">
                  <div>
                    <div className="selected-label">{t.package}</div>
                    <div className="selected-name">{selectedPackage.gems.toLocaleString()} Gems</div>
                    <div className="bonus">{selectedPackage.bonus ?? t.noBonus}</div>
                  </div>
                  <div className="selected-price">{selectedPackage.label}</div>
                </div>
                <div className="selected-foot" style={isKurdish ? { fontSize: 15 } : undefined}>
                  {t.paymentMethod}: <strong>{selectedMethod.key === "fib" ? t.fib : t.fastpay}</strong>
                </div>
              </div>
            </PanelCard>

            <PanelCard title={t.orderFormTitle} subtitle={t.orderFormSubtitle}>
              <form className="stack" onSubmit={submitOrder}>
                <Field label={t.playerId} value={playerId} onChange={setPlayerId} placeholder={t.playerId} />
                <Field label={t.username} value={username} onChange={setUsername} placeholder={t.username} />
                <Field label={t.contact} value={contact} onChange={setContact} placeholder={t.contact} />
                <div className="field">
                  <label>{t.notes}</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t.notesPlaceholder}
                    rows={4}
                  />
                </div>
                <div className="field">
                  <label>{t.screenshot}</label>
                  <label htmlFor="payment-screenshot-input" className="upload-label">
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 2.2 }} style={{ fontSize: 32 }}>🧾</motion.div>
                    <p className="upload-text" style={isKurdish ? { fontSize: 15 } : undefined}>
                      {file ? file.name : t.uploadText}
                    </p>
                    <p className="upload-sub">{t.uploadSubtext}</p>
                    <div className="file-btn">{t.chooseFile}</div>
                  </label>
                  <input
                    id="payment-screenshot-input"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  />
                </div>

                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={submitting}
                  className="submit-btn"
                >
                  {submitting ? t.submitting : t.submit}
                </motion.button>
              </form>

              {status.message && (
                <div className={`status ${status.type}`}>
                  {status.message}
                </div>
              )}
            </PanelCard>
          </aside>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="stat">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}

function PanelCard({ title, subtitle, children }) {
  return (
    <section className="panel">
      <div style={{ marginBottom: 16 }}>
        <h3 className="panel-title">{title}</h3>
        <p className="panel-sub">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
