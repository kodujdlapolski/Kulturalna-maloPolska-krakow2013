require 'test_helper'
require 'acceptance_test_helper'

class MainUseCaseTest < AcceptanceTest
  def test_fetch_data_and_share_correct
    load_monuments
    response = client.get "/api/v1/monuments"
    assert_equal 200, response.status
    assert response.body.size > 0
  end
end
