create table post {
    id serial
        constraint post_pk
            primary key,
    user_id integer,
    title varchar(50),
    content varchar(500),
    created_at timestamp default now(),
    updated_at timestamp default now(),
    is_deleted boolean default false
};