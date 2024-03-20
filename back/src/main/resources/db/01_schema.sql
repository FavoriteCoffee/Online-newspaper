
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;


CREATE TABLE public."Comment" (
    id bigint NOT NULL,
    date timestamp(6) without time zone,
    text character varying(255),
    fk_author_id bigint NOT NULL,
    fk_post_id bigint NOT NULL
);


ALTER TABLE public."Comment" OWNER TO postgres;


CREATE SEQUENCE public."Comment_SEQ"
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Comment_SEQ" OWNER TO postgres;



CREATE TABLE public."CommentsLike" (
    id bigint NOT NULL,
    fk_author_id bigint NOT NULL,
    fk_comment_id bigint NOT NULL
);


ALTER TABLE public."CommentsLike" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 24649)
-- Name: CommentsLike_SEQ; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CommentsLike_SEQ"
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CommentsLike_SEQ" OWNER TO postgres;



CREATE TABLE public."Post" (
    id bigint NOT NULL,
    date date,
    img character varying(255),
    text character varying(255),
    title character varying(255)
);


ALTER TABLE public."Post" OWNER TO postgres;


CREATE SEQUENCE public."Post_SEQ"
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Post_SEQ" OWNER TO postgres;



CREATE TABLE public."PostsLike" (
    id bigint NOT NULL,
    fk_author_id bigint,
    fk_post_id bigint
);


ALTER TABLE public."PostsLike" OWNER TO postgres;



CREATE SEQUENCE public."PostsLike_SEQ"
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PostsLike_SEQ" OWNER TO postgres;



CREATE TABLE public."User" (
    id bigint NOT NULL,
    password character varying(255),
    user_name character varying(128),
    role character varying(255) NOT NULL,
    CONSTRAINT "User_role_check" CHECK (((role)::text = ANY ((ARRAY['ROLE_USER'::character varying, 'ROLE_ADMIN'::character varying])::text[])))
);


ALTER TABLE public."User" OWNER TO postgres;



CREATE SEQUENCE public."User_SEQ"
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_SEQ" OWNER TO postgres;



CREATE TABLE public.comment (
    id bigint NOT NULL,
    date timestamp(6) without time zone,
    text character varying(255),
    fk_author_id bigint NOT NULL,
    fk_post_id bigint NOT NULL
);


ALTER TABLE public.comment OWNER TO postgres;



CREATE SEQUENCE public.comment_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comment_seq OWNER TO postgres;



CREATE TABLE public.commentslike (
    id bigint NOT NULL,
    fk_author_id bigint NOT NULL,
    fk_comment_id bigint NOT NULL
);


ALTER TABLE public.commentslike OWNER TO postgres;



CREATE SEQUENCE public.commentslike_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.commentslike_seq OWNER TO postgres;



CREATE TABLE public.post (
    id bigint NOT NULL,
    date date,
    img character varying(255),
    text character varying(255),
    title character varying(255)
);


ALTER TABLE public.post OWNER TO postgres;



CREATE SEQUENCE public.post_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.post_seq OWNER TO postgres;



CREATE TABLE public.postslike (
    id bigint NOT NULL,
    fk_author_id bigint,
    fk_post_id bigint
);


ALTER TABLE public.postslike OWNER TO postgres;



CREATE SEQUENCE public.postslike_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.postslike_seq OWNER TO postgres;



CREATE SEQUENCE public.user_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_seq OWNER TO postgres;



COPY public."Comment" (id, date, text, fk_author_id, fk_post_id) FROM stdin;
\.




COPY public."CommentsLike" (id, fk_author_id, fk_comment_id) FROM stdin;
\.




COPY public."Post" (id, date, img, text, title) FROM stdin;
\.




COPY public."PostsLike" (id, fk_author_id, fk_post_id) FROM stdin;
\.



COPY public."User" (id, password, user_name, role) FROM stdin;
\.




COPY public.comment (id, date, text, fk_author_id, fk_post_id) FROM stdin;
\.




COPY public.commentslike (id, fk_author_id, fk_comment_id) FROM stdin;
\.




COPY public.post (id, date, img, text, title) FROM stdin;
\.




COPY public.postslike (id, fk_author_id, fk_post_id) FROM stdin;
\.




SELECT pg_catalog.setval('public."Comment_SEQ"', 51, true);




SELECT pg_catalog.setval('public."CommentsLike_SEQ"', 1, false);




SELECT pg_catalog.setval('public."Post_SEQ"', 101, true);




SELECT pg_catalog.setval('public."PostsLike_SEQ"', 51, true);




SELECT pg_catalog.setval('public."User_SEQ"', 151, true);




SELECT pg_catalog.setval('public.comment_seq', 1, false);




SELECT pg_catalog.setval('public.commentslike_seq', 1, false);




SELECT pg_catalog.setval('public.post_seq', 1, false);




SELECT pg_catalog.setval('public.postslike_seq', 1, false);




SELECT pg_catalog.setval('public.user_seq', 1, false);




ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);




ALTER TABLE ONLY public."CommentsLike"
    ADD CONSTRAINT "CommentsLike_pkey" PRIMARY KEY (id);




ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY (id);




ALTER TABLE ONLY public."PostsLike"
    ADD CONSTRAINT "PostsLike_pkey" PRIMARY KEY (id);




ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);




ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (id);




ALTER TABLE ONLY public.commentslike
    ADD CONSTRAINT commentslike_pkey PRIMARY KEY (id);




ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id);




ALTER TABLE ONLY public.postslike
    ADD CONSTRAINT postslike_pkey PRIMARY KEY (id);




ALTER TABLE ONLY public."User"
    ADD CONSTRAINT uk_bxs8c2q8tbrkh2hdweuly6psa UNIQUE (user_name);




ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "FK6ahpivagmdi11eusrs40yhrc0" FOREIGN KEY (fk_author_id) REFERENCES public."User"(id);




ALTER TABLE ONLY public."PostsLike"
    ADD CONSTRAINT "FKgcqbekmoubbr6v8ikprcoqcx9" FOREIGN KEY (fk_author_id) REFERENCES public."User"(id);




ALTER TABLE ONLY public."PostsLike"
    ADD CONSTRAINT "FKlhykrnyaimsx3i1mg5lw1fhb0" FOREIGN KEY (fk_post_id) REFERENCES public."Post"(id);




ALTER TABLE ONLY public."CommentsLike"
    ADD CONSTRAINT "FKmv3c1skvo150hxwb0g1qjh9vh" FOREIGN KEY (fk_comment_id) REFERENCES public."Comment"(id);




ALTER TABLE ONLY public."CommentsLike"
    ADD CONSTRAINT "FKp40rx5gehvp5acfy8784igc7v" FOREIGN KEY (fk_author_id) REFERENCES public."User"(id);




ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "FKqp8ws620j9rersbh0s9pcbof8" FOREIGN KEY (fk_post_id) REFERENCES public."Post"(id);




ALTER TABLE ONLY public.comment
    ADD CONSTRAINT fkg77nwnmujuegbgy0138xtbw3u FOREIGN KEY (fk_post_id) REFERENCES public.post(id);




ALTER TABLE ONLY public.postslike
    ADD CONSTRAINT fko4tigmr7b0t32o5qja76l8hjd FOREIGN KEY (fk_post_id) REFERENCES public.post(id);




ALTER TABLE ONLY public.commentslike
    ADD CONSTRAINT fkqv0mcm9sv0m5o9o1qv3d2rxh2 FOREIGN KEY (fk_comment_id) REFERENCES public.comment(id);
