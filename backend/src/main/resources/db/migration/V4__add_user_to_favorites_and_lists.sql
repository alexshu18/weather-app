delete from city_list_favorite_city;
delete from city_list;
delete from favorite_city;

alter table favorite_city add column user_id bigint not null references app_user (id) on delete cascade;
alter table city_list     add column user_id bigint not null references app_user (id) on delete cascade;

create index idx_favorite_city_user_id on favorite_city (user_id);
create index idx_city_list_user_id     on city_list (user_id);