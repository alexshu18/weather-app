create sequence city_list_seq
    increment by 50;

create table city_list (
    id bigint not null primary key,
    name varchar(255) not null
);

create table city_list_favorite_city (
    city_list_id bigint not null,
    favorite_city_id bigint not null,
    FOREIGN KEY (city_list_id) references city_list (id) ON DELETE CASCADE ,
    FOREIGN KEY (favorite_city_id) references favorite_city (id) ON DELETE CASCADE,
    PRIMARY KEY (city_list_id, favorite_city_id)
);
