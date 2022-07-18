create table if not exists data
(
    date       datetime   null,
    temp       double     null,
    humidity   double     null,
    ir1        tinyint(1) null,
    ir2        tinyint(1) null,
    flex       int        null,
    ultrasonic int        null
);