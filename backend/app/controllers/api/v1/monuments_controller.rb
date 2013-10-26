class Api::V1::MonumentsController < ApplicationController
  def index
    if params.include? :range
        out = Monument.close_to(20, 49, 50000)
    else
        out = Monument.all
    end

    render :json => out
  end
end
