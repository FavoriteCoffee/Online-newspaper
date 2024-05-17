INSERT INTO public."User"(id, password, user_name, name, surname, role)
VALUES (101, 'testpassword', 'hippomaru@ya.ru', 'Ivan', 'Smirnov', 'ROLE_USER');
INSERT INTO public."User"(id, password, user_name, name, surname, role)
VALUES (102, 'testpassword', 'lenka@s.ru', 'Elena', 'Moreva', 'ROLE_USER');
INSERT INTO public."User"(id, password, user_name, name, surname, role)
VALUES (103, 'testpassword', 'cringe@s.ru', 'jiga', 'jaga', 'ROLE_USER');
INSERT INTO public."Post"(id, date)
VALUES(101, CURRENT_DATE);
INSERT INTO public."Post"(id, date)
VALUES(102, CURRENT_DATE);
INSERT INTO public."PostsLike"(id, fk_author_id, fk_post_id)
VALUES(101, 101, 101);
INSERT INTO public."PostsLike"(id, fk_author_id, fk_post_id)
VALUES(102, 102, 101);
INSERT INTO public."PostsLike"(id, fk_author_id, fk_post_id)
VALUES(103, 101, 102);
INSERT INTO public."PostsLike"(id, fk_author_id, fk_post_id)
VALUES(104, 102, 102);
INSERT INTO public."PostsLike"(id, fk_author_id, fk_post_id)
VALUES(105, 103, 102);