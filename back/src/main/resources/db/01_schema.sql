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
    id SERIAL PRIMARY KEY,
    date timestamp(6) without time zone,
    text text,
    fk_author_id SERIAL NOT NULL,
    fk_post_id SERIAL NOT NULL
);


ALTER TABLE public."Comment" OWNER TO postgres;



CREATE TABLE public."CommentsLike" (
    id SERIAL PRIMARY KEY,
    fk_author_id SERIAL NOT NULL,
    fk_comment_id SERIAL NOT NULL
);


ALTER TABLE public."CommentsLike" OWNER TO postgres;



CREATE TABLE public."Post" (
    id SERIAL PRIMARY KEY,
    date date,
    img character varying(255),
    text text,
    title character varying(255)
);


ALTER TABLE public."Post" OWNER TO postgres;



CREATE TABLE public."PostsLike" (
    id SERIAL PRIMARY KEY,
    fk_author_id SERIAL,
    fk_post_id SERIAL
);


ALTER TABLE public."PostsLike" OWNER TO postgres;



CREATE TABLE public."User" (
    id SERIAL PRIMARY KEY,
    password character varying(255),
    user_name character varying(128),
    role character varying(255) NOT NULL,
    CONSTRAINT "User_role_check" CHECK (((role)::text = ANY ((ARRAY['ROLE_USER'::character varying, 'ROLE_ADMIN'::character varying])::text[])))
);


ALTER TABLE public."User" OWNER TO postgres;


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
