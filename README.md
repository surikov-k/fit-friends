
# Fit Friends

FitFriends — это онлайн площадка для поиска тренировок и их заведения. Веб-приложение (сайт) функционирует как смесь соцсети и биржи объявлений. Тренеры создают тренировки, а пользователи могут покупать их и заниматься, а в личном кабинете отслеживать свой прогресс.

---

* Студент: [Константин Суриков](https://up.htmlacademy.ru/nodejs-api/2/user/598165).

---
## Памятка
```bash
nx run gyms:db-generate   
nx run nutrition:db-generate
nx run orders:db-generate
nx run workouts:db-generate
```
```bash
nx serve api
```
```bash
nx run-many --target=serve --projects=users,files,workouts,nutrition,notification,orders,gyms,alert --maxParallel=12
```
```bash
nx serve webpp
```
---

<a href="https://htmlacademy.ru/profession/fullstack"><img align="left" width="50" height="50" title="HTML Academy" src="https://up.htmlacademy.ru/static/img/intensive/nodejs/logo-for-github-2.png"></a>

Репозиторий создан для обучения на профессиональном онлайн‑курсе «[Node.js. Профессиональная разработка REST API](https://htmlacademy.ru/profession/fullstack)» от [HTML Academy](https://htmlacademy.ru).
