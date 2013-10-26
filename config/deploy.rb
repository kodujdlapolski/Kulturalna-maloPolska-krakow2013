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

set :default_env, { path: "/root/local/ruby-1.9.3-p448:$PATH" }
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
  after :finishing, 'deploy:cleanup'

end

namespace :frontend do
  task :compile do
    on roles(:all) do |h|
      execute "cd #{release_path}/frontend; npm install ; brunch build"
      execute "ln -s #{release_path}/frontend/public #{release_path}/public"
    end
  end
end
