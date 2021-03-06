# Введение в курс Modern JavaScript Frameworks

## Задача про список рекомендаций maxItemAssociation
```Цель: Написать алгоритм для нахождения максимального списка рекомендаций.```

Написать функцию `maxItemAssociation()`, получающую исторические данные о покупках пользователей. Функция возвращает максимальный список рекомендаций. Если количество рекомендаций в группах одинаковое - то возвращает первую группу, из отсортированных в лексикографическом порядке.

Входные данные - массив исторических покупок пользователей `[["a", "b"], ["a", "c"], ["d", "e"]]`.
Пользователь 1 купил "a" и "b". Пользователь 2 купил продукты "a", "c". Пользователь 3 купил продукты "d", "e".

Надо найти максимальную группу рекомендаций. Группа рекомендаций - это список продуктов, который может быть получен с помощью рекомендаций к исходной покупке. Рекомендация состоит из списка покупок другого пользователя, который пересекается с группой.

Если пользователь купил продукты `["a", "b"]`, то в группу рекомендаций попадут `["a", "b"]`, а также все продукты других пользователей, которые пересекаются с ней по какому-то продукту. 
В данном примере список продуктов пользователя 2 пересекается с группой рекомендаций по продукту "a", поэтому весь список 2 может быть добавлен в рекомендации - `["a", "b", "c"]`. Это конечная группа рекомендаций, так как больше нет пересечений с другими списками продуктов. Группа рекомендаций может быть составлена для каждого исходного списка продуктов.

```Шаги решения:```
Группа рекомендаций 1 - ["a", "b", "c"].
Группа рекомендаций 2 - ["d", "e"].

Группа 1 больше группы 2 по количеству рекомендаций.
Ответ: ["a", "b", "c"]
