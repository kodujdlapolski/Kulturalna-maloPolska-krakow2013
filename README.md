## Configuration

### Dependencies

* Ruby 2.0 - in dev env just install [RVM](http://rvm.io) and choose correct Ruby
* Postgresql 9.1
* Postgis - it can cause problems on Ubuntu machines. Please follow instructions from [this article](http://trac.osgeo.org/postgis/wiki/UsersWikiPostGIS20Ubuntu1204). You can check if postgis works by typing ```CREATE EXTENSION postgis;``` in psql.

### Deployment

We're using [capistrano](http://www.capistranorb.com/). In shell, being in main catalog of project, type:

```
$ cap production deploy
```

You'll be asked for the password (or ssh key will be used). You can find deployment scenario in config/deploy.rb.

## Back-end stack

It's Rails app, which public catalog is replaced with front-end content.

### Development configuration

Install gems: ```$ bundle install```

Copy backend/config/database.yml.example as config/database.yml and fill in with your local data. You should be able to run migrations (```$ rake db:migrate```) then.

To run http server type: ```rails s```. Remember - currently front-end and back-end are integrated only on deploy, so it will be hard to maintain both front-end and back-end the same time.

## Front-end stack

### Catalog structure

Frontend is placed in frontend/ katalog. It contains:
* images/
* index.html
* stylesheets
* all js files (like initialize, views etc.)
* package.json - npm package details
