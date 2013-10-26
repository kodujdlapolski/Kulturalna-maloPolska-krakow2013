set :application, 'kulturalna-malopolska'
set :repo_url, 'git@github.com:kodujdlapolski/Kulturalna-maloPolska.git'

# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }

set :deploy_to, '/root/kulturalna-malopolska'
set :scm, :git

# set :format, :pretty
# set :log_level, :debug
# set :pty, true

# set :linked_files, %w{config/database.yml}
# set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

set :keep_releases, 5

namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      # Your restart mechanism here, for example:
      # execute :touch, release_path.join('tmp/restart.txt')
    end
  end

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

  after :updating, 'frontend:compile'
  after :updating, 'backend:build'
  after :finishing, 'deploy:cleanup'

end

namespace :frontend do
  task :compile do
    on roles(:all) do |h|
      execute "rm -rf #{release_path}/backend/public; ln -s #{release_path}/frontend #{release_path}/backend/public"
    end
  end
end

namespace :backend do
  task :build do
    on roles(:all) do |h|
      execute "ln -s #{shared_path}/config/database.yml #{release_path}/backend/config/database.yml"
      execute "cd #{release_path}/backend; bundle install --without='development test'; RAILS_ENV=#{fetch(:stage)} rake db:migrate"
    end
  end
end
