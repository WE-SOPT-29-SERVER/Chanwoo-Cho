create table "user" {
    id serial
        constraint user_pk
            primary key,
    email varchar(100),
    id_firebase varchar(300),
    username varchar(50),
    phone varchar(15),
    created_at timestamp default now(),
    updated_at timestamp default now(),
    is_deleted boolean default false
};