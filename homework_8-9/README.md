# Angular

## Приложение для запоминания иностранных слов
```
    В этом приложении пользователь сможет добавлять слова для изучения, проходить тесты для запоминания слов.
    Это *Single Page Application* состоит из 3 страниц:

    - Последние добавленные слова (Recently Added)
    - Упражнениями (Go)
    - Настройки (Settings)

    На главном экране, на странице `Recently Added` пользователь видит список последних добавленных слов,
    может добавить новое слово в словарь.

    На странице упражнений пользователь занимается тестированием своих знаний. 
    Ему показывается слово на одном языке, и он должен написать его перевод на другой язык.
    Если перевод правильный, слово засчитывается, иначе показываем ошибку.
    Мы начнем с двух языков - русского и английского, будем расширять возможности приложения по мере написания программы.

    На странице настроек пользователь выбирает языки, количество слов в упражнении, отводимое на упражнение время.

    Навигация по страницам происходит с помощью ссылок в верхней части страниц, каждой странице соответствует отдельный url.
```

### Домашнее задание № 8. Структура приложения для запоминания иностранных слов

```Декомпозировать приложение для запоминания иностранных слов. Создать структуру и компоненты контейнеры приложения.```

Создать сервисы для работы с текстом
- Сервис перевода слова - должен запрашивать перевод через API (например, [https://tech.yandex.com/translate/](https://tech.yandex.com/translate/))
- Сервис хранения словаря - небольшая обертка для управления словарем с помощью `localStorage`
- Сервис добавления слов - должен разбивать текст на отдельные слова, запрашивать их перевод и сохранять в словарь для приложения.

Сервисы должны общаться с помощью библиотеки `RxJS`.

### Домашнее задание № 9. Routing

Реализовать `UI` приложения
- Создать компоненты для добавления текста/слов в словарь
- Разработать компоненты и формы для тренировки запоминания слов
- Добавить экран настройку приложения, сохранять состояние

Добавить routing, ссылки на страницы и переходы между компонентами приложения.
Добавить и актуализировать тесты для компонент приложения, настроить universal рендеринг приложения.