class ProductionsController < ApplicationController

  def index
    render json: Production.all, status: :ok
  end

  def show
    render json: Production.find(params[:id]), status: :ok
  end

  def create
    render json: Production.create(production_params), status: :created
  end

  def update
    # render json: Production.find(params[:id]).update(production_params) -> t or f
    production = Production.find(params[:id])
    production.update(production_params)
    render json: production, status: :accepted
  end

  def destroy
    production = Production.find(params[:id])
    production.destroy
    head :no_content
  end

  private

  def production_params
    params.permit(:title, :genre, :director, :description, :budget, :image, :ongoing)
  end


  # old way inside strong params
  # allowed_params = %w(title genre budget) ["title", "genre", "budget"]
    # params.filter { |param, val| allowed_params.include?(param) }
end
