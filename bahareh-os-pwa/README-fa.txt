راه‌اندازی Bahareh OS (یک بار، حدود ۱۰ دقیقه)

الف) گوگل شیت
1. یک Google Sheet خالی بساز.
2. Extensions > Apps Script. کل محتوای Code.gs را جایگزین کن.
3. مقدار TOKEN را به یک رمز دلخواه تغییر بده (مثلاً bahareh-2026-xyz).
4. Deploy > New deployment > نوع Web app؛ Execute as: Me؛ Who has access: Anyone > Deploy و اجازه‌ها را تأیید کن.
5. آدرس Web app (که به /exec ختم می‌شود) را کپی کن.

ب) میزبانی اپ
1. در app.netlify.com/drop پوشه‌ی این پروژه (index.html و بقیه فایل‌ها) را رها کن.
2. آدرس سایت را روی گوشی باز کن:
   آیفون: Safari > Share > Add to Home Screen
   اندروید: Chrome > منو > Install app

ج) اتصال
در اپ: تب «گزارش» > بخش Google Sheets > آدرس و توکن را بگذار > «ذخیره و ارسال».
بعد از هر تغییر، چند ثانیه بعد شیت‌های Tasks و Habits و ... به‌روز می‌شوند و هر روز یک نسخه در شیت Backups ثبت می‌شود.
بازیابی روی گوشی جدید: همین آدرس و توکن را بگذار و «بازیابی از شیت» را بزن.
