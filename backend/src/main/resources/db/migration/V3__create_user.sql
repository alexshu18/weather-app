create sequence app_user_seq
    increment by 50;

create table app_user (
    id bigint not null primary key,
    email varchar(255) not null unique,
    password_hash varchar(60) not null,
    created_at timestamptz not null
);