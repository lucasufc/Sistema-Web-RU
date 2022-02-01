DROP DATABASE IF EXISTS webru;
CREATE DATABASE webru;

\c webru

DROP TABLE IF EXISTS public.users;
CREATE SEQUENCE users_id
	start 1 
	increment 1;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id'),
    name character varying(100) NOT NULL,
    imageSrc character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    registrationNumber character varying(8) NOT NULL,
    favoriteDish character varying(100) NOT NULL,
    time character varying(10) NOT NULL,
    enableNotifications character varying(4) NOT NULL,
    password character varying(100) NOT NULL,
    rule character varying(5) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

INSERT INTO public.users (name, imageSrc, email, registrationNumber, favoriteDish, time, enableNotifications, password, rule)
VALUES
('Glauton Santos', '/img/perfil-glauton-santos.jpg', 'glautoncardoso@gmail.com', '404201', 'Frango frito', '13:00', 'Sim', 'a531605115996ca7c8', 'admin'),
('Lucas Martins', '/img/perfil-lucas-martins.jpeg', 'lucasmartins@gmail.com', '404206', 'Fígado', '11:00', 'Não','a531605115996ca7c9', 'user'),
('Victor Santos', '/img/perfil-victor-santos.jpeg', 'victorsantos@gmail.com', '404205', 'Estrogonofe de carne', '12:30', 'Sim', 'a531605115996ca7ca', 'admin'),  
('Anderson Leandro', '/img/perfil-anderson-leandro.jpeg', 'andersonleandro@gmail.com', '404203', 'Feijoada', '12:00', 'Não', 'a531605115996ca7cb', 'user');