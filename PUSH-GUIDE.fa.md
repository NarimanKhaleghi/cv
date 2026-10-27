# 🚀 راهنمای کامل Push کردن سایت به `github.com/narimankhaleghi/cv`

این راهنما قدم‌به‌قدم، از صفر تا آنلاین‌شدن سایت را توضیح می‌دهد.
(سه روش: **با Git از سیستم خودت**، **از طریق مرورگر بدون نصب چیزی**، و **به‌روزرسانی‌های بعدی**)

---

## روش ۱ — با Git از سیستم خودت (روش پیشنهادی)

### قدم ۰ — پیش‌نیازها
- `git` نصب باشد: در ترمینال بزن `git --version` (ویندوز: [git-scm.com](https://git-scm.com) را نصب کن)
- یک بار تنظیمات هویت (اگر قبلاً نکردی):
  ```bash
  git config --global user.name  "Nariman Khaleghi"
  git config --global user.email "ایمیلِ-حساب-گیت‌هاب@example.com"
  ```

### قدم ۱ — ریپازیتوری را در گیت‌هاب بساز (اگر ساخته‌ای، رد شو)
1. برو به <https://github.com/new>
2. **Repository name:** `cv`
3. **Public** بگذار (برای GitHub Pages لازم است)
4. ⚠️ هیچ گزینه‌ی «Add a README / .gitignore / license» را تیک نزن — باید کاملاً خالی باشد
5. **Create repository**

### قدم ۲ — فایل‌ها را در یک پوشه بریز
محتویات فایل ZIP را داخل یک پوشه، مثلاً `cv-site`، باز (Extract) کن.
ساختار باید این‌طوری باشد:

```
cv-site/
├── index.html
├── data/
├── assets/
├── scripts/
├── .github/          ← پوشه‌ی مخفی است؛ حتماً باید کپی شده باشد!
├── 404.html
├── README.md
└── ...
```

> 💡 نکته ویندوزی: اگر پوشه‌ی `.github` را نمی‌بینی، در File Explorer از تب View گزینه‌ی **Hidden items** را فعال کن.

### قدم ۳ — داخل پوشه، Git را راه بینداز و Push کن
در ترمینال (CMD / PowerShell / Terminal):

```bash
cd مسیر/پوشه/cv-site        # مثلاً ویندوز: cd C:\Users\Nariman\Desktop\cv-site

git init
git branch -M main
git add .
git commit -m "The PM journey v2 — portfolio launch"
git remote add origin https://github.com/NarimanKhaleghi/cv.git
git push -u origin main
```

- موقع `push` ازت **username** و **password** می‌پرسد:
  - Username: `NarimanKhaleghi`
  - Password: ⚠️ رمز حساب نیست! باید **Personal Access Token** بدهی:
    <https://github.com/settings/tokens> → **Generate new token (classic)** → تیک `repo` → توکن را کپی کن و همان‌جا Paste کن (فقط یک‌بار لازم است).
  - یا راحت‌تر: **GitHub Desktop** یا **VS Code** را نصب کن؛ ورود با مرورگر انجام می‌شود و دیگر توکن لازم نیست.

### قدم ۴ — GitHub Pages را روشن کن
1. برو به `github.com/NarimanKhaleghi/cv` → تب **Settings**
2. منوی چپ: **Pages**
3. بخش **Build and deployment → Source:** گزینه‌ی **GitHub Actions** را انتخاب کن
4. تمام! چون فایل `.github/workflows/deploy-pages.yml` داخل پروژه است، هر `push` به `main` خودکار Deploy می‌کند.

### قدم ۵ — اولین Deploy و همگام‌سازی پروژه‌ها
1. تب **Actions** ریپو را باز کن — باید ورک‌فلو‌ی **«Deploy to GitHub Pages»** سبز شود (۱ تا ۲ دقیقه)
2. بعد از سبز شدن، سایتت اینجاست:
   **<https://narimankhaleghi.github.io/cv/>**
3. برای پرکردن بخش «آزمایشگاه» (پروژه‌های گیت‌هاب): تب **Actions** → از لیست چپ **Weekly projects sync** → دکمه‌ی **Run workflow** → **Run workflow**. این ورک‌فلو هر دوشنبه هم خودکار اجرا می‌شود.

---

## روش ۲ — بدون نصب Git (از طریق مرورگر)

1. برو به <https://github.com/new> و ریپوی خالی `cv` بساز (مثل قدم ۱ بالا)
2. در صفحه‌ی ریپو روی لینک **uploading an existing file** کلیک کن
3. **تمام فایل‌ها و پوشه‌های داخل ZIP** (نه خودِ ZIP!) را بکش و رها کن
   - پوشه‌ی مخفی `.github` با درگ‌اند‌دراپ در مرورگر آپلود **نمی‌شود**! ترفند: در سیستم خودت پوشه‌ی `.github` را موقتاً به `github` تغییر نام بده، آپلود کن، و بعد در گیت‌هاب همان پوشه را باز کن و از آیکن مداد، نامش را به `.github` برگردان. (یا از روش ۱ استفاده کن)
4. پایین صفحه: **Commit changes** (پیام: `launch`)
5. مثل قدم ۴ و ۵ بالا: Settings → Pages → **GitHub Actions**، و یک بار **Weekly projects sync** را دستی اجرا کن

---

## 🔄 به‌روزرسانی‌های بعدی (مثلاً تغییر متن‌ها)

```bash
cd مسیر/پوشه/cv-site
# فایل‌ها را ویرایش کن (متن‌ها در data/content.fa.js و data/content.en.js)
git add .
git commit -m "update content"
git push            # سایت تا ~۱ دقیقه بعد آپدیت می‌شود
```

> اگر روی سیستم دیگران/جدیدی هستی، اول `git clone https://github.com/NarimanKhaleghi/cv.git` بزن، ویرایش کن، بعد push کن.

## 🌐 دامنه اختصاصی (اختیاری)

چون `thepm.ir` فعلاً میزبان ریپوی دیگری است، برای این سایت می‌توانی از یک زیر‌دامنه استفاده کنی (مثلاً `me.thepm.ir` یا `www.thepm.ir`):

1. یک فایل بدون پسوند به نام `CNAME` کنار `index.html` بساز و فقط همین را داخلش بنویس: `me.thepm.ir`
2. در پنل DNS دامنه‌ات، یک رکورد `CNAME` بساز: `me` → `narimankhaleghi.github.io`
3. در Settings → Pages → Custom domain آدرس را وارد و Save کن
4. چون همه‌ی لینک‌های سایت نسبی هستند، هیچ تغییر دیگری لازم نیست

## 🧯 عیب‌یابی سریع

| مشکل | راه‌حل |
|------|--------|
| تب Actions خالی است / ورک‌فلو اجرا نمی‌شود | مطمئن شو پوشه‌ی `.github/workflows/` با دو فایل yml آپلود شده |
| Deploy سبز شد ولی ۴۰۴ می‌دهد | Settings → Pages → Source باید **GitHub Actions** باشد |
| بخش پروژه‌ها خالی می‌ماند | یک بار **Weekly projects sync** را دستی اجرا کن؛ فایل `data/projects.json` باید در ریپو باشد |
| آواتار گیت‌هاب لود نشد | فایل `assets/img/profile.jpg` باید در ریپو باشد (داخل ZIP هست) |
| ارور push: «fetch first» | `git pull origin main --rebase` بزن، بعد دوباره `git push` |
