# bsa-grunt 
демо, если мой компьютер включен: http://studies123.ddns.net/
Через bower подключил библиотеку moment, она пишет в консоль время начала выполнения приложения и с ее помощью выводится время и дата в header
Инструкция:
grunt dev:
 - соберет все js файлы с папки resources/assets/js/app в бандл и поместит в public/js
 - соберет все tpl файлы c папки папки resources/assets/js/app/templates в javascript template (templates.js) файл и поместит в public/js
 - сконкатенирует все css файлы в папке resources/assets/css и поместит в public/css
 - запустится таск watch


grunt stage: grunt dev, но без запуска таска watch

grunt prod:
 - соберет все js файлы с папки resources/assets/js/app в бандл, минимизирует его и поместит в public/js
 - соберет все tpl файлы c папки папки resources/assets/js/app/templates в javascript template (templates.js) файл, минимизирует его и поместит в public/js
 - сконкатенирует все css файлы в папке resources/assets/css в один файл, минимизирует его и поместит в public/css
