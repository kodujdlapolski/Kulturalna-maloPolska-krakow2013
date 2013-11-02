require 'support/client'
require 'rake'

class AcceptanceTest < ActiveSupport::TestCase
  def client
    @client ||= Client.new
  end

  def load_monuments
    Kmrails::Application.load_tasks
    Rake::Task["tools:import"].invoke
  end
end
