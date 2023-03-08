class ApplicationController < ActionController::API

  def hi
    render json: { hello: "world" }
  end

end
