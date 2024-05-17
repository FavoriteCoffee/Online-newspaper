INSERT INTO public."User"(id, password, user_name, name, surname, role)
VALUES (101, 'testpassword', 'hippomaru@ya.ru', 'Ivan', 'Smirnov', 'ROLE_USER');
INSERT INTO public."Post"(id, date)
VALUES(101, TO_DATE('07/03/2002', 'DD/MM/YYYY'));
INSERT INTO public."Post"(id, date)
VALUES(102, TO_DATE('09/03/2012', 'DD/MM/YYYY'));
INSERT INTO public."Comment"(id, date, fk_author_id, fk_post_id)
VALUES(101, CURRENT_DATE, 101, 101);
INSERT INTO public."Comment"(id, date, fk_author_id, fk_post_id)
VALUES(102, CURRENT_DATE, 101, 101);
INSERT INTO public."Comment"(id, date, fk_author_id, fk_post_id)
VALUES(103, CURRENT_DATE, 101, 102);