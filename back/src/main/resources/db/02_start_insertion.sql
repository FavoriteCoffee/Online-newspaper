-- users insertion

INSERT INTO public."User"(password, user_name, name, surname, role)
VALUES ('password', 'anna@ya.ru', 'Anna', 'Moreva', 'ROLE_USER');

-- posts insertion

INSERT INTO public."Post"(
    date, img, text, title)
    VALUES (CURRENT_DATE, '../img/cat.jpg',
    'Ну вот, перед вами Винни-Пух.

     Как видите, он спускается по лестнице вслед за своим другом Кристофером Робином, головой вниз, пересчитывая ступеньки собственным затылком: бум-бум-бум. Другого способа сходить с лестницы он пока не знает. Иногда ему, правда, кажется, что можно бы найти какой-то другой способ, если бы он только мог на минутку перестать бумкать и как следует сосредоточиться. Но увы — сосредоточиться-то ему и некогда.

     Как бы то ни было, вот он уже спустился и готов с вами познакомиться.

     — Винни-Пух. Очень приятно!

     Вас, вероятно, удивляет, почему его так странно зовут, а если вы знаете английский, то вы удивитесь еще больше.

     Это необыкновенное имя подарил ему Кристофер Робин. Надо вам сказать, что когда-то Кристофер Робин был знаком с одним лебедем на пруду, которого он звал Пухом. Для лебедя это было очень подходящее имя, потому что если ты зовешь лебедя громко:»Пу-ух! Пу-ух!» — а он не откликается, то ты всегда можешь сделать вид, что ты просто понарошку стрелял; а если ты звал его тихо, то все подумают, что ты просто подул себе на нос. Лебедь потом куда-то делся, а имя осталось, и Кристофер Робин решил отдать его своему медвежонку, чтобы оно не пропало зря. А Винни — так звали самую лучшую, самую добрую медведицу в зоологическом саду, которую очень-очень любил Кристофер Робин. А она очень-очень любила его. Ее ли назвали Винни в честь Пуха, или Пуха назвали в ее честь — теперь уже никто не знает, даже папа Кристофера Робина. Когда-то он знал, а теперь забыл.

     Словом, теперь мишку зовут Винни-Пух, и вы знаете почему.

     Иногда Винни-Пух любит вечерком во что-нибудь поиграть, а иногда, особенно когда папа дома, он больше любит тихонько посидеть у огня и послушать какую-нибудь интересную сказку.

     В этот вечер…',
    'ГЛАВА ПЕРВАЯ, в которой мы знакомимся с Винни-Пухом и несколькими пчёлами');

INSERT INTO public."Post"(
    date, img, text, title)
    VALUES (CURRENT_DATE, '../img/fon.png',
    'Как-то днем известный своим друзьям, а значит, теперь и вам, Винни-Пух (кстати, иногда для краткости его звали просто Пух) не спеша прогуливался по Лесу с довольно важным видом, ворча себе под нос новую песенку.

     Ему было чем гордиться — ведь эту песенку-ворчалку он сам сочинил только сегодня утром, занимаясь, как обычно, утренней гимнастикой перед зеркалом. Надо вам сказать, что Винни-Пух очень хотел похудеть и потому старательно занимался гимнастикой. Он поднимался на носки, вытягивался изо всех сил и в это время пел так:

     — Тара-тара-тара-ра!

     А потом, когда он наклонялся, стараясь дотянуться передними лапками до носков, он пел так:

     — Тара-тара-ой, караул, трам-пам-па!

     Ну, вот так и сочинилась песенка-ворчалка, и после завтрака Винни все время повторял ее про себя, все ворчал и ворчал, пока не выучил ее всю наизусть. Теперь он знал ее всю от начала до конца. Слова в этой Ворчалке были приблизительно такие:

     Тара-тара-тара-ра!

     Трам-пам-пам-тарарам-пам-па!

     Тири-тири-тири-ри,

     Трам-пам-пам-тиририм-пим-пи!

     И вот, ворча себе под нос эту Ворчалку и размышляя — а размышлял Винни-Пух о том, что было бы, если бы он, Винни, был не Винни-Пухом, а кем-нибудь совсем-совсем другим, — наш Винни незаметно дошел до песчаного откоса, в котором была большая дыра.',
    'ГЛАВА ВТОРАЯ, в которой Винни-Пух пошёл в гости, а попал в безвыходное положение');

INSERT INTO public."Post"(
    date, img, text, title)
    VALUES (CURRENT_DATE, '../img/home.jpg', 'текст третьей новости', 'заголовок третьей новости');

INSERT INTO public."Post"(
    date, img, text, title)
    VALUES (CURRENT_DATE, '../img/fon.png', 'текст четвертой новости', 'заголовок четвертой новости');

-- categories insertion

INSERT INTO public."Category"(
    name)
    VALUES("Category 1")

INSERT INTO public."Category"(
    name)
    VALUES("Category 2")

INSERT INTO public."post_category"(
    post_id, category_id)
    VALUES(1, 1)

INSERT INTO public."post_category"(
    post_id, category_id)
    VALUES(1, 2)

INSERT INTO public."post_category"(
    post_id, category_id)
    VALUES(2, 1)

INSERT INTO public."post_category"(
    post_id, category_id)
    VALUES(3, 2)

-- comments insertion

INSERT INTO public."Comment"(
    date, text, fk_author_id, fk_post_id)
    VALUES (CURRENT_DATE, 'Веселая и всеми любимая сказка о Винни-Пухе не подчиняется законам сказочного жанра. Сказка лишена отрицательных персонажей, борьбы добрых и злых сил. Главные герои сказки — Игрушки мальчика Кристофера, с которыми приключаются забавные ситуации', 1, 1);

INSERT INTO public."Comment"(
    date, text, fk_author_id, fk_post_id)
    VALUES (CURRENT_DATE, 'ЁЖИК В ТУМАНЕ ЛУЧШЕ', 1, 1);

INSERT INTO public."Comment"(
    date, text, fk_author_id, fk_post_id)
    VALUES (CURRENT_DATE, 'Первые иллюстрации и эскизы книги были сделаны известным карикатуристом Эрнестом Шепардом. Аукционный дом Sotheby’s неоднократно продавал его рисунки к сказке Алана Милна: так, 10 июля 2013 года шесть эскизов (первоначально предполагалось реализовать восемь работ) были проданы почти за полмиллиона фунтов стерлингов.

                              По утверждению Ж. С. Куйота, «Пух стал самым знаменитым и любимым медведем в литературе». По словам другого критика, «это высказывание часто повторяли, но никто ещё его не опроверг»', 1, 1);

INSERT INTO public."Comment"(
    date, text, fk_author_id, fk_post_id)
    VALUES (CURRENT_DATE, 'В Пухе совмещено сразу несколько образов — плюшевый мишка, живой медвежонок и грозный Медведь', 1, 1);

INSERT INTO public."Comment"(
    date, text, fk_author_id, fk_post_id)
    VALUES (CURRENT_DATE, 'текст первого комментария второй новости', 1, 2);

INSERT INTO public."Comment"(
    date, text, fk_author_id, fk_post_id)
    VALUES (CURRENT_DATE, 'текст второго комментария второй новости', 1, 2);

INSERT INTO public."Comment"(
    date, text, fk_author_id, fk_post_id)
    VALUES (CURRENT_DATE, 'текст третьего комментария второй новости', 1, 2);

INSERT INTO public."Comment"(
    date, text, fk_author_id, fk_post_id)
    VALUES (CURRENT_DATE, 'текст четвертого комментария второй новости', 1, 2);

INSERT INTO public."Comment"(
    date, text, fk_author_id, fk_post_id)
    VALUES (CURRENT_DATE, 'текст первого комментария третьей новости', 1, 3);

INSERT INTO public."Comment"(
    date, text, fk_author_id, fk_post_id)
    VALUES (CURRENT_DATE, 'текст второго комментария третьей новости', 1, 3);

INSERT INTO public."Comment"(
    date, text, fk_author_id, fk_post_id)
    VALUES (CURRENT_DATE, 'текст третьего комментария третьей новости', 1, 3);

INSERT INTO public."Comment"(
    date, text, fk_author_id, fk_post_id)
    VALUES (CURRENT_DATE, 'текст четвертого комментария третьей новости', 1, 3);

INSERT INTO public."Comment"(
    date, text, fk_author_id, fk_post_id)
    VALUES (CURRENT_DATE, 'текст первого комментария четвертой новости', 1, 4);

INSERT INTO public."Comment"(
    date, text, fk_author_id, fk_post_id)
    VALUES (CURRENT_DATE, 'текст второго комментария четвертой новости', 1, 4);

INSERT INTO public."Comment"(
    date, text, fk_author_id, fk_post_id)
    VALUES (CURRENT_DATE, 'текст третьего комментария четвертой новости', 1, 4);

INSERT INTO public."Comment"(
    date, text, fk_author_id, fk_post_id)
    VALUES (CURRENT_DATE, 'текст четвертого комментария четвертой новости', 1, 4);

-- posts_likes insertion

INSERT INTO public."PostsLike"(
    fk_author_id, fk_post_id)
    VALUES (1, 2);

INSERT INTO public."PostsLike"(
    fk_author_id, fk_post_id)
    VALUES (1, 3);

-- comments_likes insertion

INSERT INTO public."CommentsLike"(
    fk_author_id, fk_comment_id)
    VALUES (1, 1);

INSERT INTO public."CommentsLike"(
    fk_author_id, fk_comment_id)
    VALUES (1, 3);

INSERT INTO public."CommentsLike"(
    fk_author_id, fk_comment_id)
    VALUES (1, 6);

INSERT INTO public."CommentsLike"(
    fk_author_id, fk_comment_id)
    VALUES (1, 10);

INSERT INTO public."CommentsLike"(
    fk_author_id, fk_comment_id)
    VALUES (1, 15);
