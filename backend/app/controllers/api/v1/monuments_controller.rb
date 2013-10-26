class Api::V1::MonumentsController < ApplicationController
  def index
    if params.slice(:lng, :lat, :range).size == 3
        out = Monument.close_to(params[:lng], params[:lat], params[:range])
    else
        out = Monument.all
    end

    render :json => out
  end
end
