create table favorite_city
(
    id        bigint not null
        primary key,
    country   varchar(255),
    latitude  double precision,
    longitude double precision,
    name      varchar(255)
);

create sequence favorite_city_seq
    increment by 50;

