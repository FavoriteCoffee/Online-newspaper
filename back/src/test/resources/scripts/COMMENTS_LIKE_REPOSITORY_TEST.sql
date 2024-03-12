INSERT INTO public."User"(id, password, user_name, role)
VALUES (101, 'testpassword', 'Ivan', 'ROLE_USER');
INSERT INTO public."User"(id, password, user_name, role)
VALUES (102, 'testpassword', 'Elena', 'ROLE_USER');
INSERT INTO public."Post"(id, date)
VALUES(101, TO_DATE('07/03/2002', 'DD/MM/YYYY'));
INSERT INTO public."Comment"(id, date, fk_author_id, fk_post_id)
VALUES(101, CURRENT_DATE, 101, 101);
INSERT INTO public."Comment"(id, date, fk_author_id, fk_post_id)
VALUES(102, CURRENT_DATE, 101, 101);
INSERT INTO public."Comment"(id, date, fk_author_id, fk_post_id)
VALUES(103, CURRENT_DATE, 102, 101);
INSERT INTO public."CommentsLike"(id, fk_author_id, fk_comment_id)
VALUES(101, 101, 103);
INSERT INTO public."CommentsLike"(id, fk_author_id, fk_comment_id)
VALUES(102, 102, 103);
INSERT INTO public."CommentsLike"(id, fk_author_id, fk_comment_id)
VALUES(103, 102, 101);
INSERT INTO public."CommentsLike"(id, fk_author_id, fk_comment_id)
VALUES(104, 102, 102);